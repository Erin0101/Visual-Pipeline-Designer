import React from 'react';
import { createPortal } from 'react-dom';

export const NodeEditor = ({ isOpen, nodeId, nodeTitle, fields = [], data = {}, onClose, onSave }) => {
  const [local, setLocal] = React.useState({ ...data });
  const [theme, setTheme] = React.useState('dark'); // local NodeEditor theme only

  React.useEffect(() => {
    setLocal({ ...data });
  }, [data]);

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme === 'light' ? 'rgba(10,12,14,0.18)' : 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 120000,
    backdropFilter: 'blur(4px)'
  };

  const modalStyle = {
    width: '720px',
    maxWidth: '96%',
    maxHeight: '86vh',
    overflowY: 'auto',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--frost-shadow)'
  };

  const labelStyle = {
    fontSize: 13,
    fontWeight: theme === 'light' ? 600 : 700,
    color: theme === 'light' ? '#0b1720' : '#ffffff',
    marginBottom: 6,
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 'var(--radius-md)',
    border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
    background: theme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.02)',
    color: theme === 'light' ? '#06202a' : '#ffffff',
    marginBottom: '12px',
    fontSize: 14,
    caretColor: 'var(--primary-color)'
  };

  const footerStyle = { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 };

  const save = () => {
    if (onSave) onSave(local);
  };

  return createPortal(
    <div style={overlayStyle} onClick={onClose}>
      {/** Apply theme-aware text color and weight to match user's request */}
      <div
        className="frosted"
        style={{
          ...modalStyle,
          color: theme === 'light' ? '#06202a' : '#ffffff',
          fontWeight: theme === 'light' ? 400 : 700,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18, color: theme === 'light' ? '#06202a' : '#ffffff', fontWeight: 700 }}>{nodeTitle}</h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ color: theme === 'light' ? '#3b4b52' : 'var(--neutral-300)', fontSize: 12 }}>ID: {nodeId}</div>
              <button
                onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
                style={{
                  padding: '6px 8px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.02)',
                  color: theme === 'light' ? '#333' : '#ffffff',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600
                }}
              >
                {theme === 'light' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

        <div>
          {fields.length === 0 && <div style={{ color: theme === 'light' ? '#55636b' : 'var(--neutral-400)', marginBottom: 8 }}>No editable fields.</div>}

          {fields.map((f) => (
            <div key={f.name} style={{ marginBottom: 8 }}>
              <div style={labelStyle}>{f.label || f.name}</div>
              {f.type === 'textarea' ? (
                <textarea
                  value={local[f.name] ?? ''}
                  onChange={(e) => setLocal({ ...local, [f.name]: e.target.value })}
                  style={{ ...inputStyle, minHeight: 120, background: theme === 'light' ? 'rgba(255,255,255,0.96)' : 'rgba(0,0,0,0.18)', color: theme === 'light' ? '#06202a' : 'var(--text-primary)' }}
                />
              ) : f.type === 'select' ? (
                <select
                  value={local[f.name] ?? ''}
                  onChange={(e) => setLocal({ ...local, [f.name]: e.target.value })}
                  style={{ ...inputStyle, background: theme === 'light' ? 'rgba(255,255,255,0.96)' : 'rgba(0,0,0,0.12)' }}
                >
                  {(f.options || []).map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  value={local[f.name] ?? ''}
                  onChange={(e) => setLocal({ ...local, [f.name]: e.target.value })}
                  style={inputStyle}
                />
              )}
            </div>
          ))}
        </div>

        <div style={footerStyle}>
          <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', background: 'transparent', color: 'var(--text-primary)' }}>Cancel</button>
          <button onClick={save} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: 'var(--primary-color)', color: '#fff', fontWeight: 700 }}>Save</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NodeEditor;
