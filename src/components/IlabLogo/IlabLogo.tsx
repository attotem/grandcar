import styles from './IlabLogo.module.scss';

export const IlabLogo = () => (
  <div className={styles.logo}>
    <div className={styles.logoBadge}>
      <img src="/grandcar.webp" alt="GrandCar" />
    </div>
    <div className={styles.logoText}>
      <span className={styles.logoMain}>GrandCar</span>
      <span className={styles.logoSecondary}>Подержанные авто</span>
    </div>
  </div>
);
