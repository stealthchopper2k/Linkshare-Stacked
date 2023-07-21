import { Node } from "@/ts/interfaces/tree";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";

export const CustomNode = ({ data }: any) => {
  return (
    <div className="flex flex-col px-4 py-2 shadow-md bg-white border-2 border-stone-400">
      <div className="flex flex-row">
        <div className="ml-2">
          <div className="text-lg font-bold">{data.favicon}</div>
          <div className="text-gray-500">{data.label}</div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(CustomNode);
