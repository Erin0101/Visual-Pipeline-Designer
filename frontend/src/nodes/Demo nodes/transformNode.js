import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { getNodeConfig } from '../nodeConfig';

export const TransformNode = ({ id, data }) => {
  const config = getNodeConfig('transform');
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
      type="transform"
      config={{
        ...config,
        onFieldChange: handleFieldChange,
      }}
    />
  );
};
