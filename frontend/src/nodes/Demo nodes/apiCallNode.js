import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { getNodeConfig } from '../nodeConfig';

export const APICallNode = ({ id, data }) => {
  const config = getNodeConfig('apiCall');
  const [nodeData, setNodeData] = useState(data || {});

  const handleFieldChange = (fieldName, value) => {
    setNodeData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <BaseNode
      id={id}
      data={nodeData}
      type="apiCall"
      config={{
        ...config,
        onFieldChange: handleFieldChange,
      }}
    />
  );
};
