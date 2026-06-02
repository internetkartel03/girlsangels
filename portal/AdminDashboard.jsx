// portal/AdminDashboard.jsx — Admin back-office console
const { useState: useAS, useEffect: useAE } = React;

function AdminDashboard() {
  const [tab, setTab] = useAS('overview');
  const [girls, setGirls] = useAS(() => window.PortalData.getGirls());
  const [toast, setToast] = useAS('');

  const reload = () => setGirls(window.PortalData.getGirls());
  const flash = msg => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const pendingCount = girls.filter(g => g.pending?.status === 'pending').length;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'approvals', label: 'Approvals', count: pendingCount || undefined },
    { id: 'girls', label: 'All Angels' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'agreements', label: 'Agreements' },
    { id: 'add', label: '+ New Angel' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, margin: '0 0 6px', color: 'white' }}>Admin Console</h1>
        <p style={{ color: PC.textFaint, fontSize: 14, margin: 0 }}>Angel Girls — Back Office Management</p>
      </div>

      {toast && (
        <div style={{ padding: '12px 18px', background: PC.successBg, border: '1px solid rgba(34,197,94,0.22)', borderRadius: 12, color: '#4ade80', fontSize: 14 }}>{toast}</div>
      )}

      <PTabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'overview'  && <AdminOverview  girls={girls} />}
      {tab === 'approvals' && <AdminApprovals girls={girls} reload={reload} flash={flash} />}
      {tab === 'girls'     && <AdminGirls     girls={girls} reload={reload} flash={flash} />}
      {tab === 'pricing'    && <AdminPricing    flash={flash} />}
      {tab === 'agreements' && <AdminAgreements />}
      {tab === 'add'        && <AdminAddGirl   reload={reload} flash={flash} onDone={() => setTab('girls')} />}
    </div>
  );
}

// ── Overview ──────────────────────────────────────────────────────
function AdminOverview({ girls }) {
  const active   = girls.filter(g => g.approved.publicStatus === 'active').length;
  const hidden   = girls.filter(g => g.approved.publicStatus === 'hidden').length;
  const pending  = girls.filter(g => g.pending?.status === 'pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 14 }}>
        <PStatCard label="Total Angels" value={girls.length} color="white" />
        <PStatCard label="Active / Public" value={active} color={PC.success} />
        <PStatCard label="Hidden" value={hidden} color="#6b7280" />
        <PStatCard label="Pending Review" value={pending} color={PC.warning} />
      </div>

      <PCard>
        <PSectionHeader label="Roster" sub="Quick status view of all Angels" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {girls.map(g => {
            const av = window.PortalData.availabilityLabel(g.workHours);
            return (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: `1px solid ${PC.border}`, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 15, color: 'white', margin: '0 0 2px' }}>{g.approved.stageName}</p>
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: PC.textFaint, margin: 0, letterSpacing: '0.1em' }}>@{g.username}</p>
                </div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
                  <StatusBadge status={g.approved.publicStatus} />
                  <PBadge label={av.label} color={av.color} />
                  {g.pending?.status === 'pending' && <PBadge label="Needs Review" color={PC.warning} />}
                </div>
              </div>
            );
          })}
        </div>
      </PCard>
    </div>
  );
}

// ── Approvals ─────────────────────────────────────────────────────
function AdminApprovals({ girls, reload, flash }) {
  const pending = girls.filter(g => g.pending?.status === 'pending');
  const [rejectReason, setReason] = useAS({});
  const [showReject, setShowReject] = useAS({});

  const approve = id => {
    window.PortalData.approvePending(id);
    reload(); flash('Changes approved and live!');
  };

  const reject = id => {
    window.PortalData.rejectPending(id, rejectReason[id] || 'Does not meet profile guidelines.');
    reload(); flash('Changes rejected. The Angel has been notified.');
    setShowReject(p => ({ ...p, [id]: false }));
  };

  if (!pending.length) return (
    <PCard style={{ textAlign: 'center', padding: '56px 24px' }}>
      <div style={{ fontSize: 40, marginBottom: 14 }}>✓</div>
      <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: 'white', margin: '0 0 8px' }}>All Clear</p>
      <p style={{ color: PC.textFaint, fontSize: 14, margin: 0 }}>No pending profile changes to review.</p>
    </PCard>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {pending.map(g => (
        <PCard key={g.id} style={{ border: '1px solid rgba(251,191,36,0.2)' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 22 }}>
            <div>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: 'white', margin: '0 0 4px' }}>{g.approved.stageName}</p>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: PC.textFaint, margin: 0, letterSpacing: '0.12em' }}>
                @{g.username} · {new Date(g.pending.submittedAt).toLocaleString()}
              </p>
            </div>
            <PBadge label="Pending Review" color={PC.warning} />
          </div>

          {/* Before / After */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22 }}>
            <div style={{ padding: 16, background: 'rgba(255,255,255,0.02)', borderRadius: 11, border: `1px solid ${PC.border}` }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: PC.textFaint, marginBottom: 12 }}>Current Live</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>{g.approved.stageName}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>{g.approved.bio || <em>No bio</em>}</p>
              {g.approved.photos?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                  {g.approved.photos.slice(0, 4).map((p, i) => (
                    <img key={i} src={p} alt="" style={{ width: 42, height: 54, objectFit: 'cover', borderRadius: 6 }} />
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: 16, background: 'rgba(251,191,36,0.04)', borderRadius: 11, border: '1px solid rgba(251,191,36,0.18)' }}>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: PC.warning, marginBottom: 12, opacity: 0.75 }}>Proposed Changes</p>
              <p style={{ fontSize: 13, fontWeight: 700, color: g.pending.stageName !== g.approved.stageName ? PC.warning : 'rgba(255,255,255,0.65)', marginBottom: 8 }}>
                {g.pending.stageName}
                {g.pending.stageName !== g.approved.stageName && <span style={{ fontSize: 10, marginLeft: 6, color: 'rgba(251,191,36,0.6)' }}>changed</span>}
              </p>
              <p style={{ fontSize: 12, color: g.pending.bio !== g.approved.bio ? 'rgba(251,191,36,0.8)' : 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>{g.pending.bio || <em>No bio</em>}</p>
              {g.pending.photos?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                  {g.pending.photos.slice(0, 4).map((p, i) => (
                    <img key={i} src={p} alt="" style={{ width: 42, height: 54, objectFit: 'cover', borderRadius: 6, border: '1px solid rgba(251,191,36,0.3)' }} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {!showReject[g.id] ? (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <PButton variant="success" onClick={() => approve(g.id)}>✓ Approve &amp; Publish</PButton>
              <PButton variant="danger" onClick={() => setShowReject(p => ({ ...p, [g.id]: true }))}>✕ Reject</PButton>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <PInput
                label="Rejection Reason (shown to the Angel)"
                value={rejectReason[g.id] || ''}
                onChange={e => setReason(p => ({ ...p, [g.id]: e.target.value }))}
                placeholder="e.g. Photo quality too low, please resubmit with clear images…"
              />
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <PButton variant="danger" onClick={() => reject(g.id)}>Confirm Rejection</PButton>
                <PButton variant="ghost" onClick={() => setShowReject(p => ({ ...p, [g.id]: false }))}>Cancel</PButton>
              </div>
            </div>
          )}
        </PCard>
      ))}
    </div>
  );
}

// ── All Angels ────────────────────────────────────────────────────
function AdminGirls({ girls, reload, flash }) {
  const [editingPw, setEditingPw] = useAS(null);
  const [newPw, setNewPw] = useAS('');

  const setStatus = (id, status) => {
    window.PortalData.setStatus(id, status);
    reload(); flash('Status updated.');
  };

  const resetPw = id => {
    if (newPw.length < 6) { flash('Password must be at least 6 characters.'); return; }
    window.PortalData.changePassword(id, newPw);
    reload(); flash('Password reset successfully.');
    setEditingPw(null); setNewPw('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {girls.map(g => {
        const av = window.PortalData.availabilityLabel(g.workHours);
        const isEditingThis = editingPw === g.id;
        return (
          <PCard key={g.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 17, color: 'white' }}>{g.approved.stageName}</span>
                  <StatusBadge status={g.approved.publicStatus} />
                  <PBadge label={av.label} color={av.color} />
                  {g.pending?.status === 'pending' && <PBadge label="Pending Review" color={PC.warning} />}
                </div>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: PC.textFaint, margin: '0 0 8px', letterSpacing: '0.1em' }}>@{g.username}</p>
                <p style={{ fontSize: 13, color: PC.textMuted, lineHeight: 1.65, margin: 0, maxWidth: 500 }}>{g.approved.bio || <em style={{ opacity: 0.4 }}>No bio set.</em>}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['active', 'hidden'].map(s => (
                    <button key={s} onClick={() => setStatus(g.id, s)} style={{ padding: '5px 13px', borderRadius: 8, border: `1px solid ${g.approved.publicStatus === s ? PC.accent : PC.border}`, background: g.approved.publicStatus === s ? PC.accentBg : 'transparent', color: g.approved.publicStatus === s ? PC.accent : PC.textFaint, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all .15s', fontWeight: 600 }}>
                      {s}
                    </button>
                  ))}
                </div>
                <PButton variant="ghost" size="sm" onClick={() => { setEditingPw(isEditingThis ? null : g.id); setNewPw(''); }}>
                  {isEditingThis ? 'Cancel' : 'Reset Password'}
                </PButton>
              </div>
            </div>

            {isEditingThis && (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${PC.border}`, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <PInput label="New Password" type="text" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password (6+ chars)" />
                </div>
                <PButton size="sm" onClick={() => resetPw(g.id)} disabled={newPw.length < 6}>Set Password</PButton>
              </div>
            )}
          </PCard>
        );
      })}
    </div>
  );
}

// ── Add New Angel ─────────────────────────────────────────────────
function AdminAddGirl({ reload, flash, onDone }) {
  const [stageName, setStageName] = useAS('');
  const [username, setUsername] = useAS('');
  const [password, setPassword] = useAS('');
  const [err, setErr] = useAS('');

  const add = () => {
    setErr('');
    if (!stageName.trim() || !username.trim() || !password.trim()) { setErr('All fields are required.'); return; }
    if (password.length < 6) { setErr('Password must be at least 6 characters.'); return; }
    if (!/^[a-z0-9_]+$/.test(username.toLowerCase())) { setErr('Username: lowercase letters, numbers, and underscores only.'); return; }
    const exists = window.PortalData.getGirls().some(g => g.username.toLowerCase() === username.toLowerCase());
    if (exists) { setErr('That username is already taken.'); return; }
    window.PortalData.addGirl({ stageName: stageName.trim(), username: username.trim().toLowerCase(), password });
    reload();
    flash(`${stageName} has been added to the roster.`);
    onDone();
  };

  return (
    <PCard style={{ maxWidth: 480 }}>
      <PSectionHeader label="Add New Angel" sub="Creates a portal login. She can complete her profile after signing in." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PInput label="Stage Name" value={stageName} onChange={e => setStageName(e.target.value)} placeholder="e.g. Destiny" />
        <PInput label="Username" value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} placeholder="e.g. destiny" hint="Lowercase, no spaces" />
        <PInput label="Temporary Password" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Share securely with her" hint="She can change this after logging in" />
        {err && <p style={{ color: '#fca5a5', fontSize: 13, margin: 0 }}>{err}</p>}
        <PButton onClick={add} disabled={!stageName || !username || password.length < 6}>Add Angel to Roster</PButton>
      </div>
    </PCard>
  );
}

// ── Pricing ───────────────────────────────────────────────────────
function AdminPricing({ flash }) {
  const [pricing, setPricing] = useAS(() => window.PortalData.getPricing());
  const [dirty, setDirty] = useAS(false);

  const updateRate = (id, val) => {
    setPricing(p => ({ ...p, services: p.services.map(s => s.id === id ? { ...s, hourlyRate: Number(val) } : s) }));
    setDirty(true);
  };

  const updateField = (field, val) => {
    setPricing(p => ({ ...p, [field]: Number(val) }));
    setDirty(true);
  };

  const save = () => {
    window.PortalData.savePricing(pricing);
    setDirty(false);
    flash('Pricing updated — changes apply to new bookings immediately.');
  };

  const reset = () => {
    const def = window.PortalData.getDefaultPricing();
    setPricing(def);
    setDirty(true);
  };

  const SERVICE_BADGES = { nude: 'Elite Premium', topless: 'Popular Choice', pool: 'Bachelor Event', companion: 'Ultimate Discretion' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 580 }}>
      <PCard>
        <PSectionHeader label="Service Rates" sub="Per-Angel hourly rate shown on the booking page" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {pricing.services.map(svc => (
            <div key={svc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 11, border: `1px solid ${PC.border}`, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: 'white', margin: '0 0 4px' }}>{svc.name}</p>
                <PBadge label={SERVICE_BADGES[svc.id] || svc.id} color={PC.accent} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: PC.textFaint }}>$</span>
                <input
                  type="number" min="0" step="25" value={svc.hourlyRate}
                  onChange={e => updateRate(svc.id, e.target.value)}
                  style={{ width: 90, padding: '9px 12px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${PC.border}`, borderRadius: 9, color: 'white', fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, outline: 'none', textAlign: 'center' }}
                />
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: PC.textFaint }}>/hr</span>
              </div>
            </div>
          ))}
        </div>
      </PCard>

      <PCard>
        <PSectionHeader label="Deposit & Surcharges" sub="Applied per Angel at checkout" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 11, border: `1px solid ${PC.border}`, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: 'white', margin: '0 0 4px' }}>Deposit per Angel</p>
              <p style={{ fontSize: 12, color: PC.textFaint, margin: 0 }}>Non-refundable, credited toward total</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: PC.textFaint }}>$</span>
              <input
                type="number" min="0" step="25" value={pricing.depositPerAngel}
                onChange={e => updateField('depositPerAngel', e.target.value)}
                style={{ width: 90, padding: '9px 12px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${PC.border}`, borderRadius: 9, color: 'white', fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, outline: 'none', textAlign: 'center' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 11, border: `1px solid ${PC.border}`, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: 'white', margin: '0 0 4px' }}>Off-Strip Surcharge</p>
              <p style={{ fontSize: 12, color: PC.textFaint, margin: 0 }}>Added for Henderson / Off-Strip West bookings</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: PC.textFaint }}>$</span>
              <input
                type="number" min="0" step="10" value={pricing.offStripSurcharge}
                onChange={e => updateField('offStripSurcharge', e.target.value)}
                style={{ width: 90, padding: '9px 12px', background: 'rgba(255,255,255,0.06)', border: `1px solid ${PC.border}`, borderRadius: 9, color: 'white', fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, outline: 'none', textAlign: 'center' }}
              />
            </div>
          </div>
        </div>
      </PCard>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <PButton onClick={save} disabled={!dirty}>
          {dirty ? 'Save Pricing Changes' : 'Saved ✓'}
        </PButton>
        <PButton variant="ghost" onClick={reset}>Reset to Defaults</PButton>
      </div>

      <PCard style={{ background: PC.warningBg, border: '1px solid rgba(251,191,36,0.12)' }}>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.6)', marginBottom: 6 }}>Live Sync</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0 }}>Pricing changes apply <strong style={{ color: 'white' }}>immediately</strong> to the booking page — no refresh needed for new visitors.</p>
      </PCard>
    </div>
  );
}

// ── Agreements Viewer ─────────────────────────────────────────────
function AdminAgreements() {
  const [agreements, setAgreements] = useAS(() =>
    JSON.parse(localStorage.getItem('ag222_agreements') || '[]').reverse()
  );

  const clear = id => {
    const updated = JSON.parse(localStorage.getItem('ag222_agreements') || '[]').filter(a => a.id !== id);
    localStorage.setItem('ag222_agreements', JSON.stringify(updated));
    setAgreements(updated.slice().reverse());
  };

  if (!agreements.length) return (
    <PCard style={{ textAlign:'center', padding:'52px 24px' }}>
      <p style={{ fontSize:32, marginBottom:12 }}>📋</p>
      <p style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, color:'white', margin:'0 0 8px' }}>No Agreements Yet</p>
      <p style={{ color:PC.textFaint, fontSize:14, margin:0 }}>Signed client agreements will appear here after checkout.</p>
    </PCard>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <PCard style={{ background:PC.successBg, border:'1px solid rgba(34,197,94,0.15)', padding:'14px 18px' }}>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'#4ade80', margin:0 }}>{agreements.length} signed agreement{agreements.length!==1?'s':''} on record · Agreement v1.0</p>
      </PCard>

      {agreements.map(a => (
        <PCard key={a.id}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:16 }}>
            <div>
              <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:17, color:'white', margin:'0 0 4px' }}>{a.clientName}</p>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:PC.textFaint, margin:0, letterSpacing:'0.1em' }}>
                {a.email} · {a.phone}
              </p>
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
              <PBadge label={a.paymentStatus === 'paid' ? 'Paid' : 'Pending'} color={a.paymentStatus === 'paid' ? PC.success : PC.warning} />
              <PBadge label={`v${a.version}`} color={PC.textFaint} />
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:10, marginBottom:16 }}>
            {[
              ['Booking ID',    a.bookingId],
              ['Agreement ID',  a.id],
              ['Signed',        new Date(a.timestamp).toLocaleString()],
              ['Booking Date',  a.bookingDate],
              ['Legal Name',    a.typedLegalName],
              ['IP Address',    a.ip],
            ].map(([k,v]) => (
              <div key={k} style={{ padding:'10px 12px', background:'rgba(255,255,255,0.02)', borderRadius:9, border:`1px solid ${PC.border}` }}>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:PC.textFaint, margin:'0 0 4px' }}>{k}</p>
                <p style={{ fontSize:12, color:'white', fontWeight:600, margin:0, wordBreak:'break-all' }}>{v || '—'}</p>
              </div>
            ))}
          </div>

          {a.signatureDataUrl && (
            <div style={{ marginBottom:14 }}>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:'0.18em', textTransform:'uppercase', color:PC.textFaint, marginBottom:8 }}>Signature</p>
              <div style={{ background:'white', borderRadius:10, padding:'10px 14px', display:'inline-block', border:`1px solid ${PC.border}` }}>
                <img src={a.signatureDataUrl} alt="Signature" style={{ maxHeight:60, maxWidth:240, display:'block' }} />
              </div>
            </div>
          )}

          <PButton variant="danger" size="sm" onClick={() => clear(a.id)}>Remove Record</PButton>
        </PCard>
      ))}
    </div>
  );
}

Object.assign(window, { AdminDashboard });
