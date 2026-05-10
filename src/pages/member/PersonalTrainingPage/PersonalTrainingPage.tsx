import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Back from '../../../components/Back';
import styles from './PersonalTrainingPage.module.scss';

const trainers = [
  {
    id: 1,
    name: 'Максим Петренко',
    specialty: 'Силові тренування, Функціональний тренінг',
    experience: '8 років',
    rating: 4.9,
    price: 1200,
    available: true,
  },
  {
    id: 2,
    name: 'Анна Коваленко',
    specialty: 'Yoga, Pilates, Stretching',
    experience: '6 років',
    rating: 5.0,
    price: 1000,
    available: true,
  },
  {
    id: 3,
    name: 'Денис Кравченко',
    specialty: 'HIIT, CrossFit, Boxing',
    experience: '10 років',
    rating: 4.8,
    price: 1500,
    available: false,
  },
  {
    id: 4,
    name: 'Олена Сидоренко',
    specialty: 'Pilates, Реабілітація',
    experience: '12 років',
    rating: 4.9,
    price: 1300,
    available: true,
  },
];

export const PersonalTrainingPage = () => {
  const { t } = useTranslation();
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);

  return (
    <div className={styles.page}>
      <Back />
      <header className={styles.header}>
        <div className={styles.spacer} />
        <h1 className={styles.title}>{t('training.personalTraining.label')}</h1>
        <div className={styles.spacer} />
      </header>

      <div className={styles.content}>
        <p className={styles.subtitle}>
          {t('training.personalTraining.text')}
        </p>

        <div className={styles.trainersList}>
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className={`${styles.trainerCard} ${selectedTrainer === trainer.id ? styles.selected : ''} ${!trainer.available ? styles.unavailable : ''}`}
              onClick={() => trainer.available && setSelectedTrainer(trainer.id)}
            >
              <div className={styles.avatar}>
                <i className="lni lni-user-4" />
              </div>
              <div className={styles.trainerInfo}>
                <div className={styles.trainerHeader}>
                  <h3 className={styles.trainerName}>{trainer.name}</h3>
                  <div className={styles.rating}>
                    <i className="lni lni-star-fat" />
                    <span>{trainer.rating}</span>
                  </div>
                </div>
                <p className={styles.specialty}>{trainer.specialty}</p>
                <div className={styles.trainerMeta}>
                  <span className={styles.experience}>
                    {trainer.experience} {t('training.personalTraining.experienceSuffix')}
                  </span>
                  <span className={styles.price}>
                    {t('training.personalTraining.pricePerHour', { price: trainer.price })}
                  </span>
                </div>
                {!trainer.available && (
                  <span className={styles.unavailableLabel}>
                    {t('training.personalTraining.noSlots')}
                  </span>
                )}
              </div>
              {trainer.available && (
                <div className={styles.checkmark}>
                  {selectedTrainer === trainer.id && <i className="lni lni-check" />}
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedTrainer && (
          <button className={styles.bookButton}>
            {t('training.personalTraining.cta')}
            <i className="lni lni-arrow-right" />
          </button>
        )}
      </div>
    </div>
  );
};
