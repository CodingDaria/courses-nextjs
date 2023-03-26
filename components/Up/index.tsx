import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useScrollY } from '../../hooks';

import styles from './Up.module.css';
import { ButtonIcon } from '../ButtonIcon';

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
    <motion.div className={styles.up} initial={{ opacity: 0 }} animate={controls}>
      <ButtonIcon appearance="primary" icon="up" onClick={scrollToTop} />
    </motion.div>
  );
};
