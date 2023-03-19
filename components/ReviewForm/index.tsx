import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './ReviewForm.module.css';
import CloseIcon from './close.svg';
import { Button, Input, Rating, Textarea } from '..';

interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: string;
}

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  return (
    <>
      <div className={cn(className, styles.reviewForm)} {...props}>
        <Input placeholder="Name" />
        <Input placeholder="Review title" className={styles.title} />
        <div className={styles.rating}>
          <span>Rate:</span>
          <Rating rating={0} isEditable />
        </div>
        <Textarea placeholder="Review text" className={styles.description} />
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
    </>
  );
};
