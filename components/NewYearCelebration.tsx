import React, { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

const NewYearCelebration: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenCelebration = localStorage.getItem('thetidbit-new-year-2026');
    
    if (!hasSeenCelebration) {
      let closeTimer: NodeJS.Timeout;
      let markSeenTimer: NodeJS.Timeout;
      
      // Wait 2.5 seconds before showing the celebration (gives page time to load)
      const initialDelay = setTimeout(() => {
        setShouldRender(true);
        // Small delay for smooth entrance animation
        setTimeout(() => setIsVisible(true), 300);
        
        // Mark as seen after animation completes (5 seconds after showing)
        markSeenTimer = setTimeout(() => {
          localStorage.setItem('thetidbit-new-year-2026', 'true');
        }, 5300);
        
        // Auto-close after 6 seconds of being visible
        closeTimer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setShouldRender(false), 500);
        }, 6300);
      }, 2500);
      
      return () => {
        clearTimeout(initialDelay);
        if (closeTimer) clearTimeout(closeTimer);
        if (markSeenTimer) clearTimeout(markSeenTimer);
      };
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('thetidbit-new-year-2026', 'true');
    setTimeout(() => setShouldRender(false), 500);
  };

  if (!shouldRender) return null;

  // Confetti particles with Indian flag colors
  const confetti = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    color: ['#FF9933', '#FFFFFF', '#138808', '#FFD700'][Math.floor(Math.random() * 4)], // Saffron, White, Green, Gold
  }));

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Animated Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Confetti Animation */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: '-10px',
            backgroundColor: particle.color,
            animation: `fall ${particle.duration}s linear ${particle.delay}s forwards`,
            opacity: isVisible ? 1 : 0,
          }}
        />
      ))}

      {/* Main Celebration Card - Indian Flag Colors */}
      <div
        className={`relative rounded-3xl p-8 sm:p-12 shadow-2xl max-w-lg mx-4 transform transition-all duration-500 overflow-hidden ${
          isVisible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
        }`}
        style={{
          background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
        }}
      >
        {/* Indian Flag Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-amber-500"></div>
          <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-green-600"></div>
        </div>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/20 rounded-full"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Indian Flag Emoji */}
        <div className="flex justify-center mb-4 relative z-10">
          <span className="text-6xl animate-bounce" style={{ animationDuration: '2s' }}>
            🇮🇳
          </span>
        </div>

        {/* Sparkles Icon */}
        <div className="flex justify-center mb-4 relative z-10">
          <div className="relative">
            <Sparkles 
              size={48} 
              className="text-amber-400 animate-pulse" 
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 153, 51, 0.8))',
              }}
            />
          </div>
        </div>

        {/* Celebration Text */}
        <div className="text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-wide" style={{ color: '#1F2937' }}>
            🎉 Happy New Year! 🎉
          </h2>
          
          {/* Emphasized 2026 */}
          <div className="mb-6">
            <p 
              className="text-7xl sm:text-9xl font-black mb-2 animate-pulse"
              style={{
                color: '#FF9933',
                textShadow: '0 0 20px rgba(255, 153, 51, 0.6), 0 4px 8px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.02em',
                animationDuration: '2s',
              }}
            >
              2026
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
              <span className="text-amber-600 font-bold text-sm">NEW BEGINNINGS</span>
              <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
            </div>
          </div>

          <p className="text-lg sm:text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>
            🇮🇳 From TheTidbit with Love 🇮🇳
          </p>
          
          <p className="text-base sm:text-lg mb-6" style={{ color: '#374151' }}>
            Wishing you a year filled with style, sustainability, and beautiful moments!
          </p>
          
          {/* Additional festive message */}
          <div className="mt-6 pt-6" style={{ borderTop: '2px solid rgba(31, 41, 55, 0.2)' }}>
            <p className="text-sm font-medium" style={{ color: '#138808' }}>
              Start the year with something special ✨
            </p>
          </div>
        </div>

        {/* Floating patriotic emojis */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {['🇮🇳', '✨', '🌟', '🎊', '🎉'].map((emoji, i) => (
            <span
              key={i}
              className="absolute text-3xl animate-pulse"
              style={{
                left: `${15 + i * 20}%`,
                top: `${10 + (i % 2) * 80}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 1}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NewYearCelebration;

