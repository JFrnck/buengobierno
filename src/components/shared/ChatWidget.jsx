import React, { useState, useEffect, useRef } from 'react';

export default function CoquitoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: '¡Hola! 🌞 Soy Cocosol, la mascota oficial del Partido del Buen Gobierno.' },
    { role: 'bot', content: '¿Qué te gustaría saber sobre el plan de gobierno de Jorge Nieto?' }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: userText },
      { role: 'bot', content: '' } 
    ]);

    const url = `https://api.partidodelbuengobierno.com/chat/stream?message=${encodeURIComponent(userText)}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const newWord = event.data;
      
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        
        // El truco está aquí: clonamos la burbuja antes de sumarle la palabra nueva
        // para que el Strict Mode de React no la duplique.
        newMessages[lastIndex] = { 
          ...newMessages[lastIndex], 
          content: newMessages[lastIndex].content + newWord 
        };
        
        return newMessages;
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsLoading(false);
    };
  };

  // Función mágica para renderizar las **negritas** que envía OpenAI
  const formatMessage = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999] font-sans">
      
      {/* Tooltip flotante "¡Pregúntame!" */}
      <div 
        className={`absolute bottom-[85px] right-[-5px] bg-white text-[#D72638] border-2 border-[#F5C800] px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap shadow-md pointer-events-none animate-bounce transition-all duration-300 ${isOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
      >
        ¡Pregúntame!
        {/* Triangulito del globo de texto */}
        <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#F5C800]"></div>
      </div>

      {/* Ventana del Chat */}
      <div 
        className={`absolute bottom-[90px] right-0 w-[350px] h-[550px] max-h-[80vh] bg-white rounded-[20px] border border-[#F5C800] shadow-2xl flex flex-col overflow-hidden origin-bottom-right transition-all duration-300 ease-out ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-[#D72638] text-white p-5 flex justify-between items-center border-b-[3px] border-[#F5C800]">
          <div>
            <h2 className="m-0 text-lg font-bold leading-tight">Partido del Buen Gobierno 🌞</h2>
            <p className="m-0 mt-1 text-sm font-medium opacity-90">Cocosol está en línea</p>
          </div>
          <button 
            onClick={toggleChat}
            className="bg-transparent border-none text-white text-3xl cursor-pointer hover:scale-110 transition-transform leading-none"
            aria-label="Cerrar chat"
          >
            &times;
          </button>
        </div>

        {/* Cuerpo del Chat */}
        <div className="flex-1 p-5 overflow-y-auto bg-gray-50 flex flex-col gap-3">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-[85%] p-3 text-sm leading-relaxed font-medium break-words ${
                msg.role === 'user' 
                  ? 'self-end bg-[#F5C800] text-[#1A1A1A] rounded-t-2xl rounded-bl-2xl rounded-br-sm' 
                  : 'self-start bg-[#F5C800]/20 text-[#1A1A1A] border border-[#F5C800]/50 rounded-t-2xl rounded-br-2xl rounded-bl-sm'
              }`}
            >
              {formatMessage(msg.content)}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer / Input */}
        <div className="p-4 bg-white border-t border-[#F5C800]/30">
          <form className="flex gap-2" onSubmit={sendMessage}>
            <input
              type="text"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full text-sm outline-none focus:border-[#F5C800] focus:ring-1 focus:ring-[#F5C800] transition-all"
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="bg-[#D72638] text-white w-11 h-11 rounded-full flex items-center justify-center hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Botón Circular Toggle */}
      <button 
        className="absolute bottom-0 right-0 w-[70px] h-[70px] rounded-full border-[3px] border-[#F5C800] bg-white bg-cover bg-center shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-105 hover:shadow-2xl transition-all duration-300 z-50 bg-[url('/logo-sol-pbg.png')]"
        onClick={toggleChat}
        aria-label="Abrir chat"
      />
    </div>
  );
}