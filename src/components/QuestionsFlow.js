import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Slider, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayArrow, Pause } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const questions = [
  {
    id: 'favorite_memory',
    question: "What's your favorite memory with me?",
    type: 'textarea',
    placeholder: 'Share your special moment...'
  },
  {
    id: 'song',
    question: 'Which song reminds you of us?',
    type: 'text',
    placeholder: 'Name of the song...',
    hasAudio: true,
    audioUrl: '/sounds/romantic-song.mp3'
  },
  {
    id: 'dream_adventure',
    question: 'What is your dream adventure?',
    type: 'textarea',
    placeholder: 'Tell me about your dream...'
  },
  {
    id: 'rating',
    question: 'Rate our journey together (1-10)',
    type: 'slider'
  }
];

const QuestionCard = ({ question, onAnswer, onNext, isLast }) => {
  const [answer, setAnswer] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(question.hasAudio ? new Audio(question.audioUrl) : null);

  const handleSubmit = () => {
    onAnswer(question.id, answer);
    onNext();
  };

  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '500px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'primary.main',
            marginBottom: 3,
            fontFamily: "'Great Vibes', cursive",
            fontSize: '2rem',
          }}
        >
          {question.question}
        </Typography>

        {question.type === 'slider' ? (
          <Slider
            value={answer || 1}
            onChange={(_, value) => setAnswer(value)}
            min={1}
            max={10}
            marks
            sx={{
              color: 'primary.main',
              marginY: 4,
              '& .MuiSlider-mark': {
                backgroundColor: 'primary.light',
              },
            }}
          />
        ) : (
          <TextField
            fullWidth
            multiline={question.type === 'textarea'}
            rows={question.type === 'textarea' ? 4 : 1}
            placeholder={question.placeholder}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            sx={{
              marginBottom: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.light',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  boxShadow: '0 0 10px rgba(255,105,180,0.2)',
                },
              },
            }}
          />
        )}

        {question.hasAudio && (
          <Box sx={{ marginBottom: 3 }}>
            <IconButton
              onClick={toggleAudio}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Box>
        )}

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!answer}
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
            {isLast ? 'Finish' : 'Next'}
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

const QuestionsFlow = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { updateAnswer, setCurrentStep } = useApp();

  const handleAnswer = (questionId, answer) => {
    updateAnswer(questionId, answer);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep('timeline');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(255,182,193,0.3) 0%, rgba(255,192,203,0.5) 100%)',
        padding: '20px',
      }}
    >
      <AnimatePresence mode="wait">
        <QuestionCard
          key={currentQuestionIndex}
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          isLast={currentQuestionIndex === questions.length - 1}
        />
      </AnimatePresence>
    </Box>
  );
};

export default QuestionsFlow; 