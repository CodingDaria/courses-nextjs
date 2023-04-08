import { FunctionComponent, KeyboardEvent, ReactNode, useRef } from 'react';
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
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <a href="" className={styles.skipLink} tabIndex={1} onKeyDown={skipAction}>
        Go to content
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role="main">
        {children}
      </main>
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
