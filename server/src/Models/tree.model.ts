import { Schema, model, Types } from "mongoose";
import { User } from "../utils/interface/user";
import { Tree, TreeNode } from "../utils/interface/tree";
import logger from "../logger";

const treeSchema = new Schema<Tree>({
  tree_id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  node_array: [{ type: Object, required: true }],
  style: { type: String, required: true },
  pub: { type: Boolean, required: true },
});

const TreeModel = model<Tree>("Tree", treeSchema);

// user creates a rabbithole, on visit the tree is created
export async function createUserTree({ user_id }: User, tree: Tree) {
  if (!user_id) {
    throw new Error("User ID is required when creating a tree");
  }

  try {
    const res = await TreeModel.create(tree);
    return res;
  } catch (e) {
    logger.error(`Error during createUserTree transaction: ${e}`);
    throw new Error(`Error creating user tree: ${e}`);
  }
}

// return tree with permissions
export async function getUserTree({ id }: User, { tree_id }: Tree) {
  try {
    const userTree = await TreeModel.findOne({ user_id: id });

    // user is the owner
    if (userTree?.user_id === id) {
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
  } catch (e) {
    throw new Error(`Error getting user tree: ${e}`);
  }
}

export async function editUserTree(tree: Tree, { id }: User) {
  try {
    const res = await TreeModel.updateOne({ user_id: id }, { $set: { tree } });
    return res;
  } catch (e) {
    logger.error(`Error during editUserTree transaction: ${e}`);
    throw new Error(`Error editing user tree: ${e}`);
  }
}

export async function deleteTree({ id }: User, { tree_id }: Tree) {
  try {
    const res = await TreeModel.deleteOne({ user_id: id, tree_id: tree_id });
    return res;
  } catch (e) {
    logger.error(`Error during editUserTree transaction: ${e}`);
    throw new Error(`Error editing user tree: ${e}`);
  }
}
