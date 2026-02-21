export interface Schedule {
  id: string;
  day: string;
  time: string;
  title: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  description: string;
  type: 'event' | 'info' | 'alert';
}

export interface Product {
  id: string;
  name: string;
  price: number; // in cents
  category: 'food' | 'drink' | 'clothing' | 'book' | 'other';
}

export type Screen = 
  | 'HOME' 
  | 'OFFER_TYPE' 
  | 'VALUE_INPUT' 
  | 'PAYMENT_METHOD' 
  | 'PROCESSING' 
  | 'SUCCESS' 
  | 'SCHEDULES' 
  | 'ANNOUNCEMENTS' 
  | 'POS'
  | 'ADMIN_LOGIN'
  | 'ADMIN_DASHBOARD';

export interface OfferCategory {
  id: string;
  title: string;
}

export interface PaymentConfig {
  pixKey: string;
  pixKeyType: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random';
  cardMachineEnabled: boolean;
  cardMachineIp: string;
}

export type OfferType = string;
