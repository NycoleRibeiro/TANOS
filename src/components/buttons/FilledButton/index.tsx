import React from 'react';
import './style.sass'

interface ButtonProps {
  text: string;
  icon?: string;
  onClick?: () => void;
  size?: string;
}

export const FilledButton: React.FC<ButtonProps> = ({ text, onClick, icon, size }) => {
  return (
    <button 
    className="filled-button"
    type={onClick ? 'button' : 'submit'}
    onClick={onClick}
    style={{ 
      width: size
    }}
    >
      {icon && <img className="icon" src={icon} alt="icon" />}
      {text}
    </button>
  );
};
