"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeTypes,
} from "reactflow";
import { Tree } from "@/ts/interfaces/tree";
import CustomNode from "./CustomNode";
import "reactflow/dist/style.css";
import "reactflow/dist/base.css";

const nodeTypes = {
  custom: CustomNode,
};

const RabbitTree: React.FC<Tree> = ({ node_array, type, initialEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(node_array);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      className="bg-teal-50"
    >
      <Controls />
      {/* <Background variant={BackgroundVariant.} gap={12} size={1} /> */}
      <MiniMap />
    </ReactFlow>
  );
};

export default RabbitTree;
