import styles from './CarCard.module.scss';
import type { FC } from 'react';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import {
  formatListingPriceUsd,
  formatMarketAvgUsd,
  formatUsdInteger,
  getListingUsdNumber,
  parseMarketUsdNumber,
} from '../../utils/formatMoney';

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
  market_avg_price_usd?: string;
};

type Props = {
  car: Car;
  showFavoriteBadge?: boolean;
  showStatusAndDate?: boolean;
  onClick?: () => void;
};

const formatRelativeDate = (iso: string, t: TFunction): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (diffDays <= 0) return t('cars.carCard.today');
  if (diffDays === 1) return t('cars.carCard.yesterday');
  if (diffDays >= 2 && diffDays < 5) return t('cars.carCard.daysAgo234', { count: diffDays });
  return t('cars.carCard.daysAgoN', { count: diffDays });
};

export const CarCard: FC<Props> = ({
  car,
  showFavoriteBadge = true,
  showStatusAndDate = true,
  onClick,
}) => {
  const { t, i18n } = useTranslation();
  const image = car.images[0];
  const listingFormatted = formatListingPriceUsd(car.price, car.currency);
  const listingUsd = getListingUsdNumber(car.price, car.currency);
  const marketUsd = parseMarketUsdNumber(car.market_avg_price_usd);
  const marketFormatted = formatMarketAvgUsd(car.market_avg_price_usd);

  const savingsUsd =
    listingUsd != null && marketUsd != null && marketUsd > listingUsd
      ? marketUsd - listingUsd
      : null;
  const showStrikeVsMarket = savingsUsd != null && savingsUsd > 0;

  const mileageUnit = t('cars.carCard.mileageUnit');
  const numLocale =
    i18n.language.startsWith('uk') ? 'uk-UA' : i18n.language.startsWith('ru') ? 'ru-RU' : 'en-US';

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
          <span className={styles.statusBadge}>{t('cars.carCard.inStock')}</span>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.make}>{car.make}</span>
          <span className={styles.model}>{car.model}</span>
        </div>

        {showStrikeVsMarket && marketFormatted ? (
          <div className={styles.priceCompare}>
            <div className={styles.priceCompareRow}>
              <span className={styles.priceCurrent}>{listingFormatted}</span>
              <span
                className={styles.priceOriginal}
                title={t('cars.carCard.marketTitle')}
              >
                <span className={styles.priceOriginalLabel}>{t('cars.carCard.marketLabel')}</span>
                <span className={styles.priceOriginalAmount}>{marketFormatted}</span>
              </span>
            </div>
            <p className={styles.priceSavings}>
              {t('cars.carCard.savingsPrefix')}{' '}
              <strong>{formatUsdInteger(savingsUsd)}</strong>{' '}
              {t('cars.carCard.savingsSuffix')}
            </p>
          </div>
        ) : (
          <>
            <div className={styles.price}>{listingFormatted}</div>
            {marketFormatted && (
              <p className={styles.marketNote}>
                {t('cars.carCard.marketNote', { price: marketFormatted })}
              </p>
            )}
          </>
        )}

        <div className={styles.meta}>
          <span>{car.year}</span>
          <span className={styles.metaDot} />
          <span>
            {car.mileage_km.toLocaleString(numLocale)} {mileageUnit}
          </span>
        </div>

        {showStatusAndDate && (
          <div className={styles.footerRow}>
            <span className={styles.date}>{formatRelativeDate(car.created_at, t)}</span>
          </div>
        )}
      </div>
    </article>
  );
};
