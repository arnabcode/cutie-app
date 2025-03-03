import React, { useCallback } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import WelcomeCard from './components/WelcomeCard';
import SecretCodeCard from './components/SecretCodeCard';
import NotSarah from './components/NotSarah';
import AgeInput from './components/AgeInput';
import CakeInvitation from './components/CakeInvitation';
import CakeInteraction from './components/CakeInteraction';
import BirthdayLetter from './components/BirthdayLetter';
import FinalOptions from './components/FinalOptions';
import Memories from './components/Memories';
import Chat from './components/Chat';
import FloatingHearts from './components/common/FloatingHearts';

// Create a mobile-first romantic theme
const theme = responsiveFontSizes(createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#ff69b4',
      light: '#ffb6c1',
      dark: '#c71585',
    },
    secondary: {
      main: '#ffd700',
      light: '#ffe44d',
      dark: '#c7a600',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h1: {
      fontFamily: "'Great Vibes', cursive",
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '4.5rem',
      },
    },
    h2: {
      fontFamily: "'Great Vibes', cursive",
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:960px)': {
        fontSize: '4rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    button: {
      fontSize: '0.9rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '25px',
          padding: '10px 20px',
          '@media (min-width:600px)': {
            padding: '12px 30px',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '8px',
          '@media (min-width:600px)': {
            padding: '12px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          '@media (min-width:600px)': {
            borderRadius: '20px',
          },
        },
      },
    },
  },
}));

const particlesConfig = {
  particles: {
    number: {
      value: window.innerWidth < 600 ? 40 : 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#FF69B4", "#FFD700", "#FF1493", "#FFA500", "#FF6B6B"]
    },
    shape: {
      type: ["circle", "star", "heart"],
      stroke: {
        width: 0,
      },
    },
    opacity: {
      value: 0.6,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: window.innerWidth < 600 ? 3 : 5,
      random: true,
      anim: {
        enable: true,
        speed: 4,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: window.innerWidth < 600 ? 100 : 150,
      color: "#FF69B4",
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: window.innerWidth < 600 ? 1.5 : 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "bubble"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: window.innerWidth < 600 ? 150 : 200,
        size: window.innerWidth < 600 ? 4 : 6,
        duration: 0.2,
        opacity: 1,
        speed: 3
      },
      push: {
        particles_nb: window.innerWidth < 600 ? 2 : 4
      }
    }
  },
  retina_detect: true
};

const MainContent = () => {
  const { currentStep, FLOW_STEPS } = useApp();

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case FLOW_STEPS.WELCOME:
        return <WelcomeCard />;
      case FLOW_STEPS.NOT_SARAH_GAME:
        return <NotSarah />;
      case FLOW_STEPS.SECRET_CODE_FIRST:
      case FLOW_STEPS.SECRET_CODE_SECOND:
      case FLOW_STEPS.SECRET_CODE_FINAL:
        return <SecretCodeCard />;
      case FLOW_STEPS.AGE_INPUT:
        return <AgeInput />;
      case FLOW_STEPS.CAKE_INVITATION:
        return <CakeInvitation />;
      case FLOW_STEPS.CAKE_INTERACTION:
        return <CakeInteraction />;
      case FLOW_STEPS.BIRTHDAY_LETTER:
        return <BirthdayLetter />;
      case FLOW_STEPS.FINAL_OPTIONS:
        return <FinalOptions />;
      case FLOW_STEPS.MEMORIES:
        return <Memories />;
      case FLOW_STEPS.CHAT:
        return <Chat />;
      default:
        return <WelcomeCard />;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff 0%, #f8f8f8 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Particles
        id="birthdayParticles"
        init={particlesInit}
        options={particlesConfig}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <FloatingHearts />
      <Box 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: '10px', sm: '20px' },
        }}
      >
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
