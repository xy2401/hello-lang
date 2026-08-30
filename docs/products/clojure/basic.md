# Clojure 基础语法

```clojure
(def language "Clojure")
(def values [1 2 3 4])

(defn square [value]
  (* value value))

(println (map square (filter even? values)))
```

列表通常表示调用，向量常用于有序数据和参数，Map 表达键值数据，Set 表达唯一成员。大多数集合操作返回新值。

```clojure
(def user {:name "Ada" :roles #{:admin :reader}})
(-> user
    (assoc :active true)
    (update :roles conj :writer)
    println)
```

线程宏 `->`、`->>` 只是重排形式，不创建线程；并发状态由 Atom、Ref、Agent 等独立机制处理。
