#!/usr/bin/env python3

# <https://github.com/MegaManSec/SSH-Snake>
# By Joshua Rogers <https://joshua.hu/>
# GPL 3, of course.

import argparse
import re
from collections import defaultdict
import networkx as nx
from networkx.drawing.nx_agraph import write_dot

def create_graph_from_edges(lookup_table):
    graph = nx.DiGraph()
    for source, dest in lookup_table:
        graph.add_edge(source, dest)
    return graph


def build_lookup_table(input_lines, ignore_dest_user, dot):
    lookup_table = set()


    for line in input_lines:
        line = line.strip()
        line = re.sub(r"^\[?\d+\]?\s*", "", line)

        if ": " in line or "]->" not in line or not line[-2].isdigit() or not line[-1] == ')':
            continue

        pattern = re.compile(r"(\w+)@\(([\d\.:]+)\)(\[[^\]]+\])->(?=(\w+)@\(([\d\.:]+)\))")
        matches = re.finditer(pattern, line)
        previous_dest_host = None

        for match in matches:
            user, host, _, dest_user, dest_host = match.groups()

            if dot:
                user = f'"{user}'
                host = f'{host}"'
                dest_user = f'"{dest_user}'
                dest_host = f'{dest_host}"'

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

            lookup_table.add(target_range)

    return lookup_table


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Construct a graph file to visualize the relation between servers discovered by SSH-Snake.")
    parser.add_argument("--file", help="Path to a file containing the output of SSH-Snake.")
    parser.add_argument("--format", help="The format of the graph file to export. The options are gexf or dot.")
    parser.add_argument("--with-users", action="store_true", help="Create nodes based on their 'user@host' instead of just 'host'. This setting is optional and not recommended.")
    args = parser.parse_args()

    if not any(vars(args).values()):
        parser.print_help()
        exit()

    if args.format not in ("gexf", "dot"):
        print("Valid options for --format are: gexf or dot")
        exit()

    with open(args.file, 'r') as file:
        input_lines = file.readlines()

    ignore_dest_user = True

    if args.with_users:
        ignore_dest_user = False

    lookup_table = build_lookup_table(input_lines, ignore_dest_user, args.format == "dot")
    graph = create_graph_from_edges(lookup_table)

    if len(lookup_table) > 500 and args.format == "dot":
        print("The list of connections is quite big; YMMV with a .dot file.")

#    Set default edge color to green
    for edge in graph.edges():
        graph.edges[edge]['color'] = '#006400'

#    Set default node color to lightgrey.
    for node in graph.nodes():
        graph.nodes[node]['fillcolor'] = 'lightgrey'
        graph.nodes[node]['style'] = 'filled'

#    Set any edges that correspond to a dest1 being able to connect to dest2 and backwards (dest1<--->dest2) to red.
    for source, dest in graph.edges():
        if (dest, source) in graph.edges():
            graph.edges[(source, dest)]['dir'] = 'both'
            graph.edges[(source, dest)]['color'] = '#CD5C5C'

#    Set any node corresponding to a loopback (dest1<--->dest1) to blue
    for node in graph.nodes():
        if graph.has_edge(node, node) or any((edge[0] == edge[1] == node) for edge in graph.edges()):
            graph.nodes[node]['fillcolor'] = '#00BFFF'


    output_dot_file_path = "SSHSnake_dot_file.dot"
    output_gexf_file_path = "SSHSnake_gexf_file.gexf"

    if args.format == "gexf":
        nx.write_gexf(graph, output_gexf_file_path)
        print("Your gexf file has been created in ./sshsnake_gexf_file.gexf")
        print("You can now open the file using Gephi.\n")
        print("Or you can use Cytoscape! Take a look at GRAPHICS.md")
    else:
        nx.drawing.nx_pydot.write_dot(graph, output_dot_file_path)
        print("Your dot file has been created in ./sshsnake_dot_file.dot.\n")
        print("To convert your dot file to a png or svg, use the following command to sample different algorithms available from graphviz:\n")
        print("for alg in sfdp fdp circo twopi neato dot; do\n\t$alg -Tpng -Gsplines=true -Gconcentrate=true -Gnodesep=0.1 -Goverlap=false SSHSnake_dot_file.dot -o $alg.png\ndone\n\n")
        print("Alternatively, you can just paste the .dot file into https://dreampuf.github.io/GraphvizOnline/ -- if pasting that type of information into your browser is in your threat model...\n\n")
        print("Try placing splines=true; concentrate=true; nodesep=0.1; overlap=false; in the file just after the first line, too!")
