import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Tag.module.css';

interface ITagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  size?: 'S' | 'M';
  color?: 'ghost' | 'red' | 'light' | 'green' | 'primary';
  href?: string;
}

export const Tag = ({
  children,
  size = 'M',
  color = 'ghost',
  className,
  href,
  ...props
}: ITagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.small]: size === 'S',
        [styles.medium]: size === 'M',
        [styles.ghost]: color === 'ghost',
        [styles.red]: color === 'red',
        [styles.light]: color === 'light',
        [styles.green]: color === 'green',
        [styles.primary]: color === 'primary',
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
