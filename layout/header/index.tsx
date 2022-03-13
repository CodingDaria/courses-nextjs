import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Header.module.css';

interface IHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header = (props: IHeaderProps) => {
  return <div {...props}>Header</div>;
};
