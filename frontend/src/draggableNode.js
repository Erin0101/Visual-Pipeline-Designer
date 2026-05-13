import React, { useState } from 'react';

export const DraggableNode = ({ type, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeStyle = {
    cursor: 'grab',
    padding: '12px 28px',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    borderRadius: 'var(--radius-lg)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
    color: 'var(--text-primary)',
    border: 'none',
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: 'var(--frost-shadow)',
    transition: 'all var(--transition-normal)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(6px)',
    letterSpacing: '0.4px',
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={nodeStyle}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
  