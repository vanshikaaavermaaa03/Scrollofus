import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const TeddyContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
  position: relative;
`;

const Head = styled(motion.div)`
  width: 120px;
  height: 120px;
  background-color: #8B4513;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
`;

const BirthdayCap = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 60px;
  background-color: #FFD93D;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  top: -55px;
  left: 50%;
  transform: translateX(-50%) rotate(-15deg);
  transform-origin: bottom center;
  z-index: 10;
  border-bottom: 3px dashed white;
  border-radius: 5px;

  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Ears = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #8B4513;
  border-radius: 50%;
  top: -10px;
  left: -10px;

  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #8B4513;
    border-radius: 50%;
    left: 90px;
  }
`;

const Face = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  top: 20px;
  left: 10px;
`;

const Eyes = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #000;
  border-radius: 50%;
  top: 30px;
  left: 25px;

  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 50%;
    left: 40px;
  }
`;

const Nose = styled.div`
  position: absolute;
  width: 15px;
  height: 10px;
  background-color: #000;
  border-radius: 50%;
  top: 45px;
  left: 42px;
`;

const Mouth = styled.div`
  position: absolute;
  width: 30px;
  height: 15px;
  border: 2px solid #000;
  border-radius: 0 0 30px 30px;
  top: 60px;
  left: 35px;
`;

const Body = styled(motion.div)`
  width: 140px;
  height: 100px;
  background-color: #8B4513;
  border-radius: 50px;
  margin: -20px auto 0;
  position: relative;
`;

const Arms = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 80px;
  background-color: #8B4513;
  border-radius: 20px;
  top: -40px;
  left: -20px;
  transform-origin: bottom center;

  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 80px;
    background-color: #8B4513;
    border-radius: 20px;
    left: 140px;
    transform-origin: bottom center;
  }
`;

const TeddyBear: React.FC = () => {
  return (
    <TeddyContainer>
      <Head
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <BirthdayCap
          animate={{
            rotate: [-15, 5, -15],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <Ears />
        <Face>
          <Eyes />
          <Nose />
          <Mouth />
        </Face>
      </Head>
      <Body>
        <Arms
          animate={{
            rotate: [-20, 20, -20],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </Body>
    </TeddyContainer>
  );
};

export default TeddyBear; 