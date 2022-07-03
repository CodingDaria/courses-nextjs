import styles from './Advantages.module.css';
import { Advantage } from '../../interfaces/page.interface';
import CheckIcon from './Advantage.svg';

interface AdvantagesProps {
  advantages: Advantage[];
}

export const Advantages = ({ advantages }: AdvantagesProps) => {
  return (
    <>
      {advantages.map((advantage) => {
        return (
          <div key={advantage._id} className={styles.advantage}>
            <CheckIcon />
            <div className={styles.title}>
              {advantage.title}
            </div>
            <hr className={styles.vline} />
            <div>{advantage.description}</div>
          </div>
        );
      })}
    </>
  );
};
