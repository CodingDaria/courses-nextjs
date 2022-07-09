import { TextareaHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';

import styles from './Textarea.module.css';

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return <textarea className={cn(styles.textarea, className)} {...props} />;
};
