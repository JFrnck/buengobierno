import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEOS = [
  { id: 1, title: 'Discurso de lanzamiento', duration: '4:32', views: '12K', featured: true },
  { id: 2, title: 'Propuesta educativa en cifras', duration: '2:15', views: '8K', featured: false },
  { id: 3, title: 'Visita a comunidades', duration: '3:48', views: '6K', featured: false },
]

const IMAGES = [
  { id: 1, label: 'Caravana por el norte', size: 'tall' },
  { id: 2, label: 'Encuentro con líderes comunitarios', size: 'wide' },
  { id: 3, label: 'Rally de apertura', size: 'normal' },
  { id: 4, label: 'Sede central PBG', size: 'normal' },
]

export default function MediaSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const videosRef = useRef(null)
  const galleryRef = useRef(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      )

      // Video cards — clip-path reveal
      const videoCards = videosRef.current ? Array.from(videosRef.current.children) : []
      gsap.fromTo(videoCards,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)', opacity: 1,
          duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: videosRef.current, start: 'top 82%' }
        }
      )

      // Gallery images — alternating reveal
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

        // Hover effect
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F5C800] py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16" style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-0.5 bg-[#D72638]" />
            <span className="text-[#D72638] font-bold text-xs tracking-[0.2em] uppercase">Multimedia</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              className="font-black text-[#1A1A1A] leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.025em' }}
            >
              Vívelo en imágenes y video
            </h2>
            <a
              href="#"
              className="text-[#D72638] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all duration-200"
            >
              Ver todo el contenido
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Video cards */}
        <div ref={videosRef} className="grid md:grid-cols-3 gap-5 mb-8">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>

        {/* Image gallery */}
        <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {IMAGES.map((img) => (
            <ImageCard key={img.id} image={img} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video }) {
  return (
    <div className={`bg-[#1A1A1A] rounded-2xl overflow-hidden cursor-pointer ${video.featured ? 'md:col-span-2 md:row-span-1' : ''}`}>
      {/* Thumbnail placeholder */}
      <div className="relative aspect-video bg-[#2D2D2D] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#F5C800] flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A1A1A">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </div>
        {/* Simulated thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A]" />
        <div className="absolute top-3 right-3 bg-[#D72638] text-white text-xs font-bold px-2 py-1 rounded-md">
          {video.duration}
        </div>
        <div className="absolute bottom-3 left-3 text-white/50 text-xs font-semibold">
          {video.views} vistas
        </div>
      </div>
      <div className="p-5">
        <h4 className="text-white font-bold text-base tracking-tight">{video.title}</h4>
        <p className="text-white/40 text-xs font-medium mt-1">Partido del Buen Gobierno</p>
      </div>
    </div>
  )
}

function ImageCard({ image }) {
  const spanClass = image.size === 'tall' ? 'row-span-2' : image.size === 'wide' ? 'col-span-2' : ''

  return (
    <div className={`relative rounded-2xl overflow-hidden cursor-pointer ${spanClass}`}>
      <div className="media-inner w-full h-full bg-[#E0B400] flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,26,0.2)" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <div className="media-overlay absolute inset-0 bg-[#1A1A1A]/50 flex items-end p-4 opacity-0">
        <p className="text-white font-bold text-sm leading-tight">{image.label}</p>
      </div>
    </div>
  )
}
