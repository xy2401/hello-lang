(ns clojure-demo)

(def state (atom {:count 0}))
(swap! state update :count inc)
(swap! state update :count inc)

(println (str "persistent=" (pr-str (assoc {:language "Clojure"} :runtime "JVM"))))
(println (str "atom=" (:count @state)))
(println (str "sequence=" (pr-str (into [] (comp (filter odd?) (map #(* % %))) (range 1 7)))))
(println (str "interop=" (.toUpperCase "jvm")))

