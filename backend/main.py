from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    source: str
    target: str
    id: str

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def has_cycle(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Detect if the graph has a cycle using DFS.
    A DAG (Directed Acyclic Graph) has no cycles.
    Returns True if cycle exists, False if it's a valid DAG.
    """
    node_ids = {node.id for node in nodes}
    graph = defaultdict(list)
    in_degree = defaultdict(int)
    
    for node in nodes:
        if node.id not in in_degree:
            in_degree[node.id] = 0
    
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            graph[edge.source].append(edge.target)
            in_degree[edge.target] += 1
    
    queue = deque()
    
    for node_id in node_ids:
        if in_degree[node_id] == 0:
            queue.append(node_id)
    
    processed = 0
    
    while queue:
        node = queue.popleft()
        processed += 1
        
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, no cycle exists
    # If processed < total nodes, there's a cycle
    return processed != len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/analyze')
def analyze_pipeline(pipeline: PipelineRequest):
    """
    Analyze a pipeline for:
    - Number of nodes
    - Number of edges
    - Whether it's a valid DAG (no cycles)
    """
    try:
        nodes = pipeline.nodes
        edges = pipeline.edges
        
        num_nodes = len(nodes)
        num_edges = len(edges)
        # Basic validation
        if num_nodes == 0:
            raise HTTPException(status_code=400, detail="Pipeline contains no nodes")

        # If there are nodes but no edges, that's likely a user error
        if num_nodes > 0 and num_edges == 0:
            raise HTTPException(status_code=400, detail="No connections found — connect nodes before executing")

        # Check if it's a DAG (DAG = no cycles)
        has_cycle_result = has_cycle(nodes, edges)
        is_dag = not has_cycle_result

        if not is_dag:
            raise HTTPException(status_code=400, detail="Pipeline contains a cycle (not a DAG)")

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag,
            "status": "success"
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
