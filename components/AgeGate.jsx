const { useState } = React;

function AgeGate({ onVerified }) {
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [error, setError] = useState('');

  const months = [
    {n:'January',v:'1'},{n:'February',v:'2'},{n:'March',v:'3'},
    {n:'April',v:'4'},{n:'May',v:'5'},{n:'June',v:'6'},
    {n:'July',v:'7'},{n:'August',v:'8'},{n:'September',v:'9'},
    {n:'October',v:'10'},{n:'November',v:'11'},{n:'December',v:'12'}
  ];

  const handleVerify = (e) => {
    e.preventDefault();
    if (!birthYear || !birthMonth || !birthDay) {
      setError('Please enter your complete birth date.');
      return;
    }
    const yr = parseInt(birthYear, 10);
    const mo = parseInt(birthMonth, 10);
    const dy = parseInt(birthDay, 10);
    if (isNaN(yr) || isNaN(mo) || isNaN(dy)) {
      setError('Please enter valid numeric birth entries.');
      return;
    }
    const now = new Date().getFullYear();
    if (yr < 1920 || yr > now) {
      setError(`Please enter a valid year between 1920 and ${now}.`);
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - yr;
    const m = (today.getMonth() + 1) - mo;
    if (m < 0 || (m === 0 && today.getDate() < dy)) age--;

    if (age >= 21) {
      setError('');
      localStorage.setItem('ag222_age_verified', 'true');
      onVerified();
    } else {
      setError(`Access Denied: Under Las Vegas NV regulation, you must be 21 or older to enter. You are currently ${age} years old.`);
    }
  };

  const inputCls = "w-full bg-neutral-900/90 border border-white/10 text-white text-xs rounded-xl px-2 py-3.5 focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all focus:outline-none cursor-pointer font-sans";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      style={{
        minHeight: '100vh', width: '100vw',
        backgroundImage: "url('" + ((window.__resources && window.__resources.ageBg) || 'uploads/grok-image-3f41cd88-b81c-4084-ba10-c040c3153a6c.png') + "')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-md w-full border border-accent/30 bg-black/20 backdrop-blur-md rounded-2xl p-8 text-center space-y-6 shadow-[0_0_50px_rgba(255,46,136,0.25)]">
        {/* glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-accent/25 blur-2xl pointer-events-none" />

        <div className="space-y-3">
          <span className="font-display text-4xl tracking-widest text-accent font-black block glow-pink uppercase">
            ANGEL GIRLS
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] font-bold text-white/40 uppercase block">
            Las Vegas Outcall Companion Matrix
          </span>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="space-y-2">
          <p className="font-display text-lg font-bold text-white leading-snug uppercase tracking-wide">
            Age Verification Required
          </p>
          <p className="text-xs text-white/60 leading-relaxed font-light">
            You must be <span className="text-accent font-bold">21 or older</span> to enter Angel Girls. Under Las Vegas NV regulations, booking records require valid birth date entry.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5 text-left pt-2">
          <div>
            <label className="font-mono text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 block">
              Your Birth Date
            </label>
            <div className="grid grid-cols-3 gap-3">
              <select
                value={birthMonth}
                onChange={e => setBirthMonth(e.target.value)}
                className={inputCls}
                aria-label="Birth Month"
              >
                <option value="" disabled className="text-white/30">Month</option>
                {months.map(m => (
                  <option key={m.v} value={m.v}>{m.n}</option>
                ))}
              </select>

              <select
                value={birthDay}
                onChange={e => setBirthDay(e.target.value)}
                className={inputCls}
                aria-label="Birth Day"
              >
                <option value="" disabled className="text-white/30">Day</option>
                {Array.from({length:31},(_,i) => (
                  <option key={i+1} value={i+1}>{String(i+1).padStart(2,'0')}</option>
                ))}
              </select>

              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="YYYY"
                value={birthYear}
                aria-label="Birth Year"
                onChange={e => setBirthYear(e.target.value.replace(/\D/g,''))}
                className={inputCls + " text-center"}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-500/30 rounded-lg p-3">
              <p className="text-xs text-red-200 font-mono font-bold">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => window.location.href = 'https://www.google.com'}
              className="px-4 py-3 rounded-xl bg-neutral-800 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-700 transition-all duration-200 cursor-pointer"
            >
              I Decline
            </button>
            <button
              type="submit"
              className="px-4 py-3 rounded-xl text-white text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer hover:shadow-[0_0_25px_rgba(255,46,136,0.5)]"
              style={{ background: 'linear-gradient(to right, #FF2E88, #FF5EB3)' }}
            >
              I Confirm
            </button>
          </div>
        </form>

        <div className="pt-2 space-y-2 border-t border-white/10">
          <label className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              defaultChecked
              className="mt-0.5 w-4 h-4 rounded cursor-pointer accent-accent"
            />
            <span className="text-[9px] text-white/40 font-light leading-tight group-hover:text-white/60 transition-colors">
              I acknowledge that I am 21+ years old and agree to Angel Girls Terms of Service and all legal disclaimers.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AgeGate });
