import type { FC } from 'react';
import { SPLASH_DURATION_MS } from '../../config';
import { IlabLogo } from '../IlabLogo';
import styles from './SplashScreen.module.scss';

export const SplashScreen: FC = () => (
  <div className={styles.root} role="presentation" aria-hidden>
    <div className={styles.content}>
      <div className={styles.pulse}>
        <IlabLogo onDark size="lg" />
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{ animationDuration: `${SPLASH_DURATION_MS}ms` }}
        />
      </div>
    </div>
  </div>
);
