// portal/Shared.jsx — Shared UI atoms for Angel Girls Portal

const PC = {
  bg: '#07070A', surface: '#0E0E14', surface2: '#141420',
  border: 'rgba(255,255,255,0.07)', borderHover: 'rgba(255,255,255,0.13)',
  accent: '#FF2E88', accentBg: 'rgba(255,46,136,0.12)',
  gold: '#FFC72C', goldBg: 'rgba(255,199,44,0.1)',
  text: '#ffffff', textMuted: 'rgba(255,255,255,0.55)', textFaint: 'rgba(255,255,255,0.28)',
  success: '#22c55e', successBg: 'rgba(34,197,94,0.1)',
  warning: '#fbbf24', warningBg: 'rgba(251,191,36,0.08)',
  danger: '#ef4444', dangerBg: 'rgba(239,68,68,0.1)',
};

function PCard({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{ background: PC.surface, border: `1px solid ${PC.border}`, borderRadius: 16, padding: 24, ...style }}>
      {children}
    </div>
  );
}

function PBadge({ label, color = PC.accent }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 100, background: color + '22', color, fontSize: 11, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }}></span>
      {label}
    </span>
  );
}

function PInput({ label, value, onChange, type = 'text', placeholder = '', multiline = false, rows = 4, disabled = false, hint = '' }) {
  const s = { width: '100%', padding: multiline ? '12px 16px' : '11px 16px', background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)', border: `1px solid ${PC.border}`, borderRadius: 10, color: disabled ? PC.textMuted : PC.text, fontSize: 14, outline: 'none', fontFamily: "'Inter',sans-serif", resize: multiline ? 'vertical' : 'none', boxSizing: 'border-box' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: PC.textFaint }}>{label}</label>}
      {multiline
        ? <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder} disabled={disabled} style={s} />
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} style={s} />}
      {hint && <span style={{ fontSize: 11, color: PC.textFaint }}>{hint}</span>}
    </div>
  );
}

function PButton({ children, onClick, variant = 'primary', size = 'md', disabled = false, type = 'button', fullWidth = false, style: extra = {} }) {
  const sizes = { sm: { padding: '7px 14px', fontSize: 12 }, md: { padding: '11px 20px', fontSize: 14 }, lg: { padding: '14px', fontSize: 15 } };
  const variants = {
    primary: { background: 'linear-gradient(135deg,#FF2E88,#FF5EB3)', color: 'white', boxShadow: '0 6px 20px rgba(255,46,136,0.28)', border: 'none' },
    ghost: { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', border: `1px solid ${PC.border}` },
    danger: { background: PC.dangerBg, color: '#fca5a5', border: '1px solid rgba(239,68,68,0.25)' },
    success: { background: PC.successBg, color: '#4ade80', border: '1px solid rgba(34,197,94,0.25)' },
    gold: { background: PC.goldBg, color: PC.gold, border: '1px solid rgba(255,199,44,0.25)' }
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...sizes[size], ...variants[variant], borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: "'Syne',sans-serif", fontWeight: 700, transition: 'all .18s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: disabled ? 0.5 : 1, width: fullWidth ? '100%' : 'auto', ...extra }}>
      {children}
    </button>
  );
}

function PSectionHeader({ label, sub, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 8 }}>
      <div>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: PC.accent, marginBottom: 3, opacity: 0.85 }}>{label}</p>
        {sub && <p style={{ fontSize: 12, color: PC.textFaint, margin: 0 }}>{sub}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

function PTabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 2, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 13, border: `1px solid ${PC.border}`, overflowX: 'auto', flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap', background: active === t.id ? PC.accent : 'transparent', color: active === t.id ? 'white' : PC.textMuted, transition: 'all .18s' }}>
          {t.label}{t.count ? ` (${t.count})` : ''}
        </button>
      ))}
    </div>
  );
}

function PStatCard({ label, value, color = PC.accent }) {
  return (
    <PCard style={{ textAlign: 'center', padding: '20px 16px' }}>
      <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color, margin: '0 0 4px', lineHeight: 1 }}>{value}</p>
      <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: PC.textFaint, margin: 0 }}>{label}</p>
    </PCard>
  );
}

function AvailabilityBadge({ workHours }) {
  const { label, color } = window.PortalData.availabilityLabel(workHours);
  return <PBadge label={label} color={color} />;
}

function StatusBadge({ status }) {
  const map = { active: { label: 'Active', color: '#22c55e' }, hidden: { label: 'Hidden', color: '#6b7280' }, suspended: { label: 'Suspended', color: '#ef4444' } };
  const cfg = map[status] || map.hidden;
  return <PBadge label={cfg.label} color={cfg.color} />;
}

function PortalLayout({ session, onLogout, children }) {
  return (
    <div style={{ minHeight: '100vh', background: PC.bg, color: PC.text, fontFamily: "'Inter',sans-serif" }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(7,7,10,0.85)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${PC.border}`, padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png" alt="Angel Girls" style={{ height: 34, width: 'auto', filter: 'drop-shadow(0 0 8px rgba(255,46,136,0.4))' }} />
          <div style={{ width: 1, height: 22, background: PC.border }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: PC.textFaint }}>
            {session.role === 'admin' ? 'Admin Console' : 'Angel Portal'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: PC.textMuted }}>{session.name}</span>
          {session.role === 'admin' && <PBadge label="Admin" color={PC.gold} />}
          <PButton variant="ghost" size="sm" onClick={onLogout}>Log Out</PButton>
        </div>
      </header>
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 80px' }}>{children}</main>
    </div>
  );
}

async function compressImage(file, maxW = 700) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.70));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

Object.assign(window, { PC, PCard, PBadge, PInput, PButton, PSectionHeader, PTabBar, PStatCard, AvailabilityBadge, StatusBadge, PortalLayout, compressImage });
