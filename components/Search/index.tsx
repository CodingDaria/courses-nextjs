import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import styles from './Search.module.css';
import { Input } from '../Input';
import { Button } from '../Button';
import SearchIcon from './Search.svg';

interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    router.push({ pathname: '/search', query: { q: search } });
  };

  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        placeholder="Search..."
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button appearance="primary" className={styles.button} onClick={handleSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
};
