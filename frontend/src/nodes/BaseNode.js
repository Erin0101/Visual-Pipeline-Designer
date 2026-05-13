
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { NodeEditor } from './NodeEditor';

/**
 * Reduces code duplication and makes it easy to create new nodes.
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data (passed from reactflow)
 * @param {string} type - Node type (determines configuration)
 * @param {object} config - Node configuration (handles, fields, styling)
 */
export const BaseNode = ({ id, data, type, config }) => {
  const {
    title = 'Node',
    description = '',
    width = 200,
    height = 80,
    handles = [],
    fields = [],
    onFieldChange = () => {},
  } = config || {};

  const accentMap = {
    input: '#7EC8E3',
    text: '#5BA3C8',
    llm: '#7EC8E3',
    output: '#5BA3C8',
    apiCall: '#4CAFC8',
    condition: '#2E7D9E',
    filter: '#5BA3C8',
    join: '#7EC8E3',
    transform: '#2E7D9E',
  };
  const accent = accentMap[type] || accentMap.text;

  const nodeStyle = {
    width,
    height,
    border: `1.5px solid var(--frost-border)`,
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-md)',
    background: 'var(--frost-bg)',
    backdropFilter: 'blur(10px) saturate(120%)',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '12px',
    boxShadow: 'var(--frost-shadow)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)',
    transition: 'all var(--transition-normal)',
    overflow: 'hidden',
  };

  const titleStyle = {
    fontWeight: '700',
    marginBottom: '4px',
    fontSize: '15px',
    color: accent,
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
  };

  const fieldContainerStyle = {
    fontSize: '12px',
    marginBottom: '2px',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xs)',
    overflowY: 'auto',
    maxHeight: 'calc(100% - 72px)',
    paddingRight: '6px',
  };

  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '4px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  };

  const inputStyle = {
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    fontSize: '13px',
    marginTop: '2px',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'inherit',
    transition: 'all var(--transition-normal)',
    backgroundColor: 'rgba(10,20,30,0.18)',
    color: 'var(--text-primary)',
    backdropFilter: 'blur(6px)',
  };

 
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const updateNodeData = useStore((s) => s.updateNodeData);

  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);

  return (
    <div className="frosted" style={nodeStyle}>
      {/* Title */}
      <div style={titleStyle}>
        <div style={{flex:1}}>{title}</div>
        <button
          onClick={openEditor}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.06)',
            color: 'var(--text-primary)',
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: 12,
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
      </div>

      {/* Description (if provided) */}
      {description && <div style={{ fontSize: '10px', marginBottom: '4px', color: '#666' }}>{description}</div>}

      {/* Input Handles */}
      {handles
        .filter((h) => h.type === 'target')
        .map((handle) => (
          <Handle
            key={handle.id}
            type="target"
            position={handle.position || Position.Left}
            id={handle.id}
            style={handle.style}
          />
        ))}

      {/* Dynamic Fields */}
      {fields.length > 0 && (
        <div style={fieldContainerStyle}>
          {fields.map((field) => (
            <label key={field.name} style={labelStyle}>
              {field.label}:
              {field.type === 'text' && (
                <input
                  type="text"
                  value={data[field.name] || field.defaultValue || ''}
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                  style={inputStyle}
                />
              )}
              {field.type === 'select' && (
                <select
                  value={data[field.name] || field.defaultValue || ''}
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                  style={inputStyle}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {field.type === 'textarea' && (
                <textarea
                  value={data[field.name] || field.defaultValue || ''}
                  onChange={(e) => onFieldChange(field.name, e.target.value)}
                  style={{ ...inputStyle, minHeight: '40px' }}
                />
              )}
            </label>
          ))}
        </div>
      )}

      {/* Output Handles */}
      {handles
        .filter((h) => h.type === 'source')
        .map((handle) => (
          <Handle
            key={handle.id}
            type="source"
            position={handle.position || Position.Right}
            id={handle.id}
            style={handle.style}
          />
        ))}
      {/* Editor Portal */}
      {isEditorOpen && (
        <NodeEditor
          isOpen={isEditorOpen}
          nodeId={id}
          nodeTitle={title}
          fields={fields}
          data={data}
          onClose={closeEditor}
          onSave={(updates) => {
            if (updateNodeData) updateNodeData(id, updates);
            closeEditor();
          }}
        />
      )}
    </div>
  );
};
