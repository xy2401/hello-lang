(defclass account ()
  ((name :initarg :name :reader account-name)
   (balance :initarg :balance :accessor account-balance)))

(define-condition missing-value (error)
  ((key :initarg :key :reader missing-key)))

(defun lookup-balance (key)
  (restart-case
      (error 'missing-value :key key)
    (use-default (value) value)))

(let ((account (make-instance 'account :name "Ada" :balance 42)))
  (format t "clos=~A:~D~%" (account-name account) (account-balance account)))

(handler-bind ((missing-value
                 (lambda (condition)
                   (declare (ignore condition))
                   (invoke-restart 'use-default 7))))
  (format t "restart=~D~%" (lookup-balance :unknown)))

(format t "package=~A~%" (package-name *package*))

