import { InputHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';

import styles from './Input.module.css';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input = ({ className, ...props }: InputProps) => {
  return <input className={cn(styles.input, className)} {...props} />;
};
