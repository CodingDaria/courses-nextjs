import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Card.module.css';

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  color: 'white' | 'blue';
}

export const Card = ({ children, color = 'white', className, ...props }: CardProps): JSX.Element => {
  return (
    <div
      className={cn(className, styles.card, {
        [styles.blue]: color === 'blue',
      })}
      {...props}
    >
      {children}
    </div>
  );
};
