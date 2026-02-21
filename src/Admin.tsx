import React, { useState, useEffect } from 'react';
import { useAppData } from './AppContext';
import { Lock, Plus, Trash2, ArrowLeft, Save, LogOut, Edit, Settings, CreditCard, QrCode } from 'lucide-react';
import { Schedule, Announcement, Product, OfferCategory, PaymentConfig } from './types';
import Swal from 'sweetalert2';

interface AdminProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'schedules' | 'announcements' | 'products' | 'offers' | 'config'>('schedules');
  const { 
    schedules, addSchedule, removeSchedule, updateSchedule,
    announcements, addAnnouncement, removeAnnouncement, updateAnnouncement,
    products, addProduct, removeProduct, updateProduct,
    offerCategories, addOfferCategory, removeOfferCategory, updateOfferCategory,
    paymentConfig, updatePaymentConfig
  } = useAppData();

  // Forms State
  const [newSchedule, setNewSchedule] = useState<Partial<Schedule>>({});
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);

  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({ type: 'info' });
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({ category: 'other' });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [newOfferCategory, setNewOfferCategory] = useState<Partial<OfferCategory>>({});
  const [editingOfferCategoryId, setEditingOfferCategoryId] = useState<string | null>(null);

  const [configForm, setConfigForm] = useState<PaymentConfig>(paymentConfig);

  useEffect(() => {
    setConfigForm(paymentConfig);
  }, [paymentConfig]);

  // ... (previous handlers remain the same)

  // --- Config Handler ---
  const handleSaveConfig = () => {
    updatePaymentConfig(configForm);
    Swal.fire('Salvo!', 'Configurações de pagamento atualizadas.', 'success');
  };

  // --- Schedule Handlers ---
  const handleSaveSchedule = () => {
    if (newSchedule.day && newSchedule.time && newSchedule.title) {
      if (editingScheduleId) {
        updateSchedule(editingScheduleId, newSchedule);
        Swal.fire('Atualizado!', 'O horário foi atualizado com sucesso.', 'success');
        setEditingScheduleId(null);
      } else {
        addSchedule(newSchedule as Omit<Schedule, 'id'>);
        Swal.fire('Adicionado!', 'Novo horário adicionado com sucesso.', 'success');
      }
      setNewSchedule({});
    } else {
      Swal.fire('Erro', 'Preencha todos os campos.', 'error');
    }
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setNewSchedule(schedule);
    setEditingScheduleId(schedule.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSchedule = (id: string) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removeSchedule(id);
        Swal.fire('Deletado!', 'O item foi removido.', 'success');
        if (editingScheduleId === id) {
          setEditingScheduleId(null);
          setNewSchedule({});
        }
      }
    });
  };

  // --- Announcement Handlers ---
  const handleSaveAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.date && newAnnouncement.description && newAnnouncement.type) {
      if (editingAnnouncementId) {
        updateAnnouncement(editingAnnouncementId, newAnnouncement);
        Swal.fire('Atualizado!', 'O aviso foi atualizado com sucesso.', 'success');
        setEditingAnnouncementId(null);
      } else {
        addAnnouncement(newAnnouncement as Omit<Announcement, 'id'>);
        Swal.fire('Adicionado!', 'Novo aviso adicionado com sucesso.', 'success');
      }
      setNewAnnouncement({ type: 'info' });
    } else {
      Swal.fire('Erro', 'Preencha todos os campos.', 'error');
    }
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setNewAnnouncement(announcement);
    setEditingAnnouncementId(announcement.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAnnouncement = (id: string) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removeAnnouncement(id);
        Swal.fire('Deletado!', 'O aviso foi removido.', 'success');
        if (editingAnnouncementId === id) {
          setEditingAnnouncementId(null);
          setNewAnnouncement({ type: 'info' });
        }
      }
    });
  };

  // --- Product Handlers ---
  const handleSaveProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      if (editingProductId) {
        updateProduct(editingProductId, newProduct);
        Swal.fire('Atualizado!', 'O produto foi atualizado com sucesso.', 'success');
        setEditingProductId(null);
      } else {
        addProduct(newProduct as Omit<Product, 'id'>);
        Swal.fire('Adicionado!', 'Novo produto adicionado com sucesso.', 'success');
      }
      setNewProduct({ category: 'other' });
    } else {
      Swal.fire('Erro', 'Preencha todos os campos.', 'error');
    }
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setEditingProductId(product.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id: string) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removeProduct(id);
        Swal.fire('Deletado!', 'O produto foi removido.', 'success');
        if (editingProductId === id) {
          setEditingProductId(null);
          setNewProduct({ category: 'other' });
        }
      }
    });
  };

  // --- Offer Category Handlers ---
  const handleSaveOfferCategory = () => {
    if (newOfferCategory.title) {
      if (editingOfferCategoryId) {
        updateOfferCategory(editingOfferCategoryId, newOfferCategory);
        Swal.fire('Atualizado!', 'A categoria de oferta foi atualizada.', 'success');
        setEditingOfferCategoryId(null);
      } else {
        addOfferCategory(newOfferCategory as Omit<OfferCategory, 'id'>);
        Swal.fire('Adicionado!', 'Nova categoria de oferta adicionada.', 'success');
      }
      setNewOfferCategory({});
    } else {
      Swal.fire('Erro', 'Preencha o título.', 'error');
    }
  };

  const handleEditOfferCategory = (category: OfferCategory) => {
    setNewOfferCategory(category);
    setEditingOfferCategoryId(category.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteOfferCategory = (id: string) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removeOfferCategory(id);
        Swal.fire('Deletado!', 'A categoria foi removida.', 'success');
        if (editingOfferCategoryId === id) {
          setEditingOfferCategoryId(null);
          setNewOfferCategory({});
        }
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Lock className="w-5 h-5" /> Painel Admin
        </h2>
        <button onClick={onLogout} className="text-slate-300 hover:text-white">
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-200 overflow-x-auto">
        <button 
          onClick={() => { setActiveTab('schedules'); setEditingScheduleId(null); setNewSchedule({}); }}
          className={`flex-1 min-w-[80px] py-3 text-sm font-bold whitespace-nowrap px-2 ${activeTab === 'schedules' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Horários
        </button>
        <button 
          onClick={() => { setActiveTab('announcements'); setEditingAnnouncementId(null); setNewAnnouncement({ type: 'info' }); }}
          className={`flex-1 min-w-[80px] py-3 text-sm font-bold whitespace-nowrap px-2 ${activeTab === 'announcements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Avisos
        </button>
        <button 
          onClick={() => { setActiveTab('products'); setEditingProductId(null); setNewProduct({ category: 'other' }); }}
          className={`flex-1 min-w-[80px] py-3 text-sm font-bold whitespace-nowrap px-2 ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Produtos
        </button>
        <button 
          onClick={() => { setActiveTab('offers'); setEditingOfferCategoryId(null); setNewOfferCategory({}); }}
          className={`flex-1 min-w-[80px] py-3 text-sm font-bold whitespace-nowrap px-2 ${activeTab === 'offers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Ofertas
        </button>
        <button 
          onClick={() => setActiveTab('config')}
          className={`flex-1 min-w-[80px] py-3 text-sm font-bold whitespace-nowrap px-2 ${activeTab === 'config' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Config
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* SCHEDULES TAB */}
        {activeTab === 'schedules' && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl shadow-sm border ${editingScheduleId ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'}`}>
              <h3 className="font-bold text-gray-700 mb-3">{editingScheduleId ? 'Editar Horário' : 'Adicionar Horário'}</h3>
              <div className="space-y-3">
                <input 
                  placeholder="Dia (ex: Domingo)" 
                  className="w-full p-2 border rounded-lg"
                  value={newSchedule.day || ''}
                  onChange={e => setNewSchedule({...newSchedule, day: e.target.value})}
                />
                <input 
                  placeholder="Horário (ex: 19:00)" 
                  className="w-full p-2 border rounded-lg"
                  value={newSchedule.time || ''}
                  onChange={e => setNewSchedule({...newSchedule, time: e.target.value})}
                />
                <input 
                  placeholder="Título (ex: Culto da Família)" 
                  className="w-full p-2 border rounded-lg"
                  value={newSchedule.title || ''}
                  onChange={e => setNewSchedule({...newSchedule, title: e.target.value})}
                />
                <div className="flex gap-2">
                  {editingScheduleId && (
                    <button 
                      onClick={() => { setEditingScheduleId(null); setNewSchedule({}); }}
                      className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-bold"
                    >
                      Cancelar
                    </button>
                  )}
                  <button 
                    onClick={handleSaveSchedule}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                  >
                    {editingScheduleId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />} 
                    {editingScheduleId ? 'Salvar' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {schedules.map(s => (
                <div key={s.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">{s.day} - {s.time}</p>
                    <p className="text-sm text-gray-600">{s.title}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEditSchedule(s)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteSchedule(s.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl shadow-sm border ${editingAnnouncementId ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'}`}>
              <h3 className="font-bold text-gray-700 mb-3">{editingAnnouncementId ? 'Editar Aviso' : 'Adicionar Aviso'}</h3>
              <div className="space-y-3">
                <input 
                  placeholder="Título" 
                  className="w-full p-2 border rounded-lg"
                  value={newAnnouncement.title || ''}
                  onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                />
                <input 
                  placeholder="Data/Período" 
                  className="w-full p-2 border rounded-lg"
                  value={newAnnouncement.date || ''}
                  onChange={e => setNewAnnouncement({...newAnnouncement, date: e.target.value})}
                />
                <textarea 
                  placeholder="Descrição" 
                  className="w-full p-2 border rounded-lg"
                  value={newAnnouncement.description || ''}
                  onChange={e => setNewAnnouncement({...newAnnouncement, description: e.target.value})}
                />
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={newAnnouncement.type}
                  onChange={e => setNewAnnouncement({...newAnnouncement, type: e.target.value as any})}
                >
                  <option value="info">Informação (Azul)</option>
                  <option value="event">Evento (Roxo)</option>
                  <option value="alert">Alerta (Vermelho)</option>
                </select>
                <div className="flex gap-2">
                  {editingAnnouncementId && (
                    <button 
                      onClick={() => { setEditingAnnouncementId(null); setNewAnnouncement({ type: 'info' }); }}
                      className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-bold"
                    >
                      Cancelar
                    </button>
                  )}
                  <button 
                    onClick={handleSaveAnnouncement}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                  >
                    {editingAnnouncementId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />} 
                    {editingAnnouncementId ? 'Salvar' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {announcements.map(a => (
                <div key={a.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-500">{a.date}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full text-white ${a.type === 'event' ? 'bg-purple-500' : a.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'}`}>
                      {a.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEditAnnouncement(a)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteAnnouncement(a.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl shadow-sm border ${editingProductId ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'}`}>
              <h3 className="font-bold text-gray-700 mb-3">{editingProductId ? 'Editar Produto' : 'Adicionar Produto'}</h3>
              <div className="space-y-3">
                <input 
                  placeholder="Nome do Produto" 
                  className="w-full p-2 border rounded-lg"
                  value={newProduct.name || ''}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
                <input 
                  type="number"
                  placeholder="Preço em centavos (ex: 500 = R$ 5,00)" 
                  className="w-full p-2 border rounded-lg"
                  value={newProduct.price || ''}
                  onChange={e => setNewProduct({...newProduct, price: parseInt(e.target.value)})}
                />
                <select 
                  className="w-full p-2 border rounded-lg"
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                >
                  <option value="food">Comida</option>
                  <option value="drink">Bebida</option>
                  <option value="clothing">Roupa</option>
                  <option value="book">Livro</option>
                  <option value="other">Outro</option>
                </select>
                <div className="flex gap-2">
                  {editingProductId && (
                    <button 
                      onClick={() => { setEditingProductId(null); setNewProduct({ category: 'other' }); }}
                      className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-bold"
                    >
                      Cancelar
                    </button>
                  )}
                  <button 
                    onClick={handleSaveProduct}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                  >
                    {editingProductId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />} 
                    {editingProductId ? 'Salvar' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {products.map(p => (
                <div key={p.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">{p.name}</p>
                    <p className="text-sm text-gray-600">
                      {(p.price / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <span className="text-xs text-gray-400 uppercase">{p.category}</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEditProduct(p)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OFFERS TAB */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl shadow-sm border ${editingOfferCategoryId ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'}`}>
              <h3 className="font-bold text-gray-700 mb-3">{editingOfferCategoryId ? 'Editar Categoria' : 'Adicionar Categoria de Oferta'}</h3>
              <div className="space-y-3">
                <input 
                  placeholder="Título (ex: Oferta para Reforma)" 
                  className="w-full p-2 border rounded-lg"
                  value={newOfferCategory.title || ''}
                  onChange={e => setNewOfferCategory({...newOfferCategory, title: e.target.value})}
                />
                <div className="flex gap-2">
                  {editingOfferCategoryId && (
                    <button 
                      onClick={() => { setEditingOfferCategoryId(null); setNewOfferCategory({}); }}
                      className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-bold"
                    >
                      Cancelar
                    </button>
                  )}
                  <button 
                    onClick={handleSaveOfferCategory}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
                  >
                    {editingOfferCategoryId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />} 
                    {editingOfferCategoryId ? 'Salvar' : 'Adicionar'}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {offerCategories.map(c => (
                <div key={c.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">{c.title}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEditOfferCategory(c)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDeleteOfferCategory(c.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONFIG TAB */}
        {activeTab === 'config' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-blue-600" /> Configuração PIX
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Chave</label>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={configForm.pixKeyType}
                    onChange={e => setConfigForm({...configForm, pixKeyType: e.target.value as any})}
                  >
                    <option value="cpf">CPF</option>
                    <option value="cnpj">CNPJ</option>
                    <option value="email">E-mail</option>
                    <option value="phone">Telefone</option>
                    <option value="random">Chave Aleatória</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chave PIX</label>
                  <input 
                    className="w-full p-2 border rounded-lg"
                    value={configForm.pixKey}
                    onChange={e => setConfigForm({...configForm, pixKey: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" /> Máquina de Cartão
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    id="cardMachineEnabled"
                    className="w-5 h-5 text-blue-600 rounded"
                    checked={configForm.cardMachineEnabled}
                    onChange={e => setConfigForm({...configForm, cardMachineEnabled: e.target.checked})}
                  />
                  <label htmlFor="cardMachineEnabled" className="text-gray-700 font-medium">Habilitar Integração</label>
                </div>
                
                {configForm.cardMachineEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IP / ID da Máquina</label>
                    <input 
                      className="w-full p-2 border rounded-lg"
                      value={configForm.cardMachineIp}
                      onChange={e => setConfigForm({...configForm, cardMachineIp: e.target.value})}
                    />
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={handleSaveConfig}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> SALVAR CONFIGURAÇÕES
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
