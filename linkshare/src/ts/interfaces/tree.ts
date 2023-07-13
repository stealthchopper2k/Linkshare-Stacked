export interface Analytics {
  id: number;
  screen_portion: number;
  time_spent: number;
  clicks: number;
}

export interface Data {
  url: string;
  label: string;
  favicon: string;
  screen_analytics: Analytics[];
}

export interface Node {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: Data;
}

type order = "inorder" | "preorder" | "postorder";

export interface Tree {
  node_array: Array<Node>;
  type: order;
  initialEdges: Edge[];
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}
