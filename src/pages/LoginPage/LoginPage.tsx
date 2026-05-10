import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Back from '../../components/Back';
import { IlabLogo } from '../../components/IlabLogo';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [dni, setDni] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = dni.trim().toUpperCase();
    if (!normalized) {
      setError(t('login.errors.invalidDni'));
      return;
    }

    const dniRegex = /^\d{8}[A-Z]$/;
    const nieRegex = /^[XYZ]\d{7}[A-Z]$/;

    if (!dniRegex.test(normalized) && !nieRegex.test(normalized)) {
      setError(t('login.errors.invalidDni'));
      return;
    }

    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/member/home');
    }, 1000);
  };

  return (
    <div className={styles.page}>
      <Back />
      <div className={styles.backgroundOrb} />
      
      <header className={styles.header}>
      </header>

      <div className={styles.content}>
        <div className={styles.logoSection}>
          <IlabLogo />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>{t('login.title')}</h2>
            <p className={styles.formSubtitle}>
              {t('login.subtitle')}
            </p>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('login.dniLabel')}</label>
            <div className={styles.phoneInput}>
              <input
                type="text"
                className={styles.input}
                placeholder={t('login.dniPlaceholder')}
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value);
                  setError('');
                }}
                maxLength={20}
              />
            </div>
            {error && <span className={styles.error}>{error}</span>}
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loader} />
            ) : (
              <>
                <span>{t('login.login')}</span>
                <i className="lni lni-arrow-right" />
              </>
            )}
          </button>
        </form>

        <p className={styles.helpText}>
          {t('login.notMember')} <button className={styles.linkButton} onClick={() => navigate('/non-member')}>{t('login.learnMore')}</button>
        </p>
      </div>
    </div>
  );
};
