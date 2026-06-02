// portal/PortalApp.jsx — Main entry point
const { useState: usePortalState, useEffect: usePortalEffect } = React;

function PortalApp() {
  const [session, setSession] = usePortalState(() => window.PortalData.getSession());

  usePortalEffect(() => { window.PortalData.seed(); }, []);

  const handleLogin  = s  => setSession(s);
  const handleLogout = () => { window.PortalData.logout(); setSession(null); };

  if (!session) return <PortalAuth onLogin={handleLogin} />;

  return (
    <PortalLayout session={session} onLogout={handleLogout}>
      {session.role === 'admin'
        ? <AdminDashboard />
        : <GirlDashboard session={session} />}
    </PortalLayout>
  );
}

ReactDOM.createRoot(document.getElementById('portal-root')).render(<PortalApp />);
