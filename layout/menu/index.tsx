import { KeyboardEvent, useContext, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';

import { firstLevelMenu } from '../../helpers';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';

const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'expanded' | undefined>();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: '20px',
      transition: shouldReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1,
          },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: { opacity: 1, height: 'auto' },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            setAnnounce(m.isOpened ? 'closed' : 'expanded');
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      <>
        {pages.map((page) => (
          <motion.li key={page._id} variants={variantsChildren}>
            <Link href={`/${route}/${page.alias}`}>
              <a
                tabIndex={isOpened ? 0 : -1}
                className={cn(styles.thirdLevel, {
                  [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath,
                })}
                aria-current={`/${route}/${page.alias}` === router.asPath ? 'page' : false}
              >
                {page.category}
              </a>
            </Link>
          </motion.li>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu?.map((item) => {
          if (item.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
            item.isOpened = true;
          }
          return (
            <li key={item._id.secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={() => openSecondLevel(item._id.secondCategory)}
                onKeyDown={(key) => openSecondLevelKey(key, item._id.secondCategory)}
                aria-expanded={item.isOpened}
              >
                {item._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={item.isOpened ? 'visible' : 'hidden'}
                animate={item.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(item.pages, menuItem.route, item.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map((m) => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`}>
              <a>
                <div className={cn(styles.firstLevel, { [styles.firstLevelActive]: m.id === firstCategory })}>
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
        <span role="log" className="visuallyHidden">
          {announce}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};

export default Menu;
