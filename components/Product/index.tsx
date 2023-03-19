import { DetailedHTMLProps, Fragment, HTMLAttributes, useState } from 'react';
// import Image from 'next/image';
import cn from 'classnames';

import styles from './Product.module.css';
import { ProductModel } from '../../interfaces/product.interface';
import { Card, Rating, Tag, Button, Divider, Review, ReviewForm } from '..';
import { ruPrice, declOfNum } from '../../helpers';

interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel;
}

export const Product = ({ product, className }: ProductProps): JSX.Element => {
  const [isReviewOpened, setReviewOpened] = useState(false);

  return (
    <>
      <Card className={cn(className, styles.product)}>
        <div className={styles.logo}>
          <img src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`} alt={product.title} width={70} height={70} />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {ruPrice(product.price)}
          {product.oldPrice ? (
            <Tag className={styles.oldPrice} color="green">
              {ruPrice(product.price - product.oldPrice)}
            </Tag>
          ) : null}
        </div>
        <div className={styles.credit}>
          {ruPrice(product.credit)}/<span className={styles.month}>mo</span>
        </div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((category) => (
            <Tag key={category} className={styles.category} color="ghost">
              {category}
            </Tag>
          ))}
        </div>
        <div className={styles.priceTitle}>price</div>
        <div className={styles.creditTitle}>credit</div>
        <div className={styles.rateTitle}>
          {product.reviewCount} {declOfNum(product.reviewCount, ['review', 'reviews'])}
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.features}>
          {product.characteristics.map((ch) => (
            <div key={ch.name} className={styles.characteristics}>
              <span className={styles.characteristicsName}>{ch.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{ch.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages ? (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Advantages</div>
              <div>{product.advantages}</div>
            </div>
          ) : null}
          {product.disadvantages ? (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Disadvantages</div>
              <div>{product.disadvantages}</div>
            </div>
          ) : null}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance="primary">More</Button>
          <Button
            className={styles.reviewButton}
            appearance="ghost"
            arrow={isReviewOpened ? 'down' : 'right'}
            onClick={() => setReviewOpened(!isReviewOpened)}
          >
            Reviews
          </Button>
        </div>
      </Card>
      <Card
        color="blue"
        className={cn(styles.reviews, {
          [styles.opened]: isReviewOpened,
          [styles.closed]: !isReviewOpened,
        })}
      >
        {product.reviews.map((review) => (
          <Fragment key={review._id}>
            <Review review={review} />
            <Divider />
          </Fragment>
        ))}
        <ReviewForm productId={product._id} />
      </Card>
    </>
  );
};
