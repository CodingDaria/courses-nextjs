import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import cn from 'classnames';

import styles from './Button.module.css';
import ArrowIcon from './ArrowIcon.svg';

interface IButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  appearance: 'primary' | 'ghost';
  arrow?: 'right' | 'down' | 'none';
}

export const Button = ({
  appearance,
  arrow = 'none',
  children,
  className,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span className={cn(styles.arrow, { [styles.arrow_down]: arrow === 'down' })}>
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
