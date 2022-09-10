import { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './Divider.module.css';

interface IParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {}

export const Divider = ({ className, ...props }: IParagraphProps): JSX.Element => {
  return <hr className={cn(className, styles.hr)} {...props} />;
};
