const { useState, useEffect } = React;

function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem('ag222_install_dismissed');
    if (dismissed === 'true') return;

    // Detect iOS
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isApple);

    // For Android/Chrome - listen for beforeinstallprompt
    if (!isApple) {
      const handleBeforeInstallPrompt = (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowPrompt(true);
      };
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // Check if app is already installed
      window.addEventListener('appinstalled', () => {
        setShowPrompt(false);
        localStorage.setItem('ag222_install_dismissed', 'true');
      });

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    } else {
      // For iOS - show instructions after a small delay
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        localStorage.setItem('ag222_install_dismissed', 'true');
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('ag222_install_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div
      className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none"
      style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
      }}
    >
      {/* Slide-up Modal */}
      <div
        className="w-full max-w-md pointer-events-auto animate-in slide-in-from-bottom-6 duration-500"
        style={{
          animation: 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div
          className="mx-4 mb-6 rounded-3xl p-6 backdrop-blur-md"
          style={{
            background: 'linear-gradient(135deg, rgba(18, 18, 23, 0.95) 0%, rgba(25, 20, 35, 0.95) 100%)',
            border: '1px solid rgba(255, 46, 136, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 46, 136, 0.15)',
          }}
        >
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1 font-display">
              Install Angel Girls
            </h3>
            <p className="text-sm text-gray-400">
              {isIOS
                ? 'Add to your home screen for quick access'
                : 'Get the app experience on your phone'}
            </p>
          </div>

          {/* iOS Instructions */}
          {isIOS && (
            <div className="mb-5 p-3 rounded-xl bg-black/30 border border-accent/20">
              <p className="text-xs text-gray-300 mb-2">
                <span className="font-semibold text-white">How to install:</span>
              </p>
              <ol className="text-xs text-gray-400 space-y-1 ml-2">
                <li>1. Tap the <span className="text-accent font-semibold">Share</span> button at bottom</li>
                <li>2. Scroll and tap <span className="text-accent font-semibold">Add to Home Screen</span></li>
                <li>3. Name it and tap <span className="text-accent font-semibold">Add</span></li>
              </ol>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            {!isIOS && (
              <button
                onClick={handleInstall}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FF2E88 0%, #E01A6E 100%)',
                  color: 'white',
                  boxShadow: '0 8px 24px rgba(255, 46, 136, 0.4)',
                }}
              >
                Install App
              </button>
            )}
            <button
              onClick={handleDismiss}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 text-gray-300 hover:text-white"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {isIOS ? 'Got it' : 'Later'}
            </button>
          </div>

          {/* Close indicator */}
          <p className="text-xs text-gray-500 text-center mt-3">
            Only shows once
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
