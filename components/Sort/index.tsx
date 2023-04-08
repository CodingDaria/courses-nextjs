import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Sort.module.css';
import SortIcon from './sort.svg';

interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
}

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sort)} {...props}>
      <button
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating,
        })}
      >
        <SortIcon className={styles.sortIcon} /> By rating
      </button>
      <button
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price,
        })}
      >
        <SortIcon className={styles.sortIcon} /> By price
      </button>
    </div>
  );
};

export enum SortEnum {
  Rating,
  Price,
}
