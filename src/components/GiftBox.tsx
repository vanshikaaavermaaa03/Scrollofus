import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const GiftContainer = styled(motion.div)`
  position: fixed;
  bottom: 50px;
  left: 33%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
`;

const Box = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(45deg, #FF6B6B, #FF8E8E);
  border: 3px solid #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
`;

const BoxLid = styled(motion.div)`
  position: absolute;
  width: 110%;
  height: 25px;
  background: linear-gradient(45deg, #FF8E8E, #FF6B6B);
  top: -25px;
  left: -5%;
  border: 3px solid #fff;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
  transform-origin: right center;
`;

const BoxHandle = styled.div`
  position: absolute;
  width: 30px;
  height: 15px;
  background: #fff;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const BoxPattern = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 6px, transparent 6px);
  background-size: 20px 20px;
  background-position: 0 0;
  border-radius: 3px;
`;

const Eyes = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
  z-index: 2;
`;

const Eye = styled.div`
  width: 25px;
  height: 25px;
  background: white;
  border-radius: 50%;
  position: relative;
  border: 2px solid #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    background: #000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    top: 25%;
    left: 25%;
    z-index: 1;
  }
`;

const Smile = styled.div`
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 30px;
  background: #000;
  border-radius: 0 0 25px 25px;
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
    top: 5px;
    left: 10px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
    top: 5px;
    right: 10px;
  }
`;

const SpeechBubble = styled(motion.div)`
  position: absolute;
  top: -130px;
  right: -20px;
  background: white;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  text-align: center;
  font-size: 16px;
  color: rgb(0, 0, 0);
  font-weight: bold;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 30px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
  }
`;

const GreetingCard = styled(motion.img)`
  position: absolute;
  width: 200px;
  height: 250px;
  object-fit: contain;
  z-index: 3;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  top: -400px;
  left: -20%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const CornerCard = styled(motion.img)`
  position: fixed;
  width: 100px;
  height: 125px;
  object-fit: contain;
  z-index: 3;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const SecondCornerCard = styled(motion.img)`
  position: fixed;
  width: 100px;
  height: 125px;
  object-fit: contain;
  z-index: 3;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  top: 20px;
  right: 140px;
  cursor: pointer;
`;

const VideoMessage = styled(motion.video)`
  position: absolute;
  width: 300px;
  height: 200px;
  object-fit: cover;
  z-index: 3;
  background: black;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  top: -400px;
  left: -50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const CornerVideo = styled(motion.video)`
  position: fixed;
  width: 150px;
  height: 100px;
  object-fit: cover;
  z-index: 3;
  background: black;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  top: 20px;
  right: 260px;
  cursor: pointer;
`;

const Heart = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #ff69b4;
  transform: rotate(45deg);
  opacity: 0.3;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #ff69b4;
    border-radius: 50%;
  }

  &::before {
    left: -10px;
  }

  &::after {
    top: -10px;
  }
`;

const Note = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 150px;
  top: -250px;
  left: -20%;
  transform: translateX(-50%);
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  color: #8B4513;
  font-weight: bold;
  line-height: 1.4;
  overflow: hidden;
`;

const NoteContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 2;
`;

const HeartsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

const GiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [isSecondDownloaded, setIsSecondDownloaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isVideoDownloaded, setIsVideoDownloaded] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClick = () => {
    setIsOpen(true);
    setShowSpeechBubble(false);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = '/BGC.png';
    link.download = 'birthday-greeting-card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloaded(true);
    setShowSecondImage(true);
  };

  const handleSecondImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = '/collage.png';
    link.download = 'birthday-collage.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsSecondDownloaded(true);
    setShowVideo(true);
  };

  const handleVideoEnded = () => {
    setIsVideoDownloaded(true);
    setShowNote(true);
  };

  const heartVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: [0, 1, 0.8],
      opacity: [0, 0.3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.5,
        ease: "easeInOut"
      }
    })
  };

  const heartPositions = [
    { top: '20%', left: '20%' },
    { top: '30%', left: '70%' },
    { top: '60%', left: '30%' },
    { top: '70%', left: '80%' },
    { top: '40%', left: '50%' }
  ];

  return (
    <GiftContainer
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 1
      }}
    >
      <Box
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <BoxPattern />
        <Eyes>
          <Eye />
          <Eye />
        </Eyes>
        <Smile />
        <BoxLid
          animate={isOpen ? {
            rotateY: -180,
            y: -25,
          } : {
            y: [-2, 2, -2],
          }}
          transition={{
            duration: isOpen ? 0.5 : 3,
            repeat: isOpen ? 0 : Infinity,
            ease: "easeInOut"
          }}
        >
          <BoxHandle />
        </BoxLid>
      </Box>
      <AnimatePresence>
        {isOpen && !isDownloaded && (
          <GreetingCard
            src="/BGC.png"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleImageClick}
          />
        )}
      </AnimatePresence>
      {isDownloaded && (
        <CornerCard
          src="/BGC.png"
          initial={{ opacity: 0, scale: 0.5, x: -200 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleImageClick}
        />
      )}
      {showSecondImage && !isSecondDownloaded && (
        <GreetingCard
          src="/collage.png"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleSecondImageClick}
        />
      )}
      {isSecondDownloaded && (
        <SecondCornerCard
          src="/collage.png"
          initial={{ opacity: 0, scale: 0.5, x: -200 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleSecondImageClick}
        />
      )}
      {showVideo && !isVideoDownloaded && (
        <VideoMessage
          ref={videoRef}
          src="/video.mp4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onEnded={handleVideoEnded}
          controls
          autoPlay
          muted
        />
      )}
      {isVideoDownloaded && (
        <CornerVideo
          src="/video.mp4"
          initial={{ opacity: 0, scale: 0.5, x: -200 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          controls
          muted
          loop
        />
      )}
      {showNote && (
        <Note
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeartsContainer>
            {heartPositions.map((pos, i) => (
              <Heart
                key={i}
                style={{ top: pos.top, left: pos.left }}
                variants={heartVariants}
                initial="initial"
                animate="animate"
                custom={i}
              />
            ))}
          </HeartsContainer>
          <NoteContent>
            I hope you loved the surprise, See you!
          </NoteContent>
        </Note>
      )}
      <AnimatePresence>
        {!isOpen && (
          <SpeechBubble
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.1
            }}
          >
            Tap on me to get your surprise!
          </SpeechBubble>
        )}
      </AnimatePresence>
    </GiftContainer>
  );
};

export default GiftBox; 