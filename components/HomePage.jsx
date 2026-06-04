const { useEffect, useRef } = React;

function HomePage({ navigateTo, phone }) {
  const imgRef = useRef(null);

  const buttons = [
  { label: 'Book Tonight', sub: '$200 deposit', action: () => navigateTo('booking'), accent: true },
  { label: 'View Angels', sub: 'Full roster', action: () => navigateTo('booking'), accent: false },
  { label: 'Call 24 / 7', sub: phone, action: () => {window.location.href = `tel:${phone}`;}, accent: false }];


  const btnBase = {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    padding: '14px 10px', borderRadius: 14, color: 'white', cursor: 'pointer',
    transition: 'transform 150ms, opacity 150ms', gap: 4
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 5, fontFamily: "'Inter',sans-serif", overflow: 'hidden' }}>

      {/* Video Background - Full coverage with pure black fallback */}
      <div style={{ position: 'absolute', top: 'clamp(50px,8vw,70px)', left: 0, right: 0, bottom: 0, width: '100%', zIndex: 0, background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
        >
          <source src="uploads/home-video-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Minimal Overlays - let video shine through */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to bottom,rgba(0,0,0,0.2) 0%,transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.2) 60%,transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />



      {/* Bottom-right logo + discreet staff portal link */}
      <div style={{ position:'absolute', bottom:'120px', left:'50%', transform:'translateX(-50%)', zIndex:40, pointerEvents:'auto', display:'flex', flexDirection:'column', alignItems:'center', whiteSpace:'nowrap', gap:6 }}>
        <img
          src={(window.__resources && window.__resources.logo) || 'uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png'}
          alt="Angel Girls"
          style={{ height:'clamp(52px,10vw,80px)', width:'auto', objectFit:'contain', filter:'drop-shadow(0 0 14px rgba(255,46,136,0.45))' }}
        />
        <a href="portal.html" style={{ pointerEvents:'auto', fontFamily:"'JetBrains Mono',monospace", fontSize:8, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.15)', textDecoration:'none', transition:'color .2s' }}
          onMouseEnter={e=>e.target.style.color='rgba(255,46,136,0.6)'}
          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.15)'}>
          Staff Portal
        </a>
      </div>

      {/* Bottom 3-button bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30, paddingBottom: 'calc(env(safe-area-inset-bottom)+24px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', maxWidth: 640, margin: '0 auto', padding: '0 16px', gap: 10 }}>
          {buttons.map((btn, i) =>
          <button key={i} onClick={btn.action}
          style={{ ...btnBase,
            background: btn.accent ? 'linear-gradient(135deg,#FF2E88,#FF5EB3)' : 'rgba(255,255,255,0.07)',
            backdropFilter: btn.accent ? 'none' : 'blur(20px)',
            WebkitBackdropFilter: btn.accent ? 'none' : 'blur(20px)',
            border: btn.accent ? 'none' : '1px solid rgba(255,255,255,0.11)',
            boxShadow: btn.accent ? '0 8px 32px rgba(255,46,136,0.35)' : 'none'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onTouchStart={(e) => e.currentTarget.style.opacity = '0.8'}
          onTouchEnd={(e) => e.currentTarget.style.opacity = '1'}>
            
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(10px,2.2vw,13px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
                {btn.label}
              </span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 'clamp(9px,1.8vw,11px)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                {btn.sub}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom logo watermark — removed, logo now bottom-right */}
    </div>);

}

Object.assign(window, { HomePage });
