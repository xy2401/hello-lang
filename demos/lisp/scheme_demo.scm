(define-syntax when-let
  (syntax-rules ()
    ((_ (name value) body ...)
     (let ((name value))
       (if name (begin body ...))))))

(define (sum-tail numbers total)
  (if (null? numbers)
      total
      (sum-tail (cdr numbers) (+ total (car numbers)))))

(display "tail-sum=")
(display (sum-tail '(1 2 3 4 5) 0))
(newline)
(when-let (message "hygienic-macro")
  (display "macro=")
  (display message)
  (newline))
(display "lexical-scope=")
(display ((let ((offset 10)) (lambda (value) (+ offset value))) 5))
(newline)

