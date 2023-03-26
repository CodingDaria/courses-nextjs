import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Card.module.css';

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  color?: 'white' | 'blue';
}

export const Card = forwardRef(
  ({ children, color = 'white', className, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
      <div
        className={cn(className, styles.card, {
          [styles.blue]: color === 'blue',
        })}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
