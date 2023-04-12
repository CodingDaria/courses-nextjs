import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes, KeyboardEvent, useRef, useState } from 'react';
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
    { isEditable = false, rating, setRating, error, tabIndex, ...props }: IRatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [currentHoverRating, setCurrentHoverRating] = useState(rating);

    const ratingArrayRef = useRef<(SVGAElement | null)[]>([]);

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

    const handleKeyDown = (e: KeyboardEvent<SVGAElement>, index: number) => {
      if (!isEditable || !setRating) return;

      if ((e.code === 'ArrowRight' || e.code === 'ArrowUp') && rating < 5) {
        e.preventDefault();
        changeRating(!rating ? 1 : rating + 1);
        setTimeout(() => {
          ratingArrayRef.current?.[rating]?.focus();
        }, 40);
      }
      if ((e.code === 'ArrowLeft' || e.code === 'ArrowDown') && rating >= 0) {
        e.preventDefault();
        changeRating(rating <= 1 ? 1 : rating - 1);
        setTimeout(() => {
          ratingArrayRef.current?.[rating - 2]?.focus();
        }, 40);
      }
      if (e.code === 'Space') {
        changeRating(index + 1);
      }
    };

    const getTabIndex = (r: number, index: number) => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && !index) {
        return tabIndex ?? 0;
      }
      if (r === index + 1) {
        return tabIndex ?? 0;
      }
      return -1;
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
              ref={(r) => ratingArrayRef.current && (ratingArrayRef.current[index] = r)}
              className={cn(styles.star, {
                [styles.filled]: index < currentHoverRating,
                [styles.editable]: isEditable,
              })}
              onMouseEnter={() => changeRatingDisplay(index + 1)}
              onClick={() => changeRating(index + 1)}
              tabIndex={getTabIndex(rating, index)}
              onKeyDown={(e: KeyboardEvent<SVGAElement>) => handleKeyDown(e, index)}
              role={isEditable ? 'slider' : ''}
              aria-valuenow={rating}
              aria-valuemax={5}
              aria-valuemin={1}
              aria-label={isEditable ? 'Indicate rating' : `rating is ${rating}`}
              aria-invalid={error as undefined}
            />
          );
        })}
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
