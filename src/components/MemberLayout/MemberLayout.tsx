import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './MemberLayout.module.scss';

export const MemberLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = useMemo(
    () => [
      { path: '/', icon: 'lni lni-home-2', label: t('cars.nav.catalog') },
      { path: '/favorites', icon: 'lni lni-star-fat', label: t('cars.nav.favorites') },
      { path: '/profile', icon: 'lni lni-user-4', label: t('cars.nav.profile') },
    ],
    [t],
  );

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>

      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <button
                key={item.path}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => navigate(item.path)}
              >
                <i className={item.icon} />
                <span className={styles.navLabel}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
