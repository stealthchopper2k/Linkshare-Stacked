import { Schema, model, Types } from "mongoose";
import { User } from "../utils/interface/user";
import { Tree, TreeNode } from "../utils/interface/tree";
import logger from "../logger";

const treeSchema = new Schema<Tree>({
  node_array: [{ type: Object, required: true }],
  style: { type: String, required: true },
});

const TreeModel = model<Tree>("Tree", treeSchema);

// user creates a rabbithole, on visit the tree is created
export async function createUserTree<User, Tree>(
  user_id: number,
  tree: number
) {
  if (!user_id) {
    throw new Error("User ID is required");
  }

  const res = await TreeModel.create(tree);

  if (res.errors) {
    logger.error(res.errors);

    return { error: res.errors };
  }

  return res;
}

// return tree with permissions
export async function getUserTree<User, Tree>(
  user_id: number,
  tree_id: number
) {
  const userTree = await TreeModel.findOne({ user_id });

  if (!userTree) {
    logger.error(`Could not find tree with ID ${user_id}`);
    return {
      error: `Could not find tree with ID ${user_id}`,
    };
  }

  // user is the owner
  if (userTree.user_id === user_id) {
    return { tree: userTree, permission: "owner" };
  }

  // user is allowed to view
  else if (userTree?.pub === true) {
    return { tree: userTree, permission: "view" };
  }

  // user is not allowed to view
  else if (userTree?.pub === false) {
    return { error: "This tree is private" };
  }

  // something went wrong, return an error
  else {
    return { error: "Could not find tree" };
  }
}

export async function editUserTree(tree: Tree, user_id: User) {
  if (!user_id) {
    throw new Error("User ID is required");
  }

  const res = await TreeModel.updateOne({ user_id }, { $set: { tree } });

  if (res.acknowledged === false) {
    logger.error(`Could not update tree,${tree.tree_id} by User: ${user_id}`);
    return { error: "Could not update tree" };
  }

  return res;
}
