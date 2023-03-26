import { TextareaHTMLAttributes, DetailedHTMLProps, forwardRef, ForwardedRef } from 'react';
import cn from 'classnames';

import styles from './Textarea.module.css';

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

export const Textarea = forwardRef(({ className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  return <textarea ref={ref} className={cn(styles.textarea, className)} {...props} />;
});
