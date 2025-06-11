import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
`;

const Balloon = styled(motion.div)<{ color: string; left: string; delay: number }>`
  position: absolute;
  width: 40px;
  height: 50px;
  background-color: ${props => props.color};
  border-radius: 50%;
  left: ${props => props.left};
  bottom: -50px;
  opacity: 0.7;

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 30px;
    background-color: #666;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Confetti = styled(motion.div)<{ color: string; left: string; delay: number }>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
  left: ${props => props.left};
  top: -10px;
  opacity: 0.7;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
`;

const PartyBackground: React.FC = () => {
  const balloons = [
    { color: '#FF6B6B', left: '10%', delay: 0 },
    { color: '#4ECDC4', left: '25%', delay: 1 },
    { color: '#FFD93D', left: '40%', delay: 2 },
    { color: '#95E1D3', left: '55%', delay: 3 },
    { color: '#FF8B94', left: '70%', delay: 4 },
    { color: '#6C5CE7', left: '85%', delay: 5 },
  ];

  const confetti = [
    { color: '#FF6B6B', left: '15%', delay: 0.5 },
    { color: '#4ECDC4', left: '30%', delay: 1.5 },
    { color: '#FFD93D', left: '45%', delay: 2.5 },
    { color: '#95E1D3', left: '60%', delay: 3.5 },
    { color: '#FF8B94', left: '75%', delay: 4.5 },
    { color: '#6C5CE7', left: '90%', delay: 5.5 },
  ];

  return (
    <BackgroundContainer>
      {balloons.map((balloon, index) => (
        <Balloon
          key={`balloon-${index}`}
          color={balloon.color}
          left={balloon.left}
          delay={balloon.delay}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: balloon.delay,
            ease: "linear"
          }}
        />
      ))}
      {confetti.map((confetti, index) => (
        <Confetti
          key={`confetti-${index}`}
          color={confetti.color}
          left={confetti.left}
          delay={confetti.delay}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: confetti.delay,
            ease: "linear"
          }}
        />
      ))}
    </BackgroundContainer>
  );
};

export default PartyBackground; 