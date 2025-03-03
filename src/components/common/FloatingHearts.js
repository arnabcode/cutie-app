import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        scale: 0.5 + Math.random() * 0.5,
        rotation: -30 + Math.random() * 60,
        duration: 10 + Math.random() * 20,
        emoji: ['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)]
      };

      setHearts(prevHearts => [...prevHearts, heart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts(prevHearts => prevHearts.filter(h => h.id !== heart.id));
      }, heart.duration * 1000);
    };

    // Create initial hearts
    for (let i = 0; i < 10; i++) {
      setTimeout(createHeart, i * 500);
    }

    // Create new hearts periodically
    const interval = setInterval(createHeart, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ 
              opacity: 0,
              x: heart.x,
              y: window.innerHeight + 100,
              scale: heart.scale,
              rotate: heart.rotation
            }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: -100,
              rotate: heart.rotation + (Math.random() > 0.5 ? 360 : -360)
            }}
            transition={{ 
              duration: heart.duration,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              fontSize: '2rem',
              filter: 'blur(0.5px)',
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts; 