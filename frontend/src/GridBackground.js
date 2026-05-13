export default function GridBackground() {
  const gridSize = 50;
  
  return (
    <svg style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="#333" strokeWidth="1" />
        </pattern>
      </defs>
      
      {/* Black background */}
      <rect width="100%" height="100%" fill="#000000" />
      
      {/* Grid pattern */}
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}
