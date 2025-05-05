import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Menu, X, Plus, Mic, Image } from 'lucide-react';
import MessageBubble from 'components/MessageBubble';

const initialMessages = [
    {
        id: '1',
        text: 'Olá, como posso ajudar você hoje?',
        isUser: false,
        timestamp: '12:03',
    }
];

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp?: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: newMessage,
            isUser: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages([...messages, userMessage]);
        setNewMessage('');

        try {
            const apiUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/chat`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: newMessage }),
            });

            if (!response.ok) {
                console.error('Erro ao enviar mensagem:', response.statusText);
                const ecoErrorResponse: Message = {
                    id: (Date.now() + 2).toString(),
                    text: `Desculpe, houve um erro ao obter a resposta: ${response.statusText}`,
                    isUser: false,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages(prevMessages => [...prevMessages, ecoErrorResponse]);
                return;
            }

            const data = await response.json();
            const ecoResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: data, // A resposta do backend (OpenRouter) estará aqui
                isUser: false,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prevMessages => [...prevMessages, ecoResponse]);

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            const ecoErrorResponse: Message = {
                id: (Date.now() + 3).toString(),
                text: 'Desculpe, ocorreu um erro ao se comunicar com o servidor.',
                isUser: false,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prevMessages => [...prevMessages, ecoErrorResponse]);
        }
    };

    return (
        <div className="container-app flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="px-4 py-2 flex items-center justify-between border-b border-neutral-200 bg-white">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/menu')}
                        className="text-neutral-600 hover:text-neutral-800 transition-colors p-2"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-medium">ECO</h1>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="p-2 text-neutral-600 hover:text-neutral-800">
                        <Menu size={20} onClick={() => setMenuOpen(true)} />
                    </button>
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 bg-neutral-50">
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message.text}
                        isUser={message.isUser}
                        timestamp={message.timestamp}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-neutral-200 bg-white">
                <form onSubmit={handleSendMessage} className="relative">
                    <div className="flex items-center bg-neutral-100 rounded-2xl px-4 py-2">
                        <button type="button" className="p-2 text-neutral-600 hover:text-neutral-800">
                            <Plus size={20} />
                        </button>

                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Envie uma mensagem"
                            className="flex-1 bg-transparent border-0 focus:ring-0 px-3 py-2 text-base placeholder-neutral-500"
                        />

                        <div className="flex items-center space-x-2">
                            <button type="button" className="p-2 text-neutral-600 hover:text-neutral-800">
                                <Image size={20} />
                            </button>
                            <button type="button" className="p-2 text-neutral-600 hover:text-neutral-800">
                                <Mic size={20} />
                            </button>
                            <button
                                type="submit"
                                className="p-2 text-neutral-600 hover:text-neutral-800 disabled:opacity-50"
                                disabled={!newMessage.trim()}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Side Menu */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMenuOpen(false)}>
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        className="absolute right-0 top-0 bottom-0 w-[80%] sm:w-64 bg-white shadow-lg p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-medium text-lg">Configurações</h2>
                            <button onClick={() => setMenuOpen(false)}>
                                <X size={24} className="text-neutral-600" />
                            </button>
                        </div>

                        <nav className="space-y-4">
                            <a href="#" className="block py-2 text-neutral-800 hover:text-serenity-blue">
                                Tema Claro / Escuro
                            </a>
                            <a href="#" className="block py-2 text-neutral-800 hover:text-serenity-blue">
                                Redefinir Conversa
                            </a>
                            <a href="#" className="block py-2 text-neutral-800 hover:text-serenity-blue">
                                Histórico
                            </a>
                        </nav>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Chat;