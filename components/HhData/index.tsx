import styles from './HhData.module.css';
import { HhData } from '../../interfaces/page.interface';
import { Card } from '..';
import { ruPrice } from '../../helpers';
import RateIcon from './rate.svg';

interface HhDataProps extends HhData {}

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps) => {
  return (
    <div className={styles.hh}>
      <Card color="blue" className={styles.card}>
        <div className={styles.title}>Total vacancies</div>
        <div className={styles.count}>{count}</div>
      </Card>
      <Card color="blue" className={styles.salary}>
        <div>
          <div className={styles.title}>Beginner</div>
          <div className={styles.salaryValue}>{ruPrice(juniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Middle</div>
          <div className={styles.salaryValue}>{ruPrice(middleSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon />
          </div>
        </div>
        <div>
          <div className={styles.title}>Senior</div>
          <div className={styles.salaryValue}>{ruPrice(seniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
            <RateIcon className={styles.filled} />
          </div>
        </div>
      </Card>
    </div>
  );
};
