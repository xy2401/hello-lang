(defmacro when-let ((name form) &body body)
  `(let ((,name ,form))
     (when ,name ,@body)))

(format t "family=Common Lisp~%")
(format t "reader=~S~%" '(+ 2 3))
(format t "evaluator=~D~%" (eval '(+ 2 3)))
(when-let (message "code-is-data")
  (format t "macro=~A~%" message))

