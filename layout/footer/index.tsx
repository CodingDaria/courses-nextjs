import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Footer.module.css';

interface IFooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer = ({ className, ...props}: IFooterProps) => {
  return (
    <footer {...props} className={cn(className, styles.wrapper)}>
      <p className={styles.year}>OwlTop © 2020 - {new Date().getFullYear()} All rights reserved</p>
      <p className={styles.terms}>Customer terms</p>
      <p className={styles.privacy}>Privacy policy</p>
    </footer>
  );
};
