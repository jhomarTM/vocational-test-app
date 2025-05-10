'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, faFileAlt, faVideo, faCrown, faUser, faSignOutAlt, 
  faHome, faRoad, faCompass, faGraduationCap, faUserMd, faBars, faTimes,
  faChevronDown, faChevronRight, faCheck, faCalendarAlt 
} from '@fortawesome/free-solid-svg-icons';
import SolarSystem from './components/SolarSystem';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Definimos la interfaz para los tests
interface Test {
  route: string;
  name: string;
  description?: string;
  progress?: number;
  color?: string;
}

// Definir la interfaz para los elementos del menú con submenús
interface MenuItem {
  id: string;
  label: string;
  icon: IconDefinition;
  url?: string;
  highlight?: boolean;
  children?: Array<{id: string, label: string, url: string}>;
}

export default function Home() {
  const router = useRouter();
  const userName = "Jhomar";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Datos de la ruta de orientación del usuario
  const userRoadmap = {
    entrevistaInicial: true,
    testVocacional: false,
    testPersonalidad: false,
    capsulasVistas: 2,
    totalCapsulas: 5,
    recomendacionesGeneradas: false,
    siguientePaso: "test de personalidad",
    progreso: 25 // porcentaje de progreso en la ruta
  };
  
  // Lista de tests disponibles
  const tests = [
    { id: 'vocational', name: 'Test Vocacional', status: 'pendiente', icon: faCompass, desc: 'Descubre tus áreas de interés profesional' },
    { id: 'personality', name: 'Test de Personalidad', status: 'pendiente', icon: faUser, desc: 'Conoce tus rasgos de personalidad y cómo influyen en tu carrera' },
    { id: 'aptitude', name: 'Test de Aptitudes', status: 'pendiente', icon: faGraduationCap, desc: 'Identifica tus habilidades cognitivas y prácticas' },
    { id: 'values', name: 'Test de Valores', status: 'pendiente', icon: faFileAlt, desc: 'Descubre qué valores son importantes para ti en el trabajo' }
  ];
  
  // Lista de cápsulas de orientación
  const capsules = [
    { id: 1, title: 'Cómo elegir carrera sin presión externa', type: 'básico', completed: true },
    { id: 2, title: 'Conócete en 5 minutos', type: 'básico', completed: true },
    { id: 3, title: 'Errores comunes al decidir tu futuro', type: 'básico', completed: false },
    { id: 4, title: 'Descubre tus fortalezas ocultas', type: 'premium', completed: false },
    { id: 5, title: 'Tendencias del mercado laboral 2025', type: 'premium', completed: false }
  ];
  
  // Próximas asesorías (solo para mostrar en dashboard)
  const upcomingCounseling = [
    { id: 1, psychologist: 'Dra. María González', date: '15 Nov', time: '15:30', status: 'confirmada' }
  ];

  // Estructura de menú de navegación
  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Inicio', icon: faHome, url: '/' },
    { id: 'roadmap', label: 'Mi Ruta Profesional', icon: faRoad, url: '/roadmap' },
    { id: 'tests', label: 'Tests', icon: faFileAlt },
    { id: 'recommendations', label: 'Recomendaciones de Carrera', icon: faGraduationCap, url: '/recommendations' },
    { id: 'capsules', label: 'Cápsulas de Orientación', icon: faVideo, url: '/capsules' },
    { id: 'counseling', label: 'Asesorías con Psicólogos', icon: faUserMd, url: '/counseling' },
    { id: 'premium', label: 'Explorar Premium', icon: faCrown, url: '/premium', highlight: true }
  ];

  // Función para manejar clics en elementos del menú
  const handleMenuClick = (id: string, url?: string) => {
    if (id.includes('test-') || id === 'tests') {
      // Para los tests, activamos la sección principal de tests
      setActiveSection('tests');
    } else {
      setActiveSection(id);
    }
    
    // Si el elemento tiene submenús, manejamos la expansión
    const menuItem = menuItems.find(item => item.id === id);
    if (menuItem && 'children' in menuItem) {
      setActiveSubmenu(activeSubmenu === id ? null : id);
    } else if (url) {
      // Si no hay submenús y hay una URL, navega a ella
      router.push(url);
    }
  };

  // Manejador para el botón "Comenzar Test"
  const handleStartTest = (test: Test) => {
    router.push(test.route);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Renderizar el contenido según la sección activa
  const renderContent = () => {
    if (activeSection === 'home') {
      return (
        <div className="space-y-8">
          {/* Tarjeta de progreso en la ruta */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/80 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold flex items-center">
                  <FontAwesomeIcon icon={faRoad} className="text-blue-400 mr-3" />
                  Mi Ruta Profesional
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Tu progreso en el camino hacia la orientación vocacional
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <div className="text-2xl font-bold text-blue-400">{userRoadmap.progreso}%</div>
                <div className="text-xs text-gray-400">completado</div>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${userRoadmap.progreso}%` }}
              ></div>
            </div>
            
            {/* Siguiente paso */}
            <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="font-bold text-white mb-1">Siguiente paso recomendado</h3>
                <p className="text-blue-300 text-sm">Realiza tu {userRoadmap.siguientePaso} para avanzar en tu ruta</p>
              </div>
              <button 
                onClick={() => router.push('/test/personality')}
                className="mt-3 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center"
              >
                <span>Comenzar ahora</span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </div>
          
          {/* Grid de Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Widget: Tests */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/80 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center">
                  <FontAwesomeIcon icon={faFileAlt} className="text-indigo-400 mr-2" />
                  Tests
                </h3>
                <span className="text-xs bg-indigo-900/50 text-indigo-300 py-1 px-2 rounded-full">
                  0/{tests.length} completados
                </span>
              </div>
              <ul className="space-y-3">
                {tests.slice(0, 2).map(test => (
                  <li key={test.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={test.icon} className="text-gray-500 mr-2" />
                      <span className="text-sm">{test.name}</span>
                    </div>
                    <span className="text-xs text-yellow-400">Pendiente</span>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => handleMenuClick('tests')}
                    className="text-xs text-blue-400 hover:text-blue-300 mt-1 flex items-center"
                  >
                    <span>Ver todos los tests</span>
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1 text-xs" />
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Widget: Cápsulas */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/80 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center">
                  <FontAwesomeIcon icon={faVideo} className="text-green-400 mr-2" />
                  Cápsulas
                </h3>
                <div className="flex items-center bg-green-900/50 text-green-300 py-1 px-2 rounded-full text-xs">
                  <FontAwesomeIcon icon={faCheck} className="mr-1 text-xs" />
                  <span>{userRoadmap.capsulasVistas} vistas</span>
                </div>
              </div>
              <ul className="space-y-3">
                {capsules.slice(0, 2).map(capsule => (
                  <li key={capsule.id} className="flex items-center justify-between">
                    <span className="text-sm truncate">{capsule.title}</span>
                    {capsule.completed ? (
                      <span className="text-xs text-green-400 flex items-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-1" />
                        Vista
                      </span>
                    ) : (
                      <span className={`text-xs ${capsule.type === 'premium' ? 'text-amber-400' : 'text-blue-400'}`}>
                        {capsule.type === 'premium' ? 'Premium' : 'Disponible'}
                      </span>
                    )}
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => handleMenuClick('capsules')}
                    className="text-xs text-blue-400 hover:text-blue-300 mt-1 flex items-center"
                  >
                    <span>Explorar más cápsulas</span>
                    <FontAwesomeIcon icon={faArrowRight} className="ml-1 text-xs" />
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Widget: Próxima asesoría */}
            {upcomingCounseling.length > 0 ? (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/80 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-400 mr-2" />
                    Próxima Asesoría
                  </h3>
                  <span className="text-xs bg-purple-900/50 text-purple-300 py-1 px-2 rounded-full">
                    {upcomingCounseling[0].status}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center text-xl font-bold mr-3">
                    {upcomingCounseling[0].psychologist.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{upcomingCounseling[0].psychologist}</div>
                    <div className="text-sm text-gray-400">
                      {upcomingCounseling[0].date} • {upcomingCounseling[0].time}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleMenuClick('counseling')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg"
                >
                  Ver detalles
                </button>
              </div>
            ) : (
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/80 p-5">
                <div className="flex items-center mb-4">
                  <h3 className="font-bold flex items-center">
                    <FontAwesomeIcon icon={faUserMd} className="text-purple-400 mr-2" />
                    Asesorías
                  </h3>
                </div>
                <div className="text-center py-4">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-600 text-3xl mb-2" />
                  <p className="text-gray-400 text-sm mb-3">No tienes asesorías programadas</p>
                  <button 
                    onClick={() => handleMenuClick('counseling')}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg"
                  >
                    Reservar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Banner Premium */}
          <div className="bg-gradient-to-r from-[#2A1F3D]/90 to-[#1F2A3D]/90 backdrop-blur-sm rounded-xl border border-[#433667] p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-3 bg-amber-600/30 rounded-full mb-4 md:mb-0 md:mr-5">
                <FontAwesomeIcon icon={faCrown} className="text-amber-400 text-3xl" />
              </div>
              <div className="md:flex-1 text-center md:text-left mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-white mb-1">Desbloquea todo el potencial</h3>
                <p className="text-gray-300 text-sm md:max-w-lg">
                  Accede a todas las cápsulas premium, asesorías personalizadas y recomendaciones detalladas.
                </p>
              </div>
              <button 
                onClick={() => handleMenuClick('premium')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl shadow-md flex items-center"
              >
                <span>Explorar Premium</span>
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      );
    } else if (activeSection === 'tests') {
      return (
        <div className="space-y-4">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/80 p-5 mb-6">
            <h2 className="text-xl font-bold mb-2">Tests Vocacionales</h2>
            <p className="text-gray-400">
              Descubre tus aptitudes, intereses y valores profesionales a través de nuestros tests especializados.
              Cada test te acercará un paso más a tu vocación ideal.
            </p>
          </div>
          
          {/* Integración del componente SolarSystem para visualizar los tests como planetas */}
          <div className="h-[calc(100vh-300px)] max-h-[600px] max-w-[900px] mx-auto flex items-center justify-center">
            <SolarSystem onLearnMore={handleStartTest} />
          </div>
        </div>
      );
    }
    
    // Mensaje por defecto para otras secciones
    return (
      <div className="text-center py-16 text-gray-500">
        <p>Selecciona una opción del menú para comenzar</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#0B1120] text-white overflow-hidden">
      {/* Sidebar para móviles */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#131B2B] shadow-lg">
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center">
            <span className="text-lg font-bold">Brújula</span>
          </div>
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-[#1D2738]"
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Overlay para móviles */}
      {menuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static h-full z-50 bg-[#131B2B] border-r border-gray-800
        transition-all duration-300 ease-in-out
        ${menuOpen ? 'left-0' : '-left-64'} md:left-0
        w-56 md:w-56
      `}>
        <div className="flex flex-col h-full">
          {/* Logo y branding */}
          <div className="p-3 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-base font-bold">Brújula</div>
              <div className="text-[10px] bg-gradient-to-r from-blue-500 to-purple-600 py-0.5 px-1.5 rounded-full">Beta</div>
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">Tu guía vocacional inteligente</div>
          </div>
          
          {/* Perfil del usuario */}
          <div className="p-3 border-b border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold mr-2">
                {userName.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-sm">{userName}</div>
                <div className="text-[10px] text-gray-400">Plan Gratuito</div>
              </div>
            </div>
          </div>
          
          {/* Menú de navegación */}
          <div className="flex-1 overflow-y-auto py-2">
            <nav>
              <ul className="space-y-0.5 px-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    {item.id === 'tests' || !('children' in item) ? (
                      <button
                        onClick={() => handleMenuClick(item.id, item.url)}
                        className={`w-full flex items-center py-1.5 px-2 rounded-lg text-left text-xs
                          ${item.highlight ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 font-medium' : ''}
                          ${activeSection === item.id && !item.highlight ? 
                          'bg-[#1D2738] font-medium' : 
                          !item.highlight ? 'hover:bg-[#1D2738] text-gray-300' : ''}
                        `}
                      >
                        <FontAwesomeIcon 
                          icon={item.icon} 
                          className={`mr-2 ${
                            activeSection === item.id ? 'text-blue-400' : 
                            item.highlight ? 'text-white' : 'text-gray-500'
                          }`} 
                        />
                        <span>{item.label}</span>
                      </button>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleMenuClick(item.id)}
                          className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-left text-xs ${
                            activeSection === item.id ? 
                            'bg-[#1D2738] font-medium' : 
                            'hover:bg-[#1D2738] text-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <FontAwesomeIcon 
                              icon={item.icon} 
                              className={`mr-2 ${activeSection === item.id ? 'text-blue-400' : 'text-gray-500'}`} 
                            />
                            <span>{item.label}</span>
                          </div>
                          <FontAwesomeIcon 
                            icon={activeSubmenu === item.id ? faChevronDown : faChevronRight} 
                            className="text-[10px] text-gray-500" 
                          />
                        </button>
                        
                        {/* Submenú */}
                        {activeSubmenu === item.id && (
                          <ul className="ml-7 mt-0.5 space-y-0.5">
                            {item.children?.map((child) => (
                              <li key={child.id}>
                                <button
                                  onClick={() => router.push(child.url)}
                                  className={`w-full flex items-center py-1 px-2 rounded-lg text-[11px]
                                    ${activeSection === child.id ? 
                                    'bg-blue-900/30 text-blue-300 font-medium' : 
                                    'text-gray-400 hover:text-gray-200 hover:bg-[#1D2738]'}`}
                                >
                                  <span>{child.label}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* Footer del sidebar */}
          <div className="p-2 border-t border-gray-800">
            <button 
              onClick={() => router.push('/logout')}
              className="w-full flex items-center p-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-[#1D2738]"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto pt-14 md:pt-0">
        {/* Contenido del dashboard aquí */}
        <div className="flex-1 bg-gradient-to-b from-[#181F2B] to-[#0B1120] p-4 md:p-8 relative">
          {/* Fondo espacial */}
          <div className="absolute inset-0 overflow-hidden z-0">
            {/* Estrellas */}
            <div className="stars"></div>
            {/* Nebulosas */}
            <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-900/30 blur-3xl"></div>
            <div className="absolute bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full bg-blue-900/20 blur-3xl"></div>
          </div>
          
          {/* Header de la página */}
          <div className="relative z-10 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Bienvenido de nuevo, {userName}</h1>
            <p className="text-gray-400">Continúa tu viaje de descubrimiento profesional</p>
          </div>
          
          {/* Contenido del dashboard - Se renderizará según la sección activa */}
          <div className="relative z-10">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Estilos CSS para el fondo espacial */}
      <style jsx>{`
        .stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 200px 160px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 250px 220px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 300px 260px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 350px 300px, #eee, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 400px 350px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 450px 380px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 500px 420px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 550px 480px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 600px 520px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 650px 540px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 700px 580px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 750px 600px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 800px 650px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 750px 700px, #ddd, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 700px 750px, #fff, rgba(0,0,0,0));
          background-size: 1000px 1000px;
          background-repeat: repeat;
          animation: starMovement 100s linear infinite;
        }
        
        @keyframes starMovement {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-1000px);
          }
        }
      `}</style>
    </div>
  );
}
