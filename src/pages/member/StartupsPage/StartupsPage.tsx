import { useTranslation } from 'react-i18next';
import styles from './StartupsPage.module.scss';

const startups = [
  {
    id: 1,
    name: 'CivicData Analytics',
    description:
      'Plataforma de analítica de datos urbanos que ayuda a las administraciones a tomar decisiones basadas en evidencias sobre movilidad, energía y servicios públicos.',
  },
  {
    id: 2,
    name: 'GreenBlocks',
    description:
      'Solución de monitorización energética para edificios que reduce el consumo y las emisiones mediante sensores IoT y recomendaciones automáticas.',
  },
  {
    id: 3,
    name: 'HealthBridge',
    description:
      'Aplicación que conecta a pacientes crónicos con profesionales sanitarios y cuidadores, facilitando el seguimiento remoto y la coordinación entre servicios.',
  },
  {
    id: 4,
    name: 'MobilityNow',
    description:
      'Herramienta de optimización de rutas y flotas para logística de última milla, pensada para reducir el tráfico y mejorar la calidad del aire en la ciudad.',
  },
  {
    id: 5,
    name: 'Facticia Studio',
    description:
      'Plataforma de Inteligencia Artificial Generativa que genera spots publicitarios y contenido para redes sociales para empresas.',
  },
  {
    id: 6,
    name: 'Olira Care',
    description:
      'Soluciones digitales de salud femenina centradas en la etapa de la perimenopausia y la menopausia.',
  },
  {
    id: 7,
    name: 'Levox',
    description:
      'Solución one‑stop‑shop para monitorización y analítica “in‑life” de baterías de litio en vehículos eléctricos e híbridos y gestión de baterías en segunda vida y reciclaje.',
  },
  {
    id: 8,
    name: 'Syn',
    description:
      'Soluciones para análisis de producto y optimización de procesos productivos para la industria alimentaria.',
  },
  {
    id: 9,
    name: 'Maternify',
    description:
      'Clínica digital de salud materno‑infantil que ofrece acompañamiento profesional a mujeres y familias en todas las etapas de la maternidad.',
  },
  {
    id: 10,
    name: 'GraCity',
    description:
      'Plataforma urbana que combina soluciones basadas en naturaleza, gemelos digitales y tokenización verde para proyectos de ciudad.',
  },
  {
    id: 11,
    name: 'Healmind',
    description:
      'Plataforma digital de salud mental integral que utiliza inteligencia artificial y análisis de datos para hacer más eficiente la terapia.',
  },
  {
    id: 12,
    name: 'Explocy',
    description:
      'Plataforma social para descubrir eventos y comprar entradas que integra recomendaciones basadas en IA y funciones comunitarias.',
  },
  {
    id: 13,
    name: 'Hoply',
    description:
      'Solución tecnológica para gestionar trámites de extranjería de personas extranjeras en España, facilitando su integración en la sociedad.',
  },
  {
    id: 14,
    name: 'Reversa',
    description:
      'SaaS de RegTech que actúa como radar regulatorio para despachos, consultoras y equipos legales y de compliance.',
  },
  {
    id: 15,
    name: 'AINOVIS',
    description:
      'Proyecto que busca transformar el diagnóstico médico por imagen mediante inteligencia artificial generativa multimodal.',
  },
  {
    id: 16,
    name: 'AGR Agency',
    description:
      'Servicio digital de conexión profesional entre talento hispanohablante y la industria cultural de España y Latinoamérica.',
  },
];

export const StartupsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('nav.startups')}</h1>

      <div className={styles.cards}>
        {startups.map((startup) => (
          <div key={startup.id} className={styles.card}>
            <h2>{startup.name}</h2>
            <p>{startup.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

