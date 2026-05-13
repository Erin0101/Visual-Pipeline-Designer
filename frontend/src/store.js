import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) newIDs[type] = 0;
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => set({ nodes: [...get().nodes, node] }),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
  onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
  onConnect: (connection) => set({ edges: addEdge({ ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow } }, get().edges) }),
  updateNodeField: (nodeId, fieldName, fieldValue) => set({ nodes: get().nodes.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, [fieldName]: fieldValue } } : n)) }),
  updateNodeData: (nodeId, dataUpdate) => set({ nodes: get().nodes.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, ...dataUpdate } } : n)) }),
  updateNodeSize: (nodeId, sizeUpdate) => set({ nodes: get().nodes.map((n) => (n.id === nodeId ? { ...n, width: sizeUpdate.width || n.width, height: sizeUpdate.height || n.height } : n)) }),
  
  // savedFiles helpers 
  savedFiles: [],
  savePipeline: (name) => {
    const id = `saved-${Date.now()}`;
    const payload = { id, name: name || `Pipeline ${new Date().toLocaleString()}`, timestamp: Date.now(), nodes: get().nodes, edges: get().edges };
    const newSaved = [payload, ...get().savedFiles];
    set({ savedFiles: newSaved });
    try { if (typeof window !== 'undefined') localStorage.setItem('savedPipelines', JSON.stringify(newSaved)); } catch (e) {}
    return payload;
  },
  loadSavedFiles: () => {
    try {
      if (typeof window === 'undefined') return set({ savedFiles: [] });
      const raw = localStorage.getItem('savedPipelines');
      const parsed = raw ? JSON.parse(raw) : [];
      set({ savedFiles: parsed });
    } catch (e) { set({ savedFiles: [] }); }
  },
  loadPipeline: (id) => {
    const file = get().savedFiles.find((f) => f.id === id);
    if (!file) return false;
    set({ nodes: file.nodes || [], edges: file.edges || [] });
    return true;
  },
  deleteSavedFile: (id) => {
    const remaining = get().savedFiles.filter((f) => f.id !== id);
    set({ savedFiles: remaining });
    try { if (typeof window !== 'undefined') localStorage.setItem('savedPipelines', JSON.stringify(remaining)); } catch (e) {}
  },
}));

export default useStore;
