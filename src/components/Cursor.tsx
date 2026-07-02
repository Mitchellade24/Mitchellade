import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const [hoverType, setHoverType] = useState<'none' | 'link' | 'view'>('none');
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth physics
  const springConfig = { damping: 40, stiffness: 400, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is touch-enabled
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if inside a portfolio item or gallery item
      const isView = target.closest('[data-cursor="view"]');
      const isLink = target.closest('a, button, details, [role="button"], input, textarea, select');

      if (isView) {
        setHoverType('view');
      } else if (isLink) {
        setHoverType('link');
      } else {
        setHoverType('none');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Render variant based on hover type
  const size = hoverType === 'view' ? 90 : hoverType === 'link' ? 40 : 12;
  const isBorder = hoverType === 'link';
  const isGolden = hoverType === 'view';

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] flex items-center justify-center rounded-full"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        backgroundColor: isGolden
          ? 'rgba(197, 168, 128, 0.95)'
          : isBorder
          ? 'transparent'
          : '#c5a880',
        border: isBorder ? '1.5px solid #c5a880' : 'none',
        mixBlendMode: isBorder ? 'normal' : 'normal',
      }}
      animate={{
        scale: 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {hoverType === 'view' && (
        <span className="text-[10px] tracking-[0.2em] font-sans font-bold text-black uppercase animate-pulse">
          View
        </span>
      )}
    </motion.div>
  );
}
