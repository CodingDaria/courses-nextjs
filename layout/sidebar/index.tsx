import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Sidebar.module.css';
import Menu from '../menu';
import Logo from '../logo.svg';
import { Search } from '../../components';

interface ISidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: ISidebarProps) => {
  return (
    <div {...props} className={cn(className, styles.sidebar)}>
      <Logo className={styles.logo} />
      <Search />
      <Menu />
    </div>
  );
};
