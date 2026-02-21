import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  HandCoins, 
  Clock, 
  Megaphone, 
  ShoppingCart, 
  ChevronLeft, 
  Delete, 
  QrCode, 
  CreditCard, 
  Banknote,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Info,
  GlassWater,
  Utensils,
  Shirt,
  BookOpen,
  Settings
} from 'lucide-react';
import { AppProvider, useAppData } from './AppContext';
import AdminDashboard from './Admin';
import { Screen, OfferType, Product } from './types';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedOfferType, setSelectedOfferType] = useState<OfferType | ''>('');
  const [amount, setAmount] = useState<string>('0');
  const [cpfEnabled, setCpfEnabled] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  const { schedules, announcements, products } = useAppData();

  const formatCurrency = (value: string) => {
    const number = parseInt(value) / 100;
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleDigitPress = (digit: string) => {
    setAmount(prev => {
      if (prev.length >= 8) return prev; // Limit length
      return prev === '0' ? digit : prev + digit;
    });
  };

  const handleBackspace = () => {
    setAmount(prev => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const resetFlow = () => {
    setCurrentScreen('HOME');
    setSelectedCategory('');
    setSelectedOfferType('');
    setAmount('0');
    setCpfEnabled(false);
  };

  const goBack = () => {
    switch (currentScreen) {
      case 'OFFER_TYPE':
      case 'SCHEDULES':
      case 'ANNOUNCEMENTS':
      case 'POS':
      case 'ADMIN_LOGIN':
        setCurrentScreen('HOME');
        break;
      case 'VALUE_INPUT':
        if (selectedCategory === 'Dízimo') {
            setCurrentScreen('HOME');
        } else {
            setCurrentScreen('OFFER_TYPE');
        }
        break;
      case 'PAYMENT_METHOD':
        setCurrentScreen('VALUE_INPUT');
        break;
      case 'PROCESSING':
        setCurrentScreen('PAYMENT_METHOD');
        break;
      default:
        setCurrentScreen('HOME');
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === '123456') {
      setCurrentScreen('ADMIN_DASHBOARD');
      setAdminPassword('');
      setAdminError('');
    } else {
      setAdminError('Senha incorreta');
      setAdminPassword('');
    }
  };

  const handleAdminDigitPress = (digit: string) => {
    setAdminPassword(prev => {
      if (prev.length >= 6) return prev;
      return prev + digit;
    });
  };

  const handleAdminBackspace = () => {
    setAdminPassword(prev => prev.slice(0, -1));
  };

  // --- Screens ---

  const HomeScreen = () => (
    <div className="flex flex-col gap-4 p-6 h-full justify-center max-w-md mx-auto w-full relative">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bem-vindo</h1>
        <p className="text-gray-600">Selecione uma opção abaixo</p>
      </div>

      <MenuButton 
        icon={<Heart className="w-8 h-8" />} 
        label="DÍZIMO" 
        color="bg-red-600" 
        onClick={() => {
          setSelectedCategory('Dízimo');
          setSelectedOfferType('Dízimo');
          setCurrentScreen('VALUE_INPUT');
        }} 
      />
      <MenuButton 
        icon={<HandCoins className="w-8 h-8" />} 
        label="OFERTA" 
        color="bg-green-600" 
        onClick={() => {
          setSelectedCategory('Oferta');
          setCurrentScreen('OFFER_TYPE');
        }} 
      />
      <MenuButton 
        icon={<Clock className="w-8 h-8" />} 
        label="HORÁRIOS" 
        color="bg-blue-600" 
        onClick={() => setCurrentScreen('SCHEDULES')} 
      />
      <MenuButton 
        icon={<Megaphone className="w-8 h-8" />} 
        label="AVISOS" 
        color="bg-yellow-500" 
        textColor="text-white"
        onClick={() => setCurrentScreen('ANNOUNCEMENTS')} 
      />
      <MenuButton 
        icon={<ShoppingCart className="w-8 h-8" />} 
        label="PDV E FESTA" 
        color="bg-sky-500" 
        onClick={() => setCurrentScreen('POS')} 
      />

      <button 
        onClick={() => setCurrentScreen('ADMIN_LOGIN')}
        className="absolute top-0 right-0 p-2 text-gray-300 hover:text-gray-500 transition-colors"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );

  const AdminLoginScreen = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Área Administrativa</h2>
      <p className="text-gray-500 mb-8">Digite a senha de acesso (123456)</p>
      
      <div className="w-full max-w-xs space-y-6">
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full border-2 ${i < adminPassword.length ? 'bg-slate-800 border-slate-800' : 'bg-white border-gray-300'}`}
            />
          ))}
        </div>

        {adminError && <p className="text-red-500 text-center font-medium animate-pulse">{adminError}</p>}

        <div className="grid grid-cols-3 gap-3 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleAdminDigitPress(num.toString())}
              className="h-16 bg-white rounded-xl shadow-sm border border-gray-200 text-2xl font-semibold text-slate-700 active:bg-slate-100 transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            className="h-16 bg-transparent rounded-xl flex items-center justify-center"
            disabled
          ></button>
          <button
            onClick={() => handleAdminDigitPress('0')}
            className="h-16 bg-white rounded-xl shadow-sm border border-gray-200 text-2xl font-semibold text-slate-700 active:bg-slate-100 transition-colors"
          >
            0
          </button>
          <button
            onClick={handleAdminBackspace}
            className="h-16 bg-slate-100 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-slate-600 active:bg-slate-200 transition-colors"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={handleAdminLogin}
          disabled={adminPassword.length !== 6}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all ${adminPassword.length === 6 ? 'bg-slate-800 text-white hover:bg-slate-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          ENTRAR
        </button>
      </div>
    </div>
  );

  const SchedulesScreen = () => (
    <div className="flex flex-col gap-4 p-6 h-full max-w-md mx-auto w-full">
      <h2 className="text-xl font-bold text-center text-gray-700 mb-4">Horários dos Cultos</h2>
      
      <div className="space-y-3">
        {schedules.map(s => (
          <ScheduleItem key={s.id} day={s.day} time={s.time} title={s.title} />
        ))}
        {schedules.length === 0 && <p className="text-center text-gray-500">Nenhum horário cadastrado.</p>}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Secretaria
        </h3>
        <p className="text-sm text-blue-700">
          Segunda a Sexta: 08:00 às 17:00<br/>
          Sábado: 08:00 às 12:00
        </p>
      </div>
    </div>
  );

  const OfferTypeScreen = () => (
    <div className="flex flex-col gap-4 p-6 h-full justify-center max-w-md mx-auto w-full">
      <h2 className="text-xl font-bold text-center text-gray-700 mb-4">Selecione o tipo de oferta</h2>
      
      {useAppData().offerCategories.map(category => (
        <MenuButton 
          key={category.id}
          label={category.title.toUpperCase()} 
          color="bg-green-600" 
          onClick={() => {
            setSelectedOfferType(category.title);
            setCurrentScreen('VALUE_INPUT');
          }} 
        />
      ))}
    </div>
  );

  const ValueInputScreen = () => (
    <div className="flex flex-col h-full max-w-md mx-auto w-full bg-gray-50">
      <div className="flex-1 flex flex-col p-6 items-center justify-center">
        <h2 className="text-lg font-medium text-gray-600 mb-2">Informe o valor da oferta</h2>
        
        <div className="w-full bg-white border-2 border-blue-500 rounded-lg p-4 mb-4 text-center shadow-sm">
            <span className="text-sm text-gray-500 block mb-1">Valor</span>
            <span className="text-4xl font-bold text-gray-800">{formatCurrency(amount)}</span>
        </div>

        <div className="flex items-center gap-3 mb-6 w-full justify-center" onClick={() => setCpfEnabled(!cpfEnabled)}>
          <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${cpfEnabled ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'}`}>
            {cpfEnabled && <CheckCircle2 className="w-4 h-4 text-white" />}
          </div>
          <span className="text-gray-700 select-none">Desejo informar um CPF no recibo</span>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleDigitPress(num.toString())}
              className="h-16 bg-white rounded-lg shadow-sm border border-gray-200 text-2xl font-semibold text-blue-600 active:bg-blue-50 transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleDigitPress('0')}
            className="h-16 col-start-2 bg-white rounded-lg shadow-sm border border-gray-200 text-2xl font-semibold text-blue-600 active:bg-blue-50 transition-colors"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-16 bg-gray-100 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 active:bg-gray-200 transition-colors"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        <button 
          onClick={() => {
            if (parseInt(amount) > 0) setCurrentScreen('PAYMENT_METHOD');
          }}
          className={`mt-8 w-full py-4 rounded-xl font-bold text-white text-lg shadow-md transition-all ${parseInt(amount) > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          CONFIRMAR
        </button>
      </div>
    </div>
  );

  const PaymentMethodScreen = () => (
    <div className="flex flex-col gap-4 p-6 h-full justify-center max-w-md mx-auto w-full">
      <h2 className="text-xl font-bold text-center text-gray-700 mb-6">Selecione o tipo de operação</h2>
      
      <MenuButton 
        icon={<QrCode className="w-8 h-8" />}
        label="PIX" 
        color="bg-blue-600" 
        onClick={() => setCurrentScreen('PROCESSING')} 
      />
      <MenuButton 
        icon={<Banknote className="w-8 h-8" />}
        label="DÉBITO" 
        color="bg-blue-600" 
        onClick={() => setCurrentScreen('PROCESSING')} 
      />
      <MenuButton 
        icon={<CreditCard className="w-8 h-8" />}
        label="CRÉDITO" 
        color="bg-blue-600" 
        onClick={() => setCurrentScreen('PROCESSING')} 
      />
    </div>
  );

  const ProcessingScreen = () => {
    const { paymentConfig } = useAppData();
    const [status, setStatus] = useState('Conectando...');

    React.useEffect(() => {
      // Simulation logic
      if (currentScreen === 'PROCESSING') {
        // If it's a card payment and machine is enabled
        if (paymentConfig.cardMachineEnabled) {
           setStatus(`Conectando à máquina (${paymentConfig.cardMachineIp})...`);
        } else {
           setStatus('Processando pagamento...');
        }

        const timer = setTimeout(() => {
          setCurrentScreen('SUCCESS');
        }, 4000);
        return () => clearTimeout(timer);
      }
    }, []);

    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Aguarde</h2>
        <p className="text-gray-600 mb-4">{status}</p>
        
        {/* Show Pix Key if applicable - simplified logic for demo */}
        <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-500">
           <p>Chave PIX configurada:</p>
           <p className="font-mono font-bold">{paymentConfig.pixKey}</p>
        </div>
      </div>
    );
  };

  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Obrigado!</h2>
      <p className="text-gray-600 mb-8">Sua contribuição foi recebida com sucesso.</p>
      
      <button 
        onClick={resetFlow}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors"
      >
        VOLTAR AO INÍCIO
      </button>
    </div>
  );

  const POSScreen = () => {
    const [cart, setCart] = useState<{id: string, name: string, price: number, qty: number}[]>([]);

    const addToCart = (product: Product) => {
      setCart(prev => {
        const existing = prev.find(p => p.id === product.id);
        if (existing) {
          return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
        }
        return [...prev, { ...product, qty: 1 }];
      });
    };

    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const handleCheckout = () => {
      setAmount(total.toString());
      setCurrentScreen('PAYMENT_METHOD');
    };

    const getIcon = (category: string) => {
      switch (category) {
        case 'food': return <Utensils className="w-6 h-6" />;
        case 'drink': return <GlassWater className="w-6 h-6" />;
        case 'clothing': return <Shirt className="w-6 h-6" />;
        case 'book': return <BookOpen className="w-6 h-6" />;
        default: return <ShoppingCart className="w-6 h-6" />;
      }
    };

    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="p-4 bg-white shadow-sm z-10">
          <h2 className="text-xl font-bold text-center text-gray-700">Cantina e Livraria</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3 mb-20">
            {products.map(product => {
              const inCart = cart.find(p => p.id === product.id);
              return (
                <button 
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${inCart ? 'border-sky-500 bg-sky-50' : 'border-gray-100 bg-white shadow-sm'}`}
                >
                  <div className={`p-3 rounded-full ${inCart ? 'bg-sky-100 text-sky-600' : 'bg-gray-100 text-gray-500'}`}>
                    {getIcon(product.category)}
                  </div>
                  <span className="font-bold text-gray-700">{product.name}</span>
                  <span className="text-sm font-semibold text-sky-600">
                    {(product.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  {inCart && (
                    <div className="absolute top-2 right-2 bg-sky-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {inCart.qty}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cart Summary Footer */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">{cart.reduce((acc, i) => acc + i.qty, 0)} itens</span>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">Total a pagar</span>
                <span className="text-2xl font-bold text-sky-600">
                  {(total / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full py-3 bg-sky-500 text-white rounded-xl font-bold text-lg shadow-md hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              FINALIZAR COMPRA
            </button>
          </div>
        )}
      </div>
    );
  };

  const AnnouncementsScreen = () => (
    <div className="flex flex-col gap-4 p-6 h-full max-w-md mx-auto w-full">
      <h2 className="text-xl font-bold text-center text-gray-700 mb-4">Avisos e Comunicados</h2>
      
      <div className="space-y-4">
        {announcements.map(a => (
          <AnnouncementItem 
            key={a.id}
            title={a.title} 
            date={a.date} 
            description={a.description}
            type={a.type}
          />
        ))}
        {announcements.length === 0 && <p className="text-center text-gray-500">Nenhum aviso no momento.</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="w-full h-screen sm:h-[800px] sm:w-[480px] bg-white sm:rounded-3xl sm:shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Header / Top Bar */}
        {currentScreen !== 'ADMIN_DASHBOARD' && (
          <div className="bg-white p-4 flex items-center justify-center border-b border-gray-100 z-10">
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Totem Digital</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative bg-slate-50">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {currentScreen === 'HOME' && <HomeScreen />}
              {currentScreen === 'SCHEDULES' && <SchedulesScreen />}
              {currentScreen === 'ANNOUNCEMENTS' && <AnnouncementsScreen />}
              {currentScreen === 'POS' && <POSScreen />}
              {currentScreen === 'OFFER_TYPE' && <OfferTypeScreen />}
              {currentScreen === 'VALUE_INPUT' && <ValueInputScreen />}
              {currentScreen === 'PAYMENT_METHOD' && <PaymentMethodScreen />}
              {currentScreen === 'PROCESSING' && <ProcessingScreen />}
              {currentScreen === 'SUCCESS' && <SuccessScreen />}
              {currentScreen === 'ADMIN_LOGIN' && <AdminLoginScreen />}
              {currentScreen === 'ADMIN_DASHBOARD' && <AdminDashboard onLogout={() => setCurrentScreen('HOME')} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer / Back Button */}
        {currentScreen !== 'HOME' && currentScreen !== 'SUCCESS' && currentScreen !== 'PROCESSING' && currentScreen !== 'ADMIN_DASHBOARD' && (
          <div className="bg-white p-4 border-t border-gray-100">
            <button 
              onClick={goBack}
              className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
              VOLTAR
            </button>
          </div>
        )}

        {/* Branding Footer */}
        {currentScreen !== 'ADMIN_DASHBOARD' && (
          <div className="bg-white p-2 text-center border-t border-gray-50">
            <p className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">Theòs Sistemas</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

// Reusable Components

interface MenuButtonProps {
  icon?: React.ReactNode;
  label: string;
  color: string;
  textColor?: string;
  onClick: () => void;
}

function MenuButton({ icon, label, color, textColor = 'text-white', onClick }: MenuButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`${color} ${textColor} w-full p-6 rounded-xl shadow-lg flex items-center gap-4 transform transition-transform active:scale-95 hover:brightness-110`}
    >
      {icon && <div className="p-2 bg-white/20 rounded-lg">{icon}</div>}
      <span className="text-xl font-bold tracking-wide flex-1 text-left">{label}</span>
    </button>
  );
}

interface ScheduleItemProps {
  day: string;
  time: string;
  title: string;
}

function ScheduleItem({ day, time, title }: ScheduleItemProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
      <div>
        <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{day}</p>
        <p className="font-bold text-gray-800">{title}</p>
      </div>
      <div className="bg-gray-100 px-3 py-1 rounded-lg">
        <span className="font-mono font-semibold text-gray-700">{time}</span>
      </div>
    </div>
  );
}

interface AnnouncementItemProps {
  title: string;
  date: string;
  description: string;
  type: 'event' | 'info' | 'alert';
}

function AnnouncementItem({ title, date, description, type }: AnnouncementItemProps) {
  const getBorderColor = () => {
    switch (type) {
      case 'event': return 'border-l-purple-500';
      case 'alert': return 'border-l-red-500';
      default: return 'border-l-blue-500';
    }
  };

  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 ${getBorderColor()}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">{date}</span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
