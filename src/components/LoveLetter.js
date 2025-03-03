import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LoveLetter = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const letterContent = [
    {
      text: "My Dearest Love,",
      delay: 0
    },
    {
      text: "As I sit here writing this letter, my heart overflows with love and gratitude for having you in my life. On your special day, I want to take a moment to tell you just how much you mean to me.",
      delay: 0.2
    },
    {
      text: "Your smile brightens my darkest days, your laugh is the melody that makes my heart dance, and your love is the greatest gift I could have ever asked for.",
      delay: 0.4
    },
    {
      text: "Every moment spent with you feels like a beautiful dream come true. Your kindness, your strength, and your incredible spirit inspire me every single day.",
      delay: 0.6
    },
    {
      text: "As you celebrate another year of your amazing life, I want you to know that you make this world a better place just by being in it. You make my world complete.",
      delay: 0.8
    },
    {
      text: "Happy Birthday, my love. Here's to many more years of adventures, laughter, and love together.",
      delay: 1
    },
    {
      text: "Forever Yours,",
      delay: 1.2
    },
    {
      text: "[Your Name]",
      delay: 1.4
    }
  ];

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffe4e1 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          color="primary.dark"
          sx={{ mb: 6 }}
          data-aos="fade-up"
        >
          A Letter From My Heart
        </Typography>

        <Paper
          ref={ref}
          elevation={3}
          sx={{
            p: { xs: 3, md: 6 },
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '5px',
              background: 'linear-gradient(90deg, primary.light, primary.dark)',
            },
          }}
        >
          {letterContent.map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.8,
                delay: paragraph.delay,
                ease: "easeOut"
              }}
            >
              <Typography
                variant={index === 0 || index === letterContent.length - 2 ? "h5" : "body1"}
                sx={{
                  mb: 3,
                  fontFamily: index === 0 || index === letterContent.length - 2 ? "'Great Vibes', cursive" : 'inherit',
                  fontSize: index === 0 || index === letterContent.length - 2 ? '2rem' : 'inherit',
                  color: index === 0 || index === letterContent.length - 2 ? 'primary.dark' : 'text.primary',
                  lineHeight: 1.8,
                  textAlign: index === 0 || index >= letterContent.length - 2 ? 'right' : 'justify',
                }}
              >
                {paragraph.text}
              </Typography>
            </motion.div>
          ))}
        </Paper>
      </Container>
    </Box>
  );
};

export default LoveLetter; 