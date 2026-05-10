import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Back from '../../../components/Back';
import { setAppLanguage } from '../../../i18n';
import type { SupportedLanguage } from '../../../i18n';
import styles from './LanguagePage.module.scss';

const languages: { code: SupportedLanguage; key: string }[] = [
  { code: 'en', key: 'profile.languageValue.en' },
  { code: 'uk', key: 'profile.languageValue.uk' },
  { code: 'ru', key: 'profile.languageValue.ru' },
  { code: 'es', key: 'profile.languageValue.es' },
];

export const LanguagePage = () => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language as SupportedLanguage) || 'en';

  const handleSelect = useCallback((code: SupportedLanguage) => {
    setAppLanguage(code);
  }, []);

  return (
    <div className={styles.page}>
      <Back />

      <header className={styles.header}>
        <h1 className={styles.title}>{t('profile.menu.language')}</h1>
      </header>

      <div className={styles.list}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`${styles.item} ${currentLang === lang.code ? styles.itemActive : ''}`}
            onClick={() => handleSelect(lang.code)}
          >
            <div className={styles.itemInfo}>
              <span className={styles.itemLabel}>{t(lang.key)}</span>
              <span className={styles.itemCode}>{lang.code.toUpperCase()}</span>
            </div>
            {currentLang === lang.code && (
              <i className={`lni lni-checkmark-circle ${styles.checkIcon}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

