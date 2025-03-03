import React, { useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowBack } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const AgeInput = () => {
  const { setCurrentStep, FLOW_STEPS } = useApp();
  const [age, setAge] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAge = parseInt(age);
    if (numAge >= 18 && numAge <= 99) {
      new Audio('/sounds/success.mp3').play().catch(console.error);
      setCurrentStep(FLOW_STEPS.CAKE_INVITATION);
    } else {
      setError(true);
      new Audio('/sounds/error.mp3').play().catch(console.error);
      setTimeout(() => setError(false), 500);
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
        <IconButton
          onClick={() => setCurrentStep(FLOW_STEPS.SECRET_CODE_FIRST)}
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
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              maxWidth: '400px',
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
                variant="h4"
                sx={{
                  fontFamily: "'Great Vibes', cursive",
                  color: 'primary.main',
                  marginBottom: 2,
                }}
              >
                How Old Are You Today? 🎂
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography
                variant="body1"
                sx={{ mb: 3, color: 'text.secondary' }}
              >
                Let's make sure you're old enough for cake! 🍰
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age..."
                variant="outlined"
                error={error}
                helperText={error ? "Please enter a valid age (18-99)" : ""}
                sx={{
                  maxWidth: '300px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!age}
                  sx={{
                    borderRadius: '25px',
                    padding: '10px 40px',
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 0 20px rgba(255,255,255,0.4)',
                    },
                  }}
                >
                  Continue 🎈
                </Button>
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default AgeInput; 