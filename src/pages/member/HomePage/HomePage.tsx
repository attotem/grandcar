import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showQR, setShowQR] = useState(false);

  const userName = 'Startup iLAB';
  const membershipStatus = 'Residente';
  const daysLeft = 45;

  const qrCodeData = useMemo(() => {
    const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || '123456789';
    const timestamp = Date.now();
    return JSON.stringify({
      userId,
      membership: membershipStatus,
      timestamp,
      type: 'access',
    });
  }, [membershipStatus]);

  const quickActions = useMemo(
    () => [
      {
        id: 'attendance',
        icon: 'lni lni-calendar-days',
        label: t('nav.asistencia'),
        path: '/member/asistencia',
      },
      {
        id: 'startups',
        icon: 'lni lni-bar-chart-4',
        label: t('nav.startups'),
        path: '/member/startups',
      },
      {
        id: 'events',
        icon: 'lni lni-bell-1',
        label: t('nav.events'),
        path: '/member/events',
      },
      {
        id: 'profile',
        icon: 'lni lni-user-4',
        label: t('nav.profile'),
        path: '/member/profile',
      },
    ],
    [t]
  );

  return (
    <div className={styles.page}>
      {/* Header */}
      {/* <header className={styles.header}>
        <div className={styles.greeting}>
          <span className={styles.welcome}>{t('home.welcome')}</span>
          <h1 className={styles.userName}>{userName}</h1>
        </div>
        <button className={styles.notificationBtn}>
          <i className="lni lni-bell-1" />
          <span className={styles.notificationDot} />
        </button>
      </header> */}

      <section className={styles.accessCard} onClick={() => setShowQR(!showQR)}>
        <div className={styles.accessHeader}>
          <div className={styles.accessInfo}>
            <span className={styles.accessLabel}>{t('home.yourAccess')}</span>
            <span className={styles.membershipBadge}>{membershipStatus}</span>
          </div>
          <div className={styles.daysLeft}>
            <span className={styles.daysNumber}>{daysLeft}</span>
            <span className={styles.daysText}>{t('home.days')}</span>
          </div>
        </div>
        
        <div className={styles.qrSection}>
          {showQR ? (
            <div className={styles.qrCode}>
              <div className={styles.qrContainer}>
                <QRCodeSVG
                  value={qrCodeData}
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#0a0a0a"
                  bgColor="#ffffff"
                />
              </div>
              <span className={styles.qrHint}>{t('home.showQrAtGate')}</span>
            </div>
          ) : (
            <div className={styles.qrPreview}>
              <i className="lni lni-code-1" />
              <span>{t('home.tapForQr')}</span>
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className={styles.quickActions}>
        {quickActions.map((action) => (
          <button
            key={action.id}
            className={styles.actionCard}
            onClick={() => navigate(action.path)}
          >
            <div className={styles.actionIcon}>
              <i className={action.icon} />
            </div>
            <span className={styles.actionLabel}>{action.label}</span>
          </button>
        ))}
      </section>

      {/* iLAB info */}
      <section className={styles.ilabInfo}>
        <h2 className={styles.ilabInfoTitle}>International Lab (iLAB)</h2>
        <p className={styles.ilabInfoText}>
          International Lab (iLAB) es un centro de innovación del Ayuntamiento de Madrid. El edificio,
          construido en el siglo XIX para albergar el laboratorio municipal, se ha transformado en un
          laboratorio de ideas consagrado a la innovación, a la atracción de talento y a la promoción de
          la innovación en la ciudad.
        </p>
        <p className={styles.ilabInfoText}>
          En iLAB encontrarás un espacio compartido de trabajo, programas de apoyo al emprendimiento,
          mentores y una comunidad de startups y empresas innovadoras con las que conectar.
        </p>
      </section>
    </div>
  );
};
