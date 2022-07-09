import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Product.module.css';
import { ProductModel } from '../../interfaces/product.interface';
import { Card, Rating, Tag, Button } from '..';

interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel;
}

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
  return (
    <Card className={cn(className, styles.product)} {...props}>
      <div className={styles.logo}>
        <img src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`} alt={product.title} />
      </div>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>{product.price}</div>
      <div className={styles.credit}>{product.credit}</div>
      <div className={styles.rating}>
        <Rating rating={product.reviewAvg ?? product.initialRating} />
      </div>
      <div className={styles.tags}>
        {product.categories.map((category) => (
          <Tag key={category} color="ghost">
            {category}
          </Tag>
        ))}
      </div>
      <div className={styles.priceTitle}>price</div>
      <div className={styles.creditTitle}>credit</div>
      <div className={styles.rateTitle}>{product.reviewCount} reviews</div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.features}>features</div>
      <div className={styles.advantages}>
        <div className={styles.advBlock}>
          <div>Advantages</div>
          <div>{product.advantages}</div>
        </div>
        <div className={styles.disadvantages}>
          <div>Disadvantages</div>
          <div>{product.disadvantages}</div>
        </div>
      </div>
      <div className={styles.hr}>
        <hr />
      </div>
      <div className={styles.actions}>
        <Button appearance="primary">More</Button>
        <Button appearance="ghost" arrow="right">
          Reviews
        </Button>
      </div>
    </Card>
  );
};
