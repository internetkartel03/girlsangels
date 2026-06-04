const { useState, useRef, useEffect } = React;

/* ── shared typography helpers ── */
const H2 = ({ children, style = {} }) =>
<h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: 'white', letterSpacing: '-0.01em', lineHeight: 1.2, margin: '0 0 18px', fontFamily: "system-ui", ...style }}>{children}</h2>;

const Lead = ({ children }) =>
<p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, marginBottom: 20, fontWeight: 400 }}>{children}</p>;

const SectionLabel = ({ children }) =>
<span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#FF2E88', display: 'block', marginBottom: 12, fontSize: "19px" }}>{children}</span>;

const Card = ({ children, style = {} }) =>
<div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '24px 28px', ...style }}>{children}</div>;

const PageWrap = ({ children }) =>
<div style={{ maxWidth: 880, margin: '0 auto', padding: 'clamp(100px,14vw,140px) clamp(20px,5vw,64px) 80px', fontFamily: "'Inter',sans-serif" }}>
    {children}
    {/* bottom logo */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 64, opacity: 0.25 }}>
      <img src={window.__resources && window.__resources.logo || 'uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png'} alt="Angel Girls" style={{ height: 52, width: 'auto', filter: 'brightness(10)' }} />
    </div>
  </div>;


/* ══════════════════════════════════════
   ABOUT PAGE — full SEO + legal
══════════════════════════════════════ */
function AboutPage({ navigateTo, phone }) {
  const ABOUT_DEFAULTS = /*EDITMODE-BEGIN*/{
    "introParagraphSize": 36,
    "introFont": "Times New Roman",
    "heroTitleFont": "Palatino",
    "heroTitleSize": 72,
    "accentColor": "#FF2E88"
  } /*EDITMODE-END*/;
  const [t, setTweak] = useTweaks(ABOUT_DEFAULTS);
  const services = [
  ['Full Nude Private Dancing', 'In-suite sensual choreography for penthouse and hotel-room private events. Flat hourly rate, no add-ons.'],
  ['Topless Exotic Dancing', 'High-energy, tasteful topless performances for bachelor parties, VIP pools, and hospitality tables.'],
  ['Pool Party Hosting', 'Bikini-clad social companions hosting private cabanas, charter boats, or off-Strip estate pools.'],
  ['Arm Candy / Dinner Date', 'Sophisticated, fully clothed companion accompaniment for casino floors, fine dining, and private events.']];


  const compliance = [
  ['Nevada Law Compliance', 'All services are provided under Nevada Revised Statutes Chapter 244 and Clark County Code Section 6.35, which permit licensed outcall entertainment agencies to dispatch independent contractors for legal adult dancing and companion services. No sexual services are offered, implied, or tolerated.'],
  ['Zero-Tolerance Policy', 'Angel Girls enforces a strict zero-tolerance policy against solicitation, sex trafficking, or any illegal activity. Any client or performer found violating this policy is immediately removed and reported to the Las Vegas Metropolitan Police Department.'],
  ['Independent Contractor Model', 'All entertainers are legally registered independent contractors — not employees — operating under their own license. Angel Girls acts solely as a dispatch and booking agency. Each entertainer controls their own schedule, services offered, and conduct during engagements.'],
  ['Age Verification', 'All clients must be 21 years of age or older to book services. All performers are verified to be 21+ via government-issued identification reviewed by our compliance staff before any roster listing. No exceptions.'],
  ['No Solicitation Clause', 'Clients expressly acknowledge that booking fees cover only legal outcall entertainment (sensual dancing and companion services). Any solicitation of sexual services is illegal under Nevada law (NRS 201.354) and will result in immediate service termination and law enforcement contact.']];


  const areas = [
  ['Mid-Strip Core', 'Bellagio, Caesars, Cosmopolitan, Aria, Venetian, Palazzo — 15–25 min dispatch'],
  ['North Strip', 'Wynn, Encore, Fontainebleau, Resorts World — 20–30 min'],
  ['South Strip', 'MGM Grand, Mandalay Bay, Luxor, Excalibur — 20–30 min'],
  ['Downtown / Fremont', 'Circa, Golden Nugget, The D — 25–35 min'],
  ['Off-Strip West', 'Palms, Rio, Summerlin estates — 30–45 min (+$50 surcharge)'],
  ['Off-Strip East / Henderson', 'Virgin Hotels, Henderson villas — 35–50 min (+$50 surcharge)']];


  return (
    <div className="page-enter" style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(135deg, #07070A 0%, #0f0f15 100%)' }}>

      {/* ── HERO: centered ── */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', alignItems: 'center', gap: 24, padding: '120px 24px 60px' }}>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,46,136,0.85)', margin: 0 }}>Las Vegas · 24/7 Outcall</p>
        <h1 style={{ fontSize: `${t.heroTitleSize}px`, fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: 700, textShadow: '0 2px 40px rgba(0,0,0,0.8)', fontFamily: t.heroTitleFont, margin: 0 }}>
          Vegas's Most Elite<br /><span style={{ color: t.accentColor }}>Private Entertainer Agency</span>
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => navigateTo('booking')} style={{ padding: '13px 30px', borderRadius: 12, background: 'linear-gradient(135deg,#FF2E88,#FF5EB3)', color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none', boxShadow: '0 8px 28px rgba(255,46,136,0.45)', letterSpacing: '0.04em' }}>Book an Angel Tonight</button>
          <a href={`tel:${phone}`} style={{ padding: '13px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.07)', color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, border: '1px solid rgba(255,255,255,0.18)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(14px)' }}>
            <Icon name="phone-call" size={15} /> {phone}
          </a>
        </div>
      </div>

      {/* ── CONTENT: scrolls over gradient, sparse glass panels ── */}
      <div style={{ position: 'relative', zIndex: 2, fontWeight: 400 }}>
      
      {/* ── FRAMED IMAGE SECTION ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 20px 60px', fontFamily: 'system-ui' }}>
        <div style={{ 
          marginX: 'auto', 
          width: '100%', 
          maxWidth: '900px',
          borderRadius: '24px',
          border: '1px solid rgba(236, 72, 153, 0.3)',
          background: 'rgba(0, 0, 0, 0.4)',
          padding: '8px',
          boxShadow: '0 0 40px rgba(236, 72, 153, 0.25)',
          margin: '0 auto'
        }}>
          <img 
            src={window.__resources && window.__resources.aboutBg || 'uploads/about-us-bg.jpg'} 
            alt="About Us - Angel Girls Elite Las Vegas Outcall Agency" 
            style={{ 
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center',
              borderRadius: '20px',
              display: 'block',
              backgroundColor: '#000'
            }} 
          />
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', display: 'grid', gap: 40, padding: '40px 40px 100px', fontFamily: 'system-ui' }}>

        {/* Intro — no card, just text */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.85, margin: '0 auto', fontSize: `${t.introParagraphSize}px`, fontFamily: t.introFont, maxWidth: 680 }}>
            Angel Girls is a fully licensed Las Vegas outcall entertainment agency connecting discerning VIP clients with verified, background-screened independent entertainer-companions across the Las Vegas Strip and surrounding resort corridors — 24 hours a day, 7 days a week.
          </p>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* Services */}
        <SectionLabel>Our Services · Las Vegas Outcall Entertainment</SectionLabel>
        <H2 style={{ fontSize: 'clamp(22px,3vw,30px)', marginBottom: 24 }}>What We Offer</H2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, marginBottom: 48 }}>
          {services.map(([t, d]) =>
            <div key={t} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 3, height: 40, background: '#FF2E88', borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 700, color: 'white', margin: '0 0 6px' }}>{t}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>{d}</p>
              </div>
            </div>
            )}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Why Us — 4 inline stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '2px' }}>
          {[
            ['Verified Photos', 'Real ID-checked photos. Private gallery after $150 deposit.'],
            ['Flat Rates', 'No tip games. Price confirmed = price paid.'],
            ['24/7 Dispatch', 'Live human concierge, every booking.'],
            ['Encrypted', 'Signal-grade delivery. Neutral billing descriptor.']].
            map(([t, d]) =>
            <div key={t} style={{ padding: '22px 20px', background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(8px)' }}>
              <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: '#FF2E88', margin: '0 0 6px', letterSpacing: '0.02em' }}>{t}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>{d}</p>
            </div>
            )}
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Legal — minimal list */}
        <div>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,46,136,0.7)', marginBottom: 16 }}>Legal Compliance · Nevada Law</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {compliance.map(([t, d]) =>
              <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ color: '#FF2E88', fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>—</span>
                <div>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.9)', margin: '0 0 4px' }}>{t}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>{d}</p>
                </div>
              </div>
              )}
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Deposit policy — glass panel */}
        <div style={{ background: 'rgba(255,46,136,0.05)', border: '1px solid rgba(255,46,136,0.15)', borderRadius: 12, padding: '28px 28px' }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,46,136,0.7)', margin: '0 0 10px' }}>Deposit & Payment Policy</p>
          <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(18px,2.5vw,22px)', fontWeight: 800, color: 'white', margin: '0 0 14px' }}>$150 Non-Refundable Deposit</p>
          <ul style={{ margin: '0 0 12px', paddingLeft: 18, display: 'grid', gap: 8 }}>
            {[
              'Deposit is 100% non-refundable — no exceptions.',
              'Credited 1:1 toward total on arrival.',
              'No chargebacks permitted — constitutes breach of contract.',
              'Cancellations within 2 hrs forfeit deposit in full.',
              'Agency-initiated cancellations: full refund issued.'].
              map((item, i) =>
              <li key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>{item}</li>
              )}
          </ul>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0 }}>By paying you agree to these terms, our Terms of Service, and applicable Nevada law.</p>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Service areas */}
        <div>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,46,136,0.7)', marginBottom: 16 }}>Service Areas</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 2 }}>
            {areas.map(([zone, detail]) =>
              <div key={zone} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.025)' }}>
                <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, color: '#FF2E88', margin: '0 0 4px' }}>{zone}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>{detail}</p>
              </div>
              )}
          </div>
        </div>

        {/* CTA — centered, minimal */}
        <div style={{ textAlign: 'center', padding: '48px 0 0' }}>
          <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: 'white', margin: '0 0 8px' }}>Ready to Book?</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: '0 0 28px' }}>Submit a reservation in under 90 seconds.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => navigateTo('booking')} style={{ padding: '14px 32px', borderRadius: 12, background: 'linear-gradient(135deg,#FF2E88,#FF5EB3)', color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none', boxShadow: '0 8px 28px rgba(255,46,136,0.4)' }}>Book an Angel Tonight</button>
            <a href={`tel:${phone}`} style={{ padding: '14px 28px', borderRadius: 12, background: 'rgba(255,255,255,0.07)', color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, border: '1px solid rgba(255,255,255,0.14)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(12px)' }}>
              <Icon name="phone-call" size={15} /> Call Now
            </a>
          </div>
          <div style={{ marginTop: 56, opacity: 0.12 }}>
            <img src={window.__resources && window.__resources.logo || 'uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png'} alt="Angel Girls" style={{ height: 44, width: 'auto', filter: 'brightness(10)' }} />
          </div>
        </div>

      </div>
      </div>

      {/* ── TWEAKS PANEL ── */}
      <TweaksPanel>
        <TweakSection label="Hero Title" />
        <TweakSlider label="Title Size" value={t.heroTitleSize} min={24} max={80} step={1} unit="px" onChange={(v) => setTweak('heroTitleSize', v)} />
        <TweakRadio label="Title Font" value={t.heroTitleFont} options={['Palatino', 'Times New Roman', 'Syne', 'Georgia']} onChange={(v) => setTweak('heroTitleFont', v)} />
        <TweakSection label="Intro Paragraph" />
        <TweakSlider label="Font Size" value={t.introParagraphSize} min={14} max={52} step={1} unit="px" onChange={(v) => setTweak('introParagraphSize', v)} />
        <TweakRadio label="Font" value={t.introFont} options={['Times New Roman', 'Palatino', 'Inter', 'Syne']} onChange={(v) => setTweak('introFont', v)} />
        <TweakSection label="Colors" />
        <TweakColor label="Accent" value={t.accentColor} options={['#FF2E88', '#E01A6E', '#FF5EB3', '#C2185B']} onChange={(v) => setTweak('accentColor', v)} />
      </TweaksPanel>

    </div>);

}

/* ══════════════════════════════════════
   HIRING PAGE — exclusive, video bg
══════════════════════════════════════ */
function HiringPage({ navigateTo }) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', age: '', phone: '', instagram: '', height: '', experience: '', message: '', referredBy: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.age) {alert('Please fill out Name, Age, and Phone to proceed.');return;}
    setSubmitted(true);
  };

  const inp = {
    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 10, padding: '14px 16px', color: 'white', fontSize: 15, outline: 'none',
    fontFamily: "'Inter',sans-serif", transition: 'border-color 200ms'
  };
  const lbl = { display: 'block', fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 8 };

  if (submitted) return (
    <div className="page-enter" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <img src={window.__resources && window.__resources.hiringBg || 'uploads/hiring-bg.jpg'} alt="Hiring Background" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(7,7,10,0.55)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '40px 24px', maxWidth: 480 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,46,136,0.15)', border: '1px solid rgba(255,46,136,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
          <Icon name="check-circle" size={36} className="text-accent" />
        </div>
        <img src={window.__resources && window.__resources.logo || 'uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png'} alt="Angel Girls" style={{ height: 60, width: 'auto', margin: '0 auto 28px', display: 'block' }} />
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: 'white', marginBottom: 14 }}>Application Received</h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 28 }}>
          Thank you for your interest in joining Angel Girls. Our talent team reviews each application personally and will reach out within 24–48 hours via the contact you provided.
        </p>
        <button onClick={() => navigateTo('home')} style={{ padding: '14px 32px', borderRadius: 10, background: '#FF2E88', color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer', border: 'none' }}>
          Return Home
        </button>
      </div>
    </div>);


  return (
    <div className="page-enter" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Background Image */}
      <img src={window.__resources && window.__resources.hiringBg || 'uploads/hiring-bg.jpg'} alt="Hiring Background" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(7,7,10,0.45)', zIndex: 1 }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top,rgba(7,7,10,0.75),transparent)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto', padding: 'clamp(110px,15vw,150px) clamp(20px,5vw,48px) 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <img src={window.__resources && window.__resources.logo || 'uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png'} alt="Angel Girls" style={{ height: 64, width: 'auto', margin: '0 auto 24px', display: 'block', filter: 'drop-shadow(0 0 24px rgba(255,46,136,0.4))' }} />
          <SectionLabel>Now Selecting · Las Vegas</SectionLabel>
          <h1 style={{ fontSize: 'clamp(32px,6vw,56px)', fontWeight: 800, color: 'white', margin: '12px 0 16px', letterSpacing: '-0.02em', lineHeight: 1.1, fontFamily: "sans-serif" }}>
            Become an Angel
          </h1>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
            We are selectively recruiting top-tier independent entertainers for outcall bookings across Las Vegas Strip hotels and private suites. Flexible schedule, flat hourly pay, and full agency support.
          </p>
        </div>

        {/* Perks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 48 }}>
          {[
          ['Top Pay', '$400–$750/hr flat rate. Keep everything you earn. No splits, no hidden deductions.'],
          ['Your Terms', 'Choose your schedule and booking types. Total autonomy over your availability.'],
          ['Safe Bookings', 'All clients are deposit-confirmed and identity-verified before dispatch. Safety check-ins on every booking.']].
          map(([t, d]) =>
          <div key={t} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '20px 18px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: '#FF2E88', margin: '0 0 8px' }}>{t}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>{d}</p>
            </div>
          )}
        </div>

        {/* Requirements */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 14, padding: '24px 28px', marginBottom: 40 }}>
          <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: 'white', margin: '0 0 14px' }}>Requirements</p>
          <ul style={{ margin: 0, paddingLeft: 20, display: 'grid', gap: 8 }}>
            {[
            '21 years of age or older — government ID required',
            'Reside in or near Las Vegas, NV',
            'Reliable transportation to hotel outcall locations',
            'Professional, presentable appearance',
            'Comfortable with sensual dancing or companion social engagements',
            'Available for evening and weekend bookings'].
            map((r, i) => <li key={i} style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{r}</li>)}
          </ul>
        </div>

        {/* Application form */}
        <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 'clamp(24px,4vw,40px)', display: 'grid', gap: 20 }}>
          <div>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: 'white', margin: '0 0 4px' }}>Application Form</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>All information is kept strictly confidential.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label style={lbl}>Full Name *</label><input required type="text" value={form.name} onChange={set('name')} placeholder="Your name" style={inp} onFocus={(e) => e.target.style.borderColor = '#FF2E88'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} /></div>
            <div><label style={lbl}>Age * (21+)</label><input required type="number" min="21" max="45" value={form.age} onChange={set('age')} placeholder="Must be 21+" style={inp} onFocus={(e) => e.target.style.borderColor = '#FF2E88'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} /></div>
            <div><label style={lbl}>Phone Number *</label><input required type="tel" value={form.phone} onChange={set('phone')} placeholder="(702) 555-0000" style={inp} onFocus={(e) => e.target.style.borderColor = '#FF2E88'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} /></div>
            <div><label style={lbl}>Instagram Handle</label><input type="text" value={form.instagram} onChange={set('instagram')} placeholder="@yourhandle" style={inp} onFocus={(e) => e.target.style.borderColor = '#FF2E88'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} /></div>
            <div><label style={lbl}>Height</label><input type="text" value={form.height} onChange={set('height')} placeholder="e.g. 5ft 6in" style={inp} onFocus={(e) => e.target.style.borderColor = '#FF2E88'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} /></div>
            <div><label style={lbl}>Experience</label>
              <select value={form.experience} onChange={set('experience')} style={{ ...inp, cursor: 'pointer' }}>
                <option value="">Select level</option>
                <option value="new">New to industry</option>
                <option value="1-2">1–2 years</option>
                <option value="3+">3+ years</option>
                <option value="pro">Professional dancer</option>
              </select>
            </div>
          </div>

          <div><label style={lbl}>Tell us about yourself</label>
            <textarea rows={4} value={form.message} onChange={set('message')} placeholder="What makes you stand out? What types of bookings interest you?" style={{ ...inp, resize: 'none', lineHeight: 1.65 }} onFocus={(e) => e.target.style.borderColor = '#FF2E88'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
          </div>

          <div><label style={lbl}>Referred by</label><input type="text" value={form.referredBy} onChange={set('referredBy')} placeholder="Optional" style={inp} /></div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '14px 16px' }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>
              By submitting this application you confirm you are 21+ years of age, reside in or near Las Vegas, and agree to operate as an independent contractor. All performances are legal outcall dancing and entertainment only under Nevada law.
            </p>
          </div>

          <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: 12, background: 'linear-gradient(135deg,#FF2E88,#FF5EB3)', border: 'none', color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 8px 32px rgba(255,46,136,0.35)', transition: 'transform 150ms' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            
            Submit Application
          </button>
        </form>

        {/* bottom logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56, opacity: 0.2 }}>
          <img src={window.__resources && window.__resources.logo || 'uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png'} alt="" style={{ height: 44, width: 'auto', filter: 'brightness(10)' }} />
        </div>

        {/* ── SITE INDEX ── */}
        <div style={{ marginTop: 64, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 48, fontFamily: "Inter" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,46,136,0.6)', marginBottom: 28, textAlign: 'center' }}>Site Directory</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 0 }}>
            {[
            { label: 'Home', view: 'home', desc: 'Enter Angel Girls' },
            { label: 'Book an Angel', view: 'booking', desc: 'Reserve your private show' },
            { label: 'About Us', view: 'about', desc: 'Agency info & legal compliance' },
            { label: 'Join the Roster', view: 'hiring', desc: 'Apply to become an Angel' },
            { label: 'Terms of Service', view: 'terms', desc: 'Booking terms & policies' },
            { label: 'Privacy Policy', view: 'privacy', desc: 'Data & confidentiality' },
            { label: 'Mid-Strip', view: 'location-mid-strip', desc: 'Bellagio, Caesars, Cosmo, Aria' },
            { label: 'North Strip', view: 'location-north-strip', desc: 'Wynn, Encore, Fontainebleau' },
            { label: 'South Strip', view: 'location-south-strip', desc: 'MGM, Mandalay, Luxor' },
            { label: 'Downtown', view: 'location-downtown', desc: 'Fremont St, Circa, Golden Nugget' },
            { label: 'Off-Strip West', view: 'location-off-strip-west', desc: 'Palms, Rio, Summerlin' },
            { label: 'Off-Strip East', view: 'location-off-strip-east', desc: 'Virgin Hotels, Henderson' }].
            map(({ label, view, desc }) =>
            <button key={view} onClick={() => navigateTo(view)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3, padding: '16px 18px', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'left', transition: 'background 150ms' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,46,136,0.06)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white', letterSpacing: '0.02em', fontFamily: "system-ui" }}>{label}</span>
                <span style={{ fontFamily: "'Inter',sans-serif", color: 'rgba(255,255,255,0.38)', lineHeight: 1.5, fontSize: "7px" }}>{desc}</span>
              </button>
            )}
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 32, lineHeight: 1.7 }}>
            © {new Date().getFullYear()} Angel Girls · Las Vegas, NV · Licensed Outcall Entertainment Agency<br />
            All services are legal adult entertainment under Nevada law · 21+ only
          </p>
        </div>
      </div>
    </div>);

}

/* ═════���════════════════════════════════
   TERMS OF SERVICE
══════════════════════════════════════ */
function TermsPage({ navigateTo }) {
  const sections = [
  ['1. Legal Compliance & Governing Law', 'Angel Girls operates exclusively within the legal framework of Clark County, Nevada and the State of Nevada. All services are legal adult outcall entertainment including sensual dancing, companion services, and social entertainment, as permitted under Nevada Revised Statutes and Clark County Code Section 6.35. Nothing on this site or in any booking constitutes an offer of illegal services of any kind.'],
  ['2. Age Requirement', 'All clients must be 21 years of age or older. All performers are verified to be 21+ via government ID. By accessing this site and initiating any booking, you confirm that you are at least 21 years of age.'],
  ['3. No Refund Policy — Deposits', 'All bookings require a non-refundable $150 per-Angel deposit. This deposit acts as a standing retainer and is credited 1:1 toward your total booking amount due at the time of service. The deposit is NON-REFUNDABLE under all circumstances, including but not limited to: cancellation, no-show, change of plans, or dissatisfaction with the gallery. No exceptions will be made. Clients forfeit the full deposit for cancellations made within 2 hours of scheduled arrival.'],
  ['4. No Chargebacks Policy', 'By submitting a deposit payment you expressly waive the right to initiate any chargeback, payment dispute, or reversal with your bank or card issuer. Initiating a chargeback constitutes a material breach of this agreement. Angel Girls reserves the right to pursue recovery of all associated fees, costs, and damages through applicable legal channels.'],
  ['5. Independent Contractor Status', 'All entertainers listed by Angel Girls are independent contractors — not employees. Angel Girls acts solely as a dispatch, verification, and booking coordination agency. Each entertainer controls their own schedule, service scope, and conduct. The agency bears no liability for the individual conduct of contractors during engagements.'],
  ['6. Zero-Tolerance — Solicitation', 'No sexual services are offered, implied, or tolerated. Any solicitation of sexual services by a client will result in immediate termination of the engagement, forfeiture of all payments, and contact with the Las Vegas Metropolitan Police Department. This policy is strictly enforced.'],
  ['7. Limitation of Liability', 'Angel Girls is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Total liability is limited to the amount paid in the most recent booking deposit. We do not guarantee performer availability and reserve the right to substitute performers of equivalent caliber.'],
  ['8. Privacy & Data Handling', 'Client booking data is used solely for booking coordination and is purged within 30 days of service completion. We do not sell, share, or retain client data beyond operational necessity. See our Privacy Policy for full details.'],
  ['9. Governing Jurisdiction', 'These terms are governed by the laws of the State of Nevada. Any disputes shall be resolved exclusively in the courts of Clark County, Nevada. By booking, you consent to this jurisdiction.'],
  ['10. Modifications', 'Angel Girls reserves the right to modify these terms at any time. Continued use of our services constitutes acceptance of the current terms.']];


  return (
    <div className="page-enter">
      <PageWrap>
        <SectionLabel>Legal Documentation</SectionLabel>
        <H2>Terms of Service</H2>
        <Lead>Last updated: 2025. By accessing angelgirls.com or initiating any booking, you agree to these terms in full.</Lead>
        <div style={{ display: 'grid', gap: 14, marginBottom: 40 }}>
          {sections.map(([t, d]) =>
          <Card key={t}>
              <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: 'white', margin: '0 0 8px' }}>{t}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, margin: 0 }}>{d}</p>
            </Card>
          )}
        </div>
        <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', color: '#FF2E88', fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.04em' }}>
          ← Back to Home
        </button>
      </PageWrap>
    </div>);

}

/* ══════════════════════════════════════
   PRIVACY POLICY
══════════════════════════════════════ */
function PrivacyPage({ navigateTo }) {
  const sections = [
  ['Information We Collect', 'We collect only the minimum data necessary to process your booking: contact name, mobile phone number, email address, and hotel/suite location. This information is used exclusively for booking confirmation, gallery delivery, and dispatch coordination.'],
  ['How We Use Your Information', 'Your data is used only to fulfill your booking, communicate booking status, and send your private verified gallery via encrypted channel. We do not use your data for marketing without explicit consent.'],
  ['Data Security', 'All data is encrypted in transit (TLS 1.3) and at rest. Private gallery communications are delivered via Signal-grade encrypted channels. We do not store unencrypted personal data on our servers.'],
  ['Data Retention', 'Client booking records are purged from our systems within 30 days of service completion. We do not maintain long-term client profiles or booking history unless the client opts in.'],
  ['Billing Discretion', 'All payments are processed by a certified PCI-DSS compliant payment processor. Your card statement will show a neutral billing descriptor — not the Angel Girls brand name. We do not store full card numbers.'],
  ['Third-Party Sharing', 'We do not sell, rent, lease, or share client information with any third party under any circumstances, with the sole exception of law enforcement requests made under valid legal process.'],
  ['Cookies & Tracking', 'We use only essential cookies for age verification session management and basic site function. No advertising, tracking, or analytics cookies are used. We do not use Google Analytics or any third-party pixel tracking.'],
  ['Your Rights', 'You may request deletion of your data at any time by contacting us. We will confirm deletion within 72 hours. Requests can be made via phone or the contact information provided at booking.']];


  return (
    <div className="page-enter">
      <PageWrap>
        <SectionLabel>Data Protection</SectionLabel>
        <H2>Privacy Policy</H2>
        <Lead>Angel Girls takes client privacy seriously. This policy explains what data we collect, why, and how we protect it.</Lead>
        <div style={{ display: 'grid', gap: 14, marginBottom: 40 }}>
          {sections.map(([t, d]) =>
          <Card key={t}>
              <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: 'white', margin: '0 0 8px' }}>{t}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, margin: 0 }}>{d}</p>
            </Card>
          )}
        </div>
        <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', color: '#FF2E88', fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          ← Back to Home
        </button>
      </PageWrap>
    </div>);

}

/* ══════════════════════════════════════
   THANK YOU
══════════════════════════════════════ */
function ThankYouPage({ booking, navigateTo, phone }) {
  return (
    <div className="page-enter" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 60px' }}>
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,46,136,0.12)', border: '1px solid rgba(255,46,136,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 0 40px rgba(255,46,136,0.2)' }}>
          <Icon name="check-circle" size={40} className="text-accent" />
        </div>
        <SectionLabel>Reservation Initialized</SectionLabel>
        <H2>Booking Confirmed</H2>
        <Lead>Your reservation details are secured. Our concierge will contact you within 15 minutes to confirm dispatch details and deliver your private verified gallery.</Lead>

        {booking &&
        <Card style={{ textAlign: 'left', marginBottom: 28 }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#FF2E88', marginBottom: 16 }}>Booking Summary</p>
            {[
          ['Angels Selected', `${booking.selectedGirlIds?.length || 0} Angel${(booking.selectedGirlIds?.length || 0) !== 1 ? 's' : ''}`],
          ['Service', booking.serviceId],
          ['Duration', `${booking.hours} Hours`],
          ['Location', booking.location],
          ['Deposit', `$${booking.depositAmount}`],
          ['Balance on Arrival', `$${booking.totalPrice - booking.depositAmount}`]].
          map(([k, v]) =>
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontFamily: "'Inter',sans-serif" }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{k}</span>
                <span style={{ fontSize: 13, color: 'white', fontWeight: 600, textTransform: 'capitalize' }}>{v}</span>
              </div>
          )}
          </Card>
        }

        <div style={{ background: 'rgba(255,46,136,0.08)', border: '1px solid rgba(255,46,136,0.18)', borderRadius: 12, padding: '20px 22px', marginBottom: 28 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: '0 0 12px' }}>
            Our concierge is standing by and will reach you at the number provided.
          </p>
          <a href={`tel:${phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#FF2E88', fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, textDecoration: 'none' }}>
            <Icon name="phone-call" size={18} /> {phone}
          </a>
        </div>

        <button onClick={() => navigateTo('home')} style={{ padding: '14px 32px', borderRadius: 10, background: '#FF2E88', color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer', border: 'none' }}>
          Return Home
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40, opacity: 0.2 }}>
          <img src={window.__resources && window.__resources.logo || 'uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png'} alt="" style={{ height: 40, width: 'auto', filter: 'brightness(10)' }} />
        </div>
      </div>
    </div>);

}

/* ══════════════════════════════════════
   LOCATION SEO PAGES
══════════════════════════════════════ */
const ZONE_DATA = {
  'mid-strip': { title: 'Mid-Strip / Luxury Core', resorts: ['Bellagio', 'Caesars Palace', 'Cosmopolitan', 'Aria', 'Venetian', 'Palazzo'], eta: '15–25 Min', desc: 'The absolute heart of the Las Vegas Strip. Broadest availability of verified Angels with the fastest dispatch times. Serving every major hotel tower and VIP pool cabana on the Boulevard.' },
  'north-strip': { title: 'North-Strip / Convention', resorts: ['Wynn', 'Encore', 'Fontainebleau', 'Resorts World', 'Sahara'], eta: '20–30 Min', desc: 'Luxury penthouse towers and convention hub suites. Ideal for high-end dinner dates, conference entertaining, and private lounge companionship.' },
  'south-strip': { title: 'South Strip Area', resorts: ['MGM Grand', 'Mandalay Bay', 'Delano', 'Luxor', 'Excalibur'], eta: '20–30 Min', desc: 'South Boulevard resort corridor including the MGM Grand complex. Perfect for bachelor events, boxing fight nights, and high-energy pool parties.' },
  'downtown': { title: 'Downtown / Fremont St', resorts: ['Circa Resort', 'Golden Nugget', 'The D Casino', 'Binion\'s'], eta: '25–35 Min', desc: 'Classic Las Vegas energy meets boutique luxury. Historic neon suites, Fremont Street views, and private downtown loft parties.' },
  'off-strip-west': { title: 'Off-Strip West / Summerlin', resorts: ['Palms Place', 'Rio Towers', 'Summerlin Estates', 'Red Rock Resort'], eta: '30–45 Min', desc: 'Private residential villas, luxury estate pools, and West Flamingo boutique towers. Discreet and exclusive — ideal for private home parties.' },
  'off-strip-east': { title: 'Off-Strip East / Henderson', resorts: ['Virgin Hotels', 'Green Valley Ranch', 'Henderson Mansions', 'Lake Las Vegas'], eta: '35–50 Min', desc: 'Gated golf estates, corporate penthouse suites, and Paradise corridor premium hotels. The quietest, most discreet dispatch zone we serve.' }
};

function LocationPage({ zoneId, navigateTo, phone }) {
  const zone = ZONE_DATA[zoneId] || ZONE_DATA['mid-strip'];
  return (
    <div className="page-enter">
      <PageWrap>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#FF2E88', background: 'rgba(255,46,136,0.1)', border: '1px solid rgba(255,46,136,0.2)', borderRadius: 999, padding: '4px 12px' }}>Active Dispatch Zone</span>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="clock" size={14} /> ETA: {zone.eta}</span>
        </div>
        <H2>Elite Angels in<br /><span style={{ color: '#FF2E88' }}>{zone.title.split(' / ')[0]}</span></H2>
        <Lead>{zone.desc} Providing 100% legal outcall entertainment and private showgirl dancers to the finest resorts in Las Vegas.</Lead>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
          <button onClick={() => navigateTo('booking')} style={{ padding: '13px 28px', borderRadius: 10, background: '#FF2E88', color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            View Full Roster <Icon name="arrow-right" size={16} />
          </button>
          <a href={`tel:${phone}`} style={{ padding: '13px 28px', borderRadius: 10, background: 'rgba(255,255,255,0.07)', color: 'white', fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Icon name="phone-call" size={16} className="text-accent" /> Call Dispatch
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Resorts Index</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 10, marginBottom: 48 }}>
          {zone.resorts.map((r) =>
          <Card key={r} style={{ textAlign: 'center', padding: '16px 12px' }}>
              <Icon name="map-pin" size={18} className="text-accent" style={{ margin: '0 auto 8px', display: 'block' }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{r}</span>
            </Card>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
          {[['shield-check', 'text-accent', 'Vetted & Legal', 'All performers are legally registered independent contractors complying with Las Vegas outcall regulations.'], ['clock', 'text-[#0ad6ff]', 'Rapid Dispatch', 'Strategic outpost positioning ensures our Angels arrive at your suite in as little as 15 minutes.'], ['star', 'text-[#39ff14]', 'Elite Standard', 'We maintain the highest standards of beauty, personality, and professionalism in the industry.']].map(([ico, clr, t, d]) =>
          <Card key={t}>
              <Icon name={ico} size={24} className={clr} style={{ marginBottom: 10 }} />
              <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, color: 'white', margin: '0 0 6px' }}>{t}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>{d}</p>
            </Card>
          )}
        </div>
      </PageWrap>
    </div>);

}

Object.assign(window, { AboutPage, HiringPage, TermsPage, PrivacyPage, ThankYouPage, LocationPage });
