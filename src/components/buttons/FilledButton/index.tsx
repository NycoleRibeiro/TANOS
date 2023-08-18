import React from 'react';
import './style.sass'

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const FilledButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button 
    className="filled-button"
    type={onClick ? 'button' : 'submit'}
    onClick={onClick}
    >
      {text}
    </button>
  );
};
