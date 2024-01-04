
SSH-Snake's approach to output is quite simple and consists of the following:

- Print where we are,
- Print any keys found,
- Print any exceptional information.

A normal output will look something like this:

```
(1) [1704020277]jrogers@10.128.0.25
(2) [1704020277]jrogers@(10.128.0.25)
(3) [1704020277]jrogers@10.128.0.25: Discovered usable private key in [/home/jrogers/.ssh/id_rsa]
(4) [1704020277]jrogers@10.128.0.25: EXTERNAL_MSG: KEY[/home/jrogers/.ssh/id_rsa]: LS0tLS1CRUdJTiBPUE[...]
(5) [1704020278]jrogers@10.128.0.25: Discovered unusable private key in [/home/jrogers/.ssh/protected]
(6) [1704020278]jrogers@10.128.0.25: EXTERNAL_MSG: KEY[/home/jrogers/.ssh/protected]: LS0tLS1CRUdJTiB[...]
(7) [1704020278]jrogers@10.128.0.25: EXTERNAL_MSG: INFO: Beginning with 12 dests and 1 keys
(8) [1704020279] jrogers@10.128.0.25[!/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.25
(9) [1704020279] jrogers@(10.128.0.25)[!/home/jrogers/.ssh/id_rsa]->jrogers@(10.128.0.25)
(10) [1704020279] jrogers@10.128.0.25[!/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.27
(11) [1704020279] jrogers@(10.128.0.25)[!/home/jrogers/.ssh/id_rsa]->jrogers@(10.128.0.27)
(12) [1704020277] jrogers@10.128.0.25[!/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.27: Discovered usable private key in [/home/jrogers/.ssh/id_rsa]
....
```

Every line is prepended with the UNIX epoch time.

Going through each line one by one, the purpose of each line is explained respectively:

1. The current destination (`user@host`) in the so-called "hosts chain" format. This destination address is the exact address that was used to `ssh` to (`ssh -i key user@host`).
2. The current destination (`user@(host)`) in the so-called "hostnames chain" format. This format identifies a system based on all of its addresses. For example, a system with three IPv4 addresses corresponds to `user@(ip1:ip2:ip3)` where each `ip` is the IPv4 address. This format of destination is a clear indicator of the system and is used to ensure scanning of duplicate systems does not occur (such that connecting to a secondary address does not trigger a duplicate scan for a system that has already been scanned).
3. A private key that can be used (no passphrase or permission issue) has been discovered in `/home/jrogers/.ssh/id_rsa`.
4. The contents of the private key discovered in `/home/jrogers/.ssh/id_rsa` in base64 format.
5. A private key that cannot be used (either a passphrase or some type of permission issue) has been discovered in `/home/jrogers/.ssh/protected`.
6. The contents of the private key discovered in `/home/jrogers/.ssh/protected` in base64 format.
7. 1 usable key and 12 destination addresses have been discovered on the system. The script will now try to connect to those 12 addresses using the 1 key.
8. `jrogers@10.128.0.25` has connected to `jrogers@10.128.0.25` using the `/home/jrogers/.ssh/id_rsa` key. The `!` at the beginning of the key location indicates that `sudo` was used.
9. The "hostnames chain" format of the above.
10. `jrogers@10.128.0.25` has connected to `jrogers@10.128.0.27` using the `/home/jrogers/.ssh/id_rsa` key.
11. The "hostnames chain" format of the above.
12. A private key that can be used has been discovered in `/home/jrogers/.ssh/id_rsa`.

Again: each of these lines are indicative of _normal_ output.

---


There are some exceptional cases which are related to error conditions and the [custom_cmds option](/SETTINGS.md#custom_cmds):

Examples of these exception cases are listed below:

```
(1) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->git@20.205.243.166 [GitHub]
(2) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->jrogers@10.128.50.50 [GitLab]
(3) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.30 [NoLogin]
(4) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.30 [OoM]
(5) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.30 [ConnErr]
(6) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.30 [fail,aws,ubuntu]
(7) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.30 [fail,cmd,awk]
(8) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.30 [ARGLIMIT:1048576, abcdef...]
(9) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.30: EXTERNAL_MSG: CMD[uname]: abcdef..."
(10) [1704020279] jrogers@10.128.0.25[/home/jrogers/.ssh/id_rsa]->jrogers@10.128.0.30 [line]: abcdef..
```

Each of these indicate:

1. The `/home/jrogers/.ssh/id_rsa` key can be used to SSH to `git@20.205.243.166`, which is a server identifying itself as GitHub.
2. The `/home/jrogers/.ssh/id_rsa` key can be used to SSH to `jrogers@10.128.50.50`, which is a GitLab server.
3. The `/home/jrogers/.ssh/id_rsa` key can be used to SSH to `jrogers@10.128.0.30`, but the user is restricted to `/usr/sbin/nologin` (meaning the SSH connection is likely used only for proxying).
4. The destination `jrogers@10.128.0.30` has run of memory during script execution.
5. The destination `jrogers@10.128.0.30` has unexpectedly disconnected.
6. The destination `jrogers@10.128.0.30` is an AWS EC2 instance which accepts the `/home/jrogers/.ssh/id_rsa` key but does not allow SSH to the `jrogers` user: instead, you must SSH to the `ubuntu` user. If the [retry_count option](SETTINGS.md#retry_count) is greater than 0, the script will automatically attempt to SSH to `ubuntu@10.128.0.30`.
7. The destination `jrogers@10.128.0.30` accepts the key but the script cannot run because the `awk` program is not installed on the system.
8. Either `jrogers@10.128.0.25` or `jrogers@10.128.0.30` has experienced a fatal error: [the argument limit length](https://unix.stackexchange.com/questions/120642/what-defines-the-maximum-size-for-a-command-single-argument) has been reached, which means that the script cannot be passed via an argument. The argument limit is `1048576`. The so-called `ignore_list` (containing all of the destinations already scanned and currently being scanned) is also printed in base64 format.
9. The custom command `uname` has been run on `jrogers@10.128.0.30` due to it being set in the `custom_cmds` option, and the output of the command (including stderr) is printed in base64 format.
10.  The destination `jrogers@10.128.0.30` has printed an unexpected output. The output is printed after `[line]: `. Alternatively, it may also mean that `ssh` on `jrogers@10.128.0.25` has printed an unexpected output while using `ssh -i key jrogers@10.128.0.30`.

---

A few more procedural lines are also printed:

```
(1) [1702897342] jrogers@10.128.0.30: EXTERNAL_MSG: INFO: Trying again with 2 dests and 4 keys (attempts left: 0)
(2) 12 destinations (from 10 unique servers) added to interesting_dests.
(3) Unique private keys discovered: 8
(4) Unique shell accounts accessed: 10
(5) Unique servers accessed: 5
```

1. Either 2 recoverable errors have been encountered such that the destinations where the errors occurs will be tried again, or the [use_find_from_ignore_list option](SETTINGS.md#use_find_from_ignore_list) has been enabled and the script is attempting to SSH into any destinations from the ignore list (and thus the new destinations are being tried).
2. The [use_retry_all_dests options](SETTINGS.md#use_retry_all_dests) has been enabled and the script is going to re-run the scan completely with 12 destinations, corresponding to 10 unique systems (user1@host and user2@host are one system).
3. At the complete end of the scan, this identifies the total amount of private keys discovered during the scan.
4. At the complete end of the scan, this identifies the total amount of destinations (`user@host`) that have been accessed.
5. At the complete end of the scan, this identifies the total amount of systems (based on the hostnames chain format) that have been accessed.
