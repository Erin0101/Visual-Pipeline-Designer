import { Position } from 'reactflow';

export const NODE_CONFIGS = {
  input: {
    title: 'Input',
    description: 'System input point',
    width: 200,
    height: 100,
    handles: [
      {
        id: 'value',
        type: 'source',
        position: Position.Right,
      },
    ],
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'input_',
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: ['Text', 'File'],
      },
    ],
  },

  output: {
    title: 'Output',
    description: 'System output point',
    width: 200,
    height: 100,
    handles: [
      {
        id: 'value',
        type: 'target',
        position: Position.Left,
      },
    ],
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'output_',
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: ['Text', 'Image'],
      },
    ],
  },

  text: {
    title: 'Text Processor',
    description: 'Text with smart variables',
    width: 280,
    height: 120,
    handles: [
      {
        id: 'output',
        type: 'source',
        position: Position.Right,
      },

    ],
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: '{{input}}',
      },
    ],
    isAdvanced: true,
  },

  llm: {
    title: 'LLM',
    description: 'Large Language Model',
    width: 200,
    height: 120,
    handles: [
      {
        id: 'system',
        type: 'target',
        position: Position.Left,
        style: { top: '33%' },
      },
      {
        id: 'prompt',
        type: 'target',
        position: Position.Left,
        style: { top: '66%' },
      },
      {
        id: 'response',
        type: 'source',
        position: Position.Right,
      },
    ],
    fields: [],
  },

  filter: {
    title: 'Filter',
    description: 'Filter data based on conditions',
    width: 220,
    height: 110,
    handles: [
      {
        id: 'data',
        type: 'target',
        position: Position.Left,
      },
      {
        id: 'pass',
        type: 'source',
        position: Position.Right,
        style: { top: '33%' },
      },
      {
        id: 'fail',
        type: 'source',
        position: Position.Right,
        style: { top: '66%' },
      },
    ],
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'text',
        defaultValue: 'value > 0',
      },
    ],
  },

  join: {
    title: 'Join',
    description: 'Merge multiple data sources',
    width: 220,
    height: 120,
    handles: [
      {
        id: 'left',
        type: 'target',
        position: Position.Left,
        style: { top: '33%' },
      },
      {
        id: 'right',
        type: 'target',
        position: Position.Left,
        style: { top: '66%' },
      },
      {
        id: 'result',
        type: 'source',
        position: Position.Right,
      },
    ],
    fields: [
      {
        name: 'joinType',
        label: 'Join Type',
        type: 'select',
        defaultValue: 'inner',
        options: ['inner', 'left', 'right', 'full'],
      },
    ],
  },

  apiCall: {
    title: 'API Call',
    description: 'Make HTTP requests',
    width: 240,
    height: 130,
    handles: [
      {
        id: 'input',
        type: 'target',
        position: Position.Left,
      },
      {
        id: 'response',
        type: 'source',
        position: Position.Right,
      },
    ],
    fields: [
      {
        name: 'endpoint',
        label: 'Endpoint URL',
        type: 'text',
        defaultValue: 'https://api.example.com',
      },
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    ],
  },

  transform: {
    title: 'Transform',
    description: 'Transform data format',
    width: 220,
    height: 110,
    handles: [
      {
        id: 'input',
        type: 'target',
        position: Position.Left,
      },
      {
        id: 'output',
        type: 'source',
        position: Position.Right,
      },
    ],
    fields: [
      {
        name: 'format',
        label: 'Target Format',
        type: 'select',
        defaultValue: 'JSON',
        options: ['JSON', 'CSV', 'XML', 'YAML'],
      },
    ],
  },

  condition: {
    title: 'Condition',
    description: 'Branch execution logic',
    width: 240,
    height: 130,
    handles: [
      {
        id: 'input',
        type: 'target',
        position: Position.Left,
      },
      {
        id: 'true',
        type: 'source',
        position: Position.Right,
        style: { top: '33%' },
      },
      {
        id: 'false',
        type: 'source',
        position: Position.Right,
        style: { top: '66%' },
      },
    ],
    fields: [
      {
        name: 'expression',
        label: 'Expression',
        type: 'textarea',
        defaultValue: 'value == true',
      },
    ],
  },
};

/**
 * Get configuration for a node type
 * @param {string} nodeType - Type of node (input, output, text, llm)
 * @returns {object} Node configuration object
 */
export const getNodeConfig = (nodeType) => {
  return NODE_CONFIGS[nodeType] || NODE_CONFIGS.text;
};

/**
 * Create a new node type configuration
 * @param {string} nodeType - Name of the new node type
 * @param {object} config - Configuration object
 */
export const registerNodeConfig = (nodeType, config) => {
  NODE_CONFIGS[nodeType] = config;
};
