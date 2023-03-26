import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useScrollY } from '../../hooks';

import styles from './Up.module.css';
import UpIcon from './Up.svg';

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const scrollY = useScrollY();

  useEffect(() => {
    controls.start({ opacity: scrollY / document.body.scrollHeight });
  }, [scrollY, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      type="button"
      className={styles.up}
      onClick={scrollToTop}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      <UpIcon />
    </motion.button>
  );
};
