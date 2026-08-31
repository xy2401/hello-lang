#include <iostream>
#include <vector>
#include <queue>
#include <cassert>

using Edge = std::pair<int, int>;

std::vector<int> dijkstra(int n, int start, const std::vector<std::vector<Edge>>& graph) {
    const int INF = 1e9;
    std::vector<int> dist(n, INF);
    std::priority_queue<Edge, std::vector<Edge>, std::greater<Edge>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;

        for (auto [w, v] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    std::cout << "=== C++ Dijkstra Shortest Path ===" << std::endl;
    int n = 4;
    std::vector<std::vector<Edge>> graph(n);
    graph[0].push_back({1, 1});
    graph[0].push_back({4, 2});
    graph[1].push_back({2, 2});
    graph[2].push_back({1, 3});
    graph[1].push_back({5, 3});

    auto dist = dijkstra(n, 0, graph);
    assert(dist[3] == 4);
    std::cout << "Shortest path to node 3: " << dist[3] << std::endl;
    std::cout << "C++ Dijkstra tests passed successfully." << std::endl;
    return 0;
}
