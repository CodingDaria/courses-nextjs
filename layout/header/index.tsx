import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';

import styles from './Header.module.css';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Sidebar } from '../sidebar';

interface IHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Header = ({ className, ...props }: IHeaderProps) => {
  const [isOpened, setOpened] = useState(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: '100%',
    },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon appearance="white" icon="menu" onClick={() => setOpened(true)} />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={isOpened ? 'opened' : 'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar />
        <ButtonIcon className={styles.menuClose} appearance="white" icon="close" onClick={() => setOpened(false)} />
      </motion.div>
    </header>
  );
};
