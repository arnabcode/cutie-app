import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import Confetti from "react-confetti";

const Celebration = ({ onComplete }) => {
  const [showCracker, setShowCracker] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const messages = [
    { text: "Happy Birthday, My Love! 🎂", emoji: "🥳" },
    { text: "May your day be filled with joy and laughter! 🎉", emoji: "😊" },
    { text: "You mean the world to me! ❤️", emoji: "🥰" },
    { text: "Here's to another beautiful year together! 🌟", emoji: "😘" },
  ];

  useEffect(() => {
    // Show crackers for 2 seconds
    setTimeout(() => {
      setShowCracker(false);
      setShowConfetti(true);
      // Play celebration sound
      new Audio("/sounds/celebration.mp3").play().catch(console.error);
      // Start showing messages
      setCurrentMessageIndex(0);
    }, 2000);

    // Show each message for 3 seconds
    messages.forEach((_, index) => {
      setTimeout(() => {
        setCurrentMessageIndex(index);
        new Audio("/sounds/pop.mp3").play().catch(console.error);
      }, 2000 + index * 3000); // 2s initial delay + 3s per previous message
    });

    // Show final message after all messages
    setTimeout(() => {
      setShowFinalMessage(true);
    }, 2000 + messages.length * 3000);

    // Move to next step
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000 + messages.length * 3000 + 1000);
  }, []);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesConfig = {
    fullScreen: { enable: false },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#FF69B4", "#FFD700", "#FF1493", "#FFA500"],
      },
      shape: {
        type: ["star", "heart"],
      },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 6,
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 0.1,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
    },
    retina_detect: true,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: "90vh", width: "100%" }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(8px)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showCracker && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "100px",
              animation: "cracker 1s ease-out infinite",
              "@keyframes cracker": {
                "0%": { transform: "translate(-50%, -50%) scale(0)" },
                "50%": { transform: "translate(-50%, -50%) scale(1.5)" },
                "100%": { transform: "translate(-50%, -50%) scale(1)" },
              },
            }}
          >
            🎊
          </Box>
        )}

        <AnimatePresence>
          {showConfetti && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={true}
              numberOfPieces={200}
              gravity={0.3}
            />
          )}
        </AnimatePresence>

        {/* <Particles
          id="celebrationParticles"
          init={particlesInit}
          options={particlesConfig}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.6,
          }}
        /> */}

        <Container
          // maxWidth="md"
          sx={{
            position: "relative",
            zIndex: 1,
            // border: "1px solid red",
            width: { xs: "90rem", md: "1" },
          }}
        >
          <AnimatePresence mode="wait">
            {currentMessageIndex >= 0 &&
              currentMessageIndex < messages.length && (
                <motion.div
                  key={currentMessageIndex}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    // border: "1px solid red",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: 2,
                      repeatType: "reverse",
                    }}
                    style={{ fontSize: "80px" }}
                  >
                    {messages[currentMessageIndex].emoji}
                  </motion.div>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "primary.main",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: { xs: "2rem", md: "3rem" },
                      textAlign: "center",
                    }}
                  >
                    {messages[currentMessageIndex].text}
                  </Typography>
                </motion.div>
              )}
          </AnimatePresence>

          <AnimatePresence>
            {showFinalMessage && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "2rem",
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{ fontSize: "100px" }}
                >
                  🍰
                </motion.div>
                <Typography
                  variant="h4"
                  sx={{
                    color: "primary.main",
                    fontFamily: "'Great Vibes', cursive",
                    textAlign: "center",
                  }}
                >
                  Time to read your special birthday letter! ✨
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Celebration;
