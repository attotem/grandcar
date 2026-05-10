import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './EventsPage.module.scss';

const mockEvents = [
  {
    id: 1,
    date: '24 MAR',
    title: 'Demo Day: Startups en iLAB',
    time: '10:00 – 13:00',
    location: 'Auditorio iLAB',
    description:
      'Sesión de presentaciones de proyectos innovadores alojados en iLAB.',
  },
  {
    id: 2,
    date: '02 ABR',
    title: 'Workshop: Financiación para startups',
    time: '16:00 – 18:00',
    location: 'Sala 3.2',
    description:
      'Taller práctico sobre instrumentos de financiación pública y privada.',
  },
  {
    id: 3,
    date: '11 ABR',
    title: 'Networking: Comunidad iLAB',
    time: '18:30 – 20:00',
    location: 'Espacio común',
    description:
      'Encuentro informal para conectar con otros emprendedores y mentores.',
  },
];

export const EventsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('nav.events')}</h1>

      <ul className={styles.list}>
        {mockEvents.map((event) => (
          <li
            key={event.id}
            className={styles.item}
            onClick={() => navigate(`/member/events/${event.id}`)}
          >
            <div className={styles.dateBlock}>
              <span className={styles.date}>{event.date}</span>
              <span className={styles.time}>{event.time}</span>
            </div>

            <div className={styles.content}>
              <h2 className={styles.eventTitle}>{event.title}</h2>
              <div className={styles.meta}>
                <span className={styles.location}>{event.location}</span>
              </div>
              <p className={styles.description}>{event.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

