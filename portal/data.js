// portal/data.js — Angel Girls Member Portal Data Layer
(function () {
  'use strict';

  const DB_KEY      = 'ag222_portal_db_v2';   // v2 = synced with site roster
  const SESSION_KEY = 'ag222_portal_session_v1';
  const PRICING_KEY = 'ag222_pricing_v1';
  const APPS_KEY    = 'ag222_portal_apps_v1';
  const ADMIN       = { username: 'AngelGirl', password: 'Welcome5!' };

  const DEFAULT_PRICING = {
    services: [
      { id: 'nude',      name: 'Full Nude Private Dancing',    hourlyRate: 800 },
      { id: 'topless',   name: 'Topless Private Dancing',      hourlyRate: 650 },
      { id: 'pool',      name: 'Pool Party / VIP Club Events', hourlyRate: 550 },
      { id: 'companion', name: 'Arm Candy / VIP Dinner Date',  hourlyRate: 550 }
    ],
    depositPerAngel: 200,
    offStripSurcharge: 50
  };

  // All girls matching GirlsShowcase roster
  const DEFAULT_GIRLS = [
    {
      id: 'g001', username: 'diosa', password: 'Angel123!',
      approved: { stageName: 'Diosa Doll', bio: "I'm an exotic Asian Latina — petite, curvy, and dangerously flexible. I'm your ultimate private stripper fantasy.", photos: [], publicStatus: 'active' },
      pending: null,
      workHours: { days: ['wed', 'thu', 'fri', 'sat', 'sun'], startHour: 21, endHour: 4 }
    },
    {
      id: 'g002', username: 'bobbi', password: 'Angel123!',
      approved: { stageName: 'Bobbi', bio: 'Gothic seductress with a body covered in dark ink and a mind full of sin. Platinum blonde, heavily tattooed, and dangerously flexible.', photos: [], publicStatus: 'active' },
      pending: null,
      workHours: { days: ['thu', 'fri', 'sat', 'sun'], startHour: 22, endHour: 5 }
    },
    {
      id: 'g003', username: 'gia', password: 'Angel123!',
      approved: { stageName: 'Gia', bio: 'Tattooed, platinum blonde, and impossibly curvy. Electrifying energy for private shows, bachelor events, and penthouse performances.', photos: [], publicStatus: 'active' },
      pending: null,
      workHours: { days: ['fri', 'sat'], startHour: 20, endHour: 3 }
    },
    {
      id: 'g004', username: 'india', password: 'Angel123!',
      approved: { stageName: 'India', bio: 'Exotic Bengali beauty with hypnotic dark eyes and a magnetic presence. Irresistible mix of sensuality and elegance.', photos: [], publicStatus: 'active' },
      pending: null,
      workHours: { days: ['wed', 'thu', 'fri', 'sat', 'sun'], startHour: 21, endHour: 4 }
    },
    {
      id: 'g005', username: 'amber', password: 'Angel123!',
      approved: { stageName: 'Amber', bio: 'A natural entertainer with an intoxicating personality. Top request for bachelor weekends, pool parties, and penthouse performances.', photos: [], publicStatus: 'active' },
      pending: null,
      workHours: { days: ['fri', 'sat', 'sun'], startHour: 21, endHour: 4 }
    },
    {
      id: 'g006', username: 'sienna', password: 'Angel123!',
      approved: { stageName: 'Sienna', bio: 'Red hair, blue eyes, and an unforgettable presence. Most-booked Angel for arm candy and casino floor appearances.', photos: [], publicStatus: 'active' },
      pending: null,
      workHours: { days: ['thu', 'fri', 'sat'], startHour: 20, endHour: 3 }
    }
  ];

  function seed() {
    if (!localStorage.getItem(DB_KEY))      localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_GIRLS));
    if (!localStorage.getItem(PRICING_KEY)) localStorage.setItem(PRICING_KEY, JSON.stringify(DEFAULT_PRICING));
  }

  function db()   { seed(); return JSON.parse(localStorage.getItem(DB_KEY) || '[]'); }
  function save(data) { localStorage.setItem(DB_KEY, JSON.stringify(data)); }

  function availabilityLabel(wh) {
    if (!wh || !wh.days || !wh.days.length) return { label: 'Request Appointment', color: '#6b7280' };
    const now = new Date();
    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const today    = dayNames[now.getDay()];
    const tomorrow = dayNames[(now.getDay() + 1) % 7];
    const hour     = now.getHours() + now.getMinutes() / 60;
    if (wh.days.includes(today)) {
      const s = wh.startHour, e = wh.endHour;
      const active = e < s ? (hour >= s || hour < e) : (hour >= s && hour < e);
      if (active) return { label: 'Available Now',        color: '#22c55e' };
      const until = ((s - hour) + 24) % 24;
      if (until <= 3) return { label: 'Available Today',  color: '#4ade80' };
      return            { label: 'Limited Availability',  color: '#fbbf24' };
    }
    if (wh.days.includes(tomorrow)) return { label: 'Limited Availability', color: '#fbbf24' };
    return { label: 'Currently Unavailable', color: '#ef4444' };
  }

  const PortalData = {
    seed,

    // ── Auth ──────────────────────────────────────────────────────
    login(username, password) {
      if (username.toLowerCase() === ADMIN.username.toLowerCase() && password === ADMIN.password) {
        const s = { role: 'admin', id: null, name: 'Administrator', at: Date.now() };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); return s;
      }
      const girl = db().find(g => g.username.toLowerCase() === username.toLowerCase() && g.password === password);
      if (girl) {
        const s = { role: 'girl', id: girl.id, name: girl.approved.stageName, at: Date.now() };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); return s;
      }
      return null;
    },
    logout()     { sessionStorage.removeItem(SESSION_KEY); },
    getSession() { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch { return null; } },

    // ── Girls CRUD ────────────────────────────────────────────────
    getGirls()   { return db(); },
    getGirl(id)  { return db().find(g => g.id === id) || null; },
    updateGirl(id, fn) {
      const data = db(), i = data.findIndex(g => g.id === id);
      if (i === -1) return false;
      data[i] = fn(data[i]); save(data); return true;
    },
    submitChanges(girlId, payload) {
      return this.updateGirl(girlId, g => ({ ...g, pending: { ...payload, submittedAt: new Date().toISOString(), status: 'pending' } }));
    },
    saveWorkHours(girlId, wh) { return this.updateGirl(girlId, g => ({ ...g, workHours: wh })); },
    approvePending(girlId) {
      return this.updateGirl(girlId, g => {
        if (!g.pending) return g;
        return {
          ...g,
          approved: {
            ...g.approved,
            stageName: g.pending.stageName || g.approved.stageName,
            bio:       g.pending.bio !== undefined ? g.pending.bio : g.approved.bio,
            photos:    g.pending.photos && g.pending.photos.length ? g.pending.photos : g.approved.photos
          },
          pending: { ...g.pending, status: 'approved', reviewedAt: new Date().toISOString() }
        };
      });
    },
    rejectPending(girlId, reason) {
      return this.updateGirl(girlId, g => ({
        ...g, pending: g.pending ? { ...g.pending, status: 'rejected', reason, reviewedAt: new Date().toISOString() } : g.pending
      }));
    },
    setStatus(girlId, status) {
      return this.updateGirl(girlId, g => ({ ...g, approved: { ...g.approved, publicStatus: status } }));
    },
    addGirl({ stageName, username, password }) {
      const data = db();
      const id = 'g' + Date.now();
      data.push({ id, username, password, approved: { stageName, bio: '', photos: [], publicStatus: 'hidden' }, pending: null, workHours: { days: [], startHour: 21, endHour: 4 } });
      save(data); return id;
    },
    changePassword(girlId, newPw) { return this.updateGirl(girlId, g => ({ ...g, password: newPw })); },

    // ── Pricing ───────────────────────────────────────────────────
    getPricing() {
      try {
        const stored = localStorage.getItem(PRICING_KEY);
        return stored ? JSON.parse(stored) : DEFAULT_PRICING;
      } catch { return DEFAULT_PRICING; }
    },
    savePricing(pricing) {
      localStorage.setItem(PRICING_KEY, JSON.stringify(pricing));
    },
    getDefaultPricing() { return DEFAULT_PRICING; },

    // ── Applications ──────────────────────────────────────────────
    getApplications() { try { return JSON.parse(localStorage.getItem(APPS_KEY) || '[]'); } catch { return []; } },
    submitApplication(data) {
      const apps = this.getApplications();
      apps.push({ id: 'app_' + Date.now(), ...data, submittedAt: new Date().toISOString(), status: 'pending' });
      localStorage.setItem(APPS_KEY, JSON.stringify(apps));
    },
    approveApplication(appId, { username, password }) {
      const apps = this.getApplications();
      const app = apps.find(a => a.id === appId);
      if (!app) return false;
      this.addGirl({ stageName: app.stageName, username, password });
      localStorage.setItem(APPS_KEY, JSON.stringify(apps.map(a => a.id === appId ? { ...a, status: 'approved' } : a)));
      return true;
    },
    denyApplication(appId) {
      const apps = this.getApplications();
      localStorage.setItem(APPS_KEY, JSON.stringify(apps.map(a => a.id === appId ? { ...a, status: 'denied' } : a)));
    },

    // ── Reset codes ───────────────────────────────────────────────
    generateResetCode(girlId) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      this.updateGirl(girlId, g => ({ ...g, resetCode: { code, expires: Date.now() + 86400000 } }));
      return code;
    },
    resetPasswordWithCode(username, code, newPw) {
      const girl = db().find(g => g.username.toLowerCase() === username.toLowerCase());
      if (!girl)             return { ok: false, error: 'Username not found.' };
      if (!girl.resetCode)   return { ok: false, error: 'No reset code found. Ask your manager to generate one.' };
      if (Date.now() > girl.resetCode.expires) return { ok: false, error: 'Reset code expired. Ask your manager for a new one.' };
      if (girl.resetCode.code !== code)         return { ok: false, error: 'Incorrect reset code. Please check with your manager.' };
      this.updateGirl(girl.id, g => ({ ...g, password: newPw, resetCode: null }));
      return { ok: true };
    },

    availabilityLabel,
    getPublicProfiles() {
      return this.getGirls().filter(g => g.approved.publicStatus === 'active').map(g => ({
        id: g.id, stageName: g.approved.stageName, bio: g.approved.bio,
        photos: g.approved.photos, availability: availabilityLabel(g.workHours)
      }));
    }
  };

  window.PortalData = PortalData;
})();
