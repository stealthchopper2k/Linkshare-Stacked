import { Tree } from "@/ts/interfaces/tree";

const node = [
  {
    id: "0",
    type: "custom",
    position: {
      x: 250,
      y: 50,
    },
    data: {
      url: "https://www.computing.co.uk/",
      label: "computers",
      favicon: "",
    },
  },
  {
    id: "1",
    type: "custom",
    position: {
      x: 50,
      y: 150,
    },
    data: {
      url: "https://www.computing.co.uk/opinion/4119602/tried-chatgpt-vulnerability-fixes-most-flaws-complex-generative-ai",
      label: "chatgpt",
      favicon: "",
    },
  },
  {
    id: "2",
    type: "custom",
    position: {
      x: 450,
      y: 150,
    },
    data: {
      url: "https://www.computing.co.uk/category/big-data-and-analytics",
      label: "data analytics",
      favicon: "",
    },
  },
  {
    id: "3",
    type: "custom",
    position: {
      x: 450,
      y: 150,
    },
    data: {
      url: "https://www.computing.co.uk/category/big-data-and-analytics",
      label: "data analytics",
      favicon: "",
    },
  },
];

export const initialEdges = [
  { id: "e0-2", source: "0", target: "1", animated: true },
  { id: "e1-3", source: "0", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

export const treeMock: Tree = {
  node_array: [...node],
  type: "inorder",
  initialEdges: [...initialEdges],
};
