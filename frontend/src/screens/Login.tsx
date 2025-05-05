import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../frontend/components/Logo';
import PageTransition from '../../frontend/components/PageTransition';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/menu');
  };

  const handleCreateAccount = () => {
    alert('Esta funcionalidade seria implementada em uma versão completa.');
  };

  return (
    <PageTransition>
      <div className="container-app px-6 py-8 sm:p-8">
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-full max-w-sm animate-fade-in">
            <div className="mb-8 sm:mb-12 flex justify-center">
              <Logo size="md" />
            </div>
            
            <motion.form 
              onSubmit={handleLogin}
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-base sm:text-lg"
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-base sm:text-lg"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                className="btn-primary w-full text-base sm:text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Entrar
              </motion.button>
            </motion.form>
            
            <motion.div 
              className="mt-6 sm:mt-8 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <button 
                onClick={handleCreateAccount}
                className="btn-ghost mb-4 text-base sm:text-lg"
              >
                Criar perfil
              </button>
              
              <button className="text-sm sm:text-base text-serenity-blue hover:text-serenity-dark transition-colors">
                Esqueci minha senha
              </button>
              
              <motion.div 
                className="mt-6 sm:mt-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <button className="text-sm sm:text-base font-medium text-rose-quartz hover:text-rose-dark transition-colors">
                  Iniciar tour pela ECO
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;