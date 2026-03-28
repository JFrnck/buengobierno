import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

export default function CoquitoChat() {
  useEffect(() => {
    // Inicializamos el chat de n8n
    const chat = createChat({
      webhookUrl: 'https://buengobierno.app.n8n.cloud/webhook/13c1b3ba-998f-4907-b425-b3e31eee2c77/chat',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      initialMessages: [
        '¡Hola! 🌞 Soy Cocosol, la mascota oficial del Partido del Buen Gobierno.',
        '¿Qué te gustaría saber sobre el plan de gobierno de Jorge Nieto?'
      ],
      i18n: {
        en: {
          title: 'Partido del Buen Gobierno 🌞',
          subtitle: 'Busco tus dudas en el plan de gobierno en tiempo real, esperame un poquito 🌞',
          footer: 'Construyendo un mejor futuro',
          getStarted: 'Nueva conversación',
          inputPlaceholder: 'Escribe tu mensaje...',
          closeButtonTooltip: 'Cerrar chat'
        },
      },
    });

    let observer; // Variable para nuestro vigilante

    // --- NUEVA LÓGICA: Vigilante para saber si el chat está abierto ---
    // Usamos setInterval porque a veces n8n tarda unos milisegundos en inyectar el HTML
    const setupObserver = setInterval(() => {
      const chatWindow = document.querySelector('.chat-window');
      const toggleButton = document.querySelector('.chat-window-toggle');

      if (chatWindow && toggleButton) {
        clearInterval(setupObserver); // Ya los encontramos, detenemos la búsqueda

        // Creamos el vigilante que observará cambios en la ventana
        observer = new MutationObserver(() => {
          const styles = window.getComputedStyle(chatWindow);
          const isChatOpen = styles.opacity !== '0' && styles.display !== 'none';
          
          if (isChatOpen) {
            toggleButton.classList.add('chat-is-open'); // Agrega clase para ocultar tooltip
          } else {
            toggleButton.classList.remove('chat-is-open'); // Quita clase para mostrar tooltip
          }
        });

        // Le decimos que observe si cambian los estilos o las clases de la ventana del chat
        observer.observe(chatWindow, { attributes: true, attributeFilter: ['style', 'class'] });
      }
    }, 500);

    // --- LÓGICA EXISTENTE: Cierre automático al hacer clic fuera ---
    const handleOutsideClick = (event) => {
      const chatWindow = document.querySelector('.chat-window');
      const toggleButton = document.querySelector('.chat-window-toggle');

      if (chatWindow && toggleButton) {
        const styles = window.getComputedStyle(chatWindow);
        const isChatOpen = styles.opacity !== '0' && styles.display !== 'none';

        const clickedInsideChat = chatWindow.contains(event.target);
        const clickedOnToggle = toggleButton.contains(event.target);

        if (isChatOpen && !clickedInsideChat && !clickedOnToggle) {
          const closeBtn = chatWindow.querySelector('button[title="Cerrar chat"]') || 
                           chatWindow.querySelector('button[aria-label="Cerrar chat"]') || 
                           document.querySelector('.chat-window header button');
          
          if (closeBtn) {
            closeBtn.click();
          } else {
            toggleButton.click(); 
          }
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    // Función de limpieza al desmontar el componente
    return () => {
      clearInterval(setupObserver);
      if (observer) observer.disconnect(); // Apagamos el vigilante

      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      
      const chatContainer = document.querySelector('.chat-window');
      const toggleBtn = document.querySelector('.chat-window-toggle');
      if (chatContainer) chatContainer.remove();
      if (toggleBtn) toggleBtn.remove();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* 1. FUENTE MONTSERRAT */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');

        :root {
          --chat--color-secondary: #D72638;
          --chat--color-primary: #F5C800;
          --chat--color-white: #ffffff;
          --chat--color-dark: #1A1A1A;
          --chat--window--background: var(--chat--color-white);
          --chat--window--border-radius: 20px;
          --chat--header--background: var(--chat--color-secondary);
          --chat--header--color: var(--chat--color-white);
          --chat--message--user--background: var(--chat--color-primary);
          --chat--message--user--color: var(--chat--color-white);
          --chat--message--bot--background: rgba(245, 200, 0, 0.2);
          --chat--message--bot--color: var(--chat--color-dark);
        }

        .chat-window, .chat-window * { font-family: 'Montserrat', sans-serif !important; }

        .chat-window {
          border: 1px solid #F5C800 !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
          bottom: 90px !important;
        }

        .chat-header-title, .chat-header h1 {
          font-weight: 700 !important;
          color: #ffffff !important;
          font-size: 1.35rem !important;
          position: relative !important;
        }

        .chat-header-title::after, .chat-header h1::after {
          content: '';
          display: block !important;
          width: 100% !important;
          height: 1px !important;
          background-color: rgba(255, 255, 255, 0.4) !important;
          margin-top: 12px !important;
          margin-bottom: 6px !important;
        }

        .chat-header p, .chat-header span, .chat-header-subtitle, div[class*="subtitle"] {
          color: #ffffff !important;
          font-weight: 500 !important;
          opacity: 0.95 !important;
        }

        .chat-message.bot .chat-message-bubble, .chat-message-bot, div[class*="bot"] > div[class*="bubble"], .chat-message-bot .chat-message-bubble {
          background-color: rgba(245, 200, 0, 0.2) !important;
          border: 1px solid #F5C800 !important;
          border-radius: 20px 20px 20px 4px !important;
          padding: 14px 18px !important;
          font-weight: 500 !important;
          line-height: 1.5 !important;
          box-shadow: none !important;
        }

        .chat-message.user .chat-message-bubble, .chat-message-user .chat-message-bubble, div[class*="user"] > div[class*="bubble"] {
          border-radius: 20px 20px 4px 20px !important;
          font-weight: 500 !important;
        }

        .chat-window-toggle {
          background-color: transparent !important;
          background-image: url('/logo-sol-pbg.png') !important;
          background-size: cover !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          border: 3px solid #F5C800 !important;
          border-radius: 50% !important;
          width: 70px !important;
          height: 70px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
          bottom: 20px !important;
        }

        .chat-window-toggle:hover {
          transform: translateY(-4px) scale(1.05) !important;
          box-shadow: 0 12px 28px rgba(215, 38, 56, 0.3) !important;
        }

        .chat-window-toggle svg { display: none !important; }

        .chat-input-container { border-top: 1px solid rgba(245, 200, 0, 0.3) !important; }

        /* ----------------------------------------------------
        MENSAJE FLOTANTE "¿PREGÚNTAME?"
        ---------------------------------------------------- */
        .chat-window-toggle::before {
          content: '¡Pregúntame!';
          position: absolute;
          bottom: 85px;
          right: -5px;
          background-color: var(--chat--color-white);
          color: var(--chat--color-secondary);
          border: 2px solid var(--chat--color-primary);
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700 !important;
          font-size: 14px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          pointer-events: none;
          z-index: 1000;
          animation: anime-pulse 2s infinite ease-in-out !important;
        }

        .chat-window-toggle::after {
          content: '';
          position: absolute;
          bottom: 73px;
          right: 25px;
          border-width: 12px 12px 0;
          border-style: solid;
          border-color: var(--chat--color-primary) transparent transparent transparent;
          pointer-events: none;
          animation: anime-pulse 2s infinite ease-in-out !important;
        }

        @keyframes anime-pulse {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.03); }
          100% { transform: translateY(0) scale(1); }
        }

        /* ✨ EL SECRETO: Ocultar cuando el usuario hace hover O el chat está abierto ✨ */
        .chat-window-toggle:hover::before,
        .chat-window-toggle:hover::after,
        .chat-window-toggle.chat-is-open::before,
        .chat-window-toggle.chat-is-open::after {
          opacity: 0 !important;
          visibility: hidden !important;
          transition: opacity 0.2s ease, visibility 0.2s;
        }
      `}} />
    </>
  );
}