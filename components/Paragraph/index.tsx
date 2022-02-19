import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './P.module.css';

interface IParagraphProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children: React.ReactNode;
  size?: 'S' | 'M' | 'L';
}

export const P = ({ children, size = 'M', className, ...props }: IParagraphProps): JSX.Element => {
  return (
    <p
      className={cn(className, {
        [styles.small]: size === 'S',
        [styles.medium]: size === 'M',
        [styles.large]: size === 'L',
      })}
      {...props}
    >
      {children}
    </p>
  );
};
