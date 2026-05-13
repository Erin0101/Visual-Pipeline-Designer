import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  
  const [detectedVariables, setDetectedVariables] = useState(
    data?.detectedVariables || []
  );
  
  const [textareaHeight, setTextareaHeight] = useState(80);
  
  const textareaRef = useRef(null);

  const updateNodeData = useStore((state) => state.updateNodeData);

  /**
   * Extract variables from text using regex pattern
   * @param {string} inputText - Text to parse
   * @returns {array} - Array of variable names found
   */
  const extractVariables = useCallback((inputText) => {
  
    const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(inputText)) !== null) {
      const varName = match[1];
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }

    return matches;
  }, []);

  const autoResizeTextarea = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const newHeight = Math.max(80, Math.min(textarea.scrollHeight + 8, 300));
      setTextareaHeight(newHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, []);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    const variables = extractVariables(newText);
    setDetectedVariables(variables);

    setTimeout(() => autoResizeTextarea(), 0);

    if (updateNodeData) {
      updateNodeData(id, {
        text: newText,
        detectedVariables: variables,
      });
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [autoResizeTextarea]);

  const nodeStyle = {
    minWidth: 280,
    minHeight: 120,
    border: '1.5px solid var(--frost-border)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-md)',
    background: 'var(--frost-bg)',
    backdropFilter: 'blur(10px) saturate(120%)',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    boxShadow: 'var(--frost-shadow)',
    transition: 'all var(--transition-normal)',
  };

  const titleStyle = {
    fontWeight: '600',
    fontSize: '13px',
    color: 'var(--node-text-accent)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
  };

  const textareaStyle = {
    flex: 1,
    padding: 'var(--spacing-sm)',
    fontSize: '13px',
    fontFamily: "'Poppins', sans-serif",
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: 'var(--radius-md)',
    resize: 'none',
    overflow: 'auto',
    minHeight: '80px',
    maxHeight: '300px',
    height: `${textareaHeight}px`,
    boxSizing: 'border-box',
    lineHeight: '1.5',
    backgroundColor: 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(6px)',
    color: 'var(--text-primary)',
    transition: 'all var(--transition-normal)',
  };

  const variablesContainerStyle = {
    fontSize: '10px',
    color: 'var(--text-primary)',
    padding: 'var(--spacing-sm)',
    background: 'rgba(255,255,255,0.01)',
    borderRadius: 'var(--radius-md)',
    minHeight: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing-xs)',
    border: '1px solid rgba(255,255,255,0.02)',
    maxHeight: '160px',
    overflowY: 'auto',
  };

  const variableBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    padding: '4px 8px',
    backgroundColor: 'var(--node-text-accent)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: '9px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    border: 'none',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
  };

  return (
    <div className="frosted" style={nodeStyle}>
      {/* Title */}
      <div style={titleStyle}>
        Text Processor
      </div>

      {/* Output handle (main output) */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
      />

      {/* Text Input with Auto-Resize */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Type text with {{variables}}..."
        style={textareaStyle}
      />

      {/* Variables Display & Info */}
      <div style={variablesContainerStyle}>
        {detectedVariables.length > 0 ? (
          <>
            <div style={{ marginBottom: '4px', fontWeight: '700', color: 'var(--node-text-accent)', width: '100%' }}>
              Variables: {detectedVariables.length}
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)', width: '100%'}}>
              {detectedVariables.map((varName) => (
                <span key={varName} style={variableBadgeStyle}>
                  {'{{'}{varName}{'}}'} 
                </span>
              ))}
            </div>
          </>
        ) : (
          <span style={{ color: 'var(--text-primary)' }}>Use {'{{variableName}}'} to create inputs</span>
        )}
      </div>

      {/* Dynamic Input Handles for Each Variable */}
      {detectedVariables.map((varName, index) => (
        <Handle
          key={`${id}-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${(index + 1) * (1 / (detectedVariables.length + 1)) * 100}%`,
          }}
          title={`Input for ${varName}`}
        />
      ))}
    </div>
  );
};
