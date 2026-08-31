(defun binary-search (vector target)
  (loop with low = 0
        with high = (1- (length vector))
        while (<= low high)
        for middle = (floor (+ low high) 2)
        for value = (aref vector middle)
        when (= value target) return middle
        when (< value target) do (setf low (1+ middle))
        else do (setf high (1- middle))
        finally (return nil)))

(defun bfs (graph start)
  (loop with queue = (list start)
        with seen = (list start)
        while queue
        for node = (pop queue)
        collect node
        do (dolist (next (cdr (assoc node graph :test #'string=)))
             (unless (member next seen :test #'string=)
               (setf seen (append seen (list next))
                     queue (append queue (list next)))))))

(let* ((values (stable-sort (copy-list '(5 2 8 2 1)) #'<))
       (stable (stable-sort (copy-list '((1 . "one-a") (2 . "two") (1 . "one-b"))) #'< :key #'car))
       (graph '(("A" "B" "C") ("B" "D") ("C" "E") ("D") ("E"))))
  (format t "sorted=~{~D~^,~}~%" values)
  (format t "stable=~{~A~^,~}~%" (mapcar #'cdr stable))
  (format t "binary-search(5)=~D~%" (binary-search #(1 2 2 5 8) 5))
  (format t "bfs=~{~A~^,~}~%" (bfs graph "A"))
  (format t "style=LOOP plus generic sequences~%"))
