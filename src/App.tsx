import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import TeddyBear from './components/TeddyBear';
import LoginForm from './components/LoginForm';
import PartyBackground from './components/PartyBackground';
import GiftBox from './components/GiftBox';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
  z-index: 1;
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const App: React.FC = () => {
  const [showGift, setShowGift] = useState(false);

  const handleCorrectDOB = () => {
    setShowGift(true);
  };

  return (
    <>
      <PartyBackground />
      <AppContainer>
        <AnimatePresence mode="wait">
          {!showGift ? (
            <ContentContainer
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TeddyBear />
              <LoginForm onCorrectDOB={handleCorrectDOB} />
            </ContentContainer>
          ) : (
            <GiftBox />
          )}
        </AnimatePresence>
      </AppContainer>
    </>
  );
};

export default App;
