#include <iostream>
#include <vector>
#include <numeric>
#include <cassert>

class UnionFind {
    std::vector<int> parent, rank;
public:
    UnionFind(int n) : parent(n), rank(n, 0) {
        std::iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX == rootY) return false;
        if (rank[rootX] < rank[rootY]) parent[rootX] = rootY;
        else if (rank[rootX] > rank[rootY]) parent[rootY] = rootX;
        else { parent[rootY] = rootX; rank[rootX]++; }
        return true;
    }
    bool connected(int x, int y) { return find(x) == find(y); }
};

int main() {
    std::cout << "=== C++ Disjoint Set Union (Union-Find) ===" << std::endl;
    UnionFind uf(5);
    uf.unite(0, 1);
    uf.unite(1, 2);
    assert(uf.connected(0, 2));
    assert(!uf.connected(0, 3));
    std::cout << "C++ Union-Find tests passed successfully." << std::endl;
    return 0;
}
