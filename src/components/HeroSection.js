import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

const HeroSection = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const particlesConfig = {
    fullScreen: { enable: false },
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ff69b4"
      },
      shape: {
        type: "heart"
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 5,
        random: true
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      }
    },
    retina_detect: true
  };

  return (
    <Box
      sx={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(255,182,193,0.3) 0%, rgba(255,192,203,0.5) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              color: 'primary.dark',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 4,
            }}
          >
            Happy Birthday, My Love
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              color: 'primary.dark',
              fontWeight: 300,
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            On this special day, let me take you through our beautiful journey together...
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        >
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: 'primary.dark',
              fontSize: '1.2rem',
              fontStyle: 'italic',
            }}
          >
            Scroll down to begin ↓
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection; 