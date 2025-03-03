import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Favorite } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const NotSarah = () => {
  const [foundHearts, setFoundHearts] = useState(0);
  const { setCurrentStep } = useApp();
  const [showMessage, setShowMessage] = useState(false);

  const handleHeartClick = () => {
    const audio = new Audio('/sounds/pop.mp3');
    audio.volume = 0.3;
    audio.play().catch(console.error);
    setFoundHearts(prev => {
      if (prev + 1 === 3) {
        setShowMessage(true);
      }
      return prev + 1;
    });
  };

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
          background: 'linear-gradient(135deg, rgba(255,182,193,0.3) 0%, rgba(255,192,203,0.5) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            maxWidth: '400px',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Great Vibes', cursive",
              color: 'primary.main',
              marginBottom: 4,
            }}
          >
            Oops! Looks like you're not Sarah
          </Typography>

          <Typography
            variant="body1"
            sx={{
              marginBottom: 4,
              color: 'text.secondary',
            }}
          >
            But hey, want to play a quick game? Find 3 hidden hearts on this page!
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              marginBottom: 3,
            }}
          >
            Hearts found: {foundHearts}/3
          </Typography>

          {showMessage && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'primary.dark',
                  marginBottom: 3,
                  fontStyle: 'italic',
                }}
              >
                Congratulations! You found all the hearts! Love is everywhere ❤️
              </Typography>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCurrentStep('welcome')}
              sx={{
                borderRadius: '25px',
                padding: '10px 40px',
                fontSize: '1.1rem',
                textTransform: 'none',
                '&:hover': {
                  boxShadow: '0 0 20px rgba(255,105,180,0.4)',
                },
              }}
            >
              Back to Start
            </Button>
          </motion.div>
        </Box>

        {/* Hidden hearts */}
        {[...Array(3)].map((_, index) => (
          <IconButton
            key={index}
            onClick={handleHeartClick}
            sx={{
              position: 'absolute',
              color: 'primary.main',
              opacity: 0.3,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 1,
                transform: 'scale(1.2)',
              },
              ...getRandomPosition(),
            }}
          >
            <Favorite />
          </IconButton>
        ))}
      </Box>
    </motion.div>
  );
};

// Helper function to generate random positions for hearts
const getRandomPosition = () => {
  const positions = [
    { top: '10%', right: '10%' },
    { bottom: '20%', left: '15%' },
    { top: '50%', right: '20%' },
  ];
  
  return positions[Math.floor(Math.random() * positions.length)];
};

export default NotSarah; 