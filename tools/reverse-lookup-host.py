#!/usr/bin/env python3

# <https://github.com/MegaManSec/SSH-Snake>
# By Joshua Rogers <https://joshua.hu/>
# GPL 3, of course.

import re
import heapq
from collections import defaultdict
import argparse

def indirect_get_connected_nodes(graph, interesting_host, ignore_dest_user):
    backward_connected_nodes = set()
    sentinel = '__SENTINEL__'

    backward_heap = [(interesting_host, sentinel)]
    while backward_heap:
        current_node, parent_node = heapq.heappop(backward_heap)

        if current_node not in backward_connected_nodes:
            backward_connected_nodes.add(current_node)
            if parent_node is not sentinel:
                heapq.heappush(backward_heap, (parent_node, sentinel))
            if current_node in graph:
                for connection in graph[current_node]:
                    if ignore_dest_user:
                        node = connection[1] # host
                    else:
                        node = f"{connection[0]}@{connection[1]}" # user@host
                    heapq.heappush(backward_heap, (node, current_node))

    return backward_connected_nodes

def build_lookup_table(input_lines, ignore_dest_user):
    graph = defaultdict(set)

    for line in input_lines:
        line = line.strip()
        line = re.sub(r"^\[?\d+\]?\s*", "", line)

        prev_dest_host = None

        if ": " in line or "]->" not in line or not line[-1].isdigit():
            continue

        pattern = re.compile(r"(\w+)@(\d+\.\d+\.\d+\.\d+)(\[[^\]]+\])->(?=(\w+)@(\d+\.\d+\.\d+\.\d+))")
        matches = re.finditer(pattern, line)
        for match in matches:
            user, host, path, dest_user, dest_host = match.groups()

            if host == "(127.0.0.1)" or host == "127.0.0.1":
                if prev_dest_host is not None:
                    host = prev_dest_host

            if dest_host == "(127.0.0.1)" or dest_host == "127.0.0.1":
                dest_host = host
                prev_dest_host = dest_host
            else:
                prev_dest_host = None

            line_to_add = (user, host, path, dest_user, dest_host)
            if ignore_dest_user:
                graph[dest_host].add(line_to_add)
            else:
                graph[f"{dest_user}@{dest_host}"].add(line_to_add)

    return graph

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Given the address of a destination host, determine how many other hosts can connect directly or indirectly to it. The format of the host to be found must either be 'host' or 'user@host', where 'host' is an IP address.")
    parser.add_argument("--file", help="Path to a file containing the output of SSH-Snake.")
    parser.add_argument("--dest", help="The host or destination that we are interested in finding incoming connections to. This may either be in the form of 'host' or 'user@host'.")
    parser.add_argument("--mode", choices=['directly', 'indirectly'], help="Specify whether to search for directly connected hosts or indirectly connected hosts. Note: 'indirectly' includes 'directly' entries.")

    args = parser.parse_args()

    file_path = args.file
    interesting_host = args.dest
    mode = args.mode

    ignore_dest_user = False

    if not any(vars(args).values()) or mode not in ("directly", "indirectly"):
        parser.print_help()
        exit()

    if '@' not in interesting_host:
        ignore_dest_user = True

    with open(file_path, 'r') as file:
        input_lines = file.readlines()

    reverse_lookup_table = build_lookup_table(input_lines, ignore_dest_user)

    if interesting_host in reverse_lookup_table:
        print(f"The following hosts are able to connect {mode} to {interesting_host}:\n")
        if mode == "directly":
            for entry in reverse_lookup_table[interesting_host]:
                user, host, path, dest_user, dest_host = entry
                print(f"{user}@{host}{path} -> {dest_user}@{dest_host}")
        else:
            result = indirect_get_connected_nodes(reverse_lookup_table, interesting_host, ignore_dest_user)
            for entry in result:
                print(entry)
    else:
        print(f"No hosts are able to {mode} connect to {interesting_host}.")
