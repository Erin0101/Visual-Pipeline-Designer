import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

export { InputNode } from './nodes/inputNode';
export { OutputNode } from './nodes/outputNode';
export { TextNode } from './nodes/textNode';
export { LLMNode } from './nodes/llmNode';
export { FilterNode } from './nodes/Demo nodes/filterNode';
export { JoinNode } from './nodes/Demo nodes/joinNode';
export { APICallNode } from './nodes/Demo nodes/apiCallNode';
export { TransformNode } from './nodes/Demo nodes/transformNode';
export { ConditionNode } from './nodes/Demo nodes/conditionNode';

export { BaseNode } from './nodes/BaseNode';
export { NODE_CONFIGS, getNodeConfig, registerNodeConfig } from './nodes/nodeConfig';

export {
  getNodeComponent,
  registerNodeType,
  createNode,
  getAvailableNodeTypes,
  isValidNodeType,
  cloneNode,
} from './nodes/nodeFactory';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
