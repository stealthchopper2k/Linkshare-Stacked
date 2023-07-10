import { Types, Document } from "mongoose";

export type Data = {
  name: string;
  parent_id: number;
  url: string;
};

export interface TreeNode {
  id: number;
  position: {
    x: number;
    y: number;
  };
  data: Data;
}

export interface Tree extends Document {
  tree_id: number;
  user_id: number;
  node_array: Types.Array<TreeNode>;
  style: string;
  pub: boolean;
}
