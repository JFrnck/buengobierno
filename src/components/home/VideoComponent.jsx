import React from 'react';

const CampaignVideoPlayer = () => {
  return (
    <div style={{
      maxWidth: '450px', // Reducido para que sea más pequeño
      margin: '20px auto', // Centrado con un poco de margen arriba y abajo
      borderRadius: '16px', // Bordes redondeados modernos
      overflow: 'hidden', // Evita que el video se salga de los bordes redondeados
      backgroundColor: '#000', // Fondo negro por si el video tarda un segundo en cargar
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)', // Sombra ligera para darle profundidad
      lineHeight: 0,
      display: 'flex',
      aspectRatio: '1 / 1' // Fuerza a que el contenedor sea cuadrado
    }}>
      <video 
        controls 
        playsInline // Crucial para que en iOS no se abra en pantalla completa automáticamente
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: '1 / 1', // Mantiene el formato cuadrado del video
          objectFit: 'cover', // Recorta el video vertical para que encaje en el cuadrado
          display: 'block',
          margin: 0,
          padding: 0
        }}
      >
        <source src="/jorgenieto-vid.mov" type="video/quicktime" />
        {/* Fallback en caso de que el formato falle */}
        <source src="/jorgenieto-vid.mov" type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>
    </div>
  );
};

export default CampaignVideoPlayer;