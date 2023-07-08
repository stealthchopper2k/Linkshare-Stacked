export type Data = {
  name: string;
  parent_id: number;
  url: string;
};

export interface Node {
  id: number;
  position: {
    x: number;
    y: number;
  };
  data: Data;
}

export interface Tree {
  node_array: Array<Node>;
}
