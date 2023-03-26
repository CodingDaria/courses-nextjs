import { FunctionComponent, ReactNode } from 'react';
import { AppContextProvider, IAppContext } from '../context/app.context';

import styles from './Layout.module.css';

import { Sidebar } from './sidebar';
import { Header } from './header';
import { Footer } from './footer';
import { Up } from '../components';

interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout =
  <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) =>
  (props: T) =>
    (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
