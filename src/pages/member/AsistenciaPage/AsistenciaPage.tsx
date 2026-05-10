import { useTranslation } from 'react-i18next';
import styles from './AsistenciaPage.module.scss';

export const AsistenciaPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('nav.asistencia')}</h1>
      <div className={styles.cards}>
        <button className={styles.card}>
          <h2>Solicitar prolongación</h2>
          <p>Solicita la extensión de tu estancia en iLAB.</p>
        </button>
        <button className={styles.card}>
          <h2>Historial de asistencia</h2>
          <p>Consulta tus entradas y salidas registradas.</p>
        </button>
      </div>
    </div>
  );
};

