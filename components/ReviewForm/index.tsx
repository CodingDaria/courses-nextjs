import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';

import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import { Button, Input, Rating, Textarea } from '..';
import { IReviewForm } from './ReviewForm.interface';

interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: string;
}

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit } = useForm<IReviewForm>();

  const onSubmit = (data: IReviewForm) => {
    console.log('== data', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(className, styles.reviewForm)} {...props}>
        <Input {...register('name')} placeholder="Name" />
        <Input {...register('title')} placeholder="Review title" className={styles.title} />
        <div className={styles.rating}>
          <span>Rate:</span>
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <Rating ref={field.ref} rating={field.value} isEditable setRating={field.onChange} />
            )}
          />
        </div>
        <Textarea {...register('description')} placeholder="Review text" className={styles.description} />
        <div className={styles.submit}>
          <Button appearance="primary">Send</Button>
          <span className={styles.info}>* Will be moderated and reviewed before being published.</span>
        </div>
      </div>
      <div className={styles.success}>
        <div className={styles.successTitle}>Review is sent</div>
        <div>Thank you! Your review will be published after moderation.</div>
        <CloseIcon className={styles.close} />
      </div>
    </form>
  );
};
