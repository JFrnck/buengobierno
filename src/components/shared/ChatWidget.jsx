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

    // Función de limpieza al desmontar el componente
    return () => {
      const chatContainer = document.querySelector('.chat-window');
      const toggleButton = document.querySelector('.chat-window-toggle');
      if (chatContainer) chatContainer.remove();
      if (toggleButton) toggleButton.remove();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* 1. FUENTE MONTSERRAT */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap');

        :root {
          /* Colores principales de la marca */
          --chat--color-secondary: #D72638; /* Rojo */
          --chat--color-primary: #F5C800; /* Amarillo */
          --chat--color-white: #ffffff;
          --chat--color-dark: #1A1A1A;

          /* Diseño base de la ventana */
          --chat--window--background: var(--chat--color-white);
          --chat--window--border-radius: 20px;

          /* 🎨 CABECERA */
          --chat--header--background: var(--chat--color-secondary);
          --chat--header--color: var(--chat--color-white);

          /* Variables de colores para los mensajes */
          --chat--message--user--background: var(--chat--color-primary);
          --chat--message--user--color: var(--chat--color-white);

          /* Fondo base del bot */
          --chat--message--bot--background: rgba(245, 200, 0, 0.2);
          --chat--message--bot--color: var(--chat--color-dark);
        }

        /* ----------------------------------------------------
        TIPOGRAFÍA Y ESTILOS GENERALES
        ---------------------------------------------------- */
        .chat-window, .chat-window * {
          font-family: 'Montserrat', sans-serif !important;
        }

        .chat-window {
          border: 1px solid #F5C800 !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
          bottom: 90px !important;
        }

        /* ----------------------------------------------------
        TÍTULOS Y LÍNEA SEPARADORA (HR FALSO)
        ---------------------------------------------------- */
        .chat-header-title, .chat-header h1 {
          font-weight: 700 !important;
          color: #ffffff !important;
          font-size: 1.35rem !important;
          position: relative !important;
        }

        /* ✨ AQUÍ ESTÁ LA LÍNEA SEPARADORA ✨ */
        .chat-header-title::after, .chat-header h1::after {
          content: '';
          display: block !important;
          width: 100% !important; /* Ancho de la línea */
          height: 1px !important; /* Grosor de la línea */
          background-color: rgba(255, 255, 255, 0.4) !important; /* Blanco semitransparente para que se vea elegante */
          margin-top: 12px !important; /* Espacio arriba de la línea */
          margin-bottom: 6px !important; /* Espacio debajo de la línea */
        }

        /* Selector agresivo para obligar al subtítulo a ser blanco */
        .chat-header p,
        .chat-header span,
        .chat-header-subtitle,
        div[class*="subtitle"] {
          color: #ffffff !important;
          font-weight: 500 !important;
          opacity: 0.95 !important;
        }

        /* ----------------------------------------------------
        BURBUJAS DE COQUITO
        ---------------------------------------------------- */
        .chat-message.bot .chat-message-bubble,
        .chat-message-bot,
        div[class*="bot"] > div[class*="bubble"],
        .chat-message-bot .chat-message-bubble {
          background-color: rgba(245, 200, 0, 0.2) !important;
          border: 1px solid #F5C800 !important;
          border-radius: 20px 20px 20px 4px !important;
          padding: 14px 18px !important;
          font-weight: 500 !important;
          line-height: 1.5 !important;
          box-shadow: none !important;
        }

        /* Forma de las burbujas del usuario */
        .chat-message.user .chat-message-bubble,
        .chat-message-user .chat-message-bubble,
        div[class*="user"] > div[class*="bubble"] {
          border-radius: 20px 20px 4px 20px !important;
          font-weight: 500 !important;
        }

        /* ----------------------------------------------------
        BOTÓN FLOTANTE (COQUITO)
        ---------------------------------------------------- */
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

        .chat-window-toggle svg {
          display: none !important;
        }

        /* Área de escritura */
        .chat-input-container {
          border-top: 1px solid rgba(245, 200, 0, 0.3) !important;
        }

        /* ----------------------------------------------------
        MENSAJE FLOTANTE "¿PREGÚNTAME?" (TIPO TOOLTIP)
        ---------------------------------------------------- */
        /* La burbuja de texto */
        .chat-window-toggle::before {
          content: '¡Pregúntame!';
          position: absolute;
          bottom: 85px; /* Altura sobre el botón */
          right: -5px; /* Alineación respecto al botón */
          background-color: var(--chat--color-white);
          color: var(--chat--color-secondary); /* Texto rojo para llamar la atención */
          border: 2px solid var(--chat--color-primary); /* Borde amarillo */
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700 !important;
          font-size: 14px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          pointer-events: none; /* Evita que estorbe al hacer clic */
          z-index: 1000;
          animation: anime-pulse 2s infinite ease-in-out !important;
        }

        /* El pequeño triángulo apuntando hacia abajo */
        .chat-window-toggle::after {
          content: '';
          position: absolute;
          bottom: 73px; /* Justo debajo de la burbuja */
          right: 25px; /* Centrado sobre el botón de 70px */
          border-width: 12px 12px 0;
          border-style: solid;
          border-color: var(--chat--color-primary) transparent transparent transparent;
          pointer-events: none;
          animation: anime-pulse 2s infinite ease-in-out !important;
        }

        /* ----------------------------------------------------
        ANIMACIÓN ANIME-PULSE
        ---------------------------------------------------- */
        @keyframes anime-pulse {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-6px) scale(1.03); /* Sube un poquito y se infla */
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        /* Ocultar el mensaje cuando el usuario pasa el mouse sobre el botón */
        .chat-window-toggle:hover::before,
        .chat-window-toggle:hover::after {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
      `}} />
    </>
  );
}