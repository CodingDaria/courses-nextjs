import { TextareaHTMLAttributes, DetailedHTMLProps, forwardRef, ForwardedRef } from 'react';
import cn from 'classnames';
import { FieldError } from 'react-hook-form';

import styles from './Textarea.module.css';

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  error?: FieldError;
}

export const Textarea = forwardRef(
  ({ className, error, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <div className={cn(styles.wrapper, className)}>
        <textarea ref={ref} className={cn(styles.textarea, { [styles.error]: error })} {...props} />
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
