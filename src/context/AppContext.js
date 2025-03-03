import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const FLOW_STEPS = {
  WELCOME: 'welcome',
  NOT_SARAH_GAME: 'notSarahGame',
  SECRET_CODE_FIRST: 'secretCodeFirst',
  SECRET_CODE_SECOND: 'secretCodeSecond',
  SECRET_CODE_FINAL: 'secretCodeFinal',
  AGE_INPUT: 'ageInput',
  CAKE_INVITATION: 'cakeInvitation',
  CAKE_INTERACTION: 'cakeInteraction',
  BIRTHDAY_LETTER: 'birthdayLetter',
  FINAL_OPTIONS: 'finalOptions',
  MEMORIES: 'memories',
  CHAT: 'chat'
};

export const AppProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(FLOW_STEPS.WELCOME);
  const [answers, setAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [codeAttempts, setCodeAttempts] = useState(0);
  const [age, setAge] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const secretCode = 'princess'; // Example secret code

  const validateCode = (code) => {
    const isValid = code.toLowerCase() === secretCode;
    if (!isValid) {
      setCodeAttempts(prev => prev + 1);
      if (codeAttempts === 0) {
        setCurrentStep(FLOW_STEPS.SECRET_CODE_SECOND);
      } else if (codeAttempts === 1) {
        setCurrentStep(FLOW_STEPS.SECRET_CODE_FINAL);
      } else {
        setCurrentStep(FLOW_STEPS.NOT_SARAH_GAME);
      }
    } else {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setCurrentStep(FLOW_STEPS.AGE_INPUT);
      }, 3000);
    }
    return isValid;
  };

  const updateAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const resetFlow = () => {
    setCurrentStep(FLOW_STEPS.WELCOME);
    setCodeAttempts(0);
    setAge('');
    setAnswers({});
    setShowConfetti(false);
  };

  const handleAgeSubmit = (inputAge) => {
    setAge(inputAge);
    setCurrentStep(FLOW_STEPS.CAKE_INVITATION);
  };

  const handleCakeInvitation = (accepted) => {
    if (accepted) {
      setCurrentStep(FLOW_STEPS.CAKE_INTERACTION);
    } else {
      setCurrentStep(FLOW_STEPS.BIRTHDAY_LETTER);
    }
  };

  const value = {
    currentStep,
    setCurrentStep,
    answers,
    updateAnswer,
    validateCode,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    codeAttempts,
    age,
    handleAgeSubmit,
    handleCakeInvitation,
    resetFlow,
    showConfetti,
    FLOW_STEPS
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 