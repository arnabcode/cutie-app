import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const OptionCard = ({ emoji, title, description, onClick }) => {
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDescription(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Box
        onClick={onClick}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '15px',
          padding: '30px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          '&:hover': {
            boxShadow: '0 10px 30px rgba(255,255,255,0.2)',
          },
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: '50px', marginBottom: '15px' }}
        >
          {emoji}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Great Vibes', cursive",
              color: 'primary.main',
              marginBottom: 1,
            }}
          >
            {title}
          </Typography>
        </motion.div>
        {showDescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              {description}
            </Typography>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

const FinalOptions = () => {
  const { setCurrentStep, FLOW_STEPS } = useApp();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOptionClick = (step) => {
    new Audio('/sounds/pop.mp3').play().catch(console.error);
    setCurrentStep(step);
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
        <IconButton
          onClick={() => setCurrentStep(FLOW_STEPS.BIRTHDAY_LETTER)}
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

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Box
            sx={{
              padding: '40px',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Great Vibes', cursive",
                  color: 'primary.main',
                  marginBottom: 4,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Choose Your Next Surprise!
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showOptions ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 4,
                }}
              >
                <OptionCard
                  emoji="📸"
                  title="Memory Lane"
                  description="Take a journey through our precious moments together"
                  onClick={() => handleOptionClick(FLOW_STEPS.MEMORIES)}
                />
                <OptionCard
                  emoji="💌"
                  title="Love Chat"
                  description="Have a special conversation with me"
                  onClick={() => handleOptionClick(FLOW_STEPS.CHAT)}
                />
              </Box>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setCurrentStep(FLOW_STEPS.WELCOME)}
                  sx={{
                    mt: 4,
                    borderRadius: '25px',
                    padding: '10px 30px',
                    fontSize: '1rem',
                    textTransform: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    '&:hover': {
                      boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    },
                  }}
                >
                  Start Over ↺
                </Button>
              </motion.div>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default FinalOptions; 