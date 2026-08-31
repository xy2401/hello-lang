(ns clojure-algorithms-demo
  (:require [clojure.string :as str]))

(defn binary-search [values target]
  (loop [low 0 high (dec (count values))]
    (when (<= low high)
      (let [middle (quot (+ low high) 2)
            value (nth values middle)]
        (cond
          (= value target) middle
          (< value target) (recur (inc middle) high)
          :else (recur low (dec middle)))))))

(def graph {"A" ["B" "C"] "B" ["D"] "C" ["E"] "D" [] "E" []})
(defn bfs [start]
  (loop [queue (conj clojure.lang.PersistentQueue/EMPTY start)
         seen #{start}
         result []]
    (if (empty? queue)
      result
      (let [node (peek queue)
            fresh (remove seen (get graph node []))]
        (recur (into (pop queue) fresh) (into seen fresh) (conj result node))))))

(def records [{:key 1 :tag "one-a"} {:key 2 :tag "two"} {:key 1 :tag "one-b"}])
(println (str "sorted=" (str/join "," (sort [5 2 8 2 1]))))
(println (str "stable=" (str/join "," (map :tag (sort-by :key records)))))
(println (str "binary-search(5)=" (binary-search [1 2 2 5 8] 5)))
(println (str "bfs=" (str/join "," (bfs "A"))))
(println "style=loop/recur plus persistent queue")
