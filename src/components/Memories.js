import React, { useState } from 'react';
import { Box, IconButton, Modal, useTheme, useMediaQuery, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBack, Close } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import TypeWriter from './common/TypeWriter';
import { ImageGallery } from 'react-image-grid-gallery';
import Lottie from 'lottie-react';
import heartAnimation from '../animations/heart-loading.json';
import { memoryImages } from '../constants/images';

const Memories = () => {
  const { setCurrentStep, FLOW_STEPS } = useApp();
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Transform memoryImages to match ImageGallery component's expected format
  const galleryImages = memoryImages.map(img => ({
    id: img.title,
    src: img.src,
    alt: img.title,
    title: img.title,
    caption: img.description,
    width: img.width || 800,
    height: img.height || 600
  }));

  const handleMemoryClick = (index) => {
    setSelectedMemory(memoryImages[index]);
    new Audio('/sounds/pop.mp3').play().catch(console.error);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowGallery(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh', width: '100%' }}
    >
      <Box
        sx={{
          minHeight: '100vh',
          padding: { xs: '20px 10px', sm: '40px 20px' },
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <IconButton
          onClick={() => setCurrentStep(FLOW_STEPS.FINAL_OPTIONS)}
          sx={{
            position: 'fixed',
            top: { xs: 10, sm: 20 },
            left: { xs: 10, sm: 20 },
            color: 'primary.main',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 10,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        <Box
          sx={{
            maxWidth: '1200px',
            margin: '0 auto',
            mt: { xs: 6, sm: 4 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{
                textAlign: 'center',
                fontFamily: "'Great Vibes', cursive",
                color: 'primary.main',
                mb: { xs: 4, sm: 6 },
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                fontSize: { xs: '2rem', sm: '3rem' },
              }}
            >
              Our Beautiful Memories
            </Typography>
          </motion.div>

          {!showGallery ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: { xs: '30vh', sm: '50vh' },
              }}
            >
              <Lottie
                animationData={heartAnimation}
                loop={true}
                style={{ width: isMobile ? 150 : 200, height: isMobile ? 150 : 200 }}
              />
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageGallery
                imagesInfoArray={galleryImages}
                images={galleryImages}
                onClick={handleMemoryClick}
                enableImageSelection={false}
                rowHeight={isMobile ? 200 : 300}
                margin={isMobile ? 4 : 8}
              />
            </motion.div>
          )}
        </Box>

        <Modal
          open={Boolean(selectedMemory)}
          onClose={() => setSelectedMemory(null)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 1, sm: 2 },
          }}
        >
          <AnimatePresence>
            {selectedMemory && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: '95vw', sm: '90vw' },
                    maxHeight: '90vh',
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: { xs: '15px', sm: '20px' },
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <IconButton
                    onClick={() => setSelectedMemory(null)}
                    sx={{
                      position: 'absolute',
                      top: { xs: 5, sm: 10 },
                      right: { xs: 5, sm: 10 },
                      color: 'white',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      padding: { xs: '4px', sm: '8px' },
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.7)',
                      },
                      zIndex: 1,
                    }}
                  >
                    <Close fontSize={isMobile ? "small" : "medium"} />
                  </IconButton>

                  <Box
                    component="img"
                    src={selectedMemory.src}
                    alt={selectedMemory.title}
                    sx={{
                      width: '100%',
                      maxHeight: { xs: '50vh', sm: '70vh' },
                      objectFit: 'cover',
                    }}
                  />

                  <Box sx={{ p: { xs: 2, sm: 3 } }}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography
                        variant={isMobile ? "h6" : "h5"}
                        sx={{
                          mb: 1,
                          fontFamily: "'Great Vibes', cursive",
                          color: 'primary.main',
                          fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        }}
                      >
                        {selectedMemory.title}
                      </Typography>
                    </motion.div>
                    <TypeWriter
                      text={selectedMemory.date}
                      variant="body1"
                      delay={30}
                      sx={{ 
                        color: 'text.secondary',
                        mb: 1,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                      }}
                    />
                    <TypeWriter
                      text={selectedMemory.description}
                      variant="body1"
                      delay={20}
                      sx={{ 
                        color: 'text.primary',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Modal>
      </Box>
    </motion.div>
  );
};

export default Memories; 