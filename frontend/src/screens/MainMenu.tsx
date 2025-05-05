import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from 'components/Logo';
import PageTransition from 'components/PageTransition';

const MainMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChatWithEco = () => {
    navigate('/chat');
  };

  return (
    <PageTransition>
      <div className="container-app p-8">
        {/* Sidebar menu */}
        <motion.div 
          className={`fixed inset-y-0 left-0 w-64 bg-white bg-opacity-90 backdrop-blur-md shadow-apple-md z-50 p-8 flex flex-col transition-all duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          initial={false}
        >
          <div className="flex justify-between items-center mb-12">
            <Logo size="sm" withAnimation={false} />
            <button onClick={toggleMenu} className="text-neutral-500 hover:text-neutral-800">
              <X size={24} />
            </button>
          </div>
          
          <nav className="space-y-6">
            <motion.a 
              href="#" 
              className="block text-neutral-800 hover:text-serenity-blue transition-colors"
              whileHover={{ x: 4 }}
            >
              Perfil
            </motion.a>
            <motion.a 
              href="#" 
              className="block text-neutral-800 hover:text-serenity-blue transition-colors"
              whileHover={{ x: 4 }}
            >
              Configurações
            </motion.a>
            <motion.a 
              href="#" 
              className="block text-neutral-800 hover:text-serenity-blue transition-colors"
              whileHover={{ x: 4 }}
            >
              Histórico
            </motion.a>
            <motion.a 
              href="#" 
              className="block text-neutral-800 hover:text-serenity-blue transition-colors"
              whileHover={{ x: 4 }}
            >
              Sobre a ECO
            </motion.a>
          </nav>
          
          <div className="mt-auto">
            <motion.button 
              onClick={() => navigate('/')}
              className="text-rose-quartz hover:text-rose-dark transition-colors"
              whileHover={{ x: 4 }}
            >
              Sair
            </motion.button>
          </div>
        </motion.div>
        
        {/* Overlay */}
        {menuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
        
        {/* Main content */}
        <div className="h-full flex flex-col">
          <header className="py-4">
            <button onClick={toggleMenu} className="text-neutral-600 hover:text-neutral-800 transition-colors">
              <Menu size={24} />
            </button>
          </header>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="mb-12">
              <Logo size="lg" />
            </div>
            
            <motion.button
              onClick={handleChatWithEco}
              className="btn-primary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Falar com o ECO
            </motion.button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MainMenu;