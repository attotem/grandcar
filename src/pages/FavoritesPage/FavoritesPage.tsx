import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { getFavoriteCars, type Car } from '../../services/cars';
import { CarCard } from '../../components/CarCard';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { t } = useTranslation();
  const { isLoading: authLoading, isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadCars = async () => {
      try {
        if (authLoading) return;

        setLoading(true);
        setError(null);

        if (!isLoggedIn) {
          const ok = await login();
          if (!ok) {
            setError(t('cars.favorites.authError'));
            return;
          }
        }

        const result = await getFavoriteCars({ signal: controller.signal });
        setCars(result);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        console.error(err);
        setError(t('cars.favorites.loadError'));
      } finally {
        setLoading(false);
      }
    };

    void loadCars();
    return () => controller.abort();
  }, [authLoading, isLoggedIn, login, t]);

  return (
    <div className={styles.page}>

      <header className={styles.appHeader}>
        <div className={styles.headerTitle}>{t('cars.favorites.title')}</div>
        <div className={styles.headerSub}>{t('cars.favorites.subtitle')}</div>
      </header>

      <div className={styles.content}>
        <main className={styles.main}>
          {loading && (
            <div className={styles.stateBox}>
              <p className={styles.stateText}>{t('cars.favorites.loading')}</p>
            </div>
          )}

          {error && !loading && (
            <div className={styles.errorMessageInline}>{error}</div>
          )}

          {!loading && !error && cars.length === 0 && (
            <div className={styles.stateBox}>
              <div className={styles.stateIcon}>⭐</div>
              <p className={styles.stateText}>{t('cars.favorites.emptyTitle')}</p>
              <p className={styles.stateSub}>{t('cars.favorites.emptyHint')}</p>
            </div>
          )}

          {!loading && !error && cars.length > 0 && (
            <>
              <p className={styles.listMeta}>{t('cars.favorites.savedCount', { count: cars.length })}</p>
              <div className={styles.carsGrid}>
                {cars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    showStatusAndDate={false}
                    onClick={() => navigate(`/cars/${car.id}`)}
                  />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};
