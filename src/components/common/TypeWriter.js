import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const TypeWriter = ({ text, variant = "body1", delay = 50, onComplete, sx = {} }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, delay, onComplete]);

  return (
    <Typography
      variant={variant}
      sx={{
        ...sx,
        '&::after': {
          content: '"|"',
          animation: currentIndex < text.length ? 'blink 1s step-end infinite' : 'none',
          opacity: currentIndex < text.length ? 1 : 0,
        },
        '@keyframes blink': {
          'from, to': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      }}
    >
      {displayedText}
    </Typography>
  );
};

export default TypeWriter; 