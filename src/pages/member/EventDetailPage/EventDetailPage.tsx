import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Back from '../../../components/Back';
import styles from './EventDetailPage.module.scss';

const events = [
  {
    id: '1',
    date: '24 MAR',
    title: 'Demo Day: Startups en iLAB',
    time: '10:00 – 13:00',
    location: 'Auditorio iLAB',
    description:
      'Sesión de presentaciones de proyectos innovadores alojados en iLAB. ' +
      'Durante el Demo Day varias startups tendrán unos minutos para exponer su solución, tracción y próximos pasos frente a un panel de expertos y al resto de la comunidad. ' +
      'Al final del evento habrá espacio para preguntas, feedback individual y networking entre participantes, mentores e inversores invitados.',
  },
  {
    id: '2',
    date: '02 ABR',
    title: 'Workshop: Financiación para startups',
    time: '16:00 – 18:00',
    location: 'Sala 3.2',
    description:
      'Taller práctico sobre los principales instrumentos de financiación pública y privada disponibles para startups tecnológicas. ' +
      'Revisaremos convocatorias del Ayuntamiento y de otras administraciones, business angels, fondos de venture capital y plataformas de financiación alternativa. ' +
      'Incluye ejemplos reales, recomendaciones para preparar la documentación y un bloque de preguntas y respuestas.',
  },
  {
    id: '3',
    date: '11 ABR',
    title: 'Networking: Comunidad iLAB',
    time: '18:30 – 20:00',
    location: 'Espacio común',
    description:
      'Encuentro informal para reforzar los vínculos dentro de la comunidad iLAB. ' +
      'Combinaremos dinámicas de networking guiado, breves presentaciones de proyectos y espacios abiertos para que puedas encontrar colaboradores, clientes potenciales o mentores. ' +
      'Actividad pensada para residentes y alumni del espacio, así como para startups invitadas que quieran conocer mejor el ecosistema.',
  },
];

export const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const event = useMemo(
    () => events.find((e) => e.id === id),
    [id],
  );

  if (!event) {
    return (
      <div className={styles.page}>
        <Back />
        <h1 className={styles.title}>Evento no encontrado</h1>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Back />

      <div className={styles.header}>
        <div className={styles.dateBlock}>
          <span className={styles.date}>{event.date}</span>
          <span className={styles.time}>{event.time}</span>
        </div>
        <div className={styles.headerText}>
          <h1 className={styles.title}>{event.title}</h1>
          <div className={styles.meta}>
            <span className={styles.location}>{event.location}</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.description}>{event.description}</p>
      </div>
    </div>
  );
}

