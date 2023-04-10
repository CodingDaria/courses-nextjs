import { DetailedHTMLProps, ForwardedRef, forwardRef, Fragment, HTMLAttributes, useRef, useState } from 'react';
// import Image from 'next/image';
import cn from 'classnames';
import { motion } from 'framer-motion';

import styles from './Product.module.css';
import { ProductModel } from '../../interfaces/product.interface';
import { Card, Rating, Tag, Button, Divider, Review, ReviewForm } from '..';
import { formatPrice, declOfNum } from '../../helpers';

interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductModel;
}

export const Product = motion(
  forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setReviewOpened] = useState(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReview = () => {
      setReviewOpened(true);
      setTimeout(() => {
        reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        reviewRef.current?.focus();
      }, 50);
    };

    const variants = {
      visible: { opacity: 1, height: 'auto' },
      hidden: { opacity: 0, height: 0 },
    };

    return (
      <div className={className} ref={ref} {...props}>
        <Card className={styles.product}>
          <div className={styles.logo}>
            <img src={`${process.env.NEXT_PUBLIC_DOMAIN}${product.image}`} alt={product.title} width={70} height={70} />
          </div>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>
            <span className="visuallyHidden">price</span>
            {formatPrice(product.price)}
            {product.oldPrice ? (
              <Tag className={styles.oldPrice} color="green">
                <span className="visuallyHidden">discount</span>
                {formatPrice(product.price - product.oldPrice)}
              </Tag>
            ) : null}
          </div>
          <div className={styles.credit}>
            <span className="visuallyHidden">credit</span>
            {formatPrice(product.credit)}/<span className={styles.month}>mo</span>
          </div>
          <div className={styles.rating}>
            <span className="visuallyHidden">{`rating ${product.reviewAvg ?? product.initialRating}`}</span>
            <Rating rating={product.reviewAvg ?? product.initialRating} />
          </div>
          <div className={styles.tags}>
            {product.categories.map((category) => (
              <Tag key={category} className={styles.category} color="ghost">
                {category}
              </Tag>
            ))}
          </div>
          <div className={styles.priceTitle} aria-hidden>
            price
          </div>
          <div className={styles.creditTitle} aria-hidden>
            credit
          </div>
          <div className={styles.rateTitle}>
            <a href="#ref" onClick={scrollToReview}>
              {product.reviewCount} {declOfNum(product.reviewCount, ['review', 'reviews'])}
            </a>
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
              aria-expanded={isReviewOpened}
            >
              Reviews
            </Button>
          </div>
        </Card>
        <motion.div layout variants={variants} initial="hidden" animate={isReviewOpened ? 'visible' : 'hidden'}>
          <Card color="blue" className={styles.reviews} ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}>
            {product.reviews.map((review) => (
              <Fragment key={review._id}>
                <Review review={review} />
                <Divider />
              </Fragment>
            ))}
            <ReviewForm productId={product._id} isOpened={isReviewOpened} />
          </Card>
        </motion.div>
      </div>
    );
  })
);
