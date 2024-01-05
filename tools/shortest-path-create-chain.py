#!/usr/bin/env python3

# <https://github.com/MegaManSec/SSH-Snake>
# By Joshua Rogers <https://joshua.hu/>
# GPL 3, of course.

import re
import heapq
import argparse

class Graph:
    def __init__(self):
        self.graph = {}

    def add_edge(self, start, end):
        if start not in self.graph:
            self.graph[start] = []
        self.graph[start].append(end)

    def dijkstra(self, start, end):
        heap = [(0, start, [])]
        visited = set()

        while heap:
            (cost, node, path) = heapq.heappop(heap)

            if node not in visited:
                visited.add(node)
                path = path + [node]

                if node == end:
                    return path

                for neighbor in self.graph.get(node, []):
                    if neighbor not in visited:
                        heapq.heappush(heap, (cost + 1, neighbor, path))

        return None

def build_lookup_table(input_lines, ignore_dest_user):
    lookup_table = {}

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

            if ignore_dest_user:
                target_range = (host, dest_host)
            else:
                target_range = (f"{user}@{host}", f"{dest_user}@{dest_host}")
            if target_range in lookup_table:
                continue
            entry = [user, host, path, dest_user, dest_host]
            lookup_table[target_range] = entry

    return lookup_table

def build_full_path(lookup_table, sequence):
    result_str = ""
    for i in range(len(sequence)-1):
        target_range = (sequence[i], sequence[i+1])
        if target_range in lookup_table:
            user, host, path, dest_user, dest_host = lookup_table[target_range]
            if i == len(sequence)-2:
                result_str += f"{user}@{host}{path}->{dest_user}@{dest_host}"
            else:
                result_str += f"{user}@{host}{path}->"
        else:
            print(f"Could not find {target_range[0]}->{target_range[1]}")
            exit()

    result_str = result_str.rstrip("->")
    return result_str


def build_cmd(lookup_table, sequence):
    result_str = ""
    for i in range(len(sequence)-1):
        target_range = (sequence[i], sequence[i+1])
        if target_range in lookup_table:
            user, host, path, dest_user, dest_host = lookup_table[target_range]
            path = path.split('[')[1].split(']')[0]
            if path[0] == "!":
                result_str += "sudo "
                path = path[1:]
            result_str += f"ssh -t -oIdentitiesOnly=yes -oServerAliveInterval=300 -oTCPKeepAlive=no -oConnectTimeout=5 -oStrictHostKeyChecking=no -oGlobalKnownHostsFile=/dev/null -oUserKnownHostsFile=/dev/null -oBatchMode=yes -i \"{path}\" {dest_user}@{dest_host} '"
        else:
            print(f"Could not find {target_range[0]}->{target_range[1]}")
            exit()

    for i in range(len(sequence)-3):
        result_str += "'"

    result_str = result_str.rstrip("->")
    return result_str

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Find the shortest path from host_a to host_b, or user_a@host_a to user_b@host_b. Likewise, create a single command which can be used to ssh from from a to b.")
    parser.add_argument("--file", help="Path to a file containing the output of SSH-Snake.")
    parser.add_argument("--src", help="The starting host or user@host in the chain.")
    parser.add_argument("--dest", help="The ending host or user@host in the chain.")

    args = parser.parse_args()

    file_path = args.file
    host_a = args.src
    host_b = args.dest

    ignore_dest_user = False

    if not any(vars(args).values()):
        parser.print_help()
        exit()

    if '@' not in host_a:
        if '@' not in host_b:
            ignore_dest_user = True
        else:
            print("host_a and host_b must be either host_a and host_b, or user_a@host_a and user_b@host_b")
            exit()
    elif '@' not in host_b:
        if '@' in host_a:
            print("host_a and host_b must be either host_a and host_b, or user_a@host_a and user_b@host_b")
            exit()

    with open(file_path, 'r') as file:
        input_lines = file.readlines()

    lookup_table = build_lookup_table(input_lines, ignore_dest_user)

    graph = Graph()
    for edge in lookup_table:
        graph.add_edge(edge[0], edge[1])

    path = graph.dijkstra(host_a, host_b)

    if path:
        print(f"Shortest path from {host_a} to {host_b}: {'->'.join(path)}\n")
    else:
        print(f"No path found from {host_a} to {host_b}")
        exit()

    result_str = build_full_path(lookup_table, path)
    print(result_str,"\n")

    result_str = build_cmd(lookup_table, path)
    print(result_str)
