#lang racket

(struct tree (value left right) #:transparent)

(define items '(1 2 3))
(define values #(4 5 6))
(define scores (hash "alice" 3 "bob" 5))
(define colors (set "blue" "green" "red"))
(define root (tree "root" (tree "left" #f #f) (tree "right" #f #f)))

(printf "list=~a\n" (string-join (map number->string items) ","))
(printf "vector=~a\n" (string-join (map number->string (vector->list values)) ","))
(printf "map=alice:~a,bob:~a\n" (hash-ref scores "alice") (hash-ref scores "bob"))
(printf "set=~a\n" (string-join (sort (set->list colors) string<?) ","))
(printf "tree=~a(~a,~a)\n" (tree-value root) (tree-value (tree-left root)) (tree-value (tree-right root)))
(printf "immutable=~a; transparent-struct=~a\n" (immutable? items) (tree? root))

