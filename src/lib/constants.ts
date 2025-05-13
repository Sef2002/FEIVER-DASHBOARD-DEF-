// Barber UUIDs
export const BARBER_IDS = {
  ALKET: '421add1b-66d3-477d-8244-af3f4fe21f39',
  GINO: 'dafdd2d8-a439-45d6-addb-7fb50ff24c5c',
} as const;

// Barber Images
export const BARBER_IMAGES = {
  [BARBER_IDS.ALKET]: 'https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg',
  [BARBER_IDS.GINO]: 'https://images.pexels.com/photos/1319461/pexels-photo-1319461.jpeg',
} as const;

// Appointment Statuses
export const appointmentStatuses = [
  'in attesa',
  'confermato',
  'cancellato',
  'assente',
] as const;