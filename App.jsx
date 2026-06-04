const { useState, useEffect } = React;

const PHONE = '702-703-5488';

function App() {
  const [ageVerified, setAgeVerified] = useState(null);
  const [activeView, setActiveView] = useState('home');
  const [selectedGirlIds, setSelectedGirlIds] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [pendingBooking, setPendingBooking] = useState(null);

  // Hash routing + age check on mount
  useEffect(() => {
    const verified = localStorage.getItem('ag222_age_verified');
    setAgeVerified(verified === 'true');

    const handleHash = () => {
      const h = window.location.hash;
      if (h === '#/booking') setActiveView('booking');else
      if (h === '#/agreement') setActiveView('agreement');else
      if (h === '#/payment') setActiveView('payment');else
      if (h === '#/about') setActiveView('about');else
      if (h === '#/hiring') setActiveView('hiring');else
      if (h === '#/terms') setActiveView('terms');else
      if (h === '#/privacy') setActiveView('privacy');else
      if (h === '#/thank-you') setActiveView('thank-you');else
      if (h === '#/locations/mid-strip') setActiveView('location-mid-strip');else
      if (h === '#/locations/north-strip') setActiveView('location-north-strip');else
      if (h === '#/locations/south-strip') setActiveView('location-south-strip');else
      if (h === '#/locations/downtown') setActiveView('location-downtown');else
      if (h === '#/locations/off-strip-west') setActiveView('location-off-strip-west');else
      if (h === '#/locations/off-strip-east') setActiveView('location-off-strip-east');else
      setActiveView('home');
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // SEO title swap
  useEffect(() => {
    const titles = {
      home: 'Angel Girls | Elite Las Vegas Outcall Dancers & VIP Companions',
      booking: 'Reserve Luxury Las Vegas Companions | Angel Girls',
      agreement: 'Client Service Agreement | Angel Girls',
      payment:   'Secure Checkout | Angel Girls',
      about: 'Licensed Las Vegas Outcall Agency | About Angel Girls',
      hiring: 'Vegas Dancer Jobs | Become a Vegas Angel — Angel Girls',
      terms: 'Terms of Service | Angel Girls',
      privacy: 'Privacy Policy | Angel Girls',
      'thank-you': 'Reservation Initialized | Angel Girls',
      'location-mid-strip': 'Mid-Strip Outcall Companions | Angel Girls',
      'location-north-strip': 'North-Strip Dancers | Angel Girls',
      'location-south-strip': 'South Strip Outcall | Angel Girls',
      'location-downtown': 'Downtown Fremont Outcalls | Angel Girls',
      'location-off-strip-west': 'Off-Strip West Companions | Angel Girls',
      'location-off-strip-east': 'Henderson Outcall Escorts | Angel Girls'
    };
    document.title = titles[activeView] || titles.home;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  const navigateTo = (view) => {
    setActiveView(view);
    if (view.startsWith('location-')) {
      const region = view.replace('location-', '');
      window.location.hash = `#/locations/${region}`;
    } else {
      window.location.hash = view === 'home' ? '' : `#/${view}`;
    }
  };

  const toggleGirl = (id) => {
    setSelectedGirlIds((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBookingSubmit = (booking) => {
    const bookingId = 'bk_' + Date.now();
    setPendingBooking({ ...booking, bookingId });
    navigateTo('agreement');
  };

  const handleAgreementSigned = (agreementData) => {
    setCurrentBooking(prev => ({ ...pendingBooking, agreement: agreementData }));
    navigateTo('payment');
  };

  const handlePaymentSuccess = (paymentResult) => {
    setCurrentBooking(prev => ({ ...prev, payment: paymentResult }));
    setPendingBooking(null);
    navigateTo('thank-you');
  };

  // Loading
  if (ageVerified === null) return (
    <div className="fixed inset-0 bg-[#07070A] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>);


  // Age Gate
  if (!ageVerified) return (
    <div className="relative min-h-screen bg-[#07070A] text-white overflow-x-hidden">
      <AgeGate onVerified={() => setAgeVerified(true)} />
    </div>);


  // Location zone helper
  const locationZoneId = activeView.startsWith('location-') ? activeView.replace('location-', '') : null;

  return (
    <div className="relative min-h-screen bg-[#07070A] text-white font-sans overflow-x-hidden">

      {/* Install Prompt */}
      <InstallPrompt />

      {/* 3D Particle Background — hidden on home (video takes over) */}
      {activeView !== 'home' && <ParticleBackground />}

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center,transparent 30%,rgba(7,7,10,0.55) 70%,rgba(7,7,10,0.9) 100%)', zIndex: 0 }} />

      {/* Navigation */}
      <Nav activeView={activeView} navigateTo={navigateTo} phone={PHONE} />

      {/* Views */}
      <main className="relative" style={{ zIndex: 10, minHeight: '100vh' }}>

        {activeView === 'home' &&
        <HomePage navigateTo={navigateTo} phone={PHONE} />
        }

        {activeView === 'booking' &&
        <BookingPage
          selectedGirlIds={selectedGirlIds}
          onToggleGirl={toggleGirl}
          onSubmitBooking={handleBookingSubmit} />

        }

        {activeView === 'about' &&
        <AboutPage navigateTo={navigateTo} phone={PHONE} />
        }

        {activeView === 'hiring' &&
        <HiringPage navigateTo={navigateTo} />
        }

        {activeView === 'terms' &&
        <TermsPage navigateTo={navigateTo} />
        }

        {activeView === 'privacy' &&
        <PrivacyPage navigateTo={navigateTo} />
        }

        {activeView === 'agreement' &&
        <AgreementPage booking={pendingBooking} onSigned={handleAgreementSigned} onBack={() => navigateTo('booking')} />
        }

        {activeView === 'payment' &&
        <PaymentPage booking={currentBooking} agreement={currentBooking?.agreement} onSuccess={handlePaymentSuccess} onBack={() => navigateTo('agreement')} />
        }

        {activeView === 'thank-you' &&
        <ThankYouPage booking={currentBooking} navigateTo={navigateTo} phone={PHONE} />
        }

        {locationZoneId &&
        <LocationPage zoneId={locationZoneId} navigateTo={navigateTo} phone={PHONE} />
        }
      </main>
    </div>);

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
