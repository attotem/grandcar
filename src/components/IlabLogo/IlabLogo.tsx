import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './IlabLogo.module.scss';

type Props = {
  onDark?: boolean;
  size?: 'default' | 'lg';
};

export const IlabLogo: FC<Props> = ({ onDark = false, size = 'default' }) => {
  const { t } = useTranslation();
  const rootClass = [
    styles.logo,
    onDark && styles.logoOnDark,
    size === 'lg' && styles.logoLg,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass}>
      <div className={styles.logoBadge}>
        <img src="/grandcar.webp" alt="GrandCar" />
      </div>
      <p className={styles.logoSubtitle}>{t('cars.logo.subtitleFromUsa')}</p>
    </div>
  );
};
