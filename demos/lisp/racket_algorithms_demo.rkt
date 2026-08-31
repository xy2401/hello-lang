#lang racket

(define (binary-search values target)
  (let loop ([low 0] [high (sub1 (vector-length values))])
    (and (<= low high)
         (let* ([middle (quotient (+ low high) 2)]
                [value (vector-ref values middle)])
           (cond [(= value target) middle]
                 [(< value target) (loop (add1 middle) high)]
                 [else (loop low (sub1 middle))])))))

(define graph (hash 'A '(B C) 'B '(D) 'C '(E) 'D '() 'E '()))
(define (bfs start)
  (let loop ([queue (list start)] [seen (set start)] [result '()])
    (if (empty? queue)
        (reverse result)
        (let* ([node (first queue)]
               [fresh (filter-not (lambda (next) (set-member? seen next))
                                  (hash-ref graph node))])
          (loop (append (rest queue) fresh)
                (for/fold ([known seen]) ([next fresh]) (set-add known next))
                (cons node result))))))

(define records '((1 . "one-a") (2 . "two") (1 . "one-b")))
(printf "sorted=~a\n" (string-join (map number->string (sort '(5 2 8 2 1) <)) ","))
(printf "stable=~a\n" (string-join (map cdr (sort records < #:key car)) ","))
(printf "binary-search(5)=~a\n" (binary-search #(1 2 2 5 8) 5))
(printf "bfs=~a\n" (string-join (map symbol->string (bfs 'A)) ","))
(printf "style=for forms plus immutable sets\n")

