import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './MemberLayout.module.scss';

const navItems = [
  { path: '/', icon: 'lni lni-home-2', label: 'Авто' },
  { path: '/favorites', icon: 'lni lni-star-fat', label: 'Избранное' },
  { path: '/profile', icon: 'lni lni-user-4', label: 'Профиль' },
];

export const MemberLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
