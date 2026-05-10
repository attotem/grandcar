import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Back from '../../../components/Back';
import styles from './SchedulePage.module.scss';

const weekDayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const filterKeys = ['all', 'yoga', 'functional', 'pilates', 'hiit', 'boxing'] as const;

const generateDates = (t: (key: string) => string) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    dates.push({
      day: t(`training.schedule.weekDays.${weekDayKeys[dayIndex]}`),
      date: date.getDate(),
      full: date,
      isToday: i === 0,
    });
  }
  return dates;
};

const scheduleData = [
  { id: 1, time: '07:00', title: 'Morning Yoga', trainer: 'Анна К.', type: 'yoga', spots: 8, booked: false },
  { id: 2, time: '09:00', title: 'Functional Training', trainer: 'Максим П.', type: 'functional', spots: 12, booked: true },
  { id: 3, time: '10:30', title: 'Pilates', trainer: 'Олена С.', type: 'pilates', spots: 6, booked: false },
  { id: 4, time: '12:00', title: 'HIIT', trainer: 'Денис К.', type: 'hiit', spots: 15, booked: false },
  { id: 5, time: '14:00', title: 'Stretching', trainer: 'Анна К.', type: 'stretch', spots: 10, booked: false },
  { id: 6, time: '16:00', title: 'Boxing', trainer: 'Артем В.', type: 'boxing', spots: 8, booked: false },
  { id: 7, time: '18:00', title: 'Yoga Flow', trainer: 'Анна К.', type: 'yoga', spots: 5, booked: false },
  { id: 8, time: '19:30', title: 'Cycling', trainer: 'Максим П.', type: 'cycling', spots: 20, booked: false },
];

export const SchedulePage = () => {
  const { t } = useTranslation();
  const dates = useMemo(() => generateDates(t), [t]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<(typeof filterKeys)[number]>('all');

  const filters = useMemo(
    () => filterKeys.map((key) => ({ key, label: t(`training.schedule.filters.${key}`) })),
    [t]
  );

  const filteredSchedule = scheduleData.filter(
    (item) => selectedFilter === 'all' || item.type.toLowerCase() === selectedFilter.toLowerCase()
  );

  return (
    <div className={styles.page}>
      <Back />
      <header className={styles.header}>
        <div className={styles.spacer} />
        <h1 className={styles.title}>{t('training.schedule.title')}</h1>
        <div className={styles.spacer} />
      </header>

      {/* Date Picker */}
      <div className={styles.datePicker}>
        {dates.map((d, index) => (
          <button
            key={index}
            className={`${styles.dateItem} ${selectedDate === index ? styles.dateItemActive : ''}`}
            onClick={() => setSelectedDate(index)}
          >
            <span className={styles.dayName}>{d.day}</span>
            <span className={styles.dayNumber}>{d.date}</span>
            {d.isToday && <span className={styles.todayDot} />}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`${styles.filterBtn} ${selectedFilter === filter.key ? styles.filterBtnActive : ''}`}
            onClick={() => setSelectedFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Schedule List */}
      <div className={styles.scheduleList}>
        {filteredSchedule.map((item) => (
          <div key={item.id} className={`${styles.scheduleCard} ${item.booked ? styles.booked : ''}`}>
            <div className={styles.timeBlock}>
              <span className={styles.time}>{item.time}</span>
            </div>
            <div className={styles.infoBlock}>
              <h3 className={styles.classTitle}>{item.title}</h3>
              <div className={styles.classMeta}>
                <span><i className="lni lni-user-4" /> {item.trainer}</span>
                <span className={styles.spots}>
                  {item.spots} {t('training.schedule.spots')}
                </span>
              </div>
            </div>
            <button className={`${styles.actionBtn} ${item.booked ? styles.cancelBtn : ''}`}>
              {item.booked ? (
                <i className="lni lni-check" />
              ) : (
                <i className="lni lni-plus" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
