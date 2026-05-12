import { EUR_TO_USD_RATE } from '../config';

const locale = 'uk-UA';

export const formatUsdInteger = (amount: number): string =>
  amount.toLocaleString(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

export const parseMarketUsdNumber = (raw: string | undefined): number | null => {
  if (raw == null || raw === '') return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
};

export const formatMarketAvgUsd = (raw: string | undefined): string | null => {
  const n = parseMarketUsdNumber(raw);
  if (n == null) return null;
  return formatUsdInteger(n);
};

/** USD equivalent of listing price (EUR×rate or USD) for comparison with `market_avg_price_usd`. */
export const getListingUsdNumber = (price: string, currency: string): number | null => {
  const n = Number(price);
  const cur = currency.toUpperCase();
  if (!Number.isFinite(n) || n <= 0) return null;
  if (cur === 'USD') return n;
  if (cur === 'EUR') return n * EUR_TO_USD_RATE;
  return null;
};

export const formatListingPriceUsd = (price: string, currency: string): string => {
  const n = Number(price);
  const cur = currency.toUpperCase();
  if (!Number.isFinite(n) || n <= 0) return `${price} ${currency}`;
  if (cur === 'USD') return formatUsdInteger(n);
  if (cur === 'EUR') return formatUsdInteger(n * EUR_TO_USD_RATE);
  try {
    return n.toLocaleString(locale, {
      style: 'currency',
      currency: cur,
      maximumFractionDigits: 0,
    });
  } catch {
    return `${n.toLocaleString(locale)} ${cur}`;
  }
};
