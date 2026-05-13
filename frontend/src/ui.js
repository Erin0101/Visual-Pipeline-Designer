import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { LLMNode } from './nodes/llmNode';
import { FilterNode } from './nodes/Demo nodes/filterNode';
import { JoinNode } from './nodes/Demo nodes/joinNode';
import { APICallNode } from './nodes/Demo nodes/apiCallNode';
import { TransformNode } from './nodes/Demo nodes/transformNode';
import { ConditionNode } from './nodes/Demo nodes/conditionNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  // Main Nodes
  customInput: InputNode,
  customOutput: OutputNode,
  text: TextNode,
  llm: LLMNode,
  
  // Demo Nodes
  filter: FilterNode,
  join: JoinNode,
  apiCall: APICallNode,
  transform: TransformNode,
  condition: ConditionNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const canvasStyle = {
      width: '100%',
      height: '100%',
      flex: 1,
      position: 'relative',
    };

    return (
      <div ref={reactFlowWrapper} style={canvasStyle}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          defaultEdgeOptions={{
            type: 'smoothstep',
            style: { strokeLinecap: 'round', strokeWidth: 2 },
          }}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background
            color="rgba(91, 163, 200, 0.2)"
            gap={gridSize}
            style={{ opacity: 0.3 }}
          />
          { /* Custom  minimap for better visibility */ }
          <MiniMap
            style={{
              backgroundColor: 'rgba(30, 58, 95, 0.6)',
              borderRadius: '8px',
              border: '1.5px solid rgba(91, 163, 200, 0.3)',
              boxShadow: '0 8px 24px rgba(46, 125, 158, 0.2)',
              backdropFilter: 'blur(12px)',
              position: 'absolute',
              bottom: 12,
              right: 12,
              zIndex: 50,
              width: 160,
              height: 96,
              overflow: 'hidden',
            }}
            nodeStrokeWidth={2}
            zoom={0.8}
          />
        </ReactFlow>
      </div>
    );
}
