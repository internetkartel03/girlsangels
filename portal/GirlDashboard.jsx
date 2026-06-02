// portal/GirlDashboard.jsx — Angel's own profile management dashboard
const { useState: useGS, useEffect: useGE } = React;

function GirlDashboard({ session }) {
  const [tab, setTab] = useGS('profile');
  const [girl, setGirl] = useGS(() => window.PortalData.getGirl(session.id));
  const [toast, setToast] = useGS('');

  const reload = () => setGirl(window.PortalData.getGirl(session.id));
  const flash = msg => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'photos', label: 'Photos' },
    { id: 'availability', label: 'Availability' },
    { id: 'account', label: 'Account' }
  ];

  if (!girl) return <div style={{ padding: 40, textAlign: 'center', color: PC.textMuted }}>Profile not found.</div>;

  const isPending = girl.pending?.status === 'pending';
  const isRejected = girl.pending?.status === 'rejected';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, margin: '0 0 10px', color: 'white' }}>
          Welcome back, {girl.approved.stageName}
        </h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <StatusBadge status={girl.approved.publicStatus} />
          <AvailabilityBadge workHours={girl.workHours} />
          {isPending && <PBadge label="Changes Pending Review" color={PC.warning} />}
          {isRejected && <PBadge label="Changes Rejected" color={PC.danger} />}
        </div>
      </div>

      {/* Rejection notice */}
      {isRejected && (
        <PCard style={{ background: PC.dangerBg, border: '1px solid rgba(239,68,68,0.22)' }}>
          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: '#fca5a5', margin: '0 0 6px' }}>Your Recent Changes Were Rejected</p>
          <p style={{ fontSize: 14, color: 'rgba(252,165,165,0.65)', margin: 0, lineHeight: 1.6 }}>{girl.pending.reason || 'No reason provided. Please contact your manager.'}</p>
        </PCard>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ padding: '12px 18px', background: PC.successBg, border: '1px solid rgba(34,197,94,0.22)', borderRadius: 12, color: '#4ade80', fontSize: 14 }}>{toast}</div>
      )}

      <PTabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'profile'      && <GirlProfileTab      girl={girl} reload={reload} flash={flash} />}
      {tab === 'photos'       && <GirlPhotosTab        girl={girl} reload={reload} flash={flash} />}
      {tab === 'availability' && <GirlAvailabilityTab  girl={girl} reload={reload} flash={flash} />}
      {tab === 'account'      && <GirlAccountTab       girl={girl} reload={reload} flash={flash} />}
    </div>
  );
}

// ── Profile tab ────────────────────────────────────────────────────
function GirlProfileTab({ girl, reload, flash }) {
  const [editing, setEditing] = useGS(false);
  const [name, setName] = useGS(girl.approved.stageName);
  const [bio, setBio] = useGS(girl.approved.bio);

  useGE(() => { setName(girl.approved.stageName); setBio(girl.approved.bio); }, [girl]);

  const isPending = girl.pending?.status === 'pending';

  const submit = () => {
    window.PortalData.submitChanges(girl.id, {
      stageName: name.trim(),
      bio: bio.trim(),
      photos: girl.pending?.photos?.length ? girl.pending.photos : girl.approved.photos
    });
    reload(); setEditing(false);
    flash('Profile changes submitted — pending admin approval.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Live approved profile */}
      <PCard>
        <PSectionHeader label="Live Public Profile" sub="Exactly what clients see right now" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: PC.textFaint, marginBottom: 6 }}>Stage Name</p>
            <p style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: 'white', margin: 0 }}>{girl.approved.stageName}</p>
          </div>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: PC.textFaint, marginBottom: 6 }}>Bio</p>
            <p style={{ fontSize: 15, color: PC.textMuted, lineHeight: 1.75, margin: 0 }}>{girl.approved.bio || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>No bio yet.</span>}</p>
          </div>
        </div>
      </PCard>

      {/* Pending preview */}
      {isPending && (
        <PCard style={{ border: '1px solid rgba(251,191,36,0.22)', background: 'rgba(251,191,36,0.04)' }}>
          <PSectionHeader label="Awaiting Admin Review" sub={`Submitted ${new Date(girl.pending.submittedAt).toLocaleString()}`} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {girl.pending.stageName !== girl.approved.stageName && (
              <div>
                <p style={{ fontSize: 11, color: PC.textFaint, marginBottom: 4 }}>Proposed Stage Name</p>
                <p style={{ color: PC.warning, fontWeight: 700, margin: 0, fontSize: 16 }}>{girl.pending.stageName}</p>
              </div>
            )}
            {girl.pending.bio !== girl.approved.bio && (
              <div>
                <p style={{ fontSize: 11, color: PC.textFaint, marginBottom: 4 }}>Proposed Bio</p>
                <p style={{ fontSize: 14, color: 'rgba(251,191,36,0.75)', lineHeight: 1.7, margin: 0 }}>{girl.pending.bio}</p>
              </div>
            )}
          </div>
        </PCard>
      )}

      {/* Edit form */}
      {!editing ? (
        <PButton variant="ghost" onClick={() => { setEditing(true); setName(girl.approved.stageName); setBio(girl.approved.bio); }}>
          {isPending ? '✏ Edit Pending Changes' : '✏ Edit Profile'}
        </PButton>
      ) : (
        <PCard>
          <PSectionHeader label="Edit Profile" sub="Changes require admin approval before going live" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <PInput label="Stage Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your stage name" />
            <PInput label="Bio" value={bio} onChange={e => setBio(e.target.value.slice(0, 320))} placeholder="Write a short, compelling bio…" multiline rows={4} hint={`${bio.length} / 320 characters`} />
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <PButton onClick={submit} disabled={!name.trim()}>Submit for Approval</PButton>
              <PButton variant="ghost" onClick={() => setEditing(false)}>Cancel</PButton>
            </div>
          </div>
        </PCard>
      )}
    </div>
  );
}

// ── Photos tab ─────────────────────────────────────────────────────
function GirlPhotosTab({ girl, reload, flash }) {
  const initPhotos = () => (girl.pending?.status === 'pending' && girl.pending.photos?.length ? girl.pending.photos : girl.approved.photos) || [];
  const [photos, setPhotos] = useGS(initPhotos);
  const [uploading, setUploading] = useGS(false);
  const MAX = 5;

  useGE(() => { setPhotos(initPhotos()); }, [girl]);

  const handleFiles = async e => {
    const files = Array.from(e.target.files).slice(0, MAX - photos.length);
    if (!files.length) return;
    setUploading(true);
    const compressed = await Promise.all(files.map(f => compressImage(f)));
    setPhotos(prev => [...prev, ...compressed].slice(0, MAX));
    setUploading(false);
    e.target.value = '';
  };

  const remove = i => setPhotos(p => p.filter((_, idx) => idx !== i));

  const submitPhotos = () => {
    const base = girl.pending || {};
    window.PortalData.submitChanges(girl.id, {
      stageName: base.stageName || girl.approved.stageName,
      bio: base.bio !== undefined ? base.bio : girl.approved.bio,
      photos
    });
    reload();
    flash('Photos submitted — pending admin approval.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PCard>
        <PSectionHeader label="Your Photos" sub={`${photos.length} of ${MAX} slots used — only approved photos are public`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 12, marginBottom: 20 }}>
          {photos.map((src, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 12, overflow: 'hidden', border: `1px solid ${PC.border}` }}>
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => remove(i)} style={{ position: 'absolute', top: 6, right: 6, width: 26, height: 26, borderRadius: '50%', background: 'rgba(239,68,68,0.85)', border: 'none', color: 'white', cursor: 'pointer', fontSize: 16, lineHeight: '26px', textAlign: 'center', padding: 0 }}>×</button>
            </div>
          ))}
          {photos.length < MAX && (
            <label style={{ aspectRatio: '3/4', borderRadius: 12, border: `2px dashed ${PC.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: PC.textFaint, gap: 6, minHeight: 120, transition: 'border-color .2s' }}>
              <span style={{ fontSize: 28 }}>{uploading ? '…' : '+'}</span>
              <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.1em' }}>ADD PHOTO</span>
              <input type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />
            </label>
          )}
        </div>
        <PButton onClick={submitPhotos} disabled={uploading || photos.length === 0}>Submit Photos for Approval</PButton>
      </PCard>

      <PCard style={{ background: 'rgba(0,0,0,0.15)', border: `1px solid ${PC.border}` }}>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: PC.textFaint, marginBottom: 6 }}>Note</p>
        <p style={{ fontSize: 13, color: PC.textFaint, lineHeight: 1.7, margin: 0 }}>Photos are compressed automatically. The admin will review before any photo appears publicly. Max 5 photos per profile.</p>
      </PCard>
    </div>
  );
}

// ── Availability tab ───────────────────────────────────────────────
function GirlAvailabilityTab({ girl, reload, flash }) {
  const ALL_DAYS = [
    { id: 'mon', label: 'Mon' }, { id: 'tue', label: 'Tue' }, { id: 'wed', label: 'Wed' },
    { id: 'thu', label: 'Thu' }, { id: 'fri', label: 'Fri' }, { id: 'sat', label: 'Sat' }, { id: 'sun', label: 'Sun' }
  ];
  const hrs = Array.from({ length: 24 }, (_, i) => i);
  const fmtHour = h => { const p = h >= 12 ? 'PM' : 'AM'; const d = h === 0 ? 12 : h > 12 ? h - 12 : h; return `${d}:00 ${p}`; };

  const [days, setDays] = useGS(girl.workHours?.days || []);
  const [startHour, setStart] = useGS(girl.workHours?.startHour ?? 21);
  const [endHour, setEnd] = useGS(girl.workHours?.endHour ?? 4);

  useGE(() => { setDays(girl.workHours?.days || []); setStart(girl.workHours?.startHour ?? 21); setEnd(girl.workHours?.endHour ?? 4); }, [girl]);

  const toggleDay = d => setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  const preview = window.PortalData.availabilityLabel({ days, startHour, endHour });

  const save = () => {
    window.PortalData.saveWorkHours(girl.id, { days, startHour, endHour });
    reload();
    flash('Availability saved. Clients only see your public status label.');
  };

  const selStyle = { width: '100%', padding: '11px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${PC.border}`, borderRadius: 10, color: 'white', fontSize: 14, outline: 'none', fontFamily: "'Inter',sans-serif" };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PCard style={{ background: PC.warningBg, border: '1px solid rgba(251,191,36,0.12)' }}>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(251,191,36,0.6)', marginBottom: 6 }}>Privacy Protected</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, margin: 0 }}>Your exact hours are <strong style={{ color: 'white' }}>never visible to clients.</strong> The system converts your schedule into a simple status label — nothing more.</p>
      </PCard>

      <PCard>
        <PSectionHeader label="Work Days" />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ALL_DAYS.map(d => (
            <button key={d.id} onClick={() => toggleDay(d.id)} style={{ padding: '9px 15px', borderRadius: 9, border: `1px solid ${days.includes(d.id) ? PC.accent : PC.border}`, background: days.includes(d.id) ? PC.accentBg : 'transparent', color: days.includes(d.id) ? PC.accent : PC.textMuted, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, cursor: 'pointer', transition: 'all .15s', fontWeight: 600, letterSpacing: '0.06em' }}>
              {d.label}
            </button>
          ))}
        </div>
      </PCard>

      <PCard>
        <PSectionHeader label="Work Hours" sub="Overnight shifts handled automatically (e.g. 9 PM – 4 AM)" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: PC.textFaint, display: 'block', marginBottom: 8 }}>Start Time</label>
            <select value={startHour} onChange={e => setStart(Number(e.target.value))} style={selStyle}>
              {hrs.map(h => <option key={h} value={h}>{fmtHour(h)}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: PC.textFaint, display: 'block', marginBottom: 8 }}>End Time</label>
            <select value={endHour} onChange={e => setEnd(Number(e.target.value))} style={selStyle}>
              {hrs.map(h => <option key={h} value={h}>{fmtHour(h)}</option>)}
            </select>
          </div>
        </div>
      </PCard>

      <PCard style={{ background: PC.successBg, border: '1px solid rgba(34,197,94,0.12)' }}>
        <PSectionHeader label="Public Label Preview" sub="This is all clients ever see" />
        <AvailabilityBadge workHours={{ days, startHour, endHour }} />
        <p style={{ fontSize: 12, color: PC.textFaint, marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>Based on current time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </PCard>

      <PButton onClick={save}>Save Availability</PButton>
    </div>
  );
}

// ── Account tab ────────────────────────────────────────────────────
function GirlAccountTab({ girl, reload, flash }) {
  const [oldPw, setOldPw] = useGS('');
  const [newPw, setNewPw] = useGS('');
  const [confirmPw, setConfirm] = useGS('');
  const [err, setErr] = useGS('');

  const changePassword = () => {
    setErr('');
    if (oldPw !== girl.password) { setErr('Current password is incorrect.'); return; }
    if (newPw.length < 6) { setErr('New password must be at least 6 characters.'); return; }
    if (newPw !== confirmPw) { setErr('Passwords do not match.'); return; }
    window.PortalData.changePassword(girl.id, newPw);
    reload(); flash('Password updated successfully.');
    setOldPw(''); setNewPw(''); setConfirm('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
      <PCard>
        <PSectionHeader label="Account Details" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: PC.textFaint, marginBottom: 5 }}>Username</p>
            <p style={{ fontSize: 15, color: 'white', margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>{girl.username}</p>
          </div>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: PC.textFaint, marginBottom: 5 }}>Stage Name</p>
            <p style={{ fontSize: 15, color: 'white', margin: 0 }}>{girl.approved.stageName}</p>
          </div>
        </div>
      </PCard>

      <PCard>
        <PSectionHeader label="Change Password" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <PInput label="Current Password" type="password" value={oldPw} onChange={e => setOldPw(e.target.value)} placeholder="Your current password" />
          <PInput label="New Password" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password" hint="Minimum 6 characters" />
          <PInput label="Confirm New Password" type="password" value={confirmPw} onChange={e => setConfirm(e.target.value)} placeholder="Repeat new password" />
          {err && <p style={{ color: '#fca5a5', fontSize: 13, margin: 0 }}>{err}</p>}
          <PButton onClick={changePassword} disabled={!oldPw || !newPw || !confirmPw}>Update Password</PButton>
        </div>
      </PCard>
    </div>
  );
}

Object.assign(window, { GirlDashboard });
