import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FilterPanel.module.scss';

export interface CarFilters {
  make: string;
  model: string;
  year_min: string;
  year_max: string;
  body: string;
  drive_type: string;
  transmission: string;
  fuel: string;
  engine_rate: string;
  price_min: string;
  price_max: string;
}

export interface FilterOptions {
  makes: string[];
  models: string[];
  year_min: number;
  year_max: number;
  bodies?: string[];
  drive_types?: string[];
  transmissions?: string[];
  fuels?: string[];
  engine_rates?: number[];
  price_min?: string;
  price_max?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: CarFilters) => void;
  filters: CarFilters;
  onChange: (filters: CarFilters) => void;
  options: FilterOptions | null;
}

export const emptyCarFilters: CarFilters = {
  make: '',
  model: '',
  year_min: '',
  year_max: '',
  body: '',
  drive_type: '',
  transmission: '',
  fuel: '',
  engine_rate: '',
  price_min: '',
  price_max: '',
};

export const FilterPanel: FC<Props> = ({ isOpen, onClose, onApply, filters, onChange, options }) => {
  const { t } = useTranslation();
  const handleReset = () => {
    onChange({ ...emptyCarFilters });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  const priceBoundMin = options?.price_min != null ? Number(options.price_min) : undefined;
  const priceBoundMax = options?.price_max != null ? Number(options.price_max) : undefined;

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.sheet} ${isOpen ? styles.sheetOpen : ''}`}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <h2 className={styles.title}>{t('cars.filterPanel.title')}</h2>
          {activeCount > 0 && (
            <button className={styles.resetBtn} onClick={handleReset}>
              {t('cars.filterPanel.reset')}
            </button>
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>{t('cars.filterPanel.make')}</label>
            <select
              className={styles.select}
              value={filters.make}
              onChange={(e) => onChange({ ...filters, make: e.target.value, model: '' })}
            >
              <option value="">{t('cars.filterPanel.allMakes')}</option>
              {options?.makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{t('cars.filterPanel.model')}</label>
            <select
              className={styles.select}
              value={filters.model}
              onChange={(e) => onChange({ ...filters, model: e.target.value })}
            >
              <option value="">{t('cars.filterPanel.allModels')}</option>
              {options?.models.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{t('cars.filterPanel.year')}</label>
            <div className={styles.yearRow}>
              <select
                className={styles.select}
                value={filters.year_min}
                onChange={(e) => onChange({ ...filters, year_min: e.target.value })}
              >
                <option value="">{t('cars.filterPanel.yearFrom')}</option>
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
                <option value="">{t('cars.filterPanel.yearTo')}</option>
                {options && Array.from(
                  { length: options.year_max - options.year_min + 1 },
                  (_, i) => options.year_min + i,
                ).reverse().map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {(options?.bodies?.length ?? 0) > 0 && (
            <div className={styles.field}>
              <label className={styles.label}>{t('cars.filterPanel.bodyType')}</label>
              <select
                className={styles.select}
                value={filters.body}
                onChange={(e) => onChange({ ...filters, body: e.target.value })}
              >
                <option value="">{t('cars.filterPanel.anyM')}</option>
                {options?.bodies?.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          {(options?.drive_types?.length ?? 0) > 0 && (
            <div className={styles.field}>
              <label className={styles.label}>{t('cars.filterPanel.drive')}</label>
              <select
                className={styles.select}
                value={filters.drive_type}
                onChange={(e) => onChange({ ...filters, drive_type: e.target.value })}
              >
                <option value="">{t('cars.filterPanel.anyM')}</option>
                {options?.drive_types?.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          )}

          {(options?.transmissions?.length ?? 0) > 0 && (
            <div className={styles.field}>
              <label className={styles.label}>{t('cars.filterPanel.transmission')}</label>
              <select
                className={styles.select}
                value={filters.transmission}
                onChange={(e) => onChange({ ...filters, transmission: e.target.value })}
              >
                <option value="">{t('cars.filterPanel.anyF')}</option>
                {options?.transmissions?.map((tr) => (
                  <option key={tr} value={tr}>{tr}</option>
                ))}
              </select>
            </div>
          )}

          {(options?.fuels?.length ?? 0) > 0 && (
            <div className={styles.field}>
              <label className={styles.label}>{t('cars.filterPanel.fuel')}</label>
              <select
                className={styles.select}
                value={filters.fuel}
                onChange={(e) => onChange({ ...filters, fuel: e.target.value })}
              >
                <option value="">{t('cars.filterPanel.anyN')}</option>
                {options?.fuels?.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          )}

          {(options?.engine_rates?.length ?? 0) > 0 && (
            <div className={styles.field}>
              <label className={styles.label}>{t('cars.filterPanel.engineVolume')}</label>
              <select
                className={styles.select}
                value={filters.engine_rate}
                onChange={(e) => onChange({ ...filters, engine_rate: e.target.value })}
              >
                <option value="">{t('cars.filterPanel.anyM')}</option>
                {options?.engine_rates?.map((r) => (
                  <option key={r} value={String(r)}>{t('cars.filterPanel.engineLiters', { value: r })}</option>
                ))}
              </select>
            </div>
          )}

          {priceBoundMin != null &&
            priceBoundMax != null &&
            Number.isFinite(priceBoundMin) &&
            Number.isFinite(priceBoundMax) && (
            <div className={styles.field}>
              <label className={styles.label}>{t('cars.filterPanel.priceEur')}</label>
              <div className={styles.yearRow}>
                <input
                  type="number"
                  className={styles.input}
                  inputMode="numeric"
                  placeholder={t('cars.filterPanel.priceFrom')}
                  min={Math.floor(priceBoundMin)}
                  max={Math.ceil(priceBoundMax)}
                  step={100}
                  value={filters.price_min}
                  onChange={(e) => onChange({ ...filters, price_min: e.target.value })}
                />
                <span className={styles.yearSep}>—</span>
                <input
                  type="number"
                  className={styles.input}
                  inputMode="numeric"
                  placeholder={t('cars.filterPanel.priceTo')}
                  min={Math.floor(priceBoundMin)}
                  max={Math.ceil(priceBoundMax)}
                  step={100}
                  value={filters.price_max}
                  onChange={(e) => onChange({ ...filters, price_max: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.applyBtn} onClick={handleApply}>
            {t('cars.filterPanel.apply')}
          </button>
        </div>
      </div>
    </>
  );
};
