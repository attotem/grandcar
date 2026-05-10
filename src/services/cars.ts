import { API_BASE_URL } from '../config';
import { getAuthHeaders } from './auth';
import type { Car } from '../components/CarCard';
import type { CarFilters, FilterOptions } from '../components/FilterPanel';

// Re-export commonly used types so consumers depend only on the service layer.
export type { Car } from '../components/CarCard';
export type { CarFilters, FilterOptions } from '../components/FilterPanel';

interface CarsListResponse {
  result: Car[];
}

interface RequestOptions {
  signal?: AbortSignal;
}

const buildHeaders = (): HeadersInit => ({
  ...getAuthHeaders(),
});

const apiGet = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'GET',
    headers: buildHeaders(),
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${path}`);
  }

  return (await response.json()) as T;
};

// ── Cars ────────────────────────────────────────────────────

export const getCars = async (
  filters: CarFilters,
  options: RequestOptions = {},
): Promise<Car[]> => {
  const params = new URLSearchParams({ limit: '100', offset: '0' });
  if (filters.make) params.set('make', filters.make);
  if (filters.model) params.set('model', filters.model);
  if (filters.year_min) params.set('year_min', filters.year_min);
  if (filters.year_max) params.set('year_max', filters.year_max);

  const data = await apiGet<CarsListResponse>(
    `/cars/get_cars?${params.toString()}`,
    options,
  );
  return data.result ?? [];
};

export const getFavoriteCars = async (
  options: RequestOptions = {},
): Promise<Car[]> => {
  const params = new URLSearchParams({
    limit: '100',
    offset: '0',
    is_favorite: 'true',
  });

  const data = await apiGet<CarsListResponse>(
    `/cars/get_cars?${params.toString()}`,
    options,
  );
  return data.result ?? [];
};

export const getCar = async (
  id: string,
  options: RequestOptions = {},
): Promise<Car> => {
  const params = new URLSearchParams({ id });
  return apiGet<Car>(`/cars/get_car?${params.toString()}`, options);
};

// ── Filters ─────────────────────────────────────────────────

export const getFilters = async (
  options: RequestOptions = {},
): Promise<FilterOptions> => {
  return apiGet<FilterOptions>('/cars/get_filters', options);
};
