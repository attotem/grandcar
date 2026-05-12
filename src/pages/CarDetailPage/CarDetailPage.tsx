import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Back from '../../components/Back';
import { getCar, type Car } from '../../services/cars';
import { recordViewedCar } from '../../services/viewedHistory';
import { CarCard } from '../../components/CarCard';
import styles from './CarDetailPage.module.scss';

const MANAGER_USERNAME = 'dmytro_obka';

export const CarDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { isLoading: authLoading, isLoggedIn, login } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const buildManagerLink = useCallback(
    (c: Car | null): string => {
      const base = `https://t.me/${MANAGER_USERNAME}`;
      if (!c) return base;
      const text = t('cars.carDetail.telegramMessage', {
        make: c.make,
        model: c.model,
        year: c.year,
        id: c.id,
      });
      return `${base}?text=${encodeURIComponent(text)}`;
    },
    [t],
  );

  const numLocale =
    i18n.language.startsWith('uk') ? 'uk-UA' : i18n.language.startsWith('ru') ? 'ru-RU' : 'en-US';

  useEffect(() => {
    if (!id) {
      setError(t('cars.carDetail.notFound'));
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadCar = async () => {
      try {
        if (authLoading) return;

        setLoading(true);
        setError(null);

        if (!isLoggedIn) {
          const ok = await login();
          if (!ok) {
            setError(t('cars.carDetail.authError'));
            return;
          }
        }

        const data = await getCar(id, { signal: controller.signal });
        setCar(data);
        recordViewedCar(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.error(err);
        setError(t('cars.carDetail.loadError'));
      } finally {
        setLoading(false);
      }
    };

    void loadCar();

    return () => {
      controller.abort();
    };
  }, [id, authLoading, isLoggedIn, login, t]);

  const handleContactManager = useCallback(() => {
    const url = buildManagerLink(car);
    const tg = window.Telegram?.WebApp;
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(url);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [car, buildManagerLink]);

  return (
    <div className={styles.page}>
      <Back />

      <main className={styles.main}>
        {loading && <div className={styles.stateText}>{t('cars.carDetail.loading')}</div>}

        {error && !loading && (
          <div className={styles.errorMessageInline}>{error}</div>
        )}

        {!loading && !error && car && (
          <>
            <CarCard car={car} />

            <section className={styles.extraInfo}>
              <div className={styles.row}>
                <span className={styles.label}>{t('cars.carDetail.make')}</span>
                <span className={styles.value}>{car.make}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>{t('cars.carDetail.model')}</span>
                <span className={styles.value}>{car.model}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>{t('cars.carDetail.year')}</span>
                <span className={styles.value}>{car.year}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>{t('cars.carDetail.mileage')}</span>
                <span className={styles.value}>
                  {car.mileage_km.toLocaleString(numLocale)} {t('cars.carDetail.mileageUnit')}
                </span>
              </div>
            </section>

            <button
              type="button"
              className={styles.contactButton}
              onClick={handleContactManager}
            >
              <i className="lni lni-telegram-original" />
              <span>{t('cars.carDetail.contactManager')}</span>
            </button>
          </>
        )}
      </main>
    </div>
  );
};
