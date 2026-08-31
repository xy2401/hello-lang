#include <iostream>
#include <vector>
#include <queue>
#include <cassert>

class Graph {
    int V;
    std::vector<std::vector<int>> adj;
public:
    Graph(int v) : V(v), adj(v) {}
    void addEdge(int u, int v) {
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    std::vector<int> bfs(int start) {
        std::vector<int> order;
        std::vector<bool> visited(V, false);
        std::queue<int> q;

        visited[start] = true;
        q.push(start);

        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    q.push(v);
                }
            }
        }
        return order;
    }
};

int main() {
    std::cout << "=== C++ Graph BFS Traversal ===" << std::endl;
    Graph g(5);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);

    auto order = g.bfs(0);
    assert(order.size() == 5);
    assert(order[0] == 0);
    std::cout << "C++ Graph BFS traversal verified." << std::endl;
    return 0;
}
