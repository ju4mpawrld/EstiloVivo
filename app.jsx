import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  DollarSign, 
  FileText, 
  LogOut, 
  Plus, 
  Search, 
  Eye, 
  TrendingUp, 
  AlertTriangle,
  User,
  ShoppingBag,
  Lock,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

// --- Datos Simulados Iniciales ---
const INITIAL_PRODUCTS = [
  { id: 101, name: "Sofá Velvet Azul", category: "Muebles", price: 450000, cost: 280000, stock: 4, status: "Activo" },
  { id: 102, name: "Lámpara Industrial", category: "Iluminación", price: 85000, cost: 45000, stock: 12, status: "Activo" },
  { id: 103, name: "Cojín Lino Beige", category: "Textiles", price: 25000, cost: 12000, stock: 50, status: "Activo" },
  { id: 104, name: "Espejo Redondo", category: "Accesorios", price: 60000, cost: 35000, stock: 0, status: "Sin Stock" },
];

const INITIAL_FINANCE = [
  { id: 1, type: "Ingreso", concept: "Venta Mayorista", amount: 1500000, date: "2023-10-20" },
  { id: 2, type: "Gasto", concept: "Pago Proveedor Telas", amount: -400000, date: "2023-10-21" },
  { id: 3, type: "Retiro", concept: "Retiro Personal Dueño (No Gasto)", amount: -100000, date: "2023-10-22" },
];

// --- Credenciales para la Demo ---
const CREDENTIALS = {
  admin: { pass: 'admin123', label: 'Dueño / Admin' },
  accountant: { pass: 'conta123', label: 'Contador Auditor' },
  inventory: { pass: 'bodega123', label: 'Jefe de Bodega' }
};

// --- Componente Principal ---
export default function EstiloVivoApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [finances, setFinances] = useState(INITIAL_FINANCE);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Muebles', price: '', cost: '', stock: '' });
  
  // Estados para el login
  const [selectedRoleForLogin, setSelectedRoleForLogin] = useState(null); // Nuevo estado para selección de rol
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- Lógica de Negocio ---

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const roleKey = selectedRoleForLogin;
    
    // Validación específica por usuario
    if (passwordInput !== CREDENTIALS[roleKey].pass) {
      setLoginError('Clave incorrecta para este perfil.');
      return;
    }
    
    // Login Exitoso
    setLoginError('');
    setPasswordInput(''); 
    setSelectedRoleForLogin(null);
    
    setCurrentUser({
      name: CREDENTIALS[roleKey].label,
      role: roleKey,
      permissions: roleKey === 'admin' ? ['all'] : roleKey === 'accountant' ? ['finance', 'tax'] : ['inventory']
    });
    setCurrentView(roleKey === 'inventory' ? 'inventory' : 'dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
    setSelectedProduct(null);
    setLoginError('');
    setPasswordInput('');
    setSelectedRoleForLogin(null);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: Date.now(),
      ...newProduct,
      price: Number(newProduct.price),
      cost: Number(newProduct.cost),
      stock: Number(newProduct.stock),
      status: Number(newProduct.stock) > 0 ? "Activo" : "Sin Stock"
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', category: 'Muebles', price: '', cost: '', stock: '' });
    alert("Producto agregado correctamente al sistema contable.");
  };

  const totalStockValue = products.reduce((acc, curr) => acc + (curr.cost * curr.stock), 0);
  const totalSalesPotential = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
  const estimatedTax = totalSalesPotential * 0.19;

  // --- Sub-Componentes (Vistas) ---

  const LoginScreen = () => (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-teal-600 transition-all">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-600 p-3 rounded-full">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-stone-800">Estilo Vivo</h1>
          <p className="text-stone-500 mt-2">Sistema de Gestión Integral</p>
        </div>
        
        {/* VISTA 1: Selección de Usuario */}
        {!selectedRoleForLogin && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-sm text-center text-stone-400 mb-4">¿Quién está ingresando hoy?</p>
            
            <button onClick={() => { setSelectedRoleForLogin('admin'); setLoginError(''); }} className="w-full flex items-center p-4 bg-white border border-stone-200 rounded-xl hover:bg-teal-50 hover:border-teal-500 transition-all shadow-sm group">
              <div className="bg-stone-100 p-2 rounded-lg group-hover:bg-teal-200 transition-colors">
                <User className="w-5 h-5 text-stone-600 group-hover:text-teal-800" />
              </div>
              <div className="ml-4 text-left">
                <span className="block font-semibold text-stone-700">Dueño / Admin</span>
                <span className="text-xs text-stone-500">Acceso Total</span>
              </div>
            </button>

            <button onClick={() => { setSelectedRoleForLogin('accountant'); setLoginError(''); }} className="w-full flex items-center p-4 bg-white border border-stone-200 rounded-xl hover:bg-blue-50 hover:border-blue-500 transition-all shadow-sm group">
              <div className="bg-stone-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                <FileText className="w-5 h-5 text-stone-600 group-hover:text-blue-800" />
              </div>
              <div className="ml-4 text-left">
                <span className="block font-semibold text-stone-700">Contador</span>
                <span className="text-xs text-stone-500">Finanzas y Tributario</span>
              </div>
            </button>

            <button onClick={() => { setSelectedRoleForLogin('inventory'); setLoginError(''); }} className="w-full flex items-center p-4 bg-white border border-stone-200 rounded-xl hover:bg-amber-50 hover:border-amber-500 transition-all shadow-sm group">
              <div className="bg-stone-100 p-2 rounded-lg group-hover:bg-amber-200 transition-colors">
                <Package className="w-5 h-5 text-stone-600 group-hover:text-amber-800" />
              </div>
              <div className="ml-4 text-left">
                <span className="block font-semibold text-stone-700">Bodeguero</span>
                <span className="text-xs text-stone-500">Inventario</span>
              </div>
            </button>
          </div>
        )}

        {/* VISTA 2: Ingreso de Clave */}
        {selectedRoleForLogin && (
          <div className="animate-fade-in">
            <button 
              onClick={() => { setSelectedRoleForLogin(null); setPasswordInput(''); setLoginError(''); }}
              className="flex items-center text-sm text-stone-400 hover:text-stone-600 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Volver a selección
            </button>

            <div className="text-center mb-6">
               <span className="bg-stone-100 text-stone-600 px-4 py-1 rounded-full text-sm font-bold">
                 {CREDENTIALS[selectedRoleForLogin].label}
               </span>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-600 mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-teal-600"/> Ingrese su clave personal:
                </label>
                <input 
                  type="password" 
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full p-3 text-center text-lg tracking-widest border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-shadow"
                />
                
                {/* Pista de Contraseñas para la Demo */}
                <div className="mt-3 text-xs text-center text-stone-400 bg-stone-50 p-2 rounded border border-stone-200">
                  <p>Clave Demo: <strong>{CREDENTIALS[selectedRoleForLogin].pass}</strong></p>
                </div>

                {loginError && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-100 rounded text-red-600 text-xs font-bold flex items-center justify-center animate-pulse">
                    <AlertTriangle className="w-3 h-3 mr-1"/> {loginError}
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="w-full bg-teal-600 text-white p-3 rounded-xl font-bold hover:bg-teal-700 transition-all transform active:scale-95 shadow-lg flex justify-center items-center gap-2"
              >
                Ingresar al Sistema <CheckCircle className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-stone-800">Panel de Control Financiero</h2>
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
        <AlertTriangle className="text-red-500" />
        <p className="text-red-700 text-sm">
          <strong>Alerta de Gestión:</strong> Se detectaron 2 transacciones personales mezcladas con fondos de la empresa esta semana. Por favor clasificar en "Finanzas".
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-stone-500 font-medium">Valor Inventario (Costo)</h3>
            <Package className="text-teal-600 w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-stone-800">${totalStockValue.toLocaleString('es-CL')}</p>
          <p className="text-xs text-teal-600 mt-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> Activo Corriente Real</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-stone-500 font-medium">Provisión Impuestos (IVA)</h3>
            <FileText className="text-blue-600 w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-stone-800">${estimatedTax.toLocaleString('es-CL')}</p>
          <p className="text-xs text-stone-400 mt-2">Basado en stock actual</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-stone-500 font-medium">Flujo de Caja Real</h3>
            <DollarSign className="text-amber-600 w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-stone-800">$1.100.000</p>
          <p className="text-xs text-red-500 mt-2">Excluyendo retiros personales</p>
        </div>
      </div>
    </div>
  );

  const InventoryModule = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-800">Módulo Principal: Productos</h2>
        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold">
          Base de Datos Centralizada
        </span>
      </div>

      {/* Formulario de Ingreso (Requerimiento Clave) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
        <h3 className="text-lg font-semibold mb-4 text-stone-700 flex items-center">
          <Plus className="w-5 h-5 mr-2" /> Ingreso de Nuevo Producto
        </h3>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-stone-500 mb-1">Nombre Producto</label>
            <input 
              required
              type="text" 
              placeholder="Ej: Lámpara de Pie" 
              className="w-full p-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              value={newProduct.name}
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Categoría</label>
            <select 
              className="w-full p-2 border border-stone-300 rounded-lg"
              value={newProduct.category}
              onChange={e => setNewProduct({...newProduct, category: e.target.value})}
            >
              <option>Muebles</option>
              <option>Iluminación</option>
              <option>Textiles</option>
              <option>Accesorios</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Precio Venta</label>
            <input 
              required
              type="number" 
              placeholder="$" 
              className="w-full p-2 border border-stone-300 rounded-lg"
              value={newProduct.price}
              onChange={e => setNewProduct({...newProduct, price: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1">Stock Inicial</label>
            <div className="flex gap-2">
              <input 
                required
                type="number" 
                placeholder="Cant." 
                className="w-full p-2 border border-stone-300 rounded-lg"
                value={newProduct.stock}
                onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
              />
               <button type="submit" className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700">
                <Plus className="w-5 h-5" />
              </button>
            </div>
           
          </div>
           <input 
              type="hidden" 
              value={newProduct.cost} 
              onChange={e => setNewProduct({...newProduct, cost: e.target.value})} 
           />
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-50 text-stone-700 uppercase font-semibold">
            <tr>
              <th className="p-4">Producto</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                <td className="p-4 font-medium text-stone-800">{product.name}</td>
                <td className="p-4">
                  <span className="bg-stone-100 px-2 py-1 rounded text-xs">{product.category}</span>
                </td>
                <td className="p-4">${product.price.toLocaleString('es-CL')}</td>
                <td className="p-4">
                  <span className={`${product.stock < 5 ? 'text-red-500 font-bold' : 'text-green-600'}`}>
                    {product.stock} un.
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="text-teal-600 hover:text-teal-800 hover:bg-teal-50 p-2 rounded-full transition-colors"
                    title="Consultar Detalle"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const FinanceSupportModule = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-800">Interfaz de Apoyo: Finanzas</h2>
        <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-xs font-bold border border-amber-200">
          OBJETIVO: Separar Cuentas Personales vs. Negocio
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-stone-200">
          <h3 className="font-semibold mb-4 text-stone-700">Registro de Movimientos</h3>
          <ul className="space-y-3">
            {finances.map((f) => (
              <li key={f.id} className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border-l-4 border-l-transparent hover:border-l-stone-400 transition-all">
                <div>
                  <p className="font-medium text-stone-800">{f.concept}</p>
                  <p className="text-xs text-stone-500">{f.date} • {f.type}</p>
                </div>
                <span className={`font-mono font-bold ${f.amount > 0 ? 'text-green-600' : f.type === 'Retiro' ? 'text-amber-600' : 'text-red-600'}`}>
                  {f.amount > 0 ? '+' : ''} ${Math.abs(f.amount).toLocaleString('es-CL')}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
          <h3 className="font-semibold mb-2 text-teal-800">Diagnóstico</h3>
          <p className="text-sm text-teal-700 mb-4">
            La "Interoperabilidad" con el inventario muestra que tienes $1.3M en capital inmovilizado (stock). 
            Los retiros personales deben limitarse al 10% de las ventas netas para evitar multas del SSI.
          </p>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 w-3/4"></div>
          </div>
          <p className="text-xs text-right mt-1 text-teal-600">Salud Financiera: 75%</p>
        </div>
      </div>
    </div>
  );

  const TaxSupportModule = () => (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-800">Interfaz de Apoyo: Tributario (SSI)</h2>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
        <h3 className="font-semibold text-stone-800 mb-4">Planificación Fiscal (Interoperable con Inventario)</h3>
        <p className="text-sm text-stone-600 mb-6">
          Basado en el stock ingresado en el módulo principal, se proyectan las siguientes obligaciones.
          Esto evita sorpresas y multas por retrasos.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-stone-500 uppercase bg-stone-50">
              <tr>
                <th className="px-4 py-3">Concepto</th>
                <th className="px-4 py-3">Base Imponible</th>
                <th className="px-4 py-3">Monto Estimado</th>
                <th className="px-4 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-stone-100">
                <td className="px-4 py-3 font-medium">IVA Débito (Ventas Potenciales)</td>
                <td className="px-4 py-3">${totalSalesPotential.toLocaleString()}</td>
                <td className="px-4 py-3 text-red-600">${(totalSalesPotential * 0.19).toLocaleString()}</td>
                <td className="px-4 py-3"><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">Pendiente</span></td>
              </tr>
               <tr className="border-b border-stone-100">
                <td className="px-4 py-3 font-medium">PPM (1.5%)</td>
                <td className="px-4 py-3">${totalSalesPotential.toLocaleString()}</td>
                <td className="px-4 py-3 text-red-600">${(totalSalesPotential * 0.015).toLocaleString()}</td>
                <td className="px-4 py-3"><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">Pendiente</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ProductDetailModal = () => {
    if (!selectedProduct) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
          <button 
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
          >
            <LogOut className="w-6 h-6 rotate-45" />
          </button>
          
          <h2 className="text-2xl font-bold text-stone-800 mb-1">{selectedProduct.name}</h2>
          <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
            {selectedProduct.category}
          </span>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 rounded-lg">
              <p className="text-xs text-stone-500 uppercase">Precio Venta</p>
              <p className="text-xl font-bold text-stone-800">${selectedProduct.price.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg">
              <p className="text-xs text-stone-500 uppercase">Costo Unitario</p>
              <p className="text-xl font-bold text-stone-600">${selectedProduct.cost.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg col-span-2 flex justify-between items-center">
              <div>
                <p className="text-xs text-stone-500 uppercase">Stock Actual</p>
                <p className="text-xl font-bold text-stone-800">{selectedProduct.stock} unidades</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${selectedProduct.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
          </div>

          <div className="mt-6 border-t border-stone-100 pt-4">
             <p className="text-sm font-semibold text-stone-700 mb-2">Análisis de Rentabilidad:</p>
             <div className="flex justify-between text-sm">
                <span>Margen por unidad:</span>
                <span className="text-green-600 font-bold">${(selectedProduct.price - selectedProduct.cost).toLocaleString()}</span>
             </div>
             <p className="text-xs text-stone-400 mt-2 italic">
               Este dato ayuda a tomar decisiones financieras reales, separando gastos del negocio de la ganancia neta.
             </p>
          </div>
        </div>
      </div>
    );
  };

  if (!currentUser) return <LoginScreen />;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col">
        <div className="p-6 border-b border-stone-800">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="text-teal-500" /> Estilo Vivo
          </h1>
          <p className="text-xs mt-2 text-stone-500">
            Usuario: <span className="text-stone-300">{currentUser.name}</span>
          </p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${currentView === 'dashboard' ? 'bg-teal-600 text-white' : 'hover:bg-stone-800'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" /> Panel General
          </button>

          <button 
            onClick={() => setCurrentView('inventory')}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${currentView === 'inventory' ? 'bg-teal-600 text-white' : 'hover:bg-stone-800'}`}
          >
            <Package className="w-5 h-5 mr-3" /> Productos (Principal)
          </button>

          {(currentUser.role === 'admin' || currentUser.role === 'accountant') && (
            <>
              <button 
                onClick={() => setCurrentView('finance')}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${currentView === 'finance' ? 'bg-teal-600 text-white' : 'hover:bg-stone-800'}`}
              >
                <DollarSign className="w-5 h-5 mr-3" /> Finanzas
              </button>
              <button 
                onClick={() => setCurrentView('tax')}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${currentView === 'tax' ? 'bg-teal-600 text-white' : 'hover:bg-stone-800'}`}
              >
                <FileText className="w-5 h-5 mr-3" /> Tributario / SSI
              </button>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center p-2 text-stone-400 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-stone-800 capitalize">
              {currentView === 'dashboard' && 'Visión General'}
              {currentView === 'inventory' && 'Gestión de Inventario'}
              {currentView === 'finance' && 'Control Financiero'}
              {currentView === 'tax' && 'Documentos y SSI'}
            </h2>
            <p className="text-stone-500 text-sm">Administración y control para tienda retail.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-white p-2 rounded-full shadow-sm border border-stone-200 text-stone-400">
               <User className="w-5 h-5" />
             </div>
          </div>
        </header>

        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'inventory' && <InventoryModule />}
        {currentView === 'finance' && <FinanceSupportModule />}
        {currentView === 'tax' && <TaxSupportModule />}

        <ProductDetailModal />

      </main>
    </div>
  );
}
