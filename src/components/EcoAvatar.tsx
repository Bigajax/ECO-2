import React from 'react';

interface EcoAvatarProps {
  size?: 'sm' | 'md' | 'lg';
}

const EcoAvatar: React.FC<EcoAvatarProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-rose-quartz to-serenity-blue rounded-full opacity-80 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-full transform scale-90"></div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
        <span className="text-xs">ECO</span>
      </div>
    </div>
  );
};

export default EcoAvatar;