// components/AgreementPage.jsx — Client Service Agreement E-Sign
const { useState, useRef, useEffect } = React;

const AGREEMENT_VERSION = '1.0';

const SECTIONS = [
  ['1. ENTERTAINMENT SERVICES ONLY', 'The Company provides lawful adult entertainment booking and referral services only. Services may include social hosting, promotional appearances, nightlife companionship, modeling appearances, dancing, pool parties, event entertainment, and similar lawful entertainment services. The Company does not offer, permit, promote, arrange, or tolerate prostitution, escorting for illegal purposes, human trafficking, or any unlawful sexual services.'],
  ['2. ZERO-TOLERANCE POLICY', 'Any request, suggestion, pressure, negotiation, or attempt to engage entertainers in unlawful conduct including prostitution, drug activity, coercion, trafficking, assault, harassment, or violence shall result in immediate termination of services without refund and may be reported to law enforcement.'],
  ['3. CLIENT CONDUCT REQUIREMENTS', 'Client agrees to maintain respectful, lawful, and non-threatening conduct toward all entertainers, contractors, drivers, security personnel, representatives, and staff. Physical aggression, intimidation, unwanted touching, harassment, stalking, filming without consent, property damage, or abusive behavior is strictly prohibited.'],
  ['4. CONSENT AND BOUNDARIES', "Entertainers maintain complete autonomy and personal boundaries at all times. Any level of dress, performance, conversation, or entertainment participation is voluntary and determined solely by the entertainer. Clients may not pressure, manipulate, intimidate, or retaliate against entertainers for declining any request."],
  ['5. OPTIONAL NUDITY', "Certain lawful entertainment performances may involve topless or full nude performances where legally permitted. Participation in any such performance is entirely voluntary at the entertainer's discretion."],
  ['6. SAFETY AND TERMINATION OF SERVICES', 'The Company and entertainers reserve the right to immediately refuse, terminate, or leave any booking or event for safety, legal, behavioral, intoxication, environmental, or comfort-related concerns. No refunds shall be provided where services are terminated due to Client misconduct or policy violations.'],
  ['7. SUBSTANCE POLICY', 'Illegal narcotics, unlawful substances, and unsafe conduct are strictly prohibited during any booking. Excessive intoxication or unsafe behavior may result in immediate termination of services.'],
  ['8. RECORDING AND PRIVACY', 'Client may not secretly photograph, record, livestream, distribute, or publish any entertainer or Company representative without express consent. Client agrees to respect the privacy, identity, and confidentiality of entertainers and Company personnel.'],
  ['9. PAYMENT, DEPOSITS, AND CANCELLATIONS', 'Booking fees, deposits, concierge fees, and administrative fees are generally non-refundable unless otherwise determined by Company policy. The Company reserves the right to refuse or cancel bookings at its discretion.'],
  ['10. LIMITATION OF COMPANY SERVICES AND AUTHORITY', "The Company's services are strictly limited to coordinating lawful entertainment-related appearances and bookings. The Company does not participate in, arrange, negotiate, supervise, authorize, endorse, or facilitate any conduct or activities outside the scope of the scheduled lawful entertainment services.\n\nEntertainers are independent contractors and are not employees, agents, or representatives authorized to act on behalf of the Company outside agreed lawful entertainment services.\n\nClients acknowledge that any personal conduct, private communications, or independent arrangements occurring outside Company-arranged services are not affiliated with, approved by, or connected to the Company."],
  ['11. LIMITATION OF LIABILITY', 'Client understands that entertainers are independent contractors and not employees of the Company. The Company shall not be liable for acts, omissions, disputes, injuries, damages, or conduct arising from independent contractor actions outside the scope of lawful entertainment services.'],
  ['12. INDEMNIFICATION', 'Client agrees to indemnify and hold harmless the Company, its owners, contractors, representatives, affiliates, and agents from claims, damages, liabilities, losses, or expenses arising from Client misconduct, unlawful conduct, property damage, personal injury, or breach of this Agreement.'],
  ['13. GOVERNING LAW', 'This Agreement shall be governed by the laws of the State of Nevada. Any disputes arising under this Agreement shall be resolved exclusively in Nevada.'],
  ['14. ACKNOWLEDGEMENT', 'By signing below, Client acknowledges understanding and acceptance of all policies, boundaries, and legal restrictions contained in this Agreement.'],
];

/* ── Signature Pad ─────────────────────────────────────────────── */
function SignaturePad({ onSign, onClear }) {
  const canvasRef   = useRef(null);
  const drawing     = useRef(false);
  const [hasSig, setHasSig] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth   = 2.2;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
  }, []);

  const pos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const start = e => {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    const p   = pos(e, canvasRef.current);
    ctx.beginPath(); ctx.moveTo(p.x, p.y);
  };

  const move = e => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const p      = pos(e, canvas);
    ctx.lineTo(p.x, p.y); ctx.stroke();
    setHasSig(true);
    onSign(canvas.toDataURL('image/png'));
  };

  const end = () => { drawing.current = false; };

  const clear = () => {
    const canvas = canvasRef.current;
    const dpr    = window.devicePixelRatio || 1;
    canvas.getContext('2d').clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasSig(false); onClear();
  };

  return (
    <div>
      <canvas ref={canvasRef}
        onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
        onTouchStart={start} onTouchMove={move} onTouchEnd={end}
        style={{ width:'100%', height:120, border:'2px solid #d1d5db', borderRadius:10, cursor:'crosshair', touchAction:'none', background:'white', display:'block' }}
      />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6 }}>
        <span style={{ fontSize:11, color:'#9ca3af', fontFamily:"'Inter',sans-serif" }}>Draw your signature with finger or mouse</span>
        {hasSig && <button type="button" onClick={clear} style={{ background:'none', border:'1px solid #d1d5db', borderRadius:6, padding:'3px 12px', fontSize:12, color:'#6b7280', cursor:'pointer' }}>Clear</button>}
      </div>
    </div>
  );
}

/* ── Main Agreement Page ───────────────────────────────────────── */
function AgreementPage({ booking, onSigned, onBack }) {
  const [fullName,   setFullName]   = useState(booking?.name  || '');
  const [phone,      setPhone]      = useState(booking?.phone || '');
  const [email,      setEmail]      = useState(booking?.email || '');
  const [bkDate,     setBkDate]     = useState(booking?.date  || '');
  const [legalName,  setLegalName]  = useState('');
  const [signature,  setSignature]  = useState('');
  const [agreed,     setAgreed]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  const canSubmit = fullName.trim() && phone.trim() && email.includes('@') && bkDate && legalName.trim() && signature && agreed;

  const onScroll = e => {
    const el = e.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 60) setScrolled(true);
  };

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    let ip = 'unavailable';
    try { const r = await fetch('https://api.ipify.org?format=json'); ip = (await r.json()).ip; } catch {}
    const record = {
      id: 'agr_' + Date.now(),
      bookingId: booking?.bookingId || ('bk_' + Date.now()),
      version: AGREEMENT_VERSION,
      timestamp: new Date().toISOString(),
      ip,
      clientName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      bookingDate: bkDate,
      typedLegalName: legalName.trim(),
      signatureDataUrl: signature,
      checkboxAgreed: true,
      bookingData: booking,
      paymentStatus: 'pending'
    };
    const all = JSON.parse(localStorage.getItem('ag222_agreements') || '[]');
    all.push(record);
    localStorage.setItem('ag222_agreements', JSON.stringify(all));
    onSigned(record);
  };

  const docInp = { width:'100%', padding:'11px 14px', border:'1.5px solid #d1d5db', borderRadius:10, fontSize:14, color:'#1a1a2e', fontFamily:"'Inter',sans-serif", outline:'none', boxSizing:'border-box', background:'white' };
  const docLbl = { display:'block', fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6, fontFamily:"'Inter',sans-serif" };

  return (
    <div style={{ minHeight:'100vh', background:'#07070A', paddingTop:72, paddingBottom:100, fontFamily:"'Inter',sans-serif" }}>

      {/* Page header */}
      <div style={{ textAlign:'center', padding:'20px 20px 16px' }}>
        <img src="uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png" alt="Angel Girls" style={{ height:48, width:'auto', marginBottom:10, filter:'drop-shadow(0 0 16px rgba(255,46,136,0.45))' }} />
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(255,46,136,0.7)', margin:'0 0 6px' }}>Required Before Checkout</p>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'clamp(20px,5vw,26px)', fontWeight:800, color:'white', margin:0 }}>Client Service Agreement</h1>
      </div>

      <div style={{ maxWidth:660, margin:'0 auto', padding:'0 16px', display:'flex', flexDirection:'column', gap:16 }}>

        {/* Scrollable document */}
        <div onScroll={onScroll} style={{ background:'white', borderRadius:16, padding:'28px 22px', maxHeight:400, overflowY:'auto', boxShadow:'0 8px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign:'center', marginBottom:24, paddingBottom:16, borderBottom:'2px solid #e5e7eb' }}>
            <p style={{ fontFamily:"'Georgia',serif", fontWeight:700, fontSize:16, color:'#1a1a2e', margin:'0 0 4px', letterSpacing:'0.04em' }}>ANGEL GIRLS ENTERTAINMENT</p>
            <p style={{ fontFamily:"'Georgia',serif", fontWeight:700, fontSize:13, color:'#1a56db', margin:0 }}>CLIENT SERVICE AGREEMENT & CODE OF CONDUCT</p>
          </div>
          <p style={{ fontSize:12.5, color:'#4b5563', lineHeight:1.8, marginBottom:20 }}>
            This Client Service Agreement ("Agreement") is entered into between <strong>Velvet House Collective LLC DBA Angel Girls Entertainment</strong> ("Company") and the undersigned Client ("Client"). By booking, scheduling, paying for, or participating in any service coordinated through the Company, Client agrees to the following terms and conditions.
          </p>
          {SECTIONS.map(([title, text]) => (
            <div key={title} style={{ marginBottom:16 }}>
              <p style={{ fontFamily:"'Georgia',serif", fontWeight:700, fontSize:12, color:'#1a56db', margin:'0 0 5px', letterSpacing:'0.03em' }}>{title}</p>
              {text.split('\n\n').map((para, i) => (
                <p key={i} style={{ fontSize:12, color:'#374151', lineHeight:1.8, margin:'0 0 6px' }}>{para}</p>
              ))}
            </div>
          ))}
          {!scrolled && (
            <p style={{ textAlign:'center', fontSize:11, color:'#9ca3af', paddingTop:10, borderTop:'1px solid #f3f4f6' }}>↓ Continue scrolling to read the full agreement</p>
          )}
        </div>

        {/* Signature block */}
        <div style={{ background:'white', borderRadius:16, padding:'24px 22px', boxShadow:'0 8px 40px rgba(0,0,0,0.5)' }}>
          <p style={{ fontFamily:"'Georgia',serif", fontWeight:700, fontSize:14, color:'#1a1a2e', margin:'0 0 18px', borderBottom:'1px solid #e5e7eb', paddingBottom:12 }}>CLIENT INFORMATION</p>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
            <div><label style={docLbl}>Full Name *</label><input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="John Smith" style={docInp} /></div>
            <div><label style={docLbl}>Phone Number *</label><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(702) 555-0000" style={docInp} /></div>
            <div><label style={docLbl}>Email Address *</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={docInp} /></div>
            <div><label style={docLbl}>Booking Date *</label><input type="date" value={bkDate} onChange={e=>setBkDate(e.target.value)} style={docInp} /></div>
          </div>

          <div style={{ marginBottom:18 }}>
            <label style={docLbl}>Typed Legal Name * <span style={{ textTransform:'none', fontWeight:400, color:'#9ca3af' }}>(confirms identity)</span></label>
            <input type="text" value={legalName} onChange={e=>setLegalName(e.target.value)} placeholder="Type your full legal name exactly" style={{ ...docInp, fontFamily:"'Georgia',serif", fontSize:15, fontStyle:'italic', color:'#1a56db' }} />
          </div>

          <div style={{ marginBottom:20 }}>
            <label style={{ ...docLbl, marginBottom:10 }}>Client Signature *</label>
            <SignaturePad onSign={setSignature} onClear={()=>setSignature('')} />
          </div>

          <label style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'14px 16px', background: agreed ? '#f0fdf4' : '#f9fafb', border:`1.5px solid ${agreed ? '#22c55e' : '#e5e7eb'}`, borderRadius:12, cursor:'pointer', transition:'all .2s' }}>
            <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} style={{ width:18, height:18, marginTop:2, accentColor:'#22c55e', flexShrink:0 }} />
            <span style={{ fontSize:13, color:'#374151', lineHeight:1.65 }}>
              I have read, understood, and agree to the <strong>Angel Girls Entertainment Client Service Agreement & Code of Conduct</strong>. I confirm I am 21+ years of age and entering this agreement voluntarily.
            </span>
          </label>
        </div>

        <button onClick={onBack} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.28)', fontSize:12, fontFamily:"'JetBrains Mono',monospace", letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', alignSelf:'flex-start' }}>
          ← Back to Booking
        </button>
      </div>

      {/* Sticky bottom CTA */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, padding:'12px 16px 18px', background:'rgba(7,7,10,0.96)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,0.07)', zIndex:60 }}>
        <div style={{ maxWidth:660, margin:'0 auto' }}>
          {!canSubmit && (
            <p style={{ textAlign:'center', fontSize:11, color:'rgba(255,255,255,0.3)', fontFamily:"'JetBrains Mono',monospace", letterSpacing:'0.1em', margin:'0 0 10px' }}>
              {!signature ? '✍ Signature required' : !agreed ? '☐ Please check the agreement box' : '⚠ Complete all fields to continue'}
            </p>
          )}
          <button onClick={handleSubmit} disabled={!canSubmit || submitting} style={{ width:'100%', padding:'17px', background: canSubmit ? 'linear-gradient(135deg,#FF2E88,#FF5EB3)' : 'rgba(255,255,255,0.07)', border:'none', borderRadius:14, color: canSubmit ? 'white' : 'rgba(255,255,255,0.25)', fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'clamp(14px,4vw,16px)', cursor: canSubmit ? 'pointer' : 'not-allowed', letterSpacing:'0.04em', transition:'all .2s', boxShadow: canSubmit ? '0 8px 32px rgba(255,46,136,0.4)' : 'none', minHeight:54 }}>
            {submitting ? 'Processing…' : 'Accept & Continue to Payment →'}
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AgreementPage });
