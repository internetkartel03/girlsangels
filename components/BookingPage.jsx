const { useState, useEffect } = React;

function getLivePricing() {
  try { const s = localStorage.getItem('ag222_pricing_v1'); if (s) return JSON.parse(s); } catch {}
  return { services: [], depositPerAngel: 200, offStripSurcharge: 50 };
}
const SERVICE_META = {
  nude:      { description: 'Full nude private exotic dancing. Absolute exclusivity, elite performers.', badge: 'Elite Premium' },
  topless:   { description: 'High-energy topless sensual routines for penthouses & VIP hospitality.', badge: 'Popular Choice' },
  pool:      { description: 'Sensational dancers hosting luxury cabanas, private pools & VIP suites.', badge: 'Bachelor Event' },
  companion: { description: 'Sophisticated companion for dinners, casino tables & exclusive events.', badge: 'Ultimate Discretion' }
};
function buildServiceOptions() {
  const p = getLivePricing();
  if (p.services && p.services.length)
    return p.services.map(s => ({ id: s.id, name: s.name, hourlyRate: s.hourlyRate, ...(SERVICE_META[s.id] || { description: '', badge: '' }) }));
  return [
    { id: 'nude',      name: 'Full Nude Private Dancing',    hourlyRate: 800, ...SERVICE_META.nude },
    { id: 'topless',   name: 'Topless Private Dancing',      hourlyRate: 650, ...SERVICE_META.topless },
    { id: 'pool',      name: 'Pool Party / VIP Events',      hourlyRate: 550, ...SERVICE_META.pool },
    { id: 'companion', name: 'Arm Candy / VIP Dinner Date',  hourlyRate: 550, ...SERVICE_META.companion }
  ];
}

function BookingPage({ selectedGirlIds, onToggleGirl, onSubmitBooking }) {
  const [serviceId, setServiceId]       = useState('nude');
  const [hours, setHours]               = useState(2);
  const [date, setDate]                 = useState('');
  const [time, setTime]                 = useState('22:00');
  const [name, setName]                 = useState('');
  const [phone, setPhone]               = useState('');
  const [email, setEmail]               = useState('');
  const [selectedZoneId, setZoneId]     = useState('mid-strip');
  const [location, setLocation]         = useState('Bellagio Resort, 3600 S Las Vegas Blvd');
  const [roomNumber, setRoomNumber]     = useState('');
  const [instructions, setInstructions] = useState('');
  const [errorText, setErrorText]       = useState('');
  const [serviceOptions]                = useState(() => buildServiceOptions());
  const [livePricing]                   = useState(() => getLivePricing());

  useEffect(() => {
    const t = new Date();
    setDate(`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`);
  }, []);

  const svc      = serviceOptions.find(s => s.id === serviceId) || serviceOptions[0];
  const n        = Math.max(1, selectedGirlIds.length);
  const isOff    = selectedZoneId.startsWith('off-strip');
  const surcharge= isOff ? (livePricing.offStripSurcharge || 50) : 0;
  const deposit  = n * (livePricing.depositPerAngel || 200);
  const total    = n * (svc?.hourlyRate || 0) * hours + surcharge;

  const handleSubmit = e => {
    e.preventDefault();
    if (!selectedGirlIds.length) { setErrorText('Please select at least 1 Angel above.'); return; }
    if (!name.trim())            { setErrorText('Please enter your name.'); return; }
    if (phone.length < 8)        { setErrorText('Please enter a valid phone number.'); return; }
    if (!email.includes('@'))    { setErrorText('Please enter a valid email.'); return; }
    setErrorText('');
    onSubmitBooking({ selectedGirlIds, serviceId, hours, date, time, name, phone, email, location, roomNumber, instructions, totalPrice: total, depositAmount: deposit });
  };

  const inp  = { width:'100%', padding:'14px 16px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, color:'white', fontSize:15, outline:'none', fontFamily:"'Inter',sans-serif", boxSizing:'border-box' };
  const lbl  = { display:'block', fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)', marginBottom:7 };
  const sect = { background:'transparent', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:28, paddingBottom:8 };

  return (
    <div style={{ paddingTop:88, paddingBottom:60, fontFamily:"'Inter',sans-serif" }}>
      <div style={{ maxWidth:680, margin:'0 auto', padding:'0 16px', display:'flex', flexDirection:'column', gap:24 }}>

        {/* ── Logo + Header ─────────────────────────────── */}
        <div style={{ textAlign:'center', paddingTop:12 }}>
          <img src="uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png" alt="Angel Girls" style={{ height:'clamp(52px,12vw,80px)', width:'auto', marginBottom:16, filter:'drop-shadow(0 0 20px rgba(255,46,136,0.5))' }} />
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(26px,6vw,38px)', fontWeight:800, color:'white', margin:'0 0 10px', letterSpacing:'-0.02em' }}>Reserve Your Angels</h1>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(13px,3vw,15px)', lineHeight:1.7, margin:0 }}>Las Vegas · 24 / 7 Outcall · Verified & Discreet</p>
        </div>

        {/* ── Step 1: Location Map ───────────────────────── */}
        <div style={sect}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
            <span style={{ width:22, height:22, borderRadius:'50%', background:'#FF2E88', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:11, color:'white', flexShrink:0 }}>1</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>Select Your Vegas Location</span>
          </div>
          <VegasStripMap selectedZoneId={selectedZoneId} onSelectZone={zone => { setZoneId(zone.id); setLocation(zone.representativeAddress); }} />
        </div>

        {/* ── Step 2: Select Angels ──────────────────────── */}
        <div style={sect}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
            <span style={{ width:22, height:22, borderRadius:'50%', background:'#FF2E88', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:11, color:'white', flexShrink:0 }}>2</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>Choose Your Angels</span>
          </div>
          <GirlsShowcase selectedGirlIds={selectedGirlIds} onToggleGirl={onToggleGirl} />
        </div>

        {/* ── Step 3: Service + Duration ─────────────────── */}
        <div style={sect}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
            <span style={{ width:22, height:22, borderRadius:'50%', background:'#FF2E88', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:11, color:'white', flexShrink:0 }}>3</span>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>Choose Service & Duration</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
            {serviceOptions.map(opt => {
              const active = serviceId === opt.id;
              return (
                <button key={opt.id} type="button" onClick={() => setServiceId(opt.id)} style={{ padding:'16px', borderRadius:12, border:`1px solid ${active ? '#FF2E88' : 'rgba(255,255,255,0.08)'}`, background: active ? 'rgba(255,46,136,0.08)' : 'rgba(255,255,255,0.02)', textAlign:'left', cursor:'pointer', display:'flex', alignItems:'flex-start', gap:12, transition:'all .15s' }}>
                  <div style={{ width:20, height:20, borderRadius:'50%', border:`2px solid ${active ? '#FF2E88' : 'rgba(255,255,255,0.2)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                    {active && <div style={{ width:10, height:10, borderRadius:'50%', background:'#FF2E88' }} />}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'baseline', gap:6, marginBottom:4 }}>
                      <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:'clamp(13px,3.5vw,15px)', color:'white' }}>{opt.name}</span>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, fontSize:13, color:'#FF2E88' }}>${opt.hourlyRate}/hr</span>
                    </div>
                    <p style={{ fontSize:12, color:'rgba(255,255,255,0.5)', lineHeight:1.6, margin:0 }}>{opt.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ ...lbl, margin:0 }}>Duration</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'#FF2E88', fontWeight:700 }}>{hours} {hours===1?'Hour':'Hours'}</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
              {[1,2,3,4,6,8,12].map(hr => (
                <button key={hr} type="button" onClick={() => setHours(hr)} style={{ padding:'12px 4px', borderRadius:10, border:`1px solid ${hours===hr ? '#FF2E88' : 'transparent'}`, background: hours===hr ? '#FF2E88' : 'rgba(255,255,255,0.05)', color: hours===hr ? 'white' : 'rgba(255,255,255,0.5)', fontFamily:"'JetBrains Mono',monospace", fontSize:12, fontWeight:700, cursor:'pointer', transition:'all .15s' }}>
                  {hr}{hr===1?'hr':'hrs'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Step 4: Contact & Suite Details ────────────── */}
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <div style={sect}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
              <span style={{ width:22, height:22, borderRadius:'50%', background:'#FF2E88', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:11, color:'white', flexShrink:0 }}>4</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)' }}>Your Details & Suite</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><label style={lbl}>Your Name</label><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mike T." style={inp} /></div>
                <div><label style={lbl}>Room / Suite</label><input type="text" value={roomNumber} onChange={e=>setRoomNumber(e.target.value)} placeholder="e.g. 6104" style={inp} /></div>
              </div>
              <div><label style={lbl}>Hotel / Villa Address</label><input type="text" value={location} onChange={e=>setLocation(e.target.value)} placeholder="Hotel or villa address" style={inp} /></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><label style={lbl}>Phone (SMS)</label><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(702) 555-0000" style={inp} /></div>
                <div><label style={lbl}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={inp} /></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div><label style={lbl}>Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={inp} /></div>
                <div><label style={lbl}>Start Time</label><input type="text" value={time} onChange={e=>setTime(e.target.value)} placeholder="10:00 PM" style={inp} /></div>
              </div>
              <div><label style={lbl}>Special Requests</label><textarea value={instructions} onChange={e=>setInstructions(e.target.value)} placeholder="Vibe, preferences, champagne toast..." rows={3} style={{ ...inp, resize:'vertical' }} /></div>
            </div>
          </div>

          {/* ── Billing Summary ─────────────────────────── */}
          <div style={{ background:'rgba(255,46,136,0.06)', border:'1px solid rgba(255,46,136,0.2)', borderRadius:18, padding:'20px' }}>
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,46,136,0.7)', display:'block', marginBottom:14 }}>Estimated Total</span>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:14, paddingBottom:14, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
              {[['Angels', `${n}`], ['Service', `$${svc?.hourlyRate}/hr × ${hours}hrs`], isOff && ['Off-Strip Fee', `+$${surcharge}`]].filter(Boolean).map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between' }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.45)' }}>{k}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'white', fontWeight:700 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:12, color:'rgba(255,255,255,0.6)' }}>Balance on Arrival</span>
              <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:22, color:'white' }}>${total - deposit}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', background:'rgba(255,46,136,0.15)', border:'1px solid rgba(255,46,136,0.3)', borderRadius:12 }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'#FF2E88', fontWeight:700 }}>Deposit Now</span>
              <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:800, fontSize:22, color:'#FF2E88' }}>${deposit}</span>
            </div>
            <p style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:8, lineHeight:1.6 }}>Deposit is non-refundable and credited 1:1 toward your total.</p>
          </div>

          {errorText && <div style={{ padding:'12px 16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.25)', borderRadius:12, color:'#fca5a5', fontSize:13, textAlign:'center' }}>{errorText}</div>}

          <button type="submit" style={{ width:'100%', padding:'18px', background:'linear-gradient(135deg,#FF2E88,#FF5EB3)', border:'none', borderRadius:16, color:'white', fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(14px,3.5vw,17px)', cursor:'pointer', letterSpacing:'0.04em', boxShadow:'0 8px 32px rgba(255,46,136,0.4)', minHeight:56 }}>
            Reserve Angels & Unlock Galleries
          </button>
        </form>

      </div>
    </div>
  );
}

Object.assign(window, { BookingPage });
