import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { VolumeUp, VolumeOff } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import Lottie from 'lottie-react';
import welcomeAnimation from '../animations/welcome-hearts.json';

const WelcomeCard = () => {
  const { setCurrentStep, isPlaying, setIsPlaying, FLOW_STEPS } = useApp();
  const [showButtons, setShowButtons] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show animation first
    setTimeout(() => {
      setShowContent(true);
    }, 2000);

    // Show buttons after content appears
    setTimeout(() => {
      setShowButtons(true);
    }, 3000);
  }, []);

  useEffect(() => {
    // Add custom cursor styles
    const style = document.createElement('style');
    style.textContent = `
      body {
        cursor: none;
      }
      .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #ff69b4;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
      }
      .custom-cursor-dot {
        width: 4px;
        height: 4px;
        background: #ff69b4;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
      }
      .sparkle {
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        animation: sparkle-fade 0.5s ease forwards;
      }
      @keyframes sparkle-fade {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    const moveCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;

      // Create sparkle effect
      if (Math.random() < 0.1) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        sparkle.innerHTML = '✨';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
      }
    };

    const growCursor = () => {
      cursor.style.transform += ' scale(1.5)';
    };

    const shrinkCursor = () => {
      cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
    };

    document.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('button, a').forEach(el => {
      el.addEventListener('mouseenter', growCursor);
      el.addEventListener('mouseleave', shrinkCursor);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('button, a').forEach(el => {
        el.removeEventListener('mouseenter', growCursor);
        el.removeEventListener('mouseleave', shrinkCursor);
      });
      cursor.remove();
      cursorDot.remove();
      style.remove();
    };
  }, []);

  useEffect(() => {
    const audio = new Audio('/sounds/ambient.mp3');
    audio.loop = true;
    audio.volume = 0.3;

    if (isPlaying) {
      audio.play().catch(console.error);
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  const handleResponse = (isSarah) => {
    new Audio('/sounds/pop.mp3').play().catch(console.error);
    if (isSarah) {
      setCurrentStep(FLOW_STEPS.SECRET_CODE_FIRST);
    } else {
      setCurrentStep(FLOW_STEPS.NOT_SARAH_GAME);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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
        }}
      >
        {!showContent ? (
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
              animationData={welcomeAnimation}
              loop={true}
              style={{ width: 300, height: 300 }}
            />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                zIndex: 2,
              }}
            >
              <IconButton
                onClick={() => setIsPlaying(!isPlaying)}
                sx={{
                  color: 'primary.main',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  },
                }}
              >
                {isPlaying ? <VolumeUp /> : <VolumeOff />}
              </IconButton>
            </Box>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '20px',
                  padding: '40px',
                  textAlign: 'center',
                  maxWidth: '400px',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "'Great Vibes', cursive",
                      color: 'primary.main',
                      marginBottom: 4,
                    }}
                  >
                    Hi, are you Sarah?
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showButtons ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      justifyContent: 'center',
                    }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleResponse(true)}
                        sx={{
                          borderRadius: '25px',
                          padding: '10px 30px',
                          fontSize: '1.1rem',
                          textTransform: 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 20px rgba(255,255,255,0.4)',
                          },
                        }}
                      >
                        Yes, I am! 💝
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleResponse(false)}
                        sx={{
                          borderRadius: '25px',
                          padding: '10px 30px',
                          fontSize: '1.1rem',
                          textTransform: 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                          },
                        }}
                      >
                        No, I'm not 🤔
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </>
        )}
      </Box>
    </motion.div>
  );
};

export default WelcomeCard; 