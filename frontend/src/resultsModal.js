import React from 'react';
import { createPortal } from 'react-dom';

export const ResultsModal = ({ isOpen, result, error, onClose, isLoading }) => {
  const [isCloseHovered, setIsCloseHovered] = React.useState(false);
  
  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100000,
    backdropFilter: 'blur(4px)',
  };

  const modalStyle = {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-xl)',
    padding: 'var(--spacing-2xl)',
    maxWidth: '720px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    animation: 'slideUp 300ms ease-out',
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    zIndex: 100001,
  };

  const headerStyle = {
    marginBottom: 'var(--spacing-xl)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
  };

  const headerIconStyle = {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: 'linear-gradient(135deg, rgba(91,163,200,0.16), rgba(46,125,158,0.12))',
    display: 'inline-block',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: 'var(--neutral-50)',
  };

  const contentStyle = {
    marginBottom: 'var(--spacing-xl)',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-md)',
    backgroundColor: 'var(--neutral-100)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--neutral-200)',
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--neutral-200)',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  };

  const valueStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--primary-color)',
  };

  const dagStatusStyle = {
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid',
    textAlign: 'center',
    marginBottom: 'var(--spacing-lg)',
  };

  const dagValidStyle = {
    ...dagStatusStyle,
    borderColor: 'var(--success-color)',
    backgroundColor: 'var(--success-bg)',
  };

  const dagInvalidStyle = {
    ...dagStatusStyle,
    borderColor: 'var(--error-color)',
    backgroundColor: 'var(--error-bg)',
  };

  const dagTextStyle = {
    fontSize: '14px',
    fontWeight: '600',
    margin: 0,
  };

  const dagValidText = {
    ...dagTextStyle,
    color: 'var(--success-color)',
  };

  const dagInvalidText = {
    ...dagTextStyle,
    color: 'var(--error-color)',
  };

  const footerStyle = {
    display: 'flex',
    gap: 'var(--spacing-md)',
    justifyContent: 'flex-end',
  };

  const buttonStyle = {
    padding: 'var(--spacing-md) var(--spacing-xl)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all var(--transition-normal)',
  };

  const closeButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
  };

  const closeButtonHoverStyle = {
    ...closeButtonStyle,
    backgroundColor: 'var(--primary-dark)',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
    transform: 'translateY(-2px)',
  };

  const errorMessageStyle = {
    padding: 'var(--spacing-lg)',
    backgroundColor: 'var(--error-bg)',
    border: '1px solid var(--error-color)',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--error-color)',
    fontSize: '13px',
    lineHeight: '1.5',
  };

  const loadingStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-2xl)',
  };

  const spinnerStyle = {
    border: '3px solid var(--neutral-200)',
    borderTop: '3px solid var(--primary-color)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    marginBottom: 'var(--spacing-lg)',
  };

  const loadingTextStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--neutral-500)',
  };

  const modal = (
    <div style={overlayStyle} onClick={onClose}>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Loading State */}
        {isLoading && (
          <div style={loadingStyle}>
            <div style={spinnerStyle}></div>
            <p style={loadingTextStyle}>Analyzing pipeline...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <>
            <div style={headerStyle}>
              <div style={headerIconStyle} />
              <h2 style={titleStyle}>Analysis Failed</h2>
            </div>
            <div style={contentStyle}>
              <div style={errorMessageStyle}>
                <strong>Error:</strong> {error}
              </div>
            </div>
            <div style={footerStyle}>
              <button
                style={isCloseHovered ? closeButtonHoverStyle : closeButtonStyle}
                onMouseEnter={() => setIsCloseHovered(true)}
                onMouseLeave={() => setIsCloseHovered(false)}
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </>
        )}

        {/* Success State */}
        {!isLoading && !error && result && (
          <>
            <div style={headerStyle}>
              <div style={headerIconStyle} />
              <h2 style={titleStyle}>Pipeline Analysis</h2>
            </div>

            <div style={contentStyle}>
              {/* Node Count */}
              <div style={rowStyle}>
                <span style={labelStyle}>Nodes</span>
                <span style={valueStyle}>{result.num_nodes}</span>
              </div>

              {/* Edge Count */}
              <div style={rowStyle}>
                <span style={labelStyle}>Edges</span>
                <span style={valueStyle}>{result.num_edges}</span>
              </div>

              {/* DAG Status */}
              <div style={result.is_dag ? dagValidStyle : dagInvalidStyle}>
                <p style={result.is_dag ? dagValidText : dagInvalidText}>
                  {result.is_dag ? 'Valid DAG' : 'Contains Cycles'}
                </p>
                <p
                  style={{
                    ...dagTextStyle,
                    fontSize: '12px',
                    color: result.is_dag ? 'var(--success-color)' : 'var(--error-color)',
                    marginTop: 'var(--spacing-xs)',
                    opacity: 0.8,
                  }}
                >
                  {result.is_dag
                    ? 'This is a valid directed acyclic graph'
                    : 'This graph contains cycles and cannot be executed'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};
