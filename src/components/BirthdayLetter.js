import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBack } from "@mui/icons-material";
import { useApp } from "../context/AppContext";
import TypeWriter from "./common/TypeWriter";

const BirthdayLetter = () => {
  const { setCurrentStep, FLOW_STEPS } = useApp();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const letterContent = [
    {
      text: "Dearest Sarah,",
      style: {
        fontSize: { xs: "1.8rem", md: "2rem" },
        marginVertical: "1.5rem",
      },
    },
    {
      text: "On this special day, I want to tell you how much you mean to me. Your smile brightens my world, your laughter fills my heart with joy, and your love makes every day beautiful.",
      style: {
        fontSize: { xs: "1rem", md: "1.2rem" },
        marginBottom: "1.5rem",
      },
    },
    {
      text: "You're not just my girlfriend, you're my best friend, my confidante, and my greatest adventure partner. Every moment with you is a treasure I hold dear.",
      style: {
        fontSize: { xs: "1rem", md: "1.2rem" },
        marginBottom: "1.5rem",
      },
    },
    {
      text: "May this birthday bring you all the happiness you deserve, and may our love continue to grow stronger with each passing day.",
      style: {
        fontSize: { xs: "1rem", md: "1.2rem" },
        marginBottom: "1.5rem",
      },
    },
    {
      text: "Happy Birthday, my love! 🎂✨",
      style: { fontSize: { xs: "1.4rem", md: "1.5rem" } },
    },
    {
      text: "With all my love,",
      style: {
        marginTop: "2rem",
        fontSize: { xs: "1.4rem", md: "1.5rem" },
      },
    },
    {
      text: "Your Bhondu ❤️",
      style: { fontSize: { xs: "1.4rem", md: "1.5rem" } },
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 2 }}
      style={{ height: "120vh", width: "100%" }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "20px",
        }}
      >
        <IconButton
          onClick={() => setCurrentStep(FLOW_STEPS.CAKE_INTERACTION)}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "primary.main",
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: { xs: "30px", md: "50px" },
              textAlign: "center",
              maxWidth: "800px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {letterContent.map((content, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 1 + index * 0.7 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Great Vibes', cursive",
                    color: "primary.main",
                    textAlign: "center",
                    marginBottom: "1.5rem",
                    fontSize: { xs: "2rem", md: "2.5rem" },
                  }}
                >
                  {content.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    ...content.style,
                    // fontFamily: "'Great Vibes', cursive",
                    color: "text.secondary",
                    textAlign: "center",
                    lineHeight: 1.6,
                  }}
                >
                  {content.text}
                </Typography>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showButton ? 1 : 0 }}
              transition={{ duration: 5 }}
              style={{ marginTop: "2rem" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setCurrentStep(FLOW_STEPS.MEMORIES)}
                  sx={{
                    borderRadius: "25px",
                    padding: "10px 40px",
                    fontSize: "1.1rem",
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 20px rgba(255,255,255,0.4)",
                    },
                  }}
                >
                  View Our Memories 💝
                </Button>
              </motion.div>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default BirthdayLetter;
