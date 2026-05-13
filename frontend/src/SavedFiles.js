import React, { useEffect } from 'react';
import { useStore } from './store';

export default function SavedFiles({ onLoad }) {
  const savedFiles = useStore((s) => s.savedFiles);
  const loadSavedFiles = useStore((s) => s.loadSavedFiles);
  const loadPipeline = useStore((s) => s.loadPipeline);
  const deleteSavedFile = useStore((s) => s.deleteSavedFile);

  useEffect(() => {
    loadSavedFiles();
  }, [loadSavedFiles]);

  const handleLoad = (id) => {
    const ok = loadPipeline(id);
    if (ok && onLoad) onLoad();
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontWeight: 800, color: 'var(--neutral-100)', marginBottom: 8, padding: 12 }}>Saved Files</div>
      {savedFiles.length === 0 ? (
        <div style={{ color: 'var(--neutral-400)', padding: 12 }}>No saved pipelines yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12 }}>
          {savedFiles.map((f) => (
            <div key={f.id} style={{ padding: 10, borderRadius: 8, background: 'rgba(255,255,255,0.02)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ fontWeight: 700, color: 'var(--primary-light)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                <div style={{ fontSize: 12, color: 'var(--neutral-400)', marginTop: 6 }}>{new Date(f.timestamp).toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button onClick={() => handleLoad(f.id)} style={{ padding: '6px 10px', minWidth: 60, borderRadius: 8, border: 'none', background: 'var(--primary-color)', color: '#fff', cursor: 'pointer' }}>Load</button>
                <button onClick={() => { deleteSavedFile(f.id); }} style={{ padding: '6px 10px', minWidth: 60, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'var(--neutral-100)', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
