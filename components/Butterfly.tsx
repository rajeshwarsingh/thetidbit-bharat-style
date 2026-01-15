import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeContext';

interface ButterflyProps {
  delay?: number;
  id?: number;
  gender?: 'male' | 'female';
}

const Butterfly: React.FC<ButterflyProps> = ({ delay = 0, id = 0, gender }) => {
  // Determine gender from id if not provided: 0 = male, 1 = female
  const butterflyGender = gender || (id === 0 ? 'male' : 'female');
  const butterflyRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scale] = useState(0.8 + Math.random() * 0.4); // Random size variation
  const { resolvedTheme } = useTheme();
  const pathRef = useRef<{ points: Array<{ x: number; y: number }>; currentIndex: number }>({
    points: [],
    currentIndex: 0,
  });

  useEffect(() => {
    // Create a curved flight path
    const createFlightPath = () => {
      const points: Array<{ x: number; y: number }> = [];
      const numPoints = 3 + Math.floor(Math.random() * 3); // 3-5 waypoints
      
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * (window.innerWidth - 60),
          y: Math.random() * (window.innerHeight - 60),
        });
      }
      return points;
    };

    // Initial delay before showing
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      // Start at random position (often from off-screen for entrance)
      const startX = Math.random() > 0.3 
        ? -60 
        : Math.random() * (window.innerWidth - 60);
      const startY = Math.random() * (window.innerHeight - 60);
      
      setPosition({ x: startX, y: startY });
      pathRef.current.points = createFlightPath();
      pathRef.current.currentIndex = 0;
    }, delay);

    const moveToNextPoint = () => {
      if (!butterflyRef.current || pathRef.current.points.length === 0) return;

      const currentPoint = pathRef.current.points[pathRef.current.currentIndex];
      const nextIndex = (pathRef.current.currentIndex + 1) % pathRef.current.points.length;
      const nextPoint = pathRef.current.points[nextIndex];

      // Calculate rotation based on movement direction
      const dx = nextPoint.x - currentPoint.x;
      const dy = nextPoint.y - currentPoint.y;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setRotation(angle);

      setPosition({ x: nextPoint.x, y: nextPoint.y });
      pathRef.current.currentIndex = nextIndex;
    };

    const moveButterfly = () => {
      // Create new flight path
      pathRef.current.points = createFlightPath();
      pathRef.current.currentIndex = 0;
      moveToNextPoint();
    };

    // Move butterfly every 5-8 seconds
    const moveInterval = setInterval(() => {
      moveButterfly();
    }, 5000 + Math.random() * 3000);

    // Move along path points
    const pathInterval = setInterval(() => {
      if (pathRef.current.points.length > 0) {
        moveToNextPoint();
      }
    }, 2000 + Math.random() * 1500);

    // Initial movement after showing
    const initialMoveTimer = setTimeout(() => {
      moveButterfly();
    }, 2000 + delay);

    // Handle window resize
    const handleResize = () => {
      setPosition(prev => {
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        return {
          x: Math.max(0, Math.min(maxX, prev.x)),
          y: Math.max(0, Math.min(maxY, prev.y)),
        };
      });
      // Regenerate path points on resize
      pathRef.current.points = pathRef.current.points.map(p => ({
        x: Math.min(p.x, window.innerWidth - 60),
        y: Math.min(p.y, window.innerHeight - 60),
      }));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(initialMoveTimer);
      clearInterval(moveInterval);
      clearInterval(pathInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [delay]);

  if (!isVisible) return null;

  // Color variations - Male: vibrant and bold, Female: softer and more patterned
  const maleColors = {
    primary: '#FF6B9D', // Bright pink
    secondary: '#FFD700', // Gold
    accent: '#FF4500', // Orange-red
  };
  
  const femaleColors = {
    primary: '#9370DB', // Medium purple
    secondary: '#87CEEB', // Sky blue
    accent: '#DA70D6', // Orchid
  };
  
  const colors = butterflyGender === 'male' ? maleColors : femaleColors;
  
  // Female butterflies are slightly smaller and have more detailed patterns
  const sizeMultiplier = butterflyGender === 'female' ? 0.9 : 1.0;

  return (
    <div
      ref={butterflyRef}
      className="fixed pointer-events-none z-30 butterfly-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg) scale(${scale * sizeMultiplier})`,
        transition: 'left 3s cubic-bezier(0.4, 0, 0.2, 1), top 3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s ease-out',
      }}
    >
      <svg
        width={55 * sizeMultiplier}
        height={55 * sizeMultiplier}
        viewBox="0 0 100 100"
        className="butterfly-svg"
        style={{
          filter: resolvedTheme === 'dark' 
            ? 'drop-shadow(0 2px 8px rgba(255,215,0,0.3)) drop-shadow(0 0 12px rgba(255,182,193,0.2))'
            : 'drop-shadow(0 2px 6px rgba(0,0,0,0.15)) drop-shadow(0 0 8px rgba(255,182,193,0.3))',
        }}
      >
        {/* Left Wing */}
        <g className="butterfly-left-wing">
          <ellipse
            cx="30"
            cy="50"
            rx={butterflyGender === 'female' ? "28" : "26"}
            ry={butterflyGender === 'female' ? "38" : "36"}
            fill={`url(#butterflyGradient1-${id})`}
            opacity="0.95"
            transform="rotate(-20 30 50)"
          />
          <ellipse
            cx="25"
            cy="45"
            rx="9"
            ry="13"
            fill={colors.secondary}
            opacity={butterflyGender === 'male' ? "0.8" : "0.6"}
            transform="rotate(-15 25 45)"
          />
          <ellipse
            cx="20"
            cy="55"
            rx="7"
            ry="11"
            fill={colors.accent}
            opacity={butterflyGender === 'male' ? "0.7" : "0.5"}
            transform="rotate(-25 20 55)"
          />
          <ellipse
            cx="28"
            cy="48"
            rx="4"
            ry="6"
            fill={colors.secondary}
            opacity="0.5"
            transform="rotate(-18 28 48)"
          />
          {/* Female: Additional pattern spots */}
          {butterflyGender === 'female' && (
            <>
              <circle cx="32" cy="52" r="2.5" fill={colors.accent} opacity="0.4" />
              <circle cx="24" cy="58" r="2" fill={colors.secondary} opacity="0.3" />
            </>
          )}
        </g>

        {/* Right Wing */}
        <g className="butterfly-right-wing">
          <ellipse
            cx="70"
            cy="50"
            rx={butterflyGender === 'female' ? "28" : "26"}
            ry={butterflyGender === 'female' ? "38" : "36"}
            fill={`url(#butterflyGradient2-${id})`}
            opacity="0.95"
            transform="rotate(20 70 50)"
          />
          <ellipse
            cx="75"
            cy="45"
            rx="9"
            ry="13"
            fill={colors.secondary}
            opacity={butterflyGender === 'male' ? "0.8" : "0.6"}
            transform="rotate(15 75 45)"
          />
          <ellipse
            cx="80"
            cy="55"
            rx="7"
            ry="11"
            fill={colors.accent}
            opacity={butterflyGender === 'male' ? "0.7" : "0.5"}
            transform="rotate(25 80 55)"
          />
          <ellipse
            cx="72"
            cy="48"
            rx="4"
            ry="6"
            fill={colors.secondary}
            opacity="0.5"
            transform="rotate(18 72 48)"
          />
          {/* Female: Additional pattern spots */}
          {butterflyGender === 'female' && (
            <>
              <circle cx="68" cy="52" r="2.5" fill={colors.accent} opacity="0.4" />
              <circle cx="76" cy="58" r="2" fill={colors.secondary} opacity="0.3" />
            </>
          )}
        </g>

        {/* Body */}
        <ellipse
          cx="50"
          cy="50"
          rx="3.5"
          ry="42"
          fill="#8B4513"
          opacity="0.85"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="2"
          ry="40"
          fill={colors.secondary}
          opacity="0.3"
        />
        <circle cx="50" cy="32" r="2.5" fill={colors.secondary} opacity="0.9" />
        <circle cx="50" cy="42" r="2" fill={colors.secondary} opacity="0.8" />
        <circle cx="50" cy="52" r="2" fill={colors.secondary} opacity="0.8" />
        <circle cx="50" cy="62" r="1.5" fill={colors.secondary} opacity="0.7" />

        {/* Antennae */}
        <line
          x1="50"
          y1="18"
          x2="44"
          y2="12"
          stroke="#8B4513"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <line
          x1="50"
          y1="18"
          x2="56"
          y2="12"
          stroke="#8B4513"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <circle cx="44" cy="12" r="2" fill={colors.secondary} opacity="0.9" />
        <circle cx="56" cy="12" r="2" fill={colors.secondary} opacity="0.9" />

        {/* Wing patterns - decorative spots (more prominent in males) */}
        <circle cx="22" cy="50" r={butterflyGender === 'male' ? "3.5" : "2.5"} fill={colors.primary} opacity={butterflyGender === 'male' ? "0.5" : "0.3"} />
        <circle cx="78" cy="50" r={butterflyGender === 'male' ? "3.5" : "2.5"} fill={colors.primary} opacity={butterflyGender === 'male' ? "0.5" : "0.3"} />
        {/* Female: Additional smaller spots for pattern */}
        {butterflyGender === 'female' && (
          <>
            <circle cx="18" cy="46" r="1.5" fill={colors.accent} opacity="0.3" />
            <circle cx="82" cy="46" r="1.5" fill={colors.accent} opacity="0.3" />
            <circle cx="18" cy="54" r="1.5" fill={colors.secondary} opacity="0.3" />
            <circle cx="82" cy="54" r="1.5" fill={colors.secondary} opacity="0.3" />
          </>
        )}

        {/* Gradients */}
        <defs>
          <linearGradient id={`butterflyGradient1-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.95" />
            <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.75" />
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`butterflyGradient2-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0.85" />
            <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.75" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0.95" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Butterfly;

