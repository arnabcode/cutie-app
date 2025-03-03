import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import TypeWriter from './common/TypeWriter';
import Lottie from 'lottie-react';
import cakeAnimation from '../animations/cake-animation.json';
import Celebration from './Celebration';

const CakeInteraction = () => {
  const { setCurrentStep, FLOW_STEPS } = useApp();
  const [cakeState, setCakeState] = useState('whole');
  const [showMessage, setShowMessage] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [knifePosition, setKnifePosition] = useState({ x: 0, y: 0 });
  const [isKnifeVisible, setIsKnifeVisible] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCracker, setShowCracker] = useState(false);

  useEffect(() => {
    // Show animation first
    setTimeout(() => {
      setShowCake(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!showCake || cakeState !== 'whole') return;

    const handleMouseMove = (e) => {
      const cakeContainer = document.getElementById('cake-container');
      if (cakeContainer && cakeState === 'whole') {
        const rect = cakeContainer.getBoundingClientRect();
        setKnifePosition({
          x: e.clientX - rect.left - 20,
          y: e.clientY - rect.top - 20
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showCake, cakeState]);

  const handleCakeClick = () => {
    if (cakeState === 'whole') {
      new Audio('/sounds/slice.mp3').play().catch(console.error);
      setCakeState('cut');
      setIsKnifeVisible(false);
      
      // Show cracker immediately after cutting
      setShowCracker(true);
      
      // Show celebration after cracker
      setTimeout(() => {
        setShowCracker(false);
        setShowCelebration(true);
      }, 2000);

      // Calculate total celebration duration
      // 2s initial crackers + (4 messages × 3s each) + 1s final transition
      const totalCelebrationDuration = 2000 + (4 * 3000) + 1000;

      // Move to next step after full celebration
      setTimeout(() => {
        setShowCelebration(false);
        setCurrentStep(FLOW_STEPS.BIRTHDAY_LETTER);
      }, totalCelebrationDuration);
    }
  };

  const handleCakeHover = () => {
    if (cakeState === 'whole') {
      setIsKnifeVisible(true);
    }
  };

  const handleCakeLeave = () => {
    setIsKnifeVisible(false);
  };

  if (showCelebration) {
    return <Celebration onComplete={() => {
      setShowCelebration(false);
      setCurrentStep(FLOW_STEPS.BIRTHDAY_LETTER);
    }} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100vh', width: '100%' }}
    >
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: cakeState === 'whole' ? 'none' : 'default',
        }}
      >
        <IconButton
          onClick={() => setCurrentStep(FLOW_STEPS.CAKE_INVITATION)}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            color: 'primary.main',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        {!showCake ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100%',
            }}
          >
            <Lottie
              animationData={cakeAnimation}
              loop={true}
              style={{ width: 300, height: 300 }}
            />
          </Box>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center',
                maxWidth: '400px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <TypeWriter
                text={cakeState === 'whole' ? "Click to cut the cake!" : "Happy Birthday! 🎉"}
                variant="h4"
                delay={80}
                sx={{
                  fontFamily: "'Great Vibes', cursive",
                  color: 'primary.main',
                  marginBottom: 2,
                }}
              />

              {showCracker && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 1 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '100px',
                    zIndex: 10,
                  }}
                >
                  🎊
                </motion.div>
              )}

              <Box
                id="cake-container"
                sx={{
                  position: 'relative',
                  width: '200px',
                  height: '200px',
                  margin: '0 auto',
                  cursor: cakeState === 'whole' ? 'pointer' : 'default',
                }}
                onClick={handleCakeClick}
                onMouseEnter={handleCakeHover}
                onMouseLeave={handleCakeLeave}
              >
                <motion.div
                  style={{
                    fontSize: '150px',
                    lineHeight: '200px',
                  }}
                  animate={cakeState === 'cut' ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {cakeState === 'whole' ? '🎂' : '🍰'}
                </motion.div>

                {isKnifeVisible && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: knifePosition.x,
                      top: knifePosition.y,
                      fontSize: '40px',
                      transform: 'rotate(-45deg)',
                      pointerEvents: 'none',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    🔪
                  </motion.div>
                )}
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showMessage ? 1 : 0, y: showMessage ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {showMessage && (
                  <TypeWriter
                    text="Time to read your special birthday letter! ✨"
                    variant="body1"
                    delay={50}
                    sx={{
                      mt: 4,
                      color: 'text.secondary',
                      fontSize: '1.1rem',
                    }}
                  />
                )}
              </motion.div>
            </Box>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default CakeInteraction; 