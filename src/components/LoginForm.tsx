import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface LoginFormProps {
  onCorrectDOB: () => void;
}

const FormContainer = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #555;
  font-size: 1rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: rgba(255, 255, 255, 0.9);

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(45deg, #45a049, #4CAF50);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
  }
`;

const Message = styled(motion.p)<{ isError?: boolean }>`
  color: ${props => props.isError ? '#ff0000' : '#4CAF50'};
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${props => props.isError ? 'rgba(255, 0, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)'};
`;

const LoginForm: React.FC<LoginFormProps> = ({ onCorrectDOB }) => {
  const [dob, setDob] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDate = new Date(dob);
    const targetDate = new Date('2002-06-03');

    if (
      selectedDate.getFullYear() === targetDate.getFullYear() &&
      selectedDate.getMonth() === targetDate.getMonth() &&
      selectedDate.getDate() === targetDate.getDate()
    ) {
      setMessage('Welcome! Access granted.');
      setIsError(false);
      setTimeout(onCorrectDOB, 1500); // Wait for the success message to be shown
    } else {
      setMessage('Sorry, access denied. Please enter the correct date of birth.');
      setIsError(true);
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Welcome!</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="dob">Enter your Date of Birth:</Label>
          <Input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </FormGroup>
        <Button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enter
        </Button>
      </Form>
      {message && (
        <Message
          isError={isError}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </Message>
      )}
    </FormContainer>
  );
};

export default LoginForm; 