import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBack } from "@mui/icons-material";
import { useApp } from "../context/AppContext";

const SecretCodeCard = () => {
  const { currentStep, validateCode, setCurrentStep, FLOW_STEPS } = useApp();
  const [code, setCode] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInput(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const messages = {
    [FLOW_STEPS.SECRET_CODE_FIRST]: {
      title: "Enter the Secret Code",
      subtitle: "If you're really Pratyasha, you'll know this... 💕",
    },
    [FLOW_STEPS.SECRET_CODE_SECOND]: {
      title: "Hmm... Try Again?",
      subtitle: "That wasn't quite right. One more chance! 🤔",
    },
    [FLOW_STEPS.SECRET_CODE_FINAL]: {
      title: "Last Chance 💔 !",
      subtitle: "Think carefully... What could it be? 🎀",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCode(code)) {
      new Audio("/sounds/success.mp3").play().catch(console.error);
    } else {
      setError(true);
      new Audio("/sounds/error.mp3").play().catch(console.error);
      setTimeout(() => setError(false), 500);
      setCode("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{ height: "100vh", width: "100%" }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => setCurrentStep(FLOW_STEPS.WELCOME)}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "primary.main",
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
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: "20px",
              padding: "40px",
              textAlign: "center",
              maxWidth: "400px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "'Satisfy', cursive",
                  color: "primary.main",
                  marginBottom: 2,
                  fontSize: { xs: "1.75rem", md: "1.5rem" },
                }}
              >
                {messages[currentStep].title}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography
                variant="body1"
                sx={{ mb: 3, color: "text.secondary" }}
              >
                {messages[currentStep].subtitle}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showInput ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter code here..."
                  variant="outlined"
                  error={error}
                  sx={{
                    maxWidth: "300px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!code}
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
                    Submit 🔑
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default SecretCodeCard;
