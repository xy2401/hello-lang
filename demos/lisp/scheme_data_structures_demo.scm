(use-modules (ice-9 hash-table) (srfi srfi-1) (srfi srfi-9))

(define-record-type <tree>
  (make-tree value left right)
  tree?
  (value tree-value)
  (left tree-left)
  (right tree-right))

(define scores (make-hash-table))
(hash-set! scores "alice" 3)
(hash-set! scores "bob" 5)
(define colors (make-hash-table))
(for-each (lambda (color) (hash-set! colors color #t)) '("blue" "green" "red"))
(define items '(1 2 3))
(define values #(4 5 6))
(define root (make-tree "root" (make-tree "left" #f #f) (make-tree "right" #f #f)))

(format #t "list=~{~a~^,~}~%" items)
(format #t "vector=~{~a~^,~}~%" (vector->list values))
(format #t "map=alice:~a,bob:~a~%" (hash-ref scores "alice") (hash-ref scores "bob"))
(format #t "set=~{~a~^,~}~%" (filter (lambda (color) (hash-ref colors color #f)) '("blue" "green" "red")))
(format #t "tree=~a(~a,~a)~%" (tree-value root) (tree-value (tree-left root)) (tree-value (tree-right root)))
(display "identity=pairs-mutable-in-guile; prefer-fresh-values\n")
