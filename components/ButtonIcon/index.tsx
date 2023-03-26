import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';

import styles from './ButtonIcon.module.css';
import { IconName, icons } from './icons';

interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: IconName;
  appearance: 'primary' | 'white';
}

export const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonIconProps) => {
  const IconComp = icons[icon];

  return (
    <button
      type="button"
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.white]: appearance === 'white',
      })}
      {...props}
    >
      <IconComp />
    </button>
  );
};
