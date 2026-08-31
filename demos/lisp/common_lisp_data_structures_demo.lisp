(defstruct tree value left right)

(let* ((items '(1 2 3))
       (vector #(4 5 6))
       (scores (list (cons "alice" 3) (cons "bob" 5)))
       (colors '("blue" "green" "red"))
       (root (make-tree :value "root"
                        :left (make-tree :value "left")
                        :right (make-tree :value "right"))))
  (format t "list=~{~D~^,~}~%" items)
  (format t "vector=~{~D~^,~}~%" (coerce vector 'list))
  (format t "map=~{~A:~D~^,~}~%" (loop for (key . value) in scores append (list key value)))
  (format t "set=~{~A~^,~}~%" colors)
  (format t "tree=~A(~A,~A)~%"
          (tree-value root) (tree-value (tree-left root)) (tree-value (tree-right root)))
  (format t "identity=cons-cells-mutable; fresh-list-functional~%"))

