import React, { useState, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';
import { useStore } from '../store';

export const InputNode = ({ id, data }, ref) => {
  const config = getNodeConfig('input');
  
  const [nodeData, setNodeData] = useState(data || {});
  const updateNodeField = useStore((s) => s.updateNodeField);

  useEffect(() => {
    setNodeData(data || {});
  }, [data]);

  const handleFieldChange = (fieldName, value) => {
    setNodeData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    if (updateNodeField) updateNodeField(id, fieldName, value);
  };

  return (
    <BaseNode
      id={id}
      data={nodeData}
      type="input"
      config={{
        ...config,
        onFieldChange: handleFieldChange,
      }}
    />
  );
};
