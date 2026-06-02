const { useState, useEffect, useCallback } = React;

/* placeholder = blurred until real photo uploaded */
const BLUR_PH = true;

const eliteGirls = [
{
  id: '1', name: 'Diosa Doll', height: "4'11\"", ethnicity: 'Asian Latina',
  features: ['Brown Eyes', 'Black Hair', 'English', 'Spanish'],
  bio: "I'm an exotic Asian Latina — petite, curvy, and dangerously flexible. With soft perky breasts, a perfect hourglass figure, and the ability to drop into full splits, I'm your ultimate private stripper fantasy.\n\nI'm a natural pleaser who gets off on your pleasure. Whether it's sensual teasing, seductive roleplay, or an unforgettable show where I move my body just for you — I create a safe, playful space for you to fully relax and indulge.\n\nHyper feminine, always dolled up, and obsessed with looking and feeling my absolute best. This is an elite, high-end stripper experience — not your average show.\n\nLet me dance for you. Let me tease you. Let me make it unforgettable.\n\nDiscreet • Professional • Vegas Private Strippers",
  image: window.__resources && window.__resources.diosaPhoto || window.__resources && window.__resources.diosaPhoto || 'uploads/f23.webp',
  gallery: [
  window.__resources && window.__resources.diosaPhoto || 'uploads/f23.webp',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524638431109-93d95c968f03?auto=format&fit=crop&w=900&q=80'],
  realPhotos: [true, false, false, false],
  isVIP: true
},
{
  id: '2', name: 'Bobbi', height: "5'0\"", ethnicity: 'Asian Latina',
  features: ['Blue Eyes', 'Platinum Hair', 'English', 'Spanish'],
  bio: "Gothic seductress with a body covered in dark ink and a mind full of sin.\n\nPlatinum blonde, heavily tattooed, and dangerously flexible — I'm your ultimate private gothic fantasy. I move like the devil on your shoulder, teasing, grinding, and putting on a show that will haunt your thoughts long after I'm gone.\n\nWhether I'm crawling on all fours, dropping into splits, or giving you an up-close, slow, hypnotic dance… I live to make you weak.\n\nDark, sensual, and unapologetically nasty in the best way.\n\nElite private gothic stripper experience in Vegas.\n\nDiscreet • Professional • Unforgettable\n\nDM to book your private show, daddy 😈",
  image: window.__resources && window.__resources.bobbiPhoto || window.__resources && window.__resources.bobbiPhoto || 'uploads/495978885_18028957076671275_8666342204104565944_n-9c8f6617.jpg',
  gallery: [
  window.__resources && window.__resources.bobbiPhoto || 'uploads/495978885_18028957076671275_8666342204104565944_n-9c8f6617.jpg',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524638431109-93d95c968f03?auto=format&fit=crop&w=900&q=80'],
  realPhotos: [true, false, false, false],
  isFeatured: true
},
{
  id: '3', name: 'Gia', height: "5'5\"", ethnicity: 'European',
  features: ['Blue Eyes', 'Platinum Blonde Hair', 'English'],
  bio: "Tattooed, platinum blonde, and impossibly curvy — Gia is the definition of a Vegas fantasy. With an hourglass figure that commands every room, she brings an electrifying energy to private shows, bachelor events, and penthouse performances. Bold, confident, and unforgettable.",
  image: 'uploads/IMG_1237.jpeg',
  gallery: [
  'uploads/IMG_1237.jpeg',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80'],
  realPhotos: [true, false, false, false],
  isVIP: true
},
{
  id: '4', name: 'India', height: "5'4\"", ethnicity: 'Bengali',
  features: ['Brown Eyes', 'Black Hair', 'English'],
  bio: "Exotic Bengali beauty with hypnotic dark eyes and a magnetic presence. India brings an irresistible mix of sensuality and elegance to every private show. Whether it's a VIP penthouse or an intimate suite — she'll leave you completely spellbound.",
  image: 'uploads/3419EB1C-C839-4959-8E91-12984CF5ED3D-5f2a560a.jpeg',
  gallery: [
  'uploads/3419EB1C-C839-4959-8E91-12984CF5ED3D-5f2a560a.jpeg',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?auto=format&fit=crop&w=900&q=80'],
  realPhotos: [true, false, false, false],
  isVIP: true
},
{
  id: '5', name: 'Amber', height: "5'9\"", ethnicity: 'Mixed',
  features: ['Brown Eyes', 'Curly Hair', 'English'],
  bio: "A natural entertainer with an intoxicating personality. Amber's curls and curves have made her the top request for bachelor weekends, pool parties, and penthouse performances.",
  image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80',
  gallery: [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80'],
  realPhotos: [false, false, false, false]
},
{
  id: '6', name: 'Sienna', height: "5'7\"", ethnicity: 'Caucasian',
  features: ['Blue Eyes', 'Red Hair', 'Italian'],
  bio: "Red hair, blue eyes, and an unforgettable presence. Sienna is the most-booked Angel for arm candy and casino floor appearances. Classic glamour with a modern edge.",
  image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80',
  gallery: [
  'https://images.unsplash.com/photo-1524638431109-93d95c968f03?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=900&q=80'],
  realPhotos: [false, false, false, false],
  isFeatured: true
}];


const N = eliteGirls.length;
const EASE = 'cubic-bezier(0.4,0,0.2,1)';
const T = `650ms ${EASE}`;

/* ─── Gallery Modal ─── */
function GalleryModal({ girl, onClose, onSelect, isSelected }) {
  const [single, setSingle] = useState(null); // null = grid, 0-3 = photo index
  const allPhotos = [girl.image, ...girl.gallery];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {if (single !== null) setSingle(null);else onClose();}
      if (e.key === 'ArrowRight' && single !== null) setSingle((i) => (i + 1) % allPhotos.length);
      if (e.key === 'ArrowLeft' && single !== null) setSingle((i) => (i + allPhotos.length - 1) % allPhotos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [single]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {single !== null &&
          <button onClick={() => setSingle(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono,monospace', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Grid
            </button>
          }
          <span style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>
            {girl.name}
            {single !== null && <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginLeft: 10, fontFamily: 'JetBrains Mono,monospace', fontWeight: 400 }}>Photo {single + 1} of {allPhotos.length}</span>}
          </span>
          {girl.isVIP && <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', background: '#FFC72C', color: '#000', borderRadius: 999, padding: '3px 9px' }}>VIP</span>}
          {girl.isFeatured && <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', background: '#FF2E88', color: '#fff', borderRadius: 999, padding: '3px 9px' }}>Featured</span>}
        </div>
        <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {single === null ? (
        /* Grid view */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3, height: '100%', padding: 3 }}>
            {allPhotos.slice(0, 4).map((src, i) => {
            const isReal = girl.realPhotos ? girl.realPhotos[i] : true;
            return (
              <div key={i} onClick={() => setSingle(i)} style={{ overflow: 'hidden', cursor: 'pointer', position: 'relative', borderRadius: 6, background: '#0a0a12' }}>
                <img src={src} alt={`${girl.name} photo ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 400ms ease',
                  filter: isReal ? 'none' : 'blur(16px) brightness(0.45) saturate(0.3)'
                }}
                onMouseEnter={(e) => {if (isReal) e.currentTarget.style.transform = 'scale(1.04)';}}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            
                {!isReal &&
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, pointerEvents: 'none' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>Coming Soon</span>
                  </div>
                }

                {isReal && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.35),transparent 40%)', opacity: 0, transition: 'opacity 300ms' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0} />}
              </div>);
          })}
          </div>) : (

        /* Single photo view */
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050508' }}>
            {(() => {const isReal = girl.realPhotos ? girl.realPhotos[single] : true;return (
              <>
            <img
                  src={allPhotos[single]}
                  alt={`${girl.name} ${single + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', transition: 'opacity 300ms',
                    filter: isReal ? 'none' : 'blur(20px) brightness(0.4) saturate(0.3)'
                  }} />
            {!isReal &&
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, pointerEvents: 'none' }}>
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>Photo Coming Soon</span>
              </div>
                }
            </>);})()}
          
            {/* Prev */}
            <button onClick={() => setSingle((i) => (i + allPhotos.length - 1) % allPhotos.length)}
          style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 150ms' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            {/* Next */}
            <button onClick={() => setSingle((i) => (i + 1) % allPhotos.length)}
          style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 150ms' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            {/* Dot indicators */}
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
              {allPhotos.map((_, i) =>
            <div key={i} onClick={() => setSingle(i)} style={{ width: i === single ? 18 : 6, height: 6, borderRadius: 999, background: 'white', opacity: i === single ? .9 : .35, cursor: 'pointer', transition: `all 300ms ${EASE}` }} />
            )}
            </div>
          </div>)
        }
      </div>

      {/* Footer CTA */}
      <div style={{ padding: '18px 28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, gap: 16 }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>
          $150 deposit unlocks full verified gallery
        </p>
        <button
          onClick={() => {onSelect(girl.id);onClose();}}
          style={{ padding: '12px 28px', borderRadius: 10, background: isSelected ? 'rgba(255,255,255,0.1)' : 'linear-gradient(to right,#FF2E88,#FF5EB3)', border: isSelected ? '1px solid rgba(255,255,255,0.3)' : 'none', color: 'white', fontFamily: 'JetBrains Mono,monospace', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 200ms', whiteSpace: 'nowrap' }}>
          
          {isSelected ? '✓ Remove From Booking' : `Book ${girl.name}`}
        </button>
      </div>
    </div>);

}

/* ─── Main Carousel ─── */
function GirlsShowcase({ selectedGirlIds, onToggleGirl }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showGallery, setShowGallery] = useState(false);
  const [bioKey, setBioKey] = useState(0); // triggers fade

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    eliteGirls.forEach((g) => {
      [g.image, ...g.gallery].forEach((src) => {const i = new Image();i.src = src;});
    });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navigate = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => dir === 'next' ? (prev + 1) % N : (prev + N - 1) % N);
    setBioKey((k) => k + 1);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const goTo = (i) => {
    if (isAnimating || i === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(i);
    setBioKey((k) => k + 1);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const active = eliteGirls[activeIndex];
  const isSelected = selectedGirlIds.includes(active.id);

  const getRoleForIndex = (i) => {
    const diff = ((i - activeIndex) % N + N) % N;
    if (diff === 0) return 'center';
    if (diff === N - 1) return 'left';
    if (diff === 1) return 'right';
    if (diff === Math.floor(N / 2)) return 'back';
    return 'hidden';
  };

  const getRoleStyle = (role) => {
    const tr = `transform ${T}, filter ${T}, opacity ${T}, left ${T}, bottom ${T}, height ${T}`;
    const base = { position: 'absolute', aspectRatio: '0.62/1', borderRadius: 14, overflow: 'hidden', transition: tr, willChange: 'transform,filter,opacity' };
    switch (role) {
      case 'center':return { ...base, zIndex: 20, left: '50%', height: isMobile ? '62%' : '84%', bottom: isMobile ? '10%' : '4%', transform: `translateX(-50%) scale(${isMobile ? 1.18 : 1.55})`, filter: 'none', opacity: 1 };
      case 'left':return { ...base, zIndex: 10, left: isMobile ? '16%' : '24%', height: isMobile ? '18%' : '30%', bottom: isMobile ? '18%' : '12%', transform: 'translateX(-50%) scale(1)', filter: 'blur(2px) brightness(0.75)', opacity: 0.8 };
      case 'right':return { ...base, zIndex: 10, left: isMobile ? '84%' : '76%', height: isMobile ? '18%' : '30%', bottom: isMobile ? '18%' : '12%', transform: 'translateX(-50%) scale(1)', filter: 'blur(2px) brightness(0.75)', opacity: 0.8 };
      case 'back':return { ...base, zIndex: 5, left: '50%', height: isMobile ? '13%' : '22%', bottom: isMobile ? '20%' : '12%', transform: 'translateX(-50%) scale(1)', filter: 'blur(4px) brightness(0.5)', opacity: 0.6 };
      default:return { ...base, zIndex: 0, left: '50%', height: '22%', bottom: '12%', transform: 'translateX(-50%) scale(0.4)', filter: 'blur(8px)', opacity: 0, pointerEvents: 'none' };
    }
  };

  return (
    <>
      {/* ── CAROUSEL ── */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: 20 }}>
        <div style={{ position: 'relative', width: '100%', height: isMobile ? '66vh' : '78vh', overflow: 'hidden' }}>

          {/* Ghost name */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: '12%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none', zIndex: 2 }}>
            <span style={{ fontFamily: "'Anton',sans-serif", fontSize: 'clamp(72px,22vw,320px)', fontWeight: 900, color: 'white', opacity: .08, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em', whiteSpace: 'nowrap', transition: `opacity 400ms ${EASE}` }}>
              {active.name.toUpperCase()}
            </span>
          </div>

          {/* Progress dots */}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', gap: 6 }}>
            {eliteGirls.map((_, i) =>
            <div key={i} onClick={() => goTo(i)} style={{ width: i === activeIndex ? 22 : 6, height: 6, borderRadius: 999, background: 'white', opacity: i === activeIndex ? .85 : .25, transition: `all 400ms ${EASE}`, cursor: 'pointer' }} />
            )}
          </div>

          {/* Carousel items */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
            {eliteGirls.map((girl, i) => {
              const role = getRoleForIndex(i);
              const s = getRoleStyle(role);
              return (
                <div key={girl.id} style={{ ...s, cursor: role === 'left' ? 'w-resize' : role === 'right' ? 'e-resize' : 'default' }}
                onClick={() => {if (role === 'left') navigate('prev');else if (role === 'right') navigate('next');}}>
                  
                  <img src={girl.image} alt={girl.name} draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block',
                    filter: !girl.realPhotos || girl.realPhotos[0] ? 'none' : 'blur(18px) brightness(0.55) saturate(0.4)'
                  }} />
                  {(!girl.realPhotos || !girl.realPhotos[0]) && role === 'center' &&
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 5, pointerEvents: 'none' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Photo Coming Soon</span>
                    </div>
                  }
                  
                  {role === 'center' &&
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.05) 40%,transparent 65%)' }}>
                      <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                          {girl.isVIP && <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', background: '#FFC72C', color: '#000', borderRadius: 999, padding: '3px 9px' }}>VIP</span>}
                          {girl.isFeatured && <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', background: '#FF2E88', color: '#fff', borderRadius: 999, padding: '3px 9px' }}>Featured</span>}
                          {selectedGirlIds.includes(girl.id) && <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', color: '#fff', borderRadius: 999, padding: '3px 9px' }}>✓ Selected</span>}
                        </div>
                        <p style={{ color: 'white', fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 2px', fontFamily: 'Syne,sans-serif' }}>{girl.name}</p>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, margin: 0, letterSpacing: '0.04em' }}>{girl.height} · {girl.ethnicity}</p>
                      </div>
                    </div>
                  }
                </div>);

            })}
          </div>

          {/* Nav arrows — bottom center */}
          <div style={{ position: 'absolute', bottom: isMobile ? 14 : 22, left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', gap: 12 }}>
            {[['prev', 'M15 18 9 12 15 6'], ['next', 'M9 18 15 12 9 6']].map(([dir, pts]) =>
            <button key={dir} onClick={() => navigate(dir)}
            style={{ width: isMobile ? 40 : 50, height: isMobile ? 40 : 50, borderRadius: 999, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 150ms,background 150ms', padding: 0 }}
            onMouseEnter={(e) => {e.currentTarget.style.transform = 'scale(1.08)';e.currentTarget.style.background = 'rgba(255,255,255,0.16)';}}
            onMouseLeave={(e) => {e.currentTarget.style.transform = 'scale(1)';e.currentTarget.style.background = 'rgba(255,255,255,0.08)';}}>
              
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><polyline points={pts} /></svg>
              </button>
            )}
          </div>

          {/* Selected count */}
          {selectedGirlIds.length > 0 &&
          <div style={{ position: 'absolute', top: 18, right: 18, zIndex: 60, background: 'rgba(255,46,136,0.85)', backdropFilter: 'blur(12px)', borderRadius: 999, padding: '6px 14px', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', fontFamily: 'JetBrains Mono,monospace' }}>
              {selectedGirlIds.length} SELECTED
            </div>
          }
        </div>
      </div>

      {/* ── BIO SECTION ── */}
      <div key={bioKey} style={{ marginTop: 3, borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', padding: isMobile ? '24px 20px' : '32px 40px', animation: `pgIn 400ms ${EASE} both` }}>
        {/* Top row: name + select button */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.01em', fontFamily: "Palatino" }}>{active.name}</h3>
              {active.isVIP && <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', background: '#FFC72C', color: '#000', borderRadius: 999, padding: '3px 9px' }}>VIP Elite</span>}
              {active.isFeatured && <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.14em', background: '#FF2E88', color: '#fff', borderRadius: 999, padding: '3px 9px' }}>Featured</span>}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
              {active.height} &nbsp;·&nbsp; {active.ethnicity}
            </p>
          </div>
          <button
            onClick={() => onToggleGirl(active.id)}
            style={{ padding: '12px 22px', borderRadius: 10, background: isSelected ? 'rgba(255,46,136,0.15)' : 'linear-gradient(to right,#FF2E88,#FF5EB3)', border: isSelected ? '1px solid rgba(255,46,136,0.4)' : 'none', color: 'white', fontFamily: 'JetBrains Mono,monospace', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 200ms', whiteSpace: 'nowrap', flexShrink: 0 }}>
            
            {isSelected ? '✓ Remove' : '+ Select Angel'}
          </button>
        </div>

        {/* Bio text */}
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: isMobile ? 14 : 16, lineHeight: 1.65, marginBottom: 20, maxWidth: 680 }}>
          {active.bio}
        </p>

        {/* Feature tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {active.features.map((f) =>
          <span key={f} style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', borderRadius: 999, padding: '5px 12px', fontFamily: 'JetBrains Mono,monospace' }}>
              {f}
            </span>
          )}
        </div>

        {/* Bottom: gallery button + deposit note */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <button
            onClick={() => setShowGallery(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'JetBrains Mono,monospace', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', cursor: 'pointer', transition: 'all 200ms' }}
            onMouseEnter={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,0.1)';e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';}}
            onMouseLeave={(e) => {e.currentTarget.style.background = 'rgba(255,255,255,0.06)';e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';}}>
            
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
            View {active.gallery.length + 1} Photos
          </button>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>FULL GALLERY UNLOCKS AFTER $200 DEPOSIT

          </p>
        </div>
      </div>

      {/* ── GALLERY MODAL ── */}
      {showGallery &&
      <GalleryModal
        girl={active}
        onClose={() => setShowGallery(false)}
        onSelect={onToggleGirl}
        isSelected={isSelected} />

      }
    </>);

}

Object.assign(window, { GirlsShowcase, eliteGirls });