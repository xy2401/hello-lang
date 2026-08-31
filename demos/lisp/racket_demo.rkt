#lang racket

(require racket/contract)

(struct point (x y) #:transparent)

(define/contract (distance-squared value)
  (-> point? exact-integer?)
  (+ (sqr (point-x value)) (sqr (point-y value))))

(define-syntax-rule (report label value)
  (printf "~a=~a\n" label value))

(report "lang" "racket")
(report "struct" (point 3 4))
(report "contract" (distance-squared (point 3 4)))
(report "syntax-object" (syntax? #'(+ 1 2)))

