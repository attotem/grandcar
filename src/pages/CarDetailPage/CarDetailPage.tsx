import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Back from '../../components/Back';
import { getCar, type Car } from '../../services/cars';
import { recordViewedCar } from '../../services/viewedHistory';
import { CarCard } from '../../components/CarCard';
import styles from './CarDetailPage.module.scss';

const MANAGER_USERNAME = 'dmytro_obka';

const buildManagerLink = (car: Car | null): string => {
  const base = `https://t.me/${MANAGER_USERNAME}`;
  if (!car) return base;
  const text = `Здравствуйте! Меня интересует ${car.make} ${car.model} ${car.year} (id: ${car.id}).`;
  return `${base}?text=${encodeURIComponent(text)}`;
};

export const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading: authLoading, isLoggedIn, login } = useAuth();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Машина не найдена.');
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
            setError('Не удалось авторизоваться через Telegram. Откройте приложение из Telegram.');
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
        setError('Не удалось загрузить данные машины. Попробуйте еще раз.');
      } finally {
        setLoading(false);
      }
    };

    void loadCar();

    return () => {
      controller.abort();
    };
  }, [id, authLoading, isLoggedIn, login]);

  const handleContactManager = useCallback(() => {
    const url = buildManagerLink(car);
    // Inside Telegram WebApp open the link via the native API so the
    // user lands directly in the chat without leaving the mini-app.
    const tg = window.Telegram?.WebApp;
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(url);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [car]);

  return (
    <div className={styles.page}>
      <Back />

      <main className={styles.main}>
        {loading && <div className={styles.stateText}>Загружаем данные машины...</div>}

        {error && !loading && (
          <div className={styles.errorMessageInline}>{error}</div>
        )}

        {!loading && !error && car && (
          <>
            <CarCard car={car} />

            <section className={styles.extraInfo}>
              <div className={styles.row}>
                <span className={styles.label}>Марка</span>
                <span className={styles.value}>{car.make}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Модель</span>
                <span className={styles.value}>{car.model}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Год</span>
                <span className={styles.value}>{car.year}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Пробег</span>
                <span className={styles.value}>
                  {car.mileage_km.toLocaleString()} км
                </span>
              </div>
            </section>

            <button
              type="button"
              className={styles.contactButton}
              onClick={handleContactManager}
            >
              <i className="lni lni-telegram-original" />
              <span>Связаться с менеджером</span>
            </button>
          </>
        )}
      </main>
    </div>
  );
};

