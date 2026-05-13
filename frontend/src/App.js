import React, { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import GridBackground from './GridBackground';
import SavedFiles from './SavedFiles';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteTab, setPaletteTab] = useState('nodes');
  const [hoverSave, setHoverSave] = useState(false);
  const [hoverHamburger, setHoverHamburger] = useState(false);
  const [hoverNodes, setHoverNodes] = useState(false);
  const [hoverConnections, setHoverConnections] = useState(false);
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const container = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  };

  const header = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: 'transparent',
    zIndex: 30,
    position: 'relative',
  };

  const title = { 
    color: 'var(--primary-light)', 
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '2',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    height: '44px',
  };

  const buttonStyle = {
    padding: '12px 28px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
    color: 'var(--text-primary)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: "'Poppins', sans-serif",
    cursor: 'pointer',
    boxShadow: 'var(--frost-shadow)',
    transition: 'all var(--transition-normal)',
    letterSpacing: '0.4px',
    backdropFilter: 'blur(6px)',
    lineHeight: '1',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const hamburgerStyle = {
    ...buttonStyle,
    padding: '12px',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  };

  const counterStyle = {
    padding: '12px 28px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
    color: 'var(--text-primary)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    fontWeight: '600',
    fontSize: '14px',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: 'var(--frost-shadow)',
    transition: 'all var(--transition-normal)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '0.4px',
    backdropFilter: 'blur(6px)',
    whiteSpace: 'nowrap',
    height: '44px',
  };

  const getButtonHoverStyle = (isHovered) => ({
    ...buttonStyle,
    background: isHovered
      ? 'linear-gradient(180deg, var(--primary-light) 0%, var(--primary-color) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
    boxShadow: isHovered
      ? '0 8px 32px rgba(10,25,40,0.45), 0 8px 25px rgba(46,125,158,0.45)'
      : 'var(--frost-shadow)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
  });

  const getHamburgerHoverStyle = (isHovered) => ({
    ...hamburgerStyle,
    background: isHovered
      ? 'linear-gradient(180deg, var(--primary-light) 0%, var(--primary-color) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
    boxShadow: isHovered
      ? '0 8px 32px rgba(10,25,40,0.45), 0 8px 25px rgba(46,125,158,0.45)'
      : 'var(--frost-shadow)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
  });

  const getCounterHoverStyle = (isHovered) => ({
    ...counterStyle,
    background: isHovered
      ? 'linear-gradient(180deg, var(--primary-light) 0%, var(--primary-color) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
    boxShadow: isHovered
      ? '0 8px 32px rgba(10,25,40,0.45), 0 8px 25px rgba(46,125,158,0.45)'
      : 'var(--frost-shadow)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
  });

  return (
    <div style={container}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <GridBackground />
      </div>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <header style={header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <button
              style={getHamburgerHoverStyle(hoverHamburger)}
              onMouseEnter={() => setHoverHamburger(true)}
              onMouseLeave={() => setHoverHamburger(false)}
                onClick={() => {
                  setPaletteOpen((s) => !s);
                  setPaletteTab('nodes');
                }}
              aria-label="Toggle palette"
            >
              ☰
            </button>
            <div style={title}>Visual Pipeline Designer</div>
            <button 
              style={getButtonHoverStyle(hoverSave)}
              onMouseEnter={() => setHoverSave(true)}
              onMouseLeave={() => setHoverSave(false)}
              onClick={() => {
                const name = window.prompt('Save pipeline as:', `Pipeline ${new Date().toLocaleString()}`);
                if (name) {
                  useStore.getState().savePipeline(name);

                  useStore.getState().loadSavedFiles && useStore.getState().loadSavedFiles();
                }
              }}
            >
              Save
            </button>
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
            <div 
              style={getCounterHoverStyle(hoverNodes)}
              onMouseEnter={() => setHoverNodes(true)}
              onMouseLeave={() => setHoverNodes(false)}
            >
              Nodes: {nodes.length}
            </div>
            <div 
              style={getCounterHoverStyle(hoverConnections)}
              onMouseEnter={() => setHoverConnections(true)}
              onMouseLeave={() => setHoverConnections(false)}
            >
              Connections: {edges.length}
            </div>
            <SubmitButton />
          </div>
        </header>

        <div style={{ display: 'flex', flex: 1, minHeight: 0, position: 'relative' }}>
          <aside className={`left-palette ${paletteOpen ? 'open' : 'closed'}`}>
            <div style={{ padding: 8 }}>
              <div style={{ display: 'flex', gap: 8, padding: 8 }}>
                <button onClick={() => setPaletteTab('nodes')} style={{ padding: '8px 12px', borderRadius: 8, background: paletteTab === 'nodes' ? 'var(--primary-color)' : 'transparent', color: paletteTab === 'nodes' ? '#fff' : 'var(--neutral-100)', border: 'none', cursor: 'pointer' }}>Nodes</button>
                <button onClick={() => setPaletteTab('saved')} style={{ padding: '8px 12px', borderRadius: 8, background: paletteTab === 'saved' ? 'var(--primary-color)' : 'transparent', color: paletteTab === 'saved' ? '#fff' : 'var(--neutral-100)', border: 'none', cursor: 'pointer' }}>Saved</button>
              </div>
              <div style={{ padding: 12 }}>
                {paletteTab === 'nodes' && (
                  <>
                    <div style={{ fontWeight: 800, color: 'var(--neutral-100)', marginBottom: 8 }}>Palette</div>
                    <PipelineToolbar />
                  </>
                )}

                {paletteTab === 'saved' && (
                  <SavedFiles onLoad={() => setPaletteOpen(false)} />
                )}
              </div>
            </div>
          </aside>

          <main style={{ flex: 1, minHeight: 0 }}>
            <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
              <PipelineUI />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
