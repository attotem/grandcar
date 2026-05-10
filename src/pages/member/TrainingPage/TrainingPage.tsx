import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './TrainingPage.module.scss';

const trainingTypesIds = [
  { id: 'gym', icon: 'lni lni-dumbbell-1' },
  { id: 'group', icon: 'lni lni-user-multiple-4' },
  { id: 'personal', icon: 'lni lni-user-4' },
  { id: 'studio', icon: 'lni lni-target-user' },
] as const;

const upcomingClasses = [
  { id: 1, time: '10:00', title: 'Yoga Flow', spots: 5, duration: 60 },
  { id: 2, time: '12:00', title: 'Functional Training', spots: 8, duration: 45 },
  { id: 3, time: '14:00', title: 'Pilates', spots: 3, duration: 55 },
  { id: 4, time: '16:00', title: 'HIIT', spots: 10, duration: 30 },
];

export const TrainingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const trainingTypes = useMemo(
    () =>
      trainingTypesIds.map((type) => ({
        ...type,
        title: t(`training.types.${type.id}.title`),
        description: t(`training.types.${type.id}.description`),
      })),
    [t]
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('training.title')}</h1>
        <button className={styles.calendarBtn} onClick={() => navigate('/member/training/schedule')}>
          <i className="lni lni-calendar-days" />
        </button>
      </header>

      {/* Training Types */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('training.directions')}</h2>
        <div className={styles.typesList}>
          {trainingTypes.map((type) => {
            const handleClick = type.id === 'personal' 
              ? () => navigate('/member/training/personal')
              : undefined;
            
            return (
              <div
                key={type.id}
                className={styles.typeCard}
                onClick={handleClick}
                style={handleClick ? { cursor: 'pointer' } : { cursor: 'default' }}
              >
                <div className={styles.typeIcon}>
                  <i className={type.icon} />
                </div>
                <div className={styles.typeInfo}>
                  <h3 className={styles.typeTitle}>{type.title}</h3>
                  <p className={styles.typeDescription}>{type.description}</p>
                </div>
                {handleClick && <i className="lni lni-chevron-right" />}
              </div>
            );
          })}
        </div>
      </section>

      {/* Upcoming Classes */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t('training.upcomingClasses')}</h2>
          <button className={styles.seeAllBtn} onClick={() => navigate('/member/training/schedule')}>
            {t('training.all')} <i className="lni lni-chevron-right" />
          </button>
        </div>
        <div className={styles.classesList}>
          {upcomingClasses.map((cls) => (
            <div key={cls.id} className={styles.classCard}>
              <div className={styles.classTime}>
                <span className={styles.time}>{cls.time}</span>
                <span className={styles.duration}>
                  {cls.duration} {t('training.minutes')}
                </span>
              </div>
              <div className={styles.classInfo}>
                <h3 className={styles.classTitle}>{cls.title}</h3>
                <span className={styles.classSpots}>
                  {cls.spots} {t('training.spots')}
                </span>
              </div>
              <button className={styles.bookBtn}>
                <i className="lni lni-plus" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Training CTA */}
      <section className={styles.ptBanner} onClick={() => navigate('/member/training/personal')}>
        <div className={styles.ptContent}>
          <span className={styles.ptLabel}>{t('training.personalTraining.label')}</span>
          <h3 className={styles.ptTitle}>{t('training.personalTraining.title')}</h3>
          <p className={styles.ptText}>{t('training.personalTraining.text')}</p>
        </div>
        <button className={styles.ptBtn}>
          <i className="lni lni-arrow-right" />
        </button>
      </section>
    </div>
  );
};
