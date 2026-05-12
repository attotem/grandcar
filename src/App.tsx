import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SplashScreen } from './components/SplashScreen';
import { SPLASH_DURATION_MS } from './config';
import styles from './App.module.scss';

function App() {
  const [error, setError] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const id = window.setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      try {

        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.disableVerticalSwipes();


        try {
          if (window.Telegram.WebApp.requestFullscreen) {
            window.Telegram.WebApp.requestFullscreen();
          }
        } catch (e) {
          setError('Оновіть Telegram до останньої версії для повної підтримки додатку');
        }

        window.Telegram.WebApp.setHeaderColor("#ffffff"); 

       
      } catch (e) {
        setError('Помилка ініціалізації Telegram WebApp');
      }
    } else {
      setError('Telegram WebApp недоступний. Будь ласка, відкрийте додаток через Telegram');
    }
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  if (error) {
    return (
      <div className={styles.errorPage}>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <i className="lni lni-warning" />
          </div>
          <h1 className={styles.errorTitle}>{t('error.title')}</h1>
          <p className={styles.errorMessage}>{error}</p>
          <div className={styles.errorActions}>
            <button 
              className={styles.retryButton}
              onClick={() => window.location.reload()}
            >
              <i className="lni lni-reload" />
              {t('error.retry')}
            </button>
          </div>
          <div className={styles.errorFooter}>
            <p className={styles.errorHint}>
              {t('error.hint')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Outlet />
    </div>
  );
}

export default App;
