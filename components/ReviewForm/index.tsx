import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import { Button, Input, Rating, Textarea } from '..';
import { IReviewForm, IReviewResponse } from './ReviewForm.interface';
import { API } from '../../helpers/api';

interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: string;
  isOpened: boolean;
}

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();

  const [isSuccess, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewResponse>(API.review.createDemo, { ...formData, productId });
      if (data?.message) {
        setSuccess(true);
        reset();
      } else {
        setErrorMessage('Something went wrong');
      }
    } catch (err) {
      setErrorMessage((err as { message: string })?.message || '');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(className, styles.reviewForm)} {...props}>
        <Input
          {...register('name', { required: { value: true, message: 'Enter the name' } })}
          error={errors.name}
          placeholder="Name"
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name as undefined}
        />
        <Input
          {...register('title', { required: { value: true, message: 'Enter the title' } })}
          error={errors.title}
          placeholder="Review title"
          className={styles.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title as undefined}
        />
        <div className={styles.rating}>
          <span>Rate:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: 'Enter the rating' } }}
            render={({ field }) => (
              <Rating
                ref={field.ref}
                rating={field.value}
                isEditable
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', { required: { value: true, message: 'Enter the description' } })}
          error={errors.description}
          placeholder="Review text"
          className={styles.description}
          tabIndex={isOpened ? 0 : -1}
          aria-label="Review text"
          aria-invalid={errors.description as undefined}
        />
        <div className={styles.submit}>
          <Button appearance="primary" tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>
            Send
          </Button>
          <span className={styles.info}>* Will be moderated and reviewed before being published.</span>
        </div>
      </div>
      {isSuccess && (
        <div role="alert" className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Review is sent</div>
          <div>Thank you! Your review will be published after moderation.</div>
          <button className={styles.close} onClick={() => setSuccess(false)} aria-label="Close popup">
            <CloseIcon />
          </button>
        </div>
      )}
      {errorMessage && (
        <div role="alert" className={cn(styles.error, styles.panel)}>
          {errorMessage}
          <button className={styles.close} onClick={() => setErrorMessage('')} aria-label="Close popup">
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
