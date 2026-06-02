const { useState } = React;

function Nav({ activeView, navigateTo, phone }) {
  const [open, setOpen] = useState(false);

  const link = (view, label) =>
  <button
    onClick={() => navigateTo(view)}
    className={`font-mono text-[11px] uppercase tracking-widest transition-all cursor-pointer ${
    activeView === view ? 'text-accent glow-pink font-bold' : 'text-white/60 hover:text-white'}`
    }>
    
      {label}
    </button>;


  return (
    <>
      <header className="fixed top-0 left-0 w-full px-6 py-4 md:py-5 lg:px-12 flex justify-between items-center z-40 bg-[#07070A]/50 backdrop-blur-md border-b border-white/5">
        {/* Brand */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
            
            <img
              src={(window.__resources && window.__resources.logo) || 'uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png'}
              alt="Angel Girls"
              style={{ width: 'auto', objectFit: 'contain', display: 'block', height: "58px" }} />
            
          </button>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10">
          {link('home', 'Home')}
          {link('booking', 'Booking')}
          {link('about', 'About Us')}
          {link('hiring', 'Hiring')}
        </nav>

        {/* Right side */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <button
            onClick={() => navigateTo('booking')}
            className="hidden md:inline-block font-mono text-[11px] text-white bg-accent hover:bg-accent-hover font-black uppercase tracking-widest px-5 py-2.5 rounded shadow-lg shadow-accent/15 transition-all cursor-pointer hover:scale-102">
            
            Book Now
          </button>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 text-white/80 hover:text-accent cursor-pointer"
            aria-label="Open menu">
            
            <Icon name="menu" size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open &&
      <div className="fixed inset-0 z-[200] flex">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div
          className="relative ml-auto w-full max-w-sm h-full bg-[#07070A]/98 backdrop-blur-2xl border-l border-white/5 p-8 flex flex-col justify-between"
          style={{ animation: 'slideInRight .3s ease both' }}>
          
            <style>{`@keyframes slideInRight{from{transform:translateX(100%);}to{transform:translateX(0);}}`}</style>

            <div className="space-y-8">
              <div className="flex justify-between items-center pb-5 border-b border-white/5">
                <img src={(window.__resources && window.__resources.logo) || 'uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png'} alt="Angel Girls" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
                <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white cursor-pointer">
                  <Icon name="x" size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6 text-left">
                {[
              ['home', '01 // Home'],
              ['booking', '02 // Book Angels'],
              ['about', '03 // About Agency'],
              ['hiring', '04 // Join The Team']].
              map(([view, label]) =>
              <button
                key={view}
                onClick={() => {navigateTo(view);setOpen(false);}}
                className="font-display text-2xl font-extrabold hover:text-accent text-white/80 transition-colors text-left cursor-pointer">
                
                    {label}
                  </button>
              )}
                <button onClick={() => {navigateTo('terms');setOpen(false);}} className="font-mono text-xs text-white/40 hover:text-white uppercase tracking-widest text-left cursor-pointer">Terms of Service</button>
                <button onClick={() => {navigateTo('privacy');setOpen(false);}} className="font-mono text-xs text-white/40 hover:text-white uppercase tracking-widest text-left cursor-pointer">Privacy Policy</button>
              </nav>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <span className="block font-mono text-[9px] tracking-widest text-white/30 uppercase">[EXECUTIVE ASSISTANCE]</span>
              <a href={`tel:${phone}`} className="flex items-center gap-3 text-lg font-extrabold text-accent glow-pink">
                <Icon name="phone-call" size={20} /> {phone}
              </a>
              <p className="text-[10px] text-white/40 leading-relaxed">Call/text available 24/7. Verified galleries unlocked instantly on deposit.</p>
            </div>
          </div>
        </div>
      }
    </>);

}

Object.assign(window, { Nav });