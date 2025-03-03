import React, { useState } from 'react';
import { Box, Container, Typography, Modal, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { useInView } from 'react-intersection-observer';

const GalleryItem = ({ image, caption, index, onClick }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          '&:hover .caption': {
            opacity: 1,
          },
        }}
      >
        <Box
          component="img"
          src={image}
          alt={caption}
          sx={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
        <Box
          className="caption"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            color: 'white',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <Typography variant="body1">
            {caption}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    {
      image: '/images/memory1.jpg',
      caption: 'Our first vacation together'
    },
    {
      image: '/images/memory2.jpg',
      caption: 'Dancing in the rain'
    },
    {
      image: '/images/memory3.jpg',
      caption: 'Sunset at the beach'
    },
    {
      image: '/images/memory4.jpg',
      caption: 'Christmas celebrations'
    },
    {
      image: '/images/memory5.jpg',
      caption: 'Weekend getaway'
    },
    {
      image: '/images/memory6.jpg',
      caption: 'Birthday surprise'
    },
    // Add more photos as needed
  ];

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #ffe4e1 0%, #fff5f8 100%)',
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
          Our Precious Moments
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 3,
          }}
        >
          {photos.map((photo, index) => (
            <GalleryItem
              key={index}
              {...photo}
              index={index}
              onClick={() => setSelectedImage(photo)}
            />
          ))}
        </Box>

        <Modal
          open={Boolean(selectedImage)}
          onClose={() => setSelectedImage(null)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              outline: 'none',
            }}
          >
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: 'absolute',
                right: -20,
                top: -20,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.7)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Box
                  component="img"
                  src={selectedImage.image}
                  alt={selectedImage.caption}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    mt: 2,
                  }}
                >
                  {selectedImage.caption}
                </Typography>
              </motion.div>
            )}
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default Gallery; 