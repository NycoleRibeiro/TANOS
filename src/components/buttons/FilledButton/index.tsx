import React from 'react';
import './style.sass'

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const FilledButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  );
};
