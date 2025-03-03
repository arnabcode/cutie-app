import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBack, Send } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const Message = ({ text, isUser, animate = true }) => (
  <motion.div
    initial={animate ? { opacity: 0, y: 20 } : false}
    animate={animate ? { opacity: 1, y: 0 } : false}
    transition={{ duration: 0.3 }}
    style={{
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      maxWidth: '80%',
    }}
  >
    <Box
      sx={{
        backgroundColor: isUser ? 'primary.main' : 'white',
        color: isUser ? 'white' : 'text.primary',
        padding: '12px 20px',
        borderRadius: isUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
        marginBottom: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="body1">
        {text}
      </Typography>
    </Box>
  </motion.div>
);

const Chat = () => {
  const { setCurrentStep, FLOW_STEPS } = useApp();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const predefinedResponses = [
    {
      triggers: ['hi', 'hello', 'hey'],
      response: "Hi sweetheart! I'm so happy you're here! 💖",
    },
    {
      triggers: ['love', 'love you'],
      response: "I love you more than words can express! You're my everything! ❤️",
    },
    {
      triggers: ['thank', 'thanks'],
      response: "You don't need to thank me! Your happiness means the world to me! 🌟",
    },
    {
      triggers: ['beautiful', 'amazing', 'wonderful'],
      response: "You're the one who's beautiful and amazing! Inside and out! ✨",
    },
    {
      triggers: ['birthday'],
      response: "I hope this birthday is as special as you are to me! 🎂",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial message
    setTimeout(() => {
      setMessages([
        {
          text: "Hi birthday girl! I'm here to chat with you! Ask me anything or just tell me how you feel! 💝",
          isUser: false,
        },
      ]);
    }, 1000);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Find matching response
    const lowercaseInput = inputValue.toLowerCase();
    const matchingResponse = predefinedResponses.find(item =>
      item.triggers.some(trigger => lowercaseInput.includes(trigger))
    );

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        text: matchingResponse
          ? matchingResponse.response
          : "I'm just happy to be here with you! Your presence makes everything better! 💫",
        isUser: false,
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      new Audio('/sounds/pop.mp3').play().catch(console.error);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
          background: 'linear-gradient(135deg, rgba(255,182,193,0.3) 0%, rgba(255,192,203,0.5) 100%)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            padding: '20px',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={() => setCurrentStep(FLOW_STEPS.FINAL_OPTIONS)}
            sx={{ color: 'primary.main', mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Great Vibes', cursive",
              color: 'primary.main',
            }}
          >
            Love Chat
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <Message key={index} {...message} />
            ))}
            {isTyping && (
              <Message
                text="typing..."
                isUser={false}
                animate={false}
              />
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </Box>

        <Box
          sx={{
            padding: '20px',
            background: 'rgba(255,255,255,0.9)',
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  backgroundColor: 'white',
                },
              }}
            />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                sx={{
                  borderRadius: '50%',
                  minWidth: '56px',
                  height: '56px',
                  padding: 0,
                }}
              >
                <Send />
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Chat; 