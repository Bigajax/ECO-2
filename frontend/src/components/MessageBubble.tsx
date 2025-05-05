import React from 'react';
import { motion } from 'framer-motion';
import EcoAvatar from './EcoAvatar';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isUser,
  timestamp,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start mb-6`}
    >
      {!isUser && (
        <div className="mr-3 mt-1">
          <EcoAvatar size="sm" />
        </div>
      )}
      
      <div 
        className={`
          ${isUser 
            ? 'bg-serenity-blue text-white rounded-2xl rounded-tr-sm' 
            : 'bg-white rounded-2xl rounded-tl-sm shadow-sm'
          } 
          px-4 py-3 max-w-[80%]
        `}
      >
        <p className="text-[15px] leading-relaxed">{message}</p>
        {timestamp && (
          <div className="text-[11px] opacity-70 mt-1">
            {timestamp}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;