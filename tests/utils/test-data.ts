export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  GLITCH: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  ERROR: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  VISUAL: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
} as const;

export const PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  BIKE_LIGHT: 'Sauce Labs Bike Light',
  BOLT_T_SHIRT: 'Sauce Labs Bolt T-Shirt',
  FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
  ONESIE: 'Sauce Labs Onesie',
  RED_T_SHIRT: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const SORT_OPTIONS = {
  AZ: 'az',
  ZA: 'za',
  LO_HI: 'lohi',
  HI_LO: 'hilo',
} as const;

export const ERROR_MESSAGES = {
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
  INVALID_LOGIN: 'Epic sadface: Username and password do not match any user in this service',
  EMPTY_USERNAME: 'Epic sadface: Username is required',
  EMPTY_PASSWORD: 'Epic sadface: Password is required',
} as const;

export const API_BASE_URL = 'https://restful-booker.herokuapp.com';

export const BOOKING_TEMPLATE = {
  VALID: {
    firstname: 'João',
    lastname: 'Silva',
    totalprice: 350,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-15',
      checkout: '2026-01-20',
    },
    additionalneeds: 'Café da manhã incluso',
  },
  MISSING_FIRSTNAME: {
    lastname: 'Silva',
    totalprice: 350,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-15',
      checkout: '2026-01-20',
    },
    additionalneeds: 'Sem primeiro nome',
  },
  MISSING_LASTNAME: {
    firstname: 'João',
    totalprice: 350,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-15',
      checkout: '2026-01-20',
    },
    additionalneeds: 'Sem sobrenome',
  },
  INVALID_DATES: {
    firstname: 'João',
    lastname: 'Silva',
    totalprice: 350,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-25',
      checkout: '2026-01-20',
    },
    additionalneeds: 'Datas inválidas',
  },
  NEGATIVE_PRICE: {
    firstname: 'João',
    lastname: 'Silva',
    totalprice: -100,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-01-15',
      checkout: '2026-01-20',
    },
    additionalneeds: 'Preço negativo',
  },
} as const;
