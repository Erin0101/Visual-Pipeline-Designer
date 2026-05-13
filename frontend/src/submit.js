import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { ResultsModal } from './resultsModal';

export const SubmitButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const handleSubmit = async () => {
   
    setError(null);
    setResult(null);
    setIsLoading(true);
    setIsModalOpen(true);

    try {
      const pipelineData = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.type,
          position: node.position,
          data: node.data,
        })),
        edges: edges.map((edge) => ({
          source: edge.source,
          target: edge.target,
          id: edge.id,
        })),
      };

      // Console logging for debugging
      console.log('Pipeline data:', pipelineData);

      // Validate before sending
      if (pipelineData.nodes.length === 0) {
        throw new Error('Pipeline contains no nodes. Add nodes before executing.');
      }

      if (pipelineData.edges.length === 0 && pipelineData.nodes.length > 0) {
        throw new Error('No connections found. Connect all nodes before executing.');
      }

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze pipeline');
      }

      const data = await response.json();
      setResult(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'An error occurred while analyzing the pipeline');
      console.error('Pipeline execution error:', err);
    }
  };

  const buttonStyle = {
    padding: '12px 28px',
    background: isHovered && !isLoading
      ? 'linear-gradient(180deg, var(--primary-light) 0%, var(--primary-color) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
    color: 'var(--text-primary)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: "'Poppins', sans-serif",
    cursor: isLoading ? 'not-allowed' : 'pointer',
    boxShadow: isHovered && !isLoading
      ? '0 8px 32px rgba(10,25,40,0.45), 0 8px 25px rgba(46,125,158,0.45)'
      : 'var(--frost-shadow)',
    transition: 'all var(--transition-normal)',
    minWidth: 'auto',
    transform: isHovered && !isLoading ? 'translateY(-2px)' : 'translateY(0)',
    opacity: isLoading ? 0.9 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.4px',
    backdropFilter: 'blur(6px)',
    whiteSpace: 'nowrap',
    height: '44px',
  };

  const spinnerStyle = {
    display: isLoading ? 'inline-block' : 'none',
    width: '16px',
    height: '16px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid var(--primary-color)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <button
        type="submit"
        style={buttonStyle}
        onMouseEnter={() => !isLoading && setIsHovered(true)}
        onMouseLeave={() => !isLoading && setIsHovered(false)}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <div style={spinnerStyle}></div>
        <span>{isLoading ? 'Analyzing...' : 'Execute Pipeline'}</span>
      </button>

      {/* Results Modal */}
      <ResultsModal
        isOpen={isModalOpen}
        result={result}
        error={error}
        isLoading={isLoading}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
