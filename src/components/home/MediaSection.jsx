import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEOS = [
  { 
    id: 1, 
    title: 'Discurso de lanzamiento', 
    youtubeId: '0Tw1T6nU_YI', 
    start: 0, 
    end: 0,   
    duration: '0:30', 
    views: '12K', 
    featured: true 
  },
  { 
    id: 2, 
    title: 'Propuesta educativa en cifras', 
    youtubeId: '0Tw1T6nU_YI', 
    start: 0, 
    end: 0,
    duration: '2:15', 
    views: '8K', 
    featured: false 
  },
  { 
    id: 3, 
    title: 'Visita a comunidades', 
    youtubeId: '0Tw1T6nU_YI', 
    duration: '3:48', 
    views: '6K', 
    featured: false 
  },
]

// Ajustamos los tamaños para formar un rectángulo perfecto de 4 columnas
const IMAGES = [
  { id: 1, label: 'Caravana por el norte', size: 'tall' },        
  { id: 2, label: 'Encuentro con líderes comunitarios', size: 'wide' }, 
  { id: 3, label: 'Rally de apertura', size: 'normal' },      
  { id: 4, label: 'Sede central PBG', size: 'large-wide' },   
]

export default function MediaSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const videosRef = useRef(null)
  const galleryRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      )

      const galleryItems = galleryRef.current ? Array.from(galleryRef.current.children) : []
      galleryItems.forEach((item, i) => {
        const fromLeft = i % 2 === 0
        gsap.fromTo(item,
          {
            clipPath: fromLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
            opacity: 0
          },
          {
            clipPath: 'inset(0 0% 0 0%)', opacity: 1,
            duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%' }
          }
        )

        item.addEventListener('mouseenter', () => {
          gsap.to(item.querySelector('.media-inner'), {
            scale: 1.05, duration: 0.4, ease: 'power2.out'
          })
          gsap.to(item.querySelector('.media-overlay'), {
            opacity: 1, duration: 0.3
          })
        })
        item.addEventListener('mouseleave', () => {
          gsap.to(item.querySelector('.media-inner'), {
            scale: 1, duration: 0.4, ease: 'power2.out'
          })
          gsap.to(item.querySelector('.media-overlay'), {
            opacity: 0, duration: 0.3
          })
        })
      })

      const videoCards = videosRef.current ? Array.from(videosRef.current.children) : []
      gsap.fromTo(videoCards,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)', opacity: 1,
          duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: videosRef.current, start: 'top 82%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F5C800] py-24 md:py-12 px-6 md:px-[5vw] lg:px-[10vw]">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#D72638]" />
            <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Multimedia</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              className="font-black text-[#1A1A1A] leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', letterSpacing: '-0.025em' }}
            >
              Vívelo en imágenes y video
            </h2>
            <a
              href="#"
              className="text-[#1A1A1A] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all duration-200 bg-white/50 px-5 py-2.5 rounded-full hover:bg-white w-fit"
            >
              Ver todo el contenido
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] mb-8">
          {IMAGES.map((img) => (
            <ImageCard key={img.id} image={img} />
          ))}
        </div>

        <div ref={videosRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const spanClass = video.featured ? 'md:col-span-2 md:row-span-1' : ''

  const getYouTubeUrl = () => {
    let url = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`;
    if (video.start) url += `&start=${video.start}`;
    if (video.end) url += `&end=${video.end}`;
    return url;
  }

  return (
    <div className={`bg-[#1A1A1A] rounded-2xl overflow-hidden ${spanClass} flex flex-col min-h-[250px]`}>
      <div className="relative aspect-video bg-[#2D2D2D] flex items-center justify-center overflow-hidden h-full">
        {isPlaying ? (
          <iframe 
            className="absolute inset-0 w-full h-full"
            src={getYouTubeUrl()} 
            title={video.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <img 
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-300 hover:opacity-80"
            />
            
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <button 
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 rounded-full bg-[#F5C800] flex items-center justify-center shadow-xl pointer-events-auto transform transition-transform duration-200 hover:scale-110"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A1A1A" className="ml-1">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </button>
            </div>

            <div className="absolute top-3 right-3 bg-[#D72638] text-white text-xs font-bold px-2 py-1 rounded-md z-10 shadow-md">
              {video.duration}
            </div>
            <div className="absolute bottom-3 left-3 text-white/80 text-xs font-semibold z-10 drop-shadow-md">
              {video.views} vistas
            </div>
          </>
        )}
      </div>

      <div className="p-5 bg-[#1A1A1A]">
        <h4 className="text-white font-bold text-base tracking-tight line-clamp-1">{video.title}</h4>
        <p className="text-white/40 text-xs font-medium mt-1">Partido del Buen Gobierno</p>
      </div>
    </div>
  )
}

function ImageCard({ image }) {
  const spanClass = 
    image.size === 'tall' ? 'md:row-span-2' : 
    image.size === 'wide' ? 'md:col-span-2' : 
    image.size === 'large-wide' ? 'md:col-span-3' : ''

  return (
    <div className={`relative rounded-2xl overflow-hidden cursor-pointer ${spanClass} h-full`}>
      <div className="media-inner w-full h-full bg-[#E0B400] flex items-center justify-center transition-transform duration-500">
        <img src="Fondo-jornada.png" alt={image.label} className="w-full h-full object-cover" />
      </div>
      <div className="media-overlay absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 to-transparent flex items-end p-5 opacity-0 transition-opacity duration-300">
        <p className="text-white font-bold text-sm leading-tight drop-shadow-lg">{image.label}</p>
      </div>
    </div>
  )
}