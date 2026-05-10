import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCars, getFilters, type Car, type CarFilters, type FilterOptions } from '../../services/cars';
import { CarCard } from '../../components/CarCard';
import { FilterPanel } from '../../components/FilterPanel';
import styles from './WelcomePage.module.scss';

const EMPTY_FILTERS: CarFilters = { make: '', model: '', year_min: '', year_max: '' };

const SkeletonCard = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonImage} />
    <div className={styles.skeletonInfo}>
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLine} />
    </div>
  </div>
);

export const WelcomePage = () => {
  const { isLoading: authLoading, isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [draftFilters, setDraftFilters] = useState<CarFilters>(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<CarFilters>(EMPTY_FILTERS);

  const activeFilterCount = Object.values(appliedFilters).filter(Boolean).length;

  const loadCars = useCallback(async (filters: CarFilters, signal: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const result = await getCars(filters, { signal });
      setCars(result);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      console.error(err);
      setError('Не удалось загрузить список машин. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const init = async () => {
      if (authLoading) return;

      if (!isLoggedIn) {
        const ok = await login();
        if (!ok) {
          setError('Не удалось авторизоваться через Telegram.');
          setLoading(false);
          return;
        }
      }

      await loadCars(appliedFilters, controller.signal);

      try {
        const options = await getFilters({ signal: controller.signal });
        setFilterOptions(options);
      } catch {
        // filters optional
      }
    };

    void init();
    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, isLoggedIn, login]);

  const handleApply = (filters: CarFilters) => {
    setAppliedFilters(filters);
    const controller = new AbortController();
    loadCars(filters, controller.signal);
  };

  const handleOpenFilter = () => {
    setDraftFilters(appliedFilters);
    setFilterOpen(true);
  };

  return (
    <div className={styles.page}>

      {/* ── App header ── */}
      <header className={styles.appHeader}>
        <img
          src="/grandcar.webp"
          alt="GrandCar"
          className={styles.logo}
        />

        <button
          className={`${styles.filterBtn} ${activeFilterCount > 0 ? styles.filterBtnActive : ''}`}
          onClick={handleOpenFilter}
          aria-label="Фильтры"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
            <line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          <span className={styles.filterBtnLabel}>
            {activeFilterCount > 0 ? `Фильтр (${activeFilterCount})` : 'Фильтр'}
          </span>
        </button>
      </header>

      {/* ── Content ── */}
      <div className={styles.content}>
        <main className={styles.main}>

          {loading && (
            <div className={styles.skeletonGrid}>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {error && !loading && (
            <div className={styles.errorMessageInline}>{error}</div>
          )}

          {!loading && !error && cars.length === 0 && (
            <div className={styles.stateBox}>
              <div className={styles.stateIcon}>🚗</div>
              <p className={styles.stateText}>Машины не найдены</p>
              <p className={styles.stateSub}>Попробуйте изменить фильтры</p>
            </div>
          )}

          {!loading && !error && cars.length > 0 && (
            <>
              <p className={styles.listMeta}>{cars.length} объявлений</p>
              <div className={styles.carsGrid}>
                {cars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onClick={() => navigate(`/cars/${car.id}`)}
                  />
                ))}
              </div>
            </>
          )}

        </main>
      </div>

      <FilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApply}
        filters={draftFilters}
        onChange={setDraftFilters}
        options={filterOptions}
      />
    </div>
  );
};
