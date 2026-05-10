import styles from './CarCard.module.scss';
import type { FC } from 'react';

export type Car = {
  id: string;
  price: string;
  currency: string;
  make: string;
  model: string;
  mileage_km: number;
  year: number;
  images: string[];
  status: string;
  created_at: string;
  is_favorite: boolean;
};

type Props = {
  car: Car;
  showFavoriteBadge?: boolean;
  showStatusAndDate?: boolean;
  onClick?: () => void;
};

const formatRelativeDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (diffDays <= 0) return 'Сегодня';
  if (diffDays === 1) return 'Вчера';
  if (diffDays < 5) return `${diffDays} дня назад`;
  return `${diffDays} дней назад`;
};

export const CarCard: FC<Props> = ({
  car,
  showFavoriteBadge = true,
  showStatusAndDate = true,
  onClick,
}) => {
  const image = car.images[0];
  const priceNumber = Number(car.price);

  const formattedPrice =
    Number.isFinite(priceNumber) && priceNumber > 0
      ? priceNumber.toLocaleString(undefined, {
          style: 'currency',
          currency: car.currency,
          maximumFractionDigits: 0,
        })
      : `${car.price} ${car.currency}`;

  return (
    <article
      className={styles.card}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className={styles.imageWrap}>
        {image ? (
          <img src={image} alt={`${car.make} ${car.model}`} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>{car.make} {car.model}</span>
          </div>
        )}

        <span className={styles.yearBadge}>{car.year}</span>

        {showFavoriteBadge && car.is_favorite && (
          <span className={styles.favoriteBadge}>★</span>
        )}

        {showStatusAndDate && car.status === 'active' && (
          <span className={styles.statusBadge}>В наличии</span>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.make}>{car.make}</span>
          <span className={styles.model}>{car.model}</span>
        </div>

        <div className={styles.price}>{formattedPrice}</div>

        <div className={styles.meta}>
          <span>{car.year}</span>
          <span className={styles.metaDot} />
          <span>{car.mileage_km.toLocaleString()} км</span>
        </div>

        {showStatusAndDate && (
          <div className={styles.footerRow}>
            <span className={styles.date}>{formatRelativeDate(car.created_at)}</span>
          </div>
        )}
      </div>
    </article>
  );
};
