import { useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import styles from './Menu.module.css';

const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Courses', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
  { route: 'services', name: 'Services', icon: <ServicesIcon />, id: TopLevelCategory.Services },
  { route: 'books', name: 'Books', icon: <BooksIcon />, id: TopLevelCategory.Books },
  { route: 'products', name: 'Products', icon: <ProductsIcon />, id: TopLevelCategory.Products },
];

const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map((m) => {
      if (m._id.secondCategory === secondCategory) {
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  }

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <>
        {pages.map((page) => (
          <Link href={`/${route}/${page.alias}`}>
            <a
              className={cn(styles.thirdLevel, {
                [styles.thirdLevelActive]: `/${route}/${page.alias}` === router.asPath,
              })}
            >
              {page.category}
            </a>
          </Link>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((item) => {
          if (item.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
            item.isOpened = true;
          }
          return (
            <div key={item._id.secondCategory}>
              <div className={styles.secondLevel} onClick={() => openSecondLevel(item._id.secondCategory)}>{item._id.secondCategory}</div>
              <div
                className={cn(styles.secondLevelBlock, {
                  [styles.secondLevelBlockOpened]: item.isOpened,
                })}
              >
                {buildThirdLevel(item.pages, menuItem.route)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <a>
                <div className={cn(styles.firstLevel, { [styles.firstLevelActive]: m.id === firstCategory })}>
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};

export default Menu;
