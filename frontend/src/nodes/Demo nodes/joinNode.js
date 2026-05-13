import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { getNodeConfig } from '../nodeConfig';

export const JoinNode = ({ id, data }) => {
  const config = getNodeConfig('join');
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
      type="join"
      config={{
        ...config,
        onFieldChange: handleFieldChange,
      }}
    />
  );
};
