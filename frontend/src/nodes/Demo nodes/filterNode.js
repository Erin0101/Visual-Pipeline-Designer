import React, { useState } from 'react';
import { BaseNode } from '../BaseNode';
import { getNodeConfig } from '../nodeConfig';

export const FilterNode = ({ id, data }) => {
  const config = getNodeConfig('filter');
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
      type="filter"
      config={{
        ...config,
        onFieldChange: handleFieldChange,
      }}
    />
  );
};
