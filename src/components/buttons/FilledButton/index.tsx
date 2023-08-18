import React from 'react';
import './style.sass'

interface ButtonProps {
  text: string;
  icon?: string;
  onClick?: () => void;
}

export const FilledButton: React.FC<ButtonProps> = ({ text, onClick, icon }) => {
  return (
    <button 
    className="filled-button"
    type={onClick ? 'button' : 'submit'}
    onClick={onClick}
    >
      {icon && <img className="icon" src={icon} alt="icon" />}
      {text}
    </button>
  );
};
