const es = {
  nav: {
    home: 'Inicio',
    training: 'Entrenamiento',
    spa: 'SPA',
    restaurant: 'Restaurante',
    profile: 'Perfil',
    schedule: 'Horario',
    asistencia: 'Asistencia',
    startups: 'Startups',
    events: 'Eventos',
    more: 'Más',
  },
  welcome: {
    subtitle: 'Centro de innovación de Madrid',
    question: 'Bienvenido a iLAB',
    description: 'Cuéntanos quién eres',
    member: 'Emprendedor / startup',
    nonMember: 'Empresa / institución',
  },
  home: {
    welcome: 'Bienvenido,',
    yourAccess: 'Tu acceso',
    days: 'días',
    showQrAtGate: 'Muestra el QR en el torno',
    tapForQr: 'Toca para mostrar el código QR',
    level: 'Nivel {{level}}',
    achievements: 'Logros',
    topParticipants: 'Mejores socios',
    you: 'Tú',
    today: 'Hoy',
    all: 'Todos',
    ptShort: 'EP',
    group: 'Grupo',
    noClasses: 'No hay clases programadas',
    book: 'Reservar',
    specialOffer: 'Oferta especial',
    spaDayDiscount: 'Día de SPA con 20% de descuento',
    thisWeekOnly: 'Solo esta semana',
    quickActions: {
      training: 'Entrenamiento',
      spa: 'SPA',
      restaurant: 'Restaurante',
      schedule: 'Horario',
    },
    achievementsTitles: {
      firstWorkout: 'Primer entrenamiento',
      tenWorkouts: '10 entrenamientos',
      monthActive: 'Mes activo',
      fiftyWorkouts: '50 entrenamientos',
      hundredWorkouts: '100 entrenamientos',
    },
    sessionTitles: {
      personalTraining: 'Entrenamiento personal',
    },
  },
  training: {
    title: 'Entrenamiento',
    directions: 'Direcciones',
    upcomingClasses: 'Próximas clases',
    all: 'Todos',
    spots: 'plazas',
    minutes: 'min',
    schedule: {
      title: 'Horario',
      weekDays: {
        mon: 'Lun',
        tue: 'Mar',
        wed: 'Mié',
        thu: 'Jue',
        fri: 'Vie',
        sat: 'Sáb',
        sun: 'Dom',
      },
      filters: {
        all: 'Todos',
        yoga: 'Yoga',
        functional: 'Funcional',
        pilates: 'Pilates',
        hiit: 'HIIT',
        boxing: 'Boxeo',
      },
      spots: 'plazas',
    },
    personalTraining: {
      label: 'Entrenamiento personal',
      title: 'Alcanza tus objetivos más rápido',
      text: 'Elige a tu entrenador',
      experienceSuffix: 'de experiencia',
      pricePerHour: '{{price}} ₴/hora',
      noSlots: 'Sin huecos disponibles',
      cta: 'Reservar sesión',
    },
    types: {
      gym: {
        title: 'Gimnasio',
        description: 'Equipamiento moderno y pesas libres',
      },
      group: {
        title: 'Clases grupales',
        description: 'Yoga, Pilates, Funcional y más',
      },
      personal: {
        title: 'Entrenamiento personal',
        description: 'Enfoque individual con entrenador',
      },
      studio: {
        title: 'Studios',
        description: 'Cycling, Boxeo, Danza',
      },
    },
  },
  nonMember: {
    discovery: {
      slides: {
        about: {
          title: 'Madrid International Lab',
          subtitle: 'Centro de innovación',
          description:
            'Madrid International Lab es un centro de innovación del Ayuntamiento de Madrid ubicado en el histórico edificio del laboratorio municipal.',
        },
        coworking: {
          title: 'Coworking para startups',
          subtitle: 'Coworking',
          description:
            'Espacio de coworking gratuito para proyectos innovadores y, en especial, para startups extranjeras, con capacidad para unas 70 personas.',
        },
        events: {
          title: 'Eventos y ecosistema',
          subtitle: 'Eventos',
          description:
            'Conferencias, encuentros y webinars sobre innovación y emprendimiento que conectan startups, empresas e instituciones.',
        },
        contact: {
          title: 'Cómo unirse a iLAB',
          subtitle: 'Únete a iLAB',
          description:
            'Si eres una startup o empresa interesada en la innovación, contacta con iLAB para conocer oportunidades de residencia y eventos.',
        },
      },
      next: 'Siguiente',
      start: 'Volver a la pantalla principal',
    },
    // Остальной онбординг (quiz/result) пока не используется и может оставаться на английском
  },
  login: {
    title: 'Acceso con DNI/NIE',
    subtitle: 'Introduce tu número de documento español (DNI o NIE) para acceder al sistema',
    dniLabel: 'DNI / NIE',
    dniPlaceholder: 'ej. 12345678A o X1234567B',
    login: 'Entrar',
    notMember: '¿Aún no eres socio?',
    learnMore: 'Más información',
    errors: {
      invalidDni: 'Introduce un número de DNI o NIE válido',
    },
  },
  recovery: {
    title: 'Recuperación y SPA',
    categories: {
      all: 'Todos',
      massage: 'Masaje',
      spa: 'SPA',
      sauna: 'Sauna',
      pool: 'Piscina',
    },
    procedures: {
      relaxMassage: 'Masaje relax',
      sportsMassage: 'Masaje deportivo',
      spaDetox: 'Ritual SPA «Detox»',
      finnishSauna: 'Sauna finlandesa',
      hammam: 'Hammam',
      pool: 'Piscina',
      jacuzzi: 'Jacuzzi',
      antiCelluliteMassage: 'Masaje anticelulitis',
    },
    book: 'Reservar',
    unavailable: 'No disponible',
    cancellationPolicy: 'La cancelación es gratuita hasta 24 h antes del servicio',
    minutes: 'min',
  },
  restaurant: {
    title: 'Restaurante',
    reserveTable: 'Reserva de mesa',
    categories: {
      breakfasts: 'Desayunos',
      lunches: 'Comidas',
      drinks: 'Bebidas',
      snacks: 'Snacks',
    },
    items: {
      proteinBowl: {
        name: 'Bowl de proteína',
        description: 'Pollo, quinoa, aguacate, verduras',
      },
      veggieOmelet: {
        name: 'Tortilla de verduras',
        description: '3 huevos, tomates, espinacas, feta',
      },
      greekSalad: {
        name: 'Ensalada griega',
        description: 'Verduras frescas, aceitunas, feta',
      },
      steakVeggies: {
        name: 'Filete con verduras',
        description: 'Ternera, verduras a la parrilla',
      },
      smoothieEnergy: {
        name: 'Smoothie «Energía»',
        description: 'Plátano, frutos rojos, proteína',
      },
      greenDetox: {
        name: 'Green detox',
        description: 'Espinaca, pepino, manzana',
      },
      proteinBar: {
        name: 'Barrita proteica',
        description: 'Chocolate, frutos secos',
      },
      nutsMix: {
        name: 'Mix de frutos secos',
        description: 'Almendras, anacardos, nueces',
      },
    },
    cart: {
      itemsCount: '{{count}} productos',
      order: 'Pedir',
    },
  },
  foodDetail: {
    notFound: 'Plato no encontrado',
    energyPerServing: 'Energía por ración',
    nutritionFacts: 'Información nutricional',
    ingredients: 'Ingredientes',
    addToOrder: 'Añadir al pedido',
    units: {
      g: 'g',
      kcal: 'kcal',
    },
    macros: {
      protein: 'Proteínas',
      fats: 'Grasas',
      carbs: 'Carbohidratos',
      fiber: 'Fibra',
    },
  },
  profile: {
    title: 'Perfil',
    memberSince: 'Miembro desde {{year}}',
    qrCodeTitle: 'Código QR para acceso',
    qrHint: 'Muestra el código en el torno',
    logout: 'Salir',
    version: 'Versión 1.0.0',
    menu: {
      membership: 'Membresía',
      history: 'Historial de servicios',
      results: 'Mis resultados',
      notifications: 'Notificaciones',
      language: 'Idioma',
      support: 'Soporte',
    },
    membershipValue: 'Premium hasta {{date}}',
    languageValue: {
      en: 'Inglés',
      uk: 'Ucraniano',
      ru: 'Ruso',
      es: 'Español',
    },
  },
  error: {
    title: 'Es necesaria una actualización',
    telegramUnavailable:
      'Telegram WebApp no está disponible. Abre la aplicación desde Telegram.',
    initFailed: 'Error al inicializar Telegram WebApp.',
    updateTelegram:
      'Actualiza Telegram a la última versión para tener compatibilidad completa.',
    retry: 'Intentar de nuevo',
    hint: 'Asegúrate de tener instalada la última versión de Telegram',
  },
} as const;

export default es;

