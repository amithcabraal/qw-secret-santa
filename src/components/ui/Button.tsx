import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'rounded-full transition-colors duration-200';
  
  const variants = {
    primary: 'px-4 py-2 bg-red-500 text-white hover:bg-red-600',
    secondary: 'px-4 py-2 bg-white/10 text-white hover:bg-white/20',
    icon: 'p-2 bg-white/10 text-white hover:bg-white/20',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};