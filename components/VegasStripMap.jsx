const { useState } = React;

/* ─── HOTEL DATA ─── */
const HOTEL_LIST = [
  {id:'bellagio',  name:'Bellagio Hotel & Casino',   short:'BELLAGIO',          addr:'3600 S Las Vegas Blvd, Las Vegas, NV 89109', eta:2,  dist:0.3, surcharge:0,  zone:'mid-strip'    },
  {id:'wynn',      name:'Wynn Las Vegas',             short:'WYNN',              addr:'3131 S Las Vegas Blvd, Las Vegas, NV 89109', eta:4,  dist:0.8, surcharge:0,  zone:'north-strip'  },
  {id:'encore',    name:'Encore at Wynn',             short:'ENCORE',            addr:'3121 S Las Vegas Blvd, Las Vegas, NV 89109', eta:4,  dist:0.9, surcharge:0,  zone:'north-strip'  },
  {id:'venetian',  name:'The Venetian Resort',        short:'VENETIAN',          addr:'3355 S Las Vegas Blvd, Las Vegas, NV 89109', eta:6,  dist:0.5, surcharge:0,  zone:'mid-strip'    },
  {id:'palazzo',   name:'Palazzo Resort',             short:'PALAZZO',           addr:'3325 S Las Vegas Blvd, Las Vegas, NV 89109', eta:6,  dist:0.5, surcharge:0,  zone:'mid-strip'    },
  {id:'caesars',   name:'Caesars Palace',             short:'CAESARS PALACE',    addr:'3570 S Las Vegas Blvd, Las Vegas, NV 89109', eta:3,  dist:0.4, surcharge:0,  zone:'mid-strip'    },
  {id:'cosmo',     name:'The Cosmopolitan',           short:'COSMOPOLITAN',      addr:'3708 S Las Vegas Blvd, Las Vegas, NV 89109', eta:1,  dist:0.2, surcharge:0,  zone:'mid-strip'    },
  {id:'aria',      name:'ARIA Resort & Casino',       short:'ARIA',              addr:'3730 S Las Vegas Blvd, Las Vegas, NV 89109', eta:2,  dist:0.3, surcharge:0,  zone:'mid-strip'    },
  {id:'mgm',       name:'MGM Grand',                  short:'MGM GRAND',         addr:'3799 S Las Vegas Blvd, Las Vegas, NV 89109', eta:3,  dist:0.7, surcharge:0,  zone:'south-strip'  },
  {id:'parkmgm',   name:'Park MGM',                   short:'PARK MGM',          addr:'3770 S Las Vegas Blvd, Las Vegas, NV 89109', eta:2,  dist:0.5, surcharge:0,  zone:'south-strip'  },
  {id:'nyny',      name:'New York-New York Hotel',    short:'NEW YORK-NEW YORK', addr:'3790 S Las Vegas Blvd, Las Vegas, NV 89109', eta:3,  dist:0.6, surcharge:0,  zone:'south-strip'  },
  {id:'linq',      name:'The LINQ Hotel & Casino',    short:'LINQ',              addr:'3535 S Las Vegas Blvd, Las Vegas, NV 89109', eta:3,  dist:0.5, surcharge:0,  zone:'mid-strip'    },
  {id:'flamingo',  name:'Flamingo Las Vegas',         short:'FLAMINGO',          addr:'3555 S Las Vegas Blvd, Las Vegas, NV 89109', eta:4,  dist:0.5, surcharge:0,  zone:'mid-strip'    },
  {id:'paris',     name:'Paris Las Vegas',            short:'PARIS',             addr:'3655 S Las Vegas Blvd, Las Vegas, NV 89109', eta:3,  dist:0.4, surcharge:0,  zone:'mid-strip'    },
  {id:'mirage',    name:'The Mirage',                 short:'MIRAGE',            addr:'3400 S Las Vegas Blvd, Las Vegas, NV 89109', eta:4,  dist:0.4, surcharge:0,  zone:'mid-strip'    },
  {id:'ti',        name:'Treasure Island',            short:'TREASURE ISLAND',   addr:'3300 S Las Vegas Blvd, Las Vegas, NV 89109', eta:5,  dist:1.0, surcharge:0,  zone:'north-strip'  },
  {id:'mandalay',  name:'Mandalay Bay',               short:'MANDALAY BAY',      addr:'3950 S Las Vegas Blvd, Las Vegas, NV 89119', eta:9,  dist:1.3, surcharge:0,  zone:'south-strip'  },
  {id:'luxor',     name:'Luxor Hotel & Casino',       short:'LUXOR',             addr:'3900 S Las Vegas Blvd, Las Vegas, NV 89119', eta:7,  dist:1.1, surcharge:0,  zone:'south-strip'  },
  {id:'excalibur', name:'Excalibur Hotel & Casino',   short:'EXCALIBUR',         addr:'3850 S Las Vegas Blvd, Las Vegas, NV 89109', eta:5,  dist:0.9, surcharge:0,  zone:'south-strip'  },
  {id:'fontaine',  name:'Fontainebleau Las Vegas',    short:'FONTAINEBLEAU',     addr:'2777 S Las Vegas Blvd, Las Vegas, NV 89109', eta:9,  dist:1.6, surcharge:0,  zone:'north-strip'  },
  {id:'strat',     name:'The STRAT Hotel & Casino',   short:'STRAT',             addr:'2000 S Las Vegas Blvd, Las Vegas, NV 89104', eta:12, dist:2.0, surcharge:0,  zone:'north-strip'  },
  {id:'waldorf',   name:'Waldorf Astoria Las Vegas',  short:'WALDORF ASTORIA',   addr:'3752 S Las Vegas Blvd, Las Vegas, NV 89158', eta:3,  dist:0.4, surcharge:0,  zone:'mid-strip'    },
  {id:'vdara',     name:'Vdara Hotel & Spa',          short:'VDARA',             addr:'2600 W Harmon Ave, Las Vegas, NV 89158',     eta:2,  dist:0.3, surcharge:0,  zone:'mid-strip'    },
  {id:'palms',     name:'Palms Casino Resort',        short:'PALMS',             addr:'4321 W Flamingo Rd, Las Vegas, NV 89103',    eta:35, dist:2.2, surcharge:50, zone:'off-strip-west'},
  {id:'virgin',    name:'Virgin Hotels Las Vegas',    short:'VIRGIN HOTELS',     addr:'4455 Paradise Rd, Las Vegas, NV 89169',      eta:38, dist:2.8, surcharge:50, zone:'off-strip-east'},
];

const VEGAS_ZONES = [
  {id:'mid-strip',      name:'Mid Strip / Luxury Core',    representativeAddress:'Bellagio Resort, 3600 S Las Vegas Blvd, Las Vegas, NV 89109',    eta:'15 - 25 Min', fee:'Free', keyHotels:['Bellagio','Cosmopolitan','Caesars Palace','Aria','Venetian']},
  {id:'north-strip',    name:'North Strip / Convention',   representativeAddress:'Wynn Las Vegas, 3131 S Las Vegas Blvd, Las Vegas, NV 89109',     eta:'20 - 30 Min', fee:'Free', keyHotels:['Wynn','Encore','Resorts World','Fontainebleau']},
  {id:'south-strip',    name:'South Strip Area',           representativeAddress:'MGM Grand, 3799 S Las Vegas Blvd, Las Vegas, NV 89109',          eta:'20 - 30 Min', fee:'Free', keyHotels:['MGM Grand','Mandalay Bay','Luxor','Excalibur']},
  {id:'downtown',       name:'Downtown / Fremont St',      representativeAddress:'Circa Resort, 8 Fremont St, Las Vegas, NV 89101',               eta:'25 - 35 Min', fee:'Free', keyHotels:['Circa Las Vegas','Golden Nugget','The D Casino']},
  {id:'off-strip-west', name:'Off-Strip West / Summerlin', representativeAddress:'Palms Casino Resort, 4321 W Flamingo Rd, Las Vegas, NV 89103',  eta:'30 - 45 Min', fee:'+$50', keyHotels:['Palms Place','Rio Towers','Summerlin Estates']},
  {id:'off-strip-east', name:'Off-Strip East / Henderson', representativeAddress:'Virgin Hotels Las Vegas, 4455 Paradise Rd, Las Vegas, NV 89169', eta:'35 - 50 Min', fee:'+$50', keyHotels:['Virgin Hotels','Henderson Mansions','Green Valley Ranch']},
];

/* ─── PIN POSITIONS on the aerial image ─────────────────────────────────────
   x/y = % of container width / height
   Image perspective: north-strip at top-right, south-strip at bottom-left.
   Strip road runs diagonally top-right → bottom-left.
───────────────────────────────────────────────────────────────────────────── */
const PIN_POS = {
  strat:      {x:51, y:14},
  fontaine:   {x:55, y:19},
  encore:     {x:63, y:22},
  wynn:       {x:62, y:25},
  palazzo:    {x:62, y:29},
  venetian:   {x:61, y:32},
  ti:         {x:53, y:34},
  mirage:     {x:51, y:37},
  linq:       {x:58, y:39},
  flamingo:   {x:59, y:43},
  caesars:    {x:44, y:40},
  bellagio:   {x:37, y:43},
  cosmo:      {x:49, y:48},
  paris:      {x:55, y:47},
  vdara:      {x:39, y:52},
  aria:       {x:42, y:53},
  waldorf:    {x:45, y:57},
  parkmgm:    {x:43, y:62},
  nyny:       {x:50, y:63},
  mgm:        {x:57, y:61},
  excalibur:  {x:29, y:73},
  luxor:      {x:31, y:78},
  mandalay:   {x:33, y:83},
  palms:      {x:20, y:52},
  virgin:     {x:76, y:51},
};

/* ─── ARROW SVG ─── */
const IcoArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

/* ─── MAIN COMPONENT ─── */
function VegasStripMap({ selectedZoneId, onSelectZone }) {
  const [selected, setSelected] = useState(null);
  const [hovered,  setHovered]  = useState(null);
  const [query,    setQuery]    = useState('');
  const [showDrop, setShowDrop] = useState(false);

  const filtered = query.trim().length > 0
    ? HOTEL_LIST.filter(h => h.name.toLowerCase().includes(query.toLowerCase()) || h.addr.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  const handleSelect = (hotel) => {
    setSelected(s => s?.id === hotel.id ? null : hotel);
  };

  const selectFromSearch = (hotel) => {
    setSelected(hotel);
    setQuery(hotel.name);
    setShowDrop(false);
    const zone = VEGAS_ZONES.find(z => z.id === hotel.zone) || VEGAS_ZONES[0];
    onSelectZone({ ...zone, representativeAddress: hotel.addr });
  };

  const useCustomAddress = () => {
    if (!query.trim()) return;
    setShowDrop(false);
    const zone = VEGAS_ZONES[0];
    onSelectZone({ ...zone, representativeAddress: query.trim() });
  };

  const handleContinue = () => {
    if (!selected) return;
    const zone = VEGAS_ZONES.find(z => z.id === selected.zone) || VEGAS_ZONES[0];
    onSelectZone({ ...zone, representativeAddress: selected.addr });
  };

  const selPos = selected ? PIN_POS[selected.id] : null;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      {/* ── Search / Type Input ─────────────────────────── */}
      <div style={{ position:'relative' }}>
        <div style={{ display:'flex', gap:8 }}>
          <div style={{ flex:1, position:'relative' }}>
            <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:16, pointerEvents:'none' }}>🔍</span>
            <input
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowDrop(true); }}
              onFocus={() => setShowDrop(true)}
              onBlur={() => setTimeout(() => setShowDrop(false), 180)}
              placeholder="Type hotel name or address..."
              style={{ width:'100%', padding:'13px 14px 13px 40px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:12, color:'white', fontSize:14, outline:'none', fontFamily:"'Inter',sans-serif", boxSizing:'border-box' }}
            />
          </div>
          {query.trim() && filtered.length === 0 && (
            <button onClick={useCustomAddress} style={{ padding:'12px 18px', borderRadius:12, border:'1px solid rgba(0,200,255,0.3)', background:'rgba(0,150,255,0.1)', color:'rgba(0,210,255,0.9)', fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, cursor:'pointer', whiteSpace:'nowrap' }}>
              Use This Address
            </button>
          )}
        </div>

        {/* Dropdown suggestions */}
        {showDrop && filtered.length > 0 && (
          <div style={{ position:'absolute', top:'calc(100% + 6px)', left:0, right:0, background:'rgba(7,7,18,0.97)', border:'1px solid rgba(0,200,255,0.25)', borderRadius:12, zIndex:100, overflow:'hidden', backdropFilter:'blur(20px)', boxShadow:'0 8px 32px rgba(0,0,0,0.6)' }}>
            {filtered.map((h, i) => (
              <button key={h.id} onMouseDown={() => selectFromSearch(h)} style={{ width:'100%', padding:'12px 16px', background:i%2===0?'rgba(255,255,255,0.02)':'transparent', border:'none', borderBottom:'1px solid rgba(255,255,255,0.05)', color:'white', textAlign:'left', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
                <div>
                  <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, margin:0, marginBottom:2 }}>{h.name}</p>
                  <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.4)', margin:0, letterSpacing:'0.05em' }}>{h.addr}</p>
                </div>
                <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'rgba(0,200,255,0.7)', background:'rgba(0,150,255,0.1)', padding:'3px 8px', borderRadius:6 }}>{h.eta} min</span>
                  {h.surcharge > 0 && <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'rgba(255,180,80,0.8)', background:'rgba(255,150,0,0.1)', padding:'3px 8px', borderRadius:6 }}>+${h.surcharge}</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

    <div style={{ position:'relative', width:'100%', height:600, borderRadius:24, overflow:'hidden', border:'1px solid rgba(0,180,255,0.18)' }}>
      <style>{`
        @keyframes blueRing  { 0%,100%{opacity:.7;transform:translate(-50%,-50%) scale(1);}   50%{opacity:0;transform:translate(-50%,-50%) scale(2.6);} }
        @keyframes blueRing2 { 0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1);}   50%{opacity:0;transform:translate(-50%,-50%) scale(1.8);} }
        @keyframes corePulse { 0%,100%{box-shadow:0 0 18px 4px rgba(0,180,255,0.9),0 0 40px rgba(0,120,255,0.5);} 50%{box-shadow:0 0 32px 8px rgba(0,220,255,1),0 0 70px rgba(0,180,255,0.7);} }
        @keyframes pinDrop   { from{opacity:0;transform:translate(-50%,-50%) scale(0.4);} to{opacity:1;transform:translate(-50%,-50%) scale(1);} }
        @keyframes fadeIn    { from{opacity:0;transform:translateY(6px);} to{opacity:1;transform:translateY(0);} }
      `}</style>

      {/* ── AERIAL IMAGE ── */}
      <img
        src={(window.__resources && window.__resources.vegasMap) || 'uploads/ChatGPT Image May 27, 2026, 06_42_09 PM.png'}
        alt="Las Vegas Strip aerial"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }}
      />

      {/* Very light dark tint for pin contrast */}
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,12,0.22)', pointerEvents:'none' }} />

      {/* Bottom gradient for footer legibility */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:120, background:'linear-gradient(to top,rgba(0,0,15,0.97) 0%,rgba(0,0,12,0.65) 55%,transparent 100%)', pointerEvents:'none' }} />

      {/* ── HOVER TARGETS — invisible buttons at each casino position ── */}
      {HOTEL_LIST.map(hotel => {
        const pos = PIN_POS[hotel.id];
        if (!pos) return null;
        const isHov = hovered === hotel.id;
        const isSel = selected?.id === hotel.id;

        return (
          <button
            key={hotel.id}
            onClick={() => handleSelect(hotel)}
            onMouseEnter={() => setHovered(hotel.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position:'absolute',
              left:`${pos.x}%`, top:`${pos.y}%`,
              transform:'translate(-50%,-50%)',
              width:36, height:36, borderRadius:'50%',
              background:'none', border:'none', cursor:'pointer',
              zIndex: isSel ? 5 : isHov ? 25 : 10,
              padding:0,
            }}
          >
            {/* Hover glow — transparent blue ring */}
            {isHov && !isSel && (
              <>
                <span style={{
                  position:'absolute', left:'50%', top:'50%',
                  width:52, height:52, borderRadius:'50%',
                  background:'rgba(0,160,255,0.15)',
                  border:'1.5px solid rgba(0,200,255,0.55)',
                  boxShadow:'0 0 28px rgba(0,180,255,0.7), 0 0 56px rgba(0,120,255,0.35)',
                  animation:'blueRing 1.8s ease-in-out infinite',
                  display:'block', pointerEvents:'none',
                }} />
                {/* Tiny core dot */}
                <span style={{
                  position:'absolute', left:'50%', top:'50%',
                  width:10, height:10, borderRadius:'50%',
                  background:'rgba(0,200,255,0.75)',
                  border:'1.5px solid rgba(150,230,255,0.9)',
                  boxShadow:'0 0 14px rgba(0,180,255,0.9)',
                  transform:'translate(-50%,-50%)',
                  display:'block', pointerEvents:'none',
                  transition:'all 200ms',
                }} />
                {/* Tooltip label */}
                <span style={{
                  position:'absolute',
                  bottom:'calc(100% + 8px)', left:'50%',
                  transform:'translateX(-50%)',
                  whiteSpace:'nowrap',
                  background:'rgba(0,8,28,0.88)',
                  backdropFilter:'blur(14px)',
                  border:'1px solid rgba(0,200,255,0.45)',
                  borderRadius:8, padding:'4px 10px',
                  fontFamily:"'JetBrains Mono',monospace",
                  fontSize:10, fontWeight:700,
                  letterSpacing:'0.16em', textTransform:'uppercase',
                  color:'rgba(0,220,255,0.95)',
                  boxShadow:'0 0 16px rgba(0,180,255,0.3)',
                  pointerEvents:'none', zIndex:60,
                  animation:'fadeIn 150ms ease both',
                }}>
                  {hotel.short}
                </span>
              </>
            )}

            {/* Tiny always-visible dot (non-selected, non-hovered) */}
            {!isHov && !isSel && (
              <span style={{
                position:'absolute', left:'50%', top:'50%',
                width:6, height:6, borderRadius:'50%',
                background:'rgba(0,180,255,0.35)',
                border:'1px solid rgba(0,200,255,0.45)',
                boxShadow:'0 0 5px rgba(0,180,255,0.4)',
                transform:'translate(-50%,-50%)',
                display:'block', pointerEvents:'none',
              }} />
            )}
          </button>
        );
      })}

      {/* ── SINGLE MOVING SELECTED PIN ── */}
      {selPos && (
        <div
          key={selected.id}
          style={{
            position:'absolute',
            left:`${selPos.x}%`, top:`${selPos.y}%`,
            transform:'translate(-50%,-50%)',
            zIndex:30, pointerEvents:'none',
            transition:'left 550ms cubic-bezier(0.4,0,0.2,1), top 550ms cubic-bezier(0.4,0,0.2,1)',
            animation:'pinDrop 300ms cubic-bezier(0.34,1.56,0.64,1) both',
          }}
        >
          {/* Outer ring 1 */}
          <span style={{
            position:'absolute', left:'50%', top:'50%',
            width:72, height:72, borderRadius:'50%',
            background:'rgba(0,140,255,0.10)',
            border:'1px solid rgba(0,200,255,0.28)',
            animation:'blueRing 2.2s ease-in-out infinite',
            display:'block',
          }} />
          {/* Outer ring 2 */}
          <span style={{
            position:'absolute', left:'50%', top:'50%',
            width:48, height:48, borderRadius:'50%',
            background:'rgba(0,160,255,0.16)',
            border:'1.5px solid rgba(0,210,255,0.45)',
            animation:'blueRing2 2.2s ease-in-out infinite 0.35s',
            display:'block',
          }} />
          {/* Core dot */}
          <span style={{
            position:'absolute', left:'50%', top:'50%',
            width:18, height:18, borderRadius:'50%',
            background:'rgba(0,190,255,0.92)',
            border:'2.5px solid rgba(200,240,255,1)',
            boxShadow:'0 0 0 0 rgba(0,180,255,0)',
            animation:'corePulse 2s ease-in-out infinite',
            transform:'translate(-50%,-50%)',
            display:'block',
          }} />
          {/* Label above pin */}
          <span style={{
            position:'absolute', bottom:'calc(50% + 18px)', left:'50%',
            transform:'translateX(-50%)',
            whiteSpace:'nowrap',
            background:'rgba(0,8,28,0.90)',
            backdropFilter:'blur(16px)',
            border:'1px solid rgba(0,210,255,0.65)',
            borderRadius:9, padding:'5px 12px',
            fontFamily:"'JetBrains Mono',monospace",
            fontSize:10, fontWeight:800,
            letterSpacing:'0.18em', textTransform:'uppercase',
            color:'rgba(150,235,255,1)',
            boxShadow:'0 0 22px rgba(0,180,255,0.45)',
            animation:'fadeIn 250ms ease both',
          }}>
            {selected.short}
          </span>
        </div>
      )}

      {/* ── FOOTER OVERLAY ── */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        padding:'18px 24px',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:16,
        zIndex:40,
      }}>
        {/* Left: selected info or prompt */}
        <div style={{ animation: selected ? 'fadeIn 250ms ease both' : 'none' }}>
          {selected ? (
            <>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:800, color:'white', letterSpacing:'0.04em', marginBottom:4, textShadow:'0 0 20px rgba(0,180,255,0.5)' }}>
                {selected.name}
              </div>
              <div style={{ display:'flex', gap:16, fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'rgba(0,210,255,0.8)', letterSpacing:'0.18em', textTransform:'uppercase' }}>
                <span>ETA {selected.eta} min</span>
                <span>·</span>
                <span>{selected.dist} mi</span>
                {selected.surcharge > 0 && <><span>·</span><span style={{ color:'rgba(255,180,80,0.9)' }}>+${selected.surcharge} surcharge</span></>}
              </div>
            </>
          ) : (
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.38)', letterSpacing:'0.22em', textTransform:'uppercase' }}>
              Tap any location on the map
            </div>
          )}
        </div>

        {/* Right: Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'12px 26px', borderRadius:12, flexShrink:0,
            background: selected
              ? 'linear-gradient(to right, #0077ff, #00bbff)'
              : 'rgba(255,255,255,0.06)',
            border: selected
              ? '1px solid rgba(0,200,255,0.55)'
              : '1px solid rgba(255,255,255,0.1)',
            color: selected ? 'white' : 'rgba(255,255,255,0.28)',
            fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:800,
            letterSpacing:'0.2em', textTransform:'uppercase',
            cursor: selected ? 'pointer' : 'default',
            boxShadow: selected ? '0 0 32px rgba(0,150,255,0.45)' : 'none',
            transition:'all 200ms',
          }}
          onMouseEnter={e => { if(selected) { e.currentTarget.style.transform='scale(1.04)'; e.currentTarget.style.boxShadow='0 0 48px rgba(0,180,255,0.6)'; }}}
          onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=selected?'0 0 32px rgba(0,150,255,0.45)':'none'; }}
        >
          Continue <IcoArrow />
        </button>
      </div>
    </div>
    </div>
  );
}

Object.assign(window, { VegasStripMap, VEGAS_ZONES });
