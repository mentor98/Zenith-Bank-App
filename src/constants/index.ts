/**
 * Application Constants
 */

export const BANK_INFO = {
  NAME: 'ZENITH BANK',
  TAGLINE: 'Your goals. Our priority.',
  ESTABLISHED: 2026,
  BRAND_COLOR: '#d60a14',
  SECONDARY_COLOR: '#a00a0f',
} as const;

export const ROUTES = {
  WELCOME: 'welcome',
  HOME: 'home',
  PRODUCTS: 'products',
  LIFESTYLE: 'lifestyle',
} as const;

export const TRANSACTION_TYPES = {
  TRANSFER: 'transfer',
  PAYMENT: 'payment',
  AIRTIME: 'airtime',
  BILLS: 'bills',
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
} as const;

export const SERVICES = [
  { id: 'home', label: 'Home', type: 'dashboard' },
  { id: 'pay-bills', label: 'Pay Bills', type: 'service' },
  { id: 'airtime', label: 'Airtime', type: 'service' },
  { id: 'transfer', label: 'Transfer', type: 'service' },
  { id: 'cards', label: 'Cards', type: 'service' },
  { id: 'locate-us', label: 'Locate Us', type: 'service' },
  { id: 'beneficiaries', label: 'Beneficiaries', type: 'service' },
  { id: 'forex', label: 'Forex', type: 'service' },
  { id: 'products', label: 'Products & Services', type: 'navigation' },
  { id: 'finance-manager', label: 'Finance Manager', type: 'service' },
  { id: 'lifestyle', label: 'Lifestyle', type: 'navigation' },
  { id: 'settings', label: 'Settings', type: 'service' },
  { id: 'alerts', label: 'Alerts', type: 'service' },
  { id: 'qr-payments', label: 'QR Payments', type: 'service' },
  { id: 'profile', label: 'Profile', type: 'service' },
  { id: 'upcoming', label: 'Upcoming', type: 'service' },
] as const;

export const BOTTOM_NAV = [
  { label: 'Home', tab: 'home' },
  { label: 'Pay Bills', tab: 'pay' },
  { label: 'Airtime', tab: 'airtime' },
  { label: 'Transfer', tab: 'transfer' },
  { label: 'More', tab: 'more' },
] as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  TRANSACTIONS: {
    LIST: '/transactions',
    TRANSFER: '/transactions/transfer',
    RECIPIENTS: '/transactions/recipients',
  },
  ACCOUNT: {
    BALANCE: '/account/balance',
    DETAILS: '/account/details',
    PROFILE: '/account/profile',
  },
  SERVICES: {
    PAY_BILLS: '/services/pay-bills',
    AIRTIME: '/services/airtime',
    FOREX_RATES: '/services/forex/rates',
  },
} as const;
