import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  clearViewedHistory,
  getViewedCars,
  removeViewedCar,
  type ViewedCar,
} from '../../../services/viewedHistory';
import styles from './ProfilePage.module.scss';

const MANAGER_USERNAME = 'dmytro_obka';
const MANAGER_LINK = `https://t.me/${MANAGER_USERNAME}`;

const formatRelativeTime = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1) return 'только что';
  if (minutes < 60) return `${minutes} мин назад`;
  if (hours < 24) return `${hours} ч назад`;
  if (days === 1) return 'вчера';
  if (days < 7) return `${days} дн назад`;
  return new Date(timestamp).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatPrice = (price: string, currency: string): string => {
  const value = Number(price);
  if (Number.isFinite(value) && value > 0) {
    try {
      return value.toLocaleString('ru-RU', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      });
    } catch {
      return `${value.toLocaleString('ru-RU')} ${currency}`;
    }
  }
  return `${price} ${currency}`;
};

const getTelegramUser = () => {
  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (!user) return null;
  return {
    name: [user.first_name, user.last_name].filter(Boolean).join(' ') || 'Пользователь',
    username: user.username,
    photo: user.photo_url,
    id: user.id,
  };
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const tgUser = useMemo(getTelegramUser, []);
  const [history, setHistory] = useState<ViewedCar[]>([]);

  useEffect(() => {
    setHistory(getViewedCars());
  }, []);

  const handleContactManager = useCallback(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(MANAGER_LINK);
      return;
    }
    window.open(MANAGER_LINK, '_blank', 'noopener,noreferrer');
  }, []);

  const handleClearHistory = useCallback(() => {
    if (history.length === 0) return;
    if (!confirm('Очистить историю просмотров?')) return;
    clearViewedHistory();
    setHistory([]);
  }, [history.length]);

  const handleRemoveItem = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeViewedCar(id);
    setHistory((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleOpenCar = useCallback((id: string) => {
    navigate(`/cars/${id}`);
  }, [navigate]);

  return (
    <div className={styles.page}>
      {/* ── User card ── */}
      <section className={styles.userCard}>
        <div className={styles.avatar}>
          {tgUser?.photo ? (
            <img src={tgUser.photo} alt={tgUser.name} />
          ) : (
            <i className="lni lni-user-4" />
          )}
        </div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{tgUser?.name ?? 'Гость'}</h2>
          {tgUser?.username && (
            <p className={styles.userMeta}>@{tgUser.username}</p>
          )}
          {!tgUser?.username && tgUser?.id && (
            <p className={styles.userMeta}>ID {tgUser.id}</p>
          )}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={styles.stats}>
        <div className={styles.statBox}>
          <div className={styles.statValue}>{history.length}</div>
          <div className={styles.statLabel}>Просмотрено</div>
        </div>
        <div
          className={styles.statBox}
          onClick={() => navigate('/favorites')}
          role="button"
        >
          <div className={styles.statValue}>
            <i className="lni lni-star-fat" />
          </div>
          <div className={styles.statLabel}>Избранное</div>
        </div>
        <div
          className={styles.statBox}
          onClick={() => navigate('/')}
          role="button"
        >
          <div className={styles.statValue}>
            <i className="lni lni-car-2" />
          </div>
          <div className={styles.statLabel}>Каталог</div>
        </div>
      </section>

      {/* ── Viewed history ── */}
      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>История просмотров</h3>
          {history.length > 0 && (
            <button
              type="button"
              className={styles.linkBtn}
              onClick={handleClearHistory}
            >
              Очистить
            </button>
          )}
        </header>

        {history.length === 0 ? (
          <div className={styles.emptyBox}>
            <i className="lni lni-eye" />
            <p className={styles.emptyTitle}>Пока ничего не смотрели</p>
            <p className={styles.emptySub}>
              Просмотренные авто будут появляться здесь автоматически
            </p>
            <button
              type="button"
              className={styles.primaryGhost}
              onClick={() => navigate('/')}
            >
              К каталогу
            </button>
          </div>
        ) : (
          <ul className={styles.historyList}>
            {history.map((car) => (
              <li key={car.id}>
                <button
                  type="button"
                  className={styles.historyItem}
                  onClick={() => handleOpenCar(car.id)}
                >
                  <div className={styles.historyThumb}>
                    {car.image ? (
                      <img src={car.image} alt={`${car.make} ${car.model}`} />
                    ) : (
                      <i className="lni lni-car-2" />
                    )}
                  </div>
                  <div className={styles.historyBody}>
                    <div className={styles.historyTitle}>
                      <span className={styles.historyMake}>{car.make}</span>{' '}
                      <span className={styles.historyModel}>{car.model}</span>
                    </div>
                    <div className={styles.historyMeta}>
                      <span>{car.year}</span>
                      <span className={styles.dot} />
                      <span>{car.mileage_km.toLocaleString('ru-RU')} км</span>
                    </div>
                    <div className={styles.historyPrice}>
                      {formatPrice(car.price, car.currency)}
                    </div>
                  </div>
                  <div className={styles.historyAside}>
                    <span className={styles.historyTime}>
                      {formatRelativeTime(car.viewedAt)}
                    </span>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={(e) => handleRemoveItem(e, car.id)}
                      aria-label="Удалить из истории"
                    >
                      <i className="lni lni-close" />
                    </button>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── Contact manager ── */}
      <button
        type="button"
        className={styles.contactButton}
        onClick={handleContactManager}
      >
        <i className="lni lni-telegram-original" />
        <span>Связаться с менеджером</span>
      </button>

      <p className={styles.version}>GrandCar · v1.0</p>
    </div>
  );
};
