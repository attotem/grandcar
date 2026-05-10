import type { Car } from './cars';

const STORAGE_KEY = 'viewed_cars_history';
const MAX_ENTRIES = 20;

export interface ViewedCar {
  id: string;
  make: string;
  model: string;
  year: number;
  price: string;
  currency: string;
  mileage_km: number;
  image: string | null;
  viewedAt: number;
}

const safeParse = (raw: string | null): ViewedCar[] => {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((item): item is ViewedCar => {
      return (
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.make === 'string' &&
        typeof item.model === 'string'
      );
    });
  } catch {
    return [];
  }
};

export const getViewedCars = (): ViewedCar[] => {
  try {
    return safeParse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
};

export const recordViewedCar = (car: Car): void => {
  try {
    const entry: ViewedCar = {
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      currency: car.currency,
      mileage_km: car.mileage_km,
      image: car.images?.[0] ?? null,
      viewedAt: Date.now(),
    };

    const existing = getViewedCars().filter((item) => item.id !== car.id);
    const next = [entry, ...existing].slice(0, MAX_ENTRIES);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
};

export const clearViewedHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

export const removeViewedCar = (id: string): void => {
  try {
    const next = getViewedCars().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
};
