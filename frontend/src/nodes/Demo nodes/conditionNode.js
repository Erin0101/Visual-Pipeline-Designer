import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { getNodeConfig } from '../nodeConfig';

export const ConditionNode = ({ id, data }) => {
  const config = getNodeConfig('condition');
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
      type="condition"
      config={{
        ...config,
        onFieldChange: handleFieldChange,
      }}
    />
  );
};
