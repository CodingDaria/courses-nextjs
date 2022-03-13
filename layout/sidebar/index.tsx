import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Sidebar.module.css';

interface ISidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Sidebar = (props: ISidebarProps) => {
  return <div {...props}>Sidebar</div>;
};
