import { DetailedHTMLProps, HTMLAttributes } from 'react';

import styles from './Sidebar.module.css';
import Menu from '../menu';
import Logo from '../logo.svg';
import cn from 'classnames';

interface ISidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: ISidebarProps) => {
  return (
    <div {...props} className={cn(className, styles.sidebar)}>
      <Logo className={styles.logo} />
      <div>Search</div>
      <Menu />
    </div>
  );
};
