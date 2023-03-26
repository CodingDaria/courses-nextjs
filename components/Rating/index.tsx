import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, KeyboardEvent, useState } from 'react';
import cn from 'classnames';
import { FieldError } from 'react-hook-form';

import styles from './Rating.module.css';
import StarIcon from './Star.svg';

interface IRatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  error?: FieldError;
}

export const Rating = forwardRef(
  (
    { isEditable = false, rating, setRating, error, ...props }: IRatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [currentHoverRating, setCurrentHoverRating] = useState(rating);

    const ratingArray = new Array(5).fill(null);

    const changeRatingDisplay = (n: number) => {
      if (!isEditable) return;
      setCurrentHoverRating(n);
    };

    const changeRating = (n: number) => {
      if (!isEditable || !setRating) return;
      setRating(n);
      setCurrentHoverRating(n);
    };

    return (
      <div
        {...props}
        className={cn(styles.wrapper, { [styles.error]: error })}
        ref={ref}
        onMouseLeave={() => changeRatingDisplay(rating)}
      >
        {ratingArray.map((_, index: number) => {
          return (
            <StarIcon
              key={index}
              className={cn(styles.star, {
                [styles.filled]: index < currentHoverRating,
                [styles.editable]: isEditable,
              })}
              onMouseEnter={() => changeRatingDisplay(index + 1)}
              onClick={() => changeRating(index + 1)}
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGAElement>) => {
                if (e.code === 'Space' && isEditable) changeRating(index + 1);
              }}
            />
          );
        })}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
