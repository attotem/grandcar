import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './RecoveryPage.module.scss';

const categories = ['all', 'massage', 'spa', 'sauna', 'pool'] as const;

const procedures = [
  { id: 1, nameKey: 'recovery.procedures.relaxMassage', duration: 60, price: 1500, category: 'massage', available: true },
  { id: 2, nameKey: 'recovery.procedures.sportsMassage', duration: 45, price: 1200, category: 'massage', available: true },
  { id: 3, nameKey: 'recovery.procedures.spaDetox', duration: 90, price: 2500, category: 'spa', available: true },
  { id: 4, nameKey: 'recovery.procedures.finnishSauna', duration: 60, price: 800, category: 'sauna', available: true },
  { id: 5, nameKey: 'recovery.procedures.hammam', duration: 45, price: 700, category: 'sauna', available: false },
  { id: 6, nameKey: 'recovery.procedures.pool', duration: 60, price: 500, category: 'pool', available: true },
  { id: 7, nameKey: 'recovery.procedures.jacuzzi', duration: 30, price: 600, category: 'pool', available: true },
  { id: 8, nameKey: 'recovery.procedures.antiCelluliteMassage', duration: 60, price: 1800, category: 'massage', available: true },
];

export const RecoveryPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('all');
  const [_selectedProcedure, setSelectedProcedure] = useState<number | null>(null);

  const filteredProcedures = procedures.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  const handleBook = (id: number) => {
    setSelectedProcedure(id);
    // TODO: Open booking modal
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('recovery.title')}</h1>
      </header>

      {/* Categories */}
      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {t(`recovery.categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Procedures List */}
      <div className={styles.proceduresList}>
        {filteredProcedures.map((procedure) => (
          <div
            key={procedure.id}
            className={`${styles.procedureCard} ${!procedure.available ? styles.unavailable : ''}`}
          >
            <div className={styles.procedureInfo}>
              <h3 className={styles.procedureName}>{t(procedure.nameKey)}</h3>
              <div className={styles.procedureMeta}>
                <span className={styles.duration}>
                  <i className="lni lni-alarm-1" /> {procedure.duration} {t('recovery.minutes')}
                </span>
                <span className={styles.category}>{t(`recovery.categories.${procedure.category}`)}</span>
              </div>
            </div>
            <div className={styles.procedureAction}>
              <span className={styles.price}>{procedure.price} ₴</span>
              <button
                className={styles.bookBtn}
                disabled={!procedure.available}
                onClick={() => handleBook(procedure.id)}
              >
                {procedure.available ? t('recovery.book') : t('recovery.unavailable')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className={styles.infoBanner}>
        <i className="lni lni-info" />
        <p>{t('recovery.cancellationPolicy')}</p>
      </div>
    </div>
  );
};
