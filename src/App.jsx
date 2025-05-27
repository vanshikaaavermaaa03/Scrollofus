import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Animations
const walk = keyframes`
  0% {
    transform: translateX(-100%) translateY(0) rotate(0deg);
  }
  100% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
`;

const takeOutPaper = keyframes`
  0% {
    transform: translateX(0) rotate(0deg);
  }
  20% {
    transform: translateX(0) rotate(-30deg);
  }
  40% {
    transform: translateX(0) rotate(-30deg) translateX(30px);
  }
  60% {
    transform: translateX(0) rotate(-30deg) translateX(30px);
  }
  80% {
    transform: translateX(0) rotate(-15deg) translateX(30px);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-20px);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const sparkle = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
`;

const scrollUp = keyframes`
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(-100vh);
  }
`;

const balloonFloat = keyframes`
  0% {
    transform: translateY(100vh) translateX(0);
  }
  100% {
    transform: translateY(-100vh) translateX(20px);
  }
`;

// Styled Components
const MainWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: url('data:image/svg+xml;utf8,<svg width="100%25" height="100%25" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"><rect fill="%23aee9fc" width="800" height="600"/><ellipse fill="white" opacity="0.7" cx="150" cy="120" rx="80" ry="40"/><ellipse fill="white" opacity="0.7" cx="250" cy="100" rx="60" ry="30"/><ellipse fill="white" opacity="0.7" cx="600" cy="180" rx="90" ry="45"/><ellipse fill="white" opacity="0.7" cx="700" cy="120" rx="70" ry="35"/><ellipse fill="white" opacity="0.7" cx="400" cy="80" rx="100" ry="50"/><ellipse fill="white" opacity="0.7" cx="500" cy="300" rx="70" ry="35"/><ellipse fill="white" opacity="0.7" cx="200" cy="350" rx="90" ry="40"/></svg>');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: -webkit-fill-available;
  }
`;

const TeddyBear = styled(motion.div)`
  width: 300px;
  height: 300px;
  background: url('/teddy.svg') no-repeat center/contain;
  animation: ${walk} 2s ease-in-out forwards, ${takeOutPaper} 1s ease-in-out 2s forwards;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  z-index: 2;
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 20%;
  }
`;

const SpeechBubble = styled(motion.div)`
  position: absolute;
  left: 60px;
  top: calc(50% - 200px);
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  max-width: 320px;
  font-family: 'Arial, sans-serif';
  font-size: 1.5rem;
  color: black;
  opacity: 0;
  z-index: 3;
  text-align: center;

  @media (max-width: 768px) {
    left: 50%;
    top: 35%;
    transform: translateX(-50%);
    font-size: 1.2rem;
    padding: 1rem;
    max-width: 280px;
    width: 90%;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50px;
    border-width: 20px 20px 0;
    border-style: solid;
    border-color: white transparent;

    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
      bottom: -15px;
      border-width: 15px 15px 0;
    }
  }
`;

const Paper = styled(motion.div)`
  width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  opacity: 0;
  transform: scale(0.8);
  z-index: 2;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 320px;
    padding: 1.5rem;
    margin-top: 200px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -20px;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background: white;
    transform: rotate(45deg);

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #FFB6C1;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }

  &:focus {
    border-color: #FF69B4;
    box-shadow: 0 0 10px rgba(255, 105, 180, 0.2);
  }
`;

const Button = styled.button`
  padding: 1rem;
  background: linear-gradient(45deg, #FFB6C1, #FF69B4);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 1rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
  }
`;

const Title = styled.h1`
  text-align: center;
  color: black;
  margin-bottom: 2rem;
  font-family: 'Arial, sans-serif';
  font-size: 2.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const Envelope = styled(motion.div)`
  width: 400px;
  height: 250px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Arial', sans-serif;
  font-size: 1.5rem;
  color: black;
  text-align: center;
  padding-top: 50px;
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    width: 90%;
    max-width: 320px;
    height: 200px;
    font-size: 1.2rem;
    padding-top: 30px;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 150px solid #f0f0f0;
    border-left: 200px solid transparent;
    border-right: 200px solid transparent;
    width: 0;
    height: 0;

    @media (max-width: 768px) {
      border-bottom: 100px solid #f0f0f0;
      border-left: 160px solid transparent;
      border-right: 160px solid transparent;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-top: 150px solid #ddd;
    border-left: 200px solid transparent;
    border-right: 200px solid transparent;
    width: 0;
    height: 0;
    transform-origin: top;
    transition: transform 0.5s ease-in-out;

    @media (max-width: 768px) {
      border-top: 100px solid #ddd;
      border-left: 160px solid transparent;
      border-right: 160px solid transparent;
    }
  }

  ${({ showNote }) => showNote && `
    &::after {
      transform: rotateX(180deg);
    }
  `}
`;

const Note = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff8dc;
  padding: 2rem;
  box-sizing: border-box;
  font-family: 'Arial, sans-serif';
  font-size: 1.4rem;
  color: #333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.6;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transform: translateY(100%);
`;

const FloatingNote = styled(motion.div)`
  position: fixed;
  top: 30%;
  left: 35%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 250px;
  background: #fff8dc;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.4rem;
  line-height: 1.6;
  color: #333;
  z-index: 20;
  margin: 0;
  border: 2px solid #FFB6C1;
  background: linear-gradient(to bottom, #fff8dc, #fff0f5);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 90%;
    max-width: 320px;
    height: 200px;
    font-size: 1.2rem;
    padding: 1.5rem;
    left: 50%;
    top: 50%;
  }
`;

const Countdown = styled(motion.div)`
  position: fixed;
  top: 30%;
  left: 45%;
  transform: translate(-50%, -50%);
  font-size: 10rem;
  color: black;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 30;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    font-size: 6rem;
    top: 40%;
  }
`;

const PartyBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 15;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: fixed;
  top: 0;
  width: 300px;
  height: 100vh;
  overflow: hidden;
  z-index: 20;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

const LeftImageContainer = styled(ImageContainer)`
  left: 0;
  padding-top: 50px;
`;

const RightImageContainer = styled(ImageContainer)`
  right: 0;
  padding-top: 50px;
`;

const ScrollingImage = styled(motion.img)`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 20px;
  margin: 0 auto 20px auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  opacity: 1;
  display: block;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin: 0 auto 10px auto;
  }
`;

const BirthdayMessage = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 28%;
  transform: translate(-50%, -50%);
  font-size: 3.5rem;
  color: black;
  text-align: center;
  z-index: 25;
  text-shadow:
    -1px -1px 0 white,
    1px -1px 0 white,
    -1px 1px 0 white,
    1px 1px 0 white;
  font-family: 'Arial', sans-serif;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 2rem;
    left: 50%;
    white-space: normal;
    width: 90%;
    top: 40%;
  }
`;

const Balloon = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 80px;
  background: ${props => props.color};
  border-radius: 50%;
  animation: ${balloonFloat} ${props => props.duration}s linear infinite;
  left: ${props => props.left}%;
  opacity: 0.8;
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 20px;
    background: #666;
  }
`;

const GiftBox = styled(motion.div)`
  width: 150px;
  height: 150px;
  background-color: #FF1493;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%) scale(0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 30;
  border: 5px solid #FFB6C1;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    top: 45%;
  }

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 170px;
    background-color: #FFB6C1;
    transform: translateX(-50%);

    @media (max-width: 768px) {
      height: 140px;
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 170px;
    height: 20px;
    background-color: #FFB6C1;
    transform: translateY(-50%);

    @media (max-width: 768px) {
      width: 140px;
    }
  }
`;

const GiftBoxMessage = styled(SpeechBubble)`
  top: 30%;
  left: 42%;
  z-index: 35;
  opacity: 0;
  font-size: 1.8rem;
  padding: 1.2rem 2.2rem;
  max-width: 320px;
  &::before {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    border-width: 20px 20px 0;
    border-style: solid;
    border-color: #fff8dc transparent;
    transform: translateX(-50%);
  }
`;

const SoftToy = styled(motion.div)`
  width: 420px;
  height: 420px;
  background: url('/images/gift.png') no-repeat center/contain;
  position: fixed;
  left: 35%;
  top: 40%;
  z-index: 20;
  pointer-events: none;

  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
    left: 50%;
    top: 45%;
    transform: translateX(-50%);
  }
`;

const SoftToyBubble = styled(SpeechBubble)`
  left: 40%;
  top: 10%;
  max-width: 320px;
  opacity: 1;
  z-index: 25;

  @media (max-width: 768px) {
    left: 50%;
    top: 5%;
    transform: translateX(-50%);
    max-width: 280px;
    width: 90%;
  }
`;

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showEnvelopeSpeech, setShowEnvelopeSpeech] = useState(false);
  const [showFloatingNote, setShowFloatingNote] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showParty, setShowParty] = useState(false);
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [showSoftToy, setShowSoftToy] = useState(false);
  const [formData, setFormData] = useState({ dob: '' });
  const [images] = useState([
    '/images/s1.jpg',
    '/images/s2.jpg',
    '/images/s3.jpg',
    '/images/s4.jpg',
  ]);

  useEffect(() => {
    // Show speech bubble first
    const speechTimer = setTimeout(() => {
      setShowSpeech(true);
    }, 2000);

    // Show form after teddy bear animation completes (3 seconds)
    const formTimer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => {
      clearTimeout(speechTimer);
      clearTimeout(formTimer);
    };
  }, []);

  // Effect for handling the transition from party to gift box stage
  useEffect(() => {
    if (showParty) {
      // Calculate when the last image animation finishes (duration + last image's delay)
      const lastImageIndex = images.length - 1;
      const lastImageAnimationEndTime = 8 + lastImageIndex * 3; // Duration 8s, delay index*3s

      const giftBoxTimer = setTimeout(() => {
        // setShowParty(false); // Keep party elements visible
        setShowGiftBox(true);
      }, (lastImageAnimationEndTime + 1) * 1000); // Add a small buffer before transition

      return () => clearTimeout(giftBoxTimer);
    }
  }, [showParty, images.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctDOB = '2002-06-03';
    if (formData.dob === correctDOB) {
      console.log('Correct DOB entered! Proceeding to surprise.');
      setShowForm(false);
      setShowSpeech(false);
      // Add a slight delay before showing the envelope and its speech bubble
      setTimeout(() => {
        setShowEnvelope(true);
        setShowEnvelopeSpeech(true);
      }, 500);
    } else {
      alert('Incorrect date. Please try again!');
      console.log('Incorrect DOB entered:', formData.dob);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEnvelopeClick = () => {
    setShowEnvelope(false);
    setTimeout(() => {
      setShowFloatingNote(true);
    }, 500);
  };

  const handleNoteClick = () => {
    setShowFloatingNote(false);
    setShowSpeech(false); // Hide speech bubble
    setShowCountdown(true);
    let count = 5;
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(timer);
        setShowCountdown(false);
        setShowParty(true);
      }
    }, 1000);
  };

  const generateBalloons = () => {
    const colors = ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#FF69B4'];
    return Array.from({ length: 20 }).map((_, index) => (
      <Balloon
        key={index}
        color={colors[index % colors.length]}
        left={Math.random() * 100}
        duration={5 + Math.random() * 5}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1 }}
      />
    ));
  };

  // Add handler for gift box click
  const handleGiftBoxClick = () => {
    setShowSoftToy(true);
    setShowGiftBox(false); // Hide gift box and speech bubble
  };

  return (
    <MainWrapper>
      <AnimatePresence>
        {!showCountdown && !showParty && !showGiftBox && <TeddyBear />}
      </AnimatePresence>

      <AnimatePresence>
        {showSpeech && !showCountdown && !showParty && !showGiftBox && (
          <SpeechBubble
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Hey! Put your date of birth here. I have a surprise for you! 🎁
          </SpeechBubble>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEnvelopeSpeech && !showCountdown && !showParty && !showGiftBox && (
          <SpeechBubble
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Tap on the envelope to open
          </SpeechBubble>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && !showParty && !showGiftBox && (
          <Paper
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              duration: 0.7,
              type: 'spring',
              stiffness: 100
            }}
          >
            <Title>Welcome Back!</Title>
            <LoginForm onSubmit={handleSubmit}>
              <Input
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <Button type="submit">See Surprise!</Button>
            </LoginForm>
          </Paper>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEnvelope && !showParty && !showGiftBox && (
          <Envelope
            onClick={handleEnvelopeClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFloatingNote && !showParty && !showGiftBox && (
          <FloatingNote
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleNoteClick}
          >
            Hey my girl ❤️ This is for you tap again and see the surprise
          </FloatingNote>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCountdown && (
          <Countdown
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            {countdown}
          </Countdown>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(showParty || showGiftBox) && (
          <>
            <PartyBackground
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {generateBalloons()}
            </PartyBackground>
            <LeftImageContainer>
              {images.map((image, index) => (
                <ScrollingImage
                  key={`left-${index}`}
                  src={image}
                  alt={`Memory ${index + 1}`}
                  initial={{ y: '100vh' }}
                  animate={{
                    y: 0,
                    transition: {
                      y: { duration: 8, ease: "linear", repeat: false, delay: index * 3 },
                    }
                  }}
                />
              ))}
            </LeftImageContainer>
            <RightImageContainer>
              {images.map((image, index) => (
                <ScrollingImage
                  key={`right-${index}`}
                  src={image}
                  alt={`Memory ${index + 1}`}
                  initial={{ y: '100vh' }}
                  animate={{
                    y: 0,
                    transition: {
                      y: { duration: 8, ease: "linear", repeat: false, delay: index * 3 },
                    }
                  }}
                />
              ))}
            </RightImageContainer>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(showParty && !showGiftBox && !showSoftToy) && (
          <BirthdayMessage
            key="birthday-center"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Happy Birthday Shraddha! 🎉
          </BirthdayMessage>
        )}
        {(showGiftBox && !showSoftToy) && (
          <BirthdayMessage
            key="birthday-up"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: '-45vh', opacity: 1 }}
            exit={{ opacity: 0, y: '-45vh', transition: { duration: 0 } }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Happy Birthday Shraddha! 🎉
          </BirthdayMessage>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGiftBox && (
          <>
            <GiftBox
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              onClick={handleGiftBoxClick}
            />
            <GiftBoxMessage
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              Tap on the box!
            </GiftBoxMessage>
          </>
        )}
        <AnimatePresence>
          {showSoftToy && (
            <>
              <SoftToy
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: -120, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
              />
              <SoftToyBubble
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                I am your birthday gift. Hope you like it!  😁
              </SoftToyBubble>
            </>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </MainWrapper>
  );
}

export default App; 