import React from 'react';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  const sectionStyle = {
    marginBottom: 12,
  };

  const sectionTitle = {
    fontSize: 12,
    fontWeight: 800,
    color: 'var(--neutral-100)',
    marginBottom: 8,
  };

  const groupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '12px 28px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--frost-shadow)',
    backdropFilter: 'blur(6px)',
    border: 'none',
  };

  return (
    <div style={{ padding: 6, background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--frost-shadow)', backdropFilter: 'blur(6px)' }}>
      <div style={sectionStyle}>
        <div style={sectionTitle}>Node</div>
        <div style={groupStyle}>
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="text" label="Text" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionTitle}>Demo Node</div>
        <div style={groupStyle}>
          <DraggableNode type="apiCall" label="API Call" />
          <DraggableNode type="condition" label="Condition" />
          <DraggableNode type="filter" label="Filter" />
          <DraggableNode type="join" label="Join" />
          <DraggableNode type="transform" label="Transform" />
        </div>
      </div>
    </div>
  );
};
