import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBack } from "@mui/icons-material";
import { useApp } from "../context/AppContext";
import TypeWriter from "./common/TypeWriter";

const CakeInvitation = () => {
  const { handleCakeInvitation, setCurrentStep, FLOW_STEPS } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const cakeVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  const handleResponse = (accepted) => {
    new Audio("/sounds/pop.mp3").play().catch(console.error);
    handleCakeInvitation(accepted);
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
          onClick={() => setCurrentStep(FLOW_STEPS.AGE_INPUT)}
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
                Would you like to cut your cake?
              </Typography>
            </motion.div>

            <motion.div
              variants={cakeVariants}
              initial="initial"
              animate={isHovered ? "hover" : "initial"}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              style={{
                fontSize: "100px",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              🎂
            </motion.div>

            <TypeWriter
              text="A special virtual cake just for you! ✨"
              variant="body1"
              delay={50}
              sx={{ mb: 4, color: "text.secondary" }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showButtons ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleResponse(true)}
                    sx={{
                      borderRadius: "25px",
                      padding: "10px 30px",
                      fontSize: "1.1rem",
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 0 20px rgba(255,255,255,0.4)",
                      },
                    }}
                  >
                    Yes, let's cut it! 🔪
                  </Button>
                </motion.div>

                {/* <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleResponse(false)}
                    sx={{
                      borderRadius: "25px",
                      padding: "10px 30px",
                      fontSize: "1.1rem",
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    Skip to letter ✉️
                  </Button>
                </motion.div> */}
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default CakeInvitation;
