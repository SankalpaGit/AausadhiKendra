// components/ui/Dropdown.tsx
'use client';
import React, { useState } from 'react';

const Dropdown = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            zIndex: 10,
            minWidth: '180px',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
