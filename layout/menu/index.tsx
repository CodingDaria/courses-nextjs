import { useContext } from 'react';
import cn from 'classnames';

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

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return (
      <>
        {pages.map((page) => (
          <a
            href={`/${route}/${page.alias}`}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: false,
            })}
          >
            {page.category}
          </a>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((item) => (
          <div key={item._id.secondCategory}>
            <div className={styles.secondLevel}>{item._id.secondCategory}</div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: item.isOpened,
              })}
            >
              {buildThirdLevel(item.pages, menuItem.route)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
            <a href={`/${m.route}`}>
              <div className={cn(styles.firstLevel, { [styles.firstLevelActive]: m.id === firstCategory })}>
                {m.icon}
                <span>{m.name}</span>
              </div>
            </a>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};

export default Menu;
