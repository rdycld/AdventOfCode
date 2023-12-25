import networkx as nx
data = open('./input.txt')

graph = nx.Graph()

for line in data:
    left, right = line.split(":")
    for node in right.strip().split():
        graph.add_edge(left, node)
        graph.add_edge(node, left)

graph.remove_edges_from(nx.minimum_edge_cut(graph))

left, right = nx.connected_components(graph)

print(len(left) * len(right))
# well... that sucks, but real solution is coming :p
