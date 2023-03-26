import { InputHTMLAttributes, DetailedHTMLProps, forwardRef, ForwardedRef } from 'react';
import cn from 'classnames';
import { FieldError } from 'react-hook-form';

import styles from './Input.module.css';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: FieldError;
}

export const Input = forwardRef(({ className, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <input ref={ref} className={cn(styles.input, { [styles.error]: error })} {...props} />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
