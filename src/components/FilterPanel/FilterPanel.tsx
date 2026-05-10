import type { FC } from 'react';
import styles from './FilterPanel.module.scss';

export interface CarFilters {
  make: string;
  model: string;
  year_min: string;
  year_max: string;
}

export interface FilterOptions {
  makes: string[];
  models: string[];
  year_min: number;
  year_max: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: CarFilters) => void;
  filters: CarFilters;
  onChange: (filters: CarFilters) => void;
  options: FilterOptions | null;
}

export const FilterPanel: FC<Props> = ({ isOpen, onClose, onApply, filters, onChange, options }) => {
  const handleReset = () => {
    onChange({ make: '', model: '', year_min: '', year_max: '' });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const activeCount = [filters.make, filters.model, filters.year_min, filters.year_max].filter(Boolean).length;

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.sheet} ${isOpen ? styles.sheetOpen : ''}`}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <h2 className={styles.title}>Фильтры</h2>
          {activeCount > 0 && (
            <button className={styles.resetBtn} onClick={handleReset}>
              Сбросить
            </button>
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>Марка</label>
            <select
              className={styles.select}
              value={filters.make}
              onChange={(e) => onChange({ ...filters, make: e.target.value, model: '' })}
            >
              <option value="">Все марки</option>
              {options?.makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Модель</label>
            <select
              className={styles.select}
              value={filters.model}
              onChange={(e) => onChange({ ...filters, model: e.target.value })}
            >
              <option value="">Все модели</option>
              {options?.models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Год выпуска</label>
            <div className={styles.yearRow}>
              <select
                className={styles.select}
                value={filters.year_min}
                onChange={(e) => onChange({ ...filters, year_min: e.target.value })}
              >
                <option value="">От</option>
                {options && Array.from(
                  { length: options.year_max - options.year_min + 1 },
                  (_, i) => options.year_min + i,
                ).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <span className={styles.yearSep}>—</span>
              <select
                className={styles.select}
                value={filters.year_max}
                onChange={(e) => onChange({ ...filters, year_max: e.target.value })}
              >
                <option value="">До</option>
                {options && Array.from(
                  { length: options.year_max - options.year_min + 1 },
                  (_, i) => options.year_min + i,
                ).reverse().map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.applyBtn} onClick={handleApply}>
            Показать результаты
          </button>
        </div>
      </div>
    </>
  );
};
