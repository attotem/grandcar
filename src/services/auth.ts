import { API_BASE_URL } from '../config';

const API_URL = API_BASE_URL;

let AUTH_TOKEN: string | null = null;

export const getAuthToken = (): string | null => AUTH_TOKEN;

export const setAuthToken = (token: string | null): void => {
  AUTH_TOKEN = token;
};

let loginAttempted = false;
let last401Time = 0;
const LOGIN_RETRY_DELAY = 60000;

const getInitData = (): string => {
  return window.Telegram?.WebApp?.initData ?? '';
};

export const Login = async (): Promise<boolean> => {
  try {
    const now = Date.now();
    if (loginAttempted && (now - last401Time) < LOGIN_RETRY_DELAY) {
      console.log('Login skipped: too soon after 401 error');
      return false;
    }

    // const hash = "vitalikkrasavchik";
    const hash = import.meta.env.DEV ? 'vitalikkrasavchik' : getInitData();
    if (!hash) {
      console.error('No Telegram init data available');
      return false;
    }

    loginAttempted = true;

    const response = await fetch(`${API_URL}/auth/telegram/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ init_data: hash }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        last401Time = now;
        console.error('Login failed: 401 Unauthorized. Will retry after delay.');
        AUTH_TOKEN = null;
        return false;
      }
      console.error('Login failed:', response.status);
      loginAttempted = false;
    }

    loginAttempted = false;
    last401Time = 0;

    const authHeader = response.headers.get('authorization');

    if (authHeader && authHeader.startsWith('Bearer ')) {
      AUTH_TOKEN = authHeader;
      console.log('Auth successful:', AUTH_TOKEN);
      return true;
    } else {
      console.error('No Bearer token in response.');
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    loginAttempted = false;
    return false;
  }
};

export const logout = (): void => {
  AUTH_TOKEN = null;
  loginAttempted = false;
  last401Time = 0;
};

export const resetLoginAttempts = (): void => {
  loginAttempted = false;
  last401Time = 0;
};

export const isAuthenticated = (): boolean => {
  return AUTH_TOKEN !== null;
};

export const getAuthHeaders = (): HeadersInit => {
  return {
    'ngrok-skip-browser-warning': '1',
    ...(AUTH_TOKEN ? { Authorization: AUTH_TOKEN } : {}),
  };
};
