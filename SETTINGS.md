# General Settings

### ignore_user
Default: 0.

If set to 1, the script will consider a system already scanned when one user has been accessed. For example, if `user1@host` has been scanned and the script makes its way to `user2@host` somehow, a repeated scan will not occur. This may be useful in an environment where sudo is accessible by every user (because `user1@host` can already access the keys that `user2@host` can access).

## use_sudo

Default: 1

If set to 1, the script will attempt to use `sudo` to elevate its privileges. If it is successful, the script runs as root; if it isn't, the script runs as the normal user.

## ssh_timeout

Default: 3

The connection timeout (in seconds) for SSH connections __and DNS resolution__. See `ssh_config(5)`'s _ConnectTimeout_.

## retry_count

Default: 3

In some cases, a __recoverable__ error may be encountered while using SSH. This number corresponds to the maximum amount of times a destination with a recoverable error should be tried again. It is advised to be at least 1.

## ignored_users

Default: ()

A list of usernames that are always ignored when attempting to SSH to another system. For example, if "root" is ignored, there will be no attempts to SSH into the root user of any host.

## ignored_hosts

Default: ()

A list of hosts (ip addresses or hostnames) that are always ignored/skipped when attempting to SSH to another system. It is generally safest to specify the hostname in ip address form.


## ignored_dests

Default: ()

A list of destinations in the form of `username@hostname` that are always ignored. It is generally safest to specify the hostname in ip address form.

## ignored_key_files

Default: ("\*badcert.pem\*" "\*badkey.pem\*")

A list of locations that are ignored when searching for SSH private keys. This setting supports globbing/wildcards using the standard asterisk as in any other bash script. For example, to reject just the filename "file.name", you would include "\*/file.name" in the list. Also note that for example, "/dir/\*/file" will also match "/dir/dir2/dir3/file".

## custom_cmds

Default: ()

A list of commands that should be run when the script has been initialized on each system. The output of these commands are printed as base64 strings (including stderr). Note: these commands will only ever run once as they are executed right after checking that the system has not already been scanned.

This list also supports sudo (if available), and can be used by using `${s}` as a literal. For example, `custom_cmds=('${s} cat /etc/shadow')`. If `${s}` is not specified, the command will __not__ run as sudo even if `use_sudo=1`.

---


# Configurable Discovery Strategies

SSH-Snake comes with various configurable strategies (functions) which can be used to discover SSH private keys on a system and discover hosts and destinations to attempt to connect to. Sane defaults have been provided, however if you want to perform a scan as thoroughly as possible, then enabling more discovery techniques can help. With the exception of one strategy (`find_ssh_keys`), each of these strategies can be toggled off/on. Below are details of each of the strategies.

Detailed technical explanations of how some of these strategies work can be found in [this blog post](https://joshua.hu/ssh-snake-ssh-network-traversal-discover-ssh-private-keys-network-graph).

## SSH Private Key Discovery Strategies

The following strategies are used to discover any private keys on the system. We use these strategies over, say, checking every single file on the system, because it would be prohibitively expensive to open and parse every file on the system. Instead, the following strategies can be used to provide hints towards the location of private keys.

### find_ssh_keys

Checks every readable file within the `.ssh/` folder in every home folder of the system (identified using `getent passwd` and `/home/*/`. This strategy is not optional.

### scan_paths / scan_paths_depth

Using the `scan_paths` and `scan_paths_depth` user-setting, the script uses `find(1)` to search each of the locations specified by `scan_paths` for keys. A maximum depth for searching directories is specified using `scan_paths_depth` (equivalent to `find $location -maxdepth $scan_paths_depth`). Multiple locations may be specified.

For example, `scan_paths=("/root/" "/var/*/")` and `scan_paths_depth=3` will look for look for keys in `/root/*/*/*` and `/var/*/*/*/*`.

If `scan_paths` is left empty (`scan_paths=()`) or `scan_paths_depth` is less than 1, this strategy does nothing. The default value is () and 3 respectively.

## SSH Host Discovery Strategies

The following strategies are used to discover potential _hosts_ which the script will SSH to. _Hosts_ correspond to either a hostname or an ip address: they do not constitute a destination that SSH will use in of itself, since SSH is missing a username that corresponds to the host.

Since hosts do not correspond to destinations, it is necessary for hosts to somehow be combined with usernames to actually be useful. Therefore, all "host discovery strategies" are disabled unless either:

1. `use_combinate_interesting_users_hosts` is enabled and there is at least one entry in _interesting_users_,
2. `use_combinate_users_hosts_aggressive` is enabled.

`use_combinate_interesting_users_hosts` will combine all of the _interesting_users_ with all of the hosts discovered to create destinations, and `use_combinate_users_hosts_aggressive` will combine all users discovered with all of the hosts discovered to creation destinations. That process is described in [combinatorial_destination_discovery_strategies](#combinatorial-destination-discovery-strategies).

### use_find_from_hosts

By parsing `/etc/hosts` (or more correctly, running `getent ahostsv4`), extra hosts may be discovered.

This strategy may be toggled off/on with 0/1. The default value is 1.

### use_find_arp_neighbours

This function adds all of the neighbour hosts from the arp table to the list of hosts.

This strategy may be toggled off/on with 0/1. The default value is 1.

### use_find_d_block

This function takes the current host's address(es) and adds the all d-block addresses into the list of hosts. For example, if the current host has the address 10.0.0.5, this function will add the 10.0.0.0-10.0.0.255 hosts. 

This strategy may be toggled off/on with 0/1. The default value is 0.

## SSH Destination Discovery Strategies

In the context of this script, a "destination" (or "dest") means a username and host combination; the destination that `ssh` will attempt to connect to (`ssh user@host`). Without destinations, there is nowhere for the script to attempt to SSH to. These strategies are used to discover potential destinations that will be SSH'd to.

Note that for each of these destinations, the username is also loaded into a collection of usernames, and the hosts are loaded into a collection of hosts. If `use_combinate_users_hosts_aggressive` or `use_combinate_interesting_users_hosts` are enabled, they will use these usernames and hosts to create destinations.
 
### use_find_from_authorized_keys

 `authorized_keys` files may include ip-based restrictions for key usage such as `from="10.0.0.1,10.2.3.3" ssh-rsa ...`. 

This strategy adds any hosts discovered in the `from` directive of `authorized_keys` file to our list of destinations using `$user@$host`, where `$user` is the username corresponding to the location where the `authorized_keys` file was found.

This strategy may be toggled off/on with 0/1. The default value is 1.

### use_find_from_last

This strategy checks the last logins to the system by using `last`, and extracts the addresses the logins came from. The strategy then naively assumes that the destination username of that SSH access also corresponds to the source username, adding the `$destination_username@$source_address` to the list of destinations.

This strategy may be toggled off/on with 0/1. The default value is 1.

### use_find_from_prev_dest

This strategy takes the destination that we are connecting _from_ and adds it to the list of destinations.

For example, consider the chain `user@system_a->user@system_b->user@system_c`. Using this strategy, `user@system_b` will try to connect to `user@system_a`. `user@system_c` will then try to connect to `user@system_b`.

This strategy may be toggled off/on with 0/1. The default value is 1.

### use_find_from_known_hosts

`known_hosts` files contain a list of the hosts a user has previously SSH'd into, and can be a wealth of knowledge for discovering hosts. For example: `# 2048 MD5:32:41:b4:e7:3e:d7:ee:a4:3a:c3:a8:44:40:45:16:04 10.0.0.1 (RSA)`. 

This function extracts the `10.0.0.1` host. Likewise, we add `$user@$host` to the list of destinations, where `$user` is the username corresponding to the location where the `known_hosts` file was found.

Incidentally, this function also extracts users, hosts, and destinations from `authorized_keys` files which _may_ share a similar format like `# 2048 MD5:62:38:9a:f0:6d:e7:57:57:25:09:71:4d:c7:bb:4b:b0 root@system (RSA)`. This function will extract `root@system`.

This strategy may be toggled off/on with 0/1. The default value is 1.

### use_find_from_hashed_known_hosts

`known_hosts` files contain a list of hosts that a user has previously connected to with SSH. However, SSH offers an option _HashKnownHosts_ which is used to hash the entries of the hosts in this file such that they cannot easily be read. This is the default on most Debian-based operating systems.

For example, a user that has has _HashKnownHosts_ enabled when running `ssh 192.168.1.1` will have an entry in their `known_hosts` file similar to this: `|1|e77JRypO4qWElXpIaBGiFLOJBXg=|HBu6N6IGFeOz5wt0HFXz9/hp/wY= ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIClRF2LjL1EJNfEYAKpr9rENgZVFlH7jtEPla0x3hakB`

Here, `|1|e77JRypO4qWElXpIaBGiFLOJBXg=|HBu6N6IGFeOz5wt0HFXz9/hp/wY=` corresponds to a hash of the host `192.168.1.1`. Hashing is a one-way procedure, however it is possible to brute-force this hash using `ssh-keygen`:

```
$ ssh-keygen -F 192.168.1.1
# Host 192.168.1.1 found: line 58 
|1|96KUSpeaZrkYrbQhhjFLF/jJ15w=|xMX7qNROy8SwPZK1zEjrlEeYU24= ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIClRF2LjL1EJNfEYAKpr9rENgZVFlH7jtEPla0x3hakB
```

When `use_find_from_hashed_known_hosts` is enabled, we attempt to brute-force all of the ip addresses of the c and d blocks of the current system. For example, if we are currently on `user@85.82.81.80` and we discover hashed known hosts, we will attempt to discover them by checking whether the hash corresponds to any of the hosts `85.82.0.0-85.82.255.255`. If any of the hashes are cracked, we add `$user@$host` to the list of destinations, where `$user` is the username corresponding to the location where the `known_hosts` file was found.

Note that this strategy is _extremely_ slow and for each `known_hosts` file may take many minutes. Some performance testing yielded the following time taken per `known_hosts` file:
```
# xargs available: 2m42.820s
# no xargs available: 7m52.145s
# xargs available using sudo: 3m56.659s
# no args available using sudo for-loop: 15m36.738s
```

Unlike the rest of the script, if `use_sudo` is enabled, sudo will not actually be used unless it is completely necessary (i.e. the `known_hosts` file cannot be read by the current user).

This strategy may be toggled off/on with 0/1. The default value is 0.

### use_find_from_ignore_list

At any point in time, the so-called "ignore list" contains a list of destinations which have previously been successfully accessed and scanned. This strategy takes this list and adds all of those destinations to the list of destinations to connect to. There are two different ways this strategy can be used.

When `use_find_from_ignore_list=1`, the script will parse the ignore list when the script _starts_ and connect to any destinations which have _previously_ been connected to.

When `use_find_from_ignore_list=2`, the script will do the same as above, but also parse the ignore list when the script _finishes_, re-trying with any newly added destinations on the ignore list. 

`use_find_from_ignore_list=0` disables this function completely. The default value is 0.


### use_retry_all_dests

The 2nd option from the `use_find_from_ignore_list` strategy is slightly flawed. Consider the following:

```
A->B->C ; Normal scan
A->D->C ; A->D discovered naturally, D->C discovered using use_find_from_ignore_list=1 or use_find_from_ignore_list=2.
A->C ; A->C discovered using use_find_from_ignore_list=2.
```

It is possible that C->D could also exist. However, this link will not be discovered because destination D was first discovered after C. Since C has already been scanned, the script will not scan it again, losing the valuable data of C->D.

In order to discover every possible combination of connected systems, `use_retry_all_hosts` takes a different approach. Once the whole scan is completely finished (i.e. the script the user is running), the scan simply repeats itself but adds all of the previously discovered destinations to `interesting_dests`, ensuring that every single destination will try every other destination.

On the re-run, we do NOT attempt to discover any NEW users/hosts/destinations, only discover keys. This means that although new chains may be discovered, no new destinations will be discovered. In fact, the function to add new users, hosts, and destinations is noop'd during the re-run, so it is not possible for new destinations to be discovered at all.

This strategy may be toggled off/on with 0/1. The default value is 1.


## Both SSH Private Key and Destination Discovery Strategies

Some of these strategies can be used to find both private keys and destinations. Both of these strategies are generally advised to be kept enabled, as they are the most natural resource for finding how SSH has been used on the system (and therefore where we can find keys and where they connect to easily).

### use_find_from_bash_history

`.bash_history` files are a jackpot/wealth of information when it comes to SSH private keys and especially destinations. By parsing `.bash_history` files, we can see exactly how users are utilizing the `ssh`, `scp`, and `rsync` binaries, and determine where they have been connecting to and with which keys.

Parsing each bash_history line, we look at all calls to `ssh`, `scp`, and `rsync` and extract the following:

1. Usernames,
2. Hosts,
3. Destinations,
4. Key Files.

For `ssh`, `scp`, and `rsync`, we extract any destinations in the form `user@host`.

For `ssh` and `scp` specifically, we parse and extract:

1. The location of any key files which have been passed with the `-i` parameter: `-i /absolute/key_file`, `-i ~/expanded/key_file`, or `-i relative/key_file`. In the middle case, we expand the `~` to the home directory of the user corresponding to where the `.bash_history` file was found. In the latter case, we also assume the location corresponds to the relative location based on the home directory of the user corresponding to the `.bash_history file`. Likewise, all cases `-i/absolute/key_file`, `-i~/expanded/key_file`, and `-irelative/key_file` are also extracted.
2. Any username of any remote destinations that have been passed with the `-l` parameter (see `man(1)`).
3. Any hosts of any remote destination
4. Any destinations.

For example, this strategy is able to extract the following (_note: this list is not exhaustive and these are just some examples. the `use_find_from_bash_history` function is complicated and can hopefully handle all legitimate usage of ssh and scp_):
```
ssh user@host ; extract user@host as a destination
scp file user@host:~/ ; extract user@host as a destination 
scp user@host:~/file ./ ; extract user@host as a destination
rsync -a * user@host:~/ ; extract user@host as a destination 
scp file host:~/ ; extract host, and assume $user@host as a destination
scp host:~/file ./ ; extract host, and assume $user@host as a destination
ssh -i.ssh/id_rsa host ; extract .ssh/id_rsa and host, assume $user@host as a destination
ssh -i .ssh/id_rsa host ; extract .ssh/id_rsa and host, assume $user@host as a destination
ssh -luser host ; extract user, extract user@host as a destination
ssh -i /tmp/key host -luser ps ; extract /tmp/key and user@host as a destination
ssh host -v 'bash -c ls' ; extract host, assume $user@host as a destination
sssh -D 9000 localhost -luser ; extract user@localhost as a destination
ssh -i key_file -v -luser host ps ; extract key_file and extract user@host as a destination
```

This strategy may be toggled off/on with 0/1. The default value is 1.

### use_find_from_ssh_config

By parsing every readable file in`.ssh/` folders, we may encounter `ssh_config` files. These files generally look something like this:

```
 Host example.com
   Hostname example.com
   User your_username
   IdentityFile ~/.ssh/id_rsa
```

We parse this file and extract the `IdentityFile` for the location of a private key. We also extract the `Host`, `Hostname`, and `User`.

Unfortunately at the moment, this function is unable to generate individual destinations as it naively parses the file line-by-line, rather than block-by-block. Future versions will be able to identify the destination that the block corresponds to.

This strategy may be toggled off/on with 0/1. The default value is 1.

## Combinatorial Destination Discovery Strategies

Each time a system is scanned, various individual usernames, hosts, and destinations will be discovered which can point towards other destinations. However, if usernames and hosts are discovered in a context that doesn't necessarily result in a definitive full destination being discovered, this data is effectively unused. That's where combinatorial destination discovery strategies come in. 

### combinate_interesting_users_hosts

This strategy takes pre-defined usernames, hosts, and destinations, and combinates them with their respective others to form destinations.

All `interesting_users` will be combined with all of the hosts that are discovered on the system to form destinations.

All `interesting_hosts` will be combined with all of the usernames that are discovered on the system to form destinations.

All `interesting_users` will be combined with all of the `interesting_hosts` to form destinations.

All `interesting_dests` will be used to form destinations, and can be used to force every system to attempt to SSH into specific destinations with every key.

This strategy may be toggled off/on with 0/1, or with empty `interesting_users=()`, `interesting_hosts=()`, `interesting_dests()` values. The default values are 1, (), ("$USER" "root"), and () respectively.


### use_combinate_users_hosts_aggressive

Every single username discovered is combined with every single host discovered to form destinations.

This strategy will result in massive growth of attempted destinations; for example, 100 usernames discovered on a system along with 100 hosts will result in 10,000 destinations. Use this with caution.

This strategy may be toggled off/on with 0/1. The default value is 0.


# Alternative Settings

In some parts of the world, it is common to simply look for any SSH private keys in `.ssh/` folders and try to SSH into every address in the d-block of the system which the key was found. The below settings imitate a similar strategy. That is to say, the below settings ensure that the script only looks for nearby hosts in the d-block, arp neighbours, and `/etc/hosts`, and attempts to SSH into each of those hosts with the username `root` and the username which the system started with (`$USER` evaluates to the username that has been SSH'd into on each destination).

```
interesting_users=("$USER" "root")
interesting_hosts=("127.0.0.1")
interesting_dests=()
use_combinate_interesting_users_hosts=1
use_combinate_users_hosts_aggressive=0
use_retry_all_dests=1
scan_paths_depth=3
use_find_from_hosts=1
use_find_arp_neighbours=1
use_find_d_block=1
ignored_key_files=("*badcert.pem*" "*badkey.pem*")
use_sudo=1
ssh_timeout=3
retry_count=3
ignore_user=0
ignored_users=()
ignored_hosts=()
ignored_dests=()
custom_cmds=()
scan_paths=()
use_find_from_authorized_keys=0
use_find_from_last=0
use_find_from_prev_dest=0
use_find_from_known_hosts=0
use_find_from_hashed_known_hosts=0
use_find_from_ignore_list=0
use_find_from_ssh_config=0
use_find_from_bash_history=0
```
