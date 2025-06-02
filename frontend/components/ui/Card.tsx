import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`shadow rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
};
