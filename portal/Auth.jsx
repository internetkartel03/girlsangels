// portal/Auth.jsx — Login screen
const { useState: useAuthState } = React;

function PortalAuth({ onLogin }) {
  const [un, setUn] = useAuthState('');
  const [pw, setPw] = useAuthState('');
  const [showPw, setShowPw] = useAuthState(false);
  const [error, setError] = useAuthState('');
  const [loading, setLoading] = useAuthState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);setError('');
    setTimeout(() => {
      const session = window.PortalData.login(un.trim(), pw);
      if (session) {onLogin(session);} else
      {setError('Incorrect username or password.');setLoading(false);}
    }, 520);
  };

  const inp = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, color: 'white', fontSize: 14, outline: 'none', padding: '12px 16px', width: '100%', fontFamily: "'Inter',sans-serif", boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', background: '#07070A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter',sans-serif" }}>
      <div style={{ position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,46,136,0.09) 0%,transparent 68%)', pointerEvents: 'none' }} />

      <img src="uploads/ChatGPT Image Jun 1, 2026, 12_50_41 PM.png" alt="Angel Girls" style={{ height: 58, marginBottom: 36, filter: 'drop-shadow(0 0 24px rgba(255,46,136,0.5))' }} />

      <div style={{ width: '100%', maxWidth: 400, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: '40px 36px', backdropFilter: 'blur(24px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,46,136,0.8)', marginBottom: 8 }}>Secure Member Portal</p>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'white', margin: 0, fontFamily: "\"Times New Roman\"" }}>Sign In</h1>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', display: 'block', marginBottom: 7 }}>Username</label>
            <input type="text" value={un} onChange={(e) => setUn(e.target.value)} placeholder="your username" required autoComplete="username" style={inp} />
          </div>

          <div>
            <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', display: 'block', marginBottom: 7 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••••" required autoComplete="current-password" style={{ ...inp, paddingRight: 56 }} />
              <button type="button" onClick={() => setShowPw((p) => !p)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: 10, fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.1em' }}>{showPw ? 'HIDE' : 'SHOW'}</button>
            </div>
          </div>

          {error &&
          <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 9, color: '#fca5a5', fontSize: 13 }}>{error}</div>
          }

          <button type="submit" disabled={loading || !un || !pw} style={{ marginTop: 4, padding: '14px', background: 'linear-gradient(135deg,#FF2E88,#FF5EB3)', border: 'none', borderRadius: 12, color: 'white', fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, cursor: loading ? 'wait' : 'pointer', opacity: !un || !pw ? 0.5 : 1, transition: 'all .2s', boxShadow: '0 6px 24px rgba(255,46,136,0.3)' }}>
            {loading ? 'Verifying…' : 'Enter Portal'}
          </button>
        </form>


      </div>

      <a href="index.html" style={{ marginTop: 22, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', textDecoration: 'none' }}>← Back to Site</a>
    </div>);

}

Object.assign(window, { PortalAuth });