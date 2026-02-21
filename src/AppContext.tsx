import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Schedule, Announcement, Product, OfferCategory, PaymentConfig } from './types';

interface AppContextType {
  schedules: Schedule[];
  announcements: Announcement[];
  products: Product[];
  offerCategories: OfferCategory[];
  paymentConfig: PaymentConfig;
  addSchedule: (schedule: Omit<Schedule, 'id'>) => void;
  removeSchedule: (id: string) => void;
  updateSchedule: (id: string, schedule: Partial<Schedule>) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  removeAnnouncement: (id: string) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  addOfferCategory: (category: Omit<OfferCategory, 'id'>) => void;
  removeOfferCategory: (id: string) => void;
  updateOfferCategory: (id: string, category: Partial<OfferCategory>) => void;
  updatePaymentConfig: (config: Partial<PaymentConfig>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialSchedules: Schedule[] = [
  { id: '1', day: 'Terça-feira', time: '19:30', title: 'Culto de Doutrina' },
  { id: '2', day: 'Quinta-feira', time: '19:30', title: 'Culto de Libertação' },
  { id: '3', day: 'Domingo', time: '09:00', title: 'Escola Bíblica Dominical' },
  { id: '4', day: 'Domingo', time: '18:00', title: 'Culto da Família' },
];

const initialAnnouncements: Announcement[] = [
  { id: '1', title: 'Retiro de Jovens', date: '15/03/2026', description: 'As inscrições para o retiro de jovens já estão abertas.', type: 'event' },
  { id: '2', title: 'Bazar Beneficente', date: '22/03/2026', description: 'Venha participar do nosso bazar em prol das obras sociais.', type: 'info' },
  { id: '3', title: 'Reunião de Obreiros', date: 'Todo primeiro sábado', description: 'Reunião mensal às 09:00.', type: 'alert' },
];

const initialProducts: Product[] = [
  { id: '1', name: 'Refrigerante', price: 500, category: 'drink' },
  { id: '2', name: 'Salgado', price: 700, category: 'food' },
  { id: '3', name: 'Água', price: 300, category: 'drink' },
  { id: '4', name: 'Bolo', price: 800, category: 'food' },
  { id: '5', name: 'Camiseta', price: 3500, category: 'clothing' },
  { id: '6', name: 'Livro', price: 2500, category: 'book' },
];

const initialOfferCategories: OfferCategory[] = [
  { id: '1', title: 'Oferta Missionária' },
  { id: '2', title: 'Oferta Comum' },
];

const initialPaymentConfig: PaymentConfig = {
  pixKey: '12.345.678/0001-90',
  pixKeyType: 'cnpj',
  cardMachineEnabled: true,
  cardMachineIp: '192.168.1.100',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [offerCategories, setOfferCategories] = useState<OfferCategory[]>(initialOfferCategories);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(initialPaymentConfig);

  const addSchedule = (schedule: Omit<Schedule, 'id'>) => {
    setSchedules([...schedules, { ...schedule, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const updateSchedule = (id: string, schedule: Partial<Schedule>) => {
    setSchedules(schedules.map(s => s.id === id ? { ...s, ...schedule } : s));
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    setAnnouncements([...announcements, { ...announcement, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const updateAnnouncement = (id: string, announcement: Partial<Announcement>) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, ...announcement } : a));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts([...products, { ...product, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...product } : p));
  };

  const addOfferCategory = (category: Omit<OfferCategory, 'id'>) => {
    setOfferCategories([...offerCategories, { ...category, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeOfferCategory = (id: string) => {
    setOfferCategories(offerCategories.filter(c => c.id !== id));
  };

  const updateOfferCategory = (id: string, category: Partial<OfferCategory>) => {
    setOfferCategories(offerCategories.map(c => c.id === id ? { ...c, ...category } : c));
  };

  const updatePaymentConfig = (config: Partial<PaymentConfig>) => {
    setPaymentConfig({ ...paymentConfig, ...config });
  };

  return (
    <AppContext.Provider value={{
      schedules,
      announcements,
      products,
      offerCategories,
      paymentConfig,
      addSchedule,
      removeSchedule,
      updateSchedule,
      addAnnouncement,
      removeAnnouncement,
      updateAnnouncement,
      addProduct,
      removeProduct,
      updateProduct,
      addOfferCategory,
      removeOfferCategory,
      updateOfferCategory,
      updatePaymentConfig,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppProvider');
  }
  return context;
}
