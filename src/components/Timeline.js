import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineEvent = ({ date, title, description, image, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        display: 'flex',
        justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
        width: '100%',
        marginBottom: '2rem',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: '500px',
          padding: '2rem',
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.9)',
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: 'primary.main',
            borderRadius: '50%',
            top: '50%',
            [index % 2 === 0 ? 'right' : 'left']: '-40px',
            transform: 'translateY(-50%)',
          }
        }}
      >
        <Typography variant="h6" color="primary.main" gutterBottom>
          {date}
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        {image && (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          />
        )}
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const Timeline = () => {
  const events = [
    {
      date: 'First Date',
      title: 'Where It All Began',
      description: 'Our first magical encounter that started this beautiful journey...',
      image: '/images/first-date.jpg'
    },
    {
      date: 'First Kiss',
      title: 'A Moment of Magic',
      description: 'Under the starlit sky, our hearts connected in the most beautiful way...',
      image: '/images/first-kiss.jpg'
    },
    {
      date: 'Our First Trip',
      title: 'Adventure Together',
      description: 'Exploring new places and creating unforgettable memories...',
      image: '/images/first-trip.jpg'
    },
    // Add more events as needed
  ];

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffe4e1 100%)',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          color="primary.dark"
          sx={{ mb: 6 }}
          data-aos="fade-up"
        >
          Our Love Story
        </Typography>
        
        <Box
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '100%',
              background: 'primary.main',
              zIndex: 0,
            }
          }}
        >
          {events.map((event, index) => (
            <TimelineEvent key={index} {...event} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Timeline; 