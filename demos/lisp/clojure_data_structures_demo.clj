(ns clojure-data-structures-demo
  (:require [clojure.string :as str]))

(defrecord Tree [value left right])

(let [items '(1 2 3)
      vector [4 5 6]
      scores (sorted-map "alice" 3 "bob" 5)
      colors (sorted-set "blue" "green" "red")
      root (->Tree "root" (->Tree "left" nil nil) (->Tree "right" nil nil))]
  (println (str "list=" (str/join "," items)))
  (println (str "vector=" (str/join "," vector)))
  (println (str "map=" (str/join "," (map (fn [[key value]] (str key ":" value)) scores))))
  (println (str "set=" (str/join "," colors)))
  (println (str "tree=" (:value root) "(" (-> root :left :value) "," (-> root :right :value) ")"))
  (println (str "immutable=" (= items '(1 2 3)) "; shared=" (= vector (assoc vector 1 5)))))
