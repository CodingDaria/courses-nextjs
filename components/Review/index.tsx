import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

import styles from './Review.module.css';
import UserIcon from './user.svg';
import { ProductReview } from '../../interfaces/product.interface';
import { Rating } from '../Rating';

interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: ProductReview;
}

export const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {
  const { name, title, description, createdAt, rating } = review;

  return (
    <div className={cn(className, styles.review)} {...props}>
      <UserIcon className={styles.user} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', { locale: uk })}
      </div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
};
