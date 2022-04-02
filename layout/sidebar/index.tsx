import { DetailedHTMLProps, HTMLAttributes } from 'react';

// import styles from './Sidebar.module.css';
import Menu from '../menu';

interface ISidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = (props: ISidebarProps) => {
  return <div {...props}>Sidebar <Menu /></div>;
};
