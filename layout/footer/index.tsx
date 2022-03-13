import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Footer.module.css';

interface IFooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Footer = (props: IFooterProps) => {
  return <div {...props}>Footer</div>;
};
