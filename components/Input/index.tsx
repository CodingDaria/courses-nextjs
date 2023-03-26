import { InputHTMLAttributes, DetailedHTMLProps, forwardRef, ForwardedRef } from 'react';
import cn from 'classnames';

import styles from './Input.module.css';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input = forwardRef(({ className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return <input ref={ref} className={cn(styles.input, className)} {...props} />;
});
