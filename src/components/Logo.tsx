import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withAnimation?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withAnimation = true }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-5xl',
    lg: 'text-7xl',
  };

  const logoComponent = (
    <h1 className={`${sizeClasses[size]} font-medium text-neutral-800 tracking-tight`}>
      ECO
    </h1>
  );

  if (!withAnimation) {
    return logoComponent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {logoComponent}
    </motion.div>
  );
};

export default Logo;