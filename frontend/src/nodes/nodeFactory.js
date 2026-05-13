import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { TextNode } from './textNode';
import { LLMNode } from './llmNode';
import { FilterNode } from './Demo nodes/filterNode';
import { JoinNode } from './Demo nodes/joinNode';
import { APICallNode } from './Demo nodes/apiCallNode';
import { TransformNode } from './Demo nodes/transformNode';
import { ConditionNode } from './Demo nodes/conditionNode';
import { NODE_CONFIGS } from './nodeConfig';

const NODE_COMPONENTS = {
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: LLMNode,

  filter: FilterNode,
  join: JoinNode,
  apiCall: APICallNode,
  transform: TransformNode,
  condition: ConditionNode,
};

/**
 * Get the component for a node type
 * @param {string} nodeType - Type of node (input, output, text, llm)
 * @returns {React.Component} The node component
 */
export const getNodeComponent = (nodeType) => {
  return NODE_COMPONENTS[nodeType] || null;
};

/**
 * @param {string} nodeType - Name of the node type
 * @param {React.Component} component - The node component
 * @param {object} config - Node configuration (see nodeConfig.js)
 */
export const registerNodeType = (nodeType, component, config) => {
  NODE_COMPONENTS[nodeType] = component;
  NODE_CONFIGS[nodeType] = config;
};

/**
 * @param {string} nodeType - Type of node to create (input, output, text, llm)
 * @param {string} nodeId - Unique ID for the node
 * @param {object} position - Node position {x, y}
 * @param {object} customData - Custom data to override defaults
 * @returns {object} Node object ready for reactflow
 */
export const createNode = (
  nodeType,
  nodeId,
  position = { x: 0, y: 0 },
  customData = {}
) => {
  const config = NODE_CONFIGS[nodeType];
  let defaultData = {};
  if (config?.fields) {
    config.fields.forEach((field) => {
      defaultData[field.name] = field.defaultValue || '';
    });
  }

  return {
    id: nodeId,
    type: nodeType,
    position,
    data: {
      ...defaultData,
      ...customData,
    },
  };
};

/**
 * Get all available node types
 * @returns {array} 
 */
export const getAvailableNodeTypes = () => {
  return Object.keys(NODE_COMPONENTS);
};

/**
 * Validate if a node type exists
 * @param {string} nodeType - Type to check
 * @returns {boolean} True if node type is registered
 */
export const isValidNodeType = (nodeType) => {
  return NODE_COMPONENTS.hasOwnProperty(nodeType);
};

/**
 * Clone a node with a new ID
 * @param {object} node - Node object to clone
 * @param {string} newNodeId - New unique ID for the cloned node
 * @param {object} positionOffset - Position offset {x, y}
 * @returns {object} Cloned node object
 */
export const cloneNode = (
  node,
  newNodeId,
  positionOffset = { x: 20, y: 20 }
) => {
  return {
    ...node,
    id: newNodeId,
    position: {
      x: node.position.x + positionOffset.x,
      y: node.position.y + positionOffset.y,
    },
    data: {
      ...node.data,
    },
  };
};
