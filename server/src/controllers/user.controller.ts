import { User } from "../utils/interface/user";
import { Schema, model } from "mongoose";
import logger from "../logger";

const userSchema = new Schema<User>({
  id: { type: Number, required: true },
  username: { type: String, required: true },
  metadata: { type: Object, required: true },
});

const User = model<User>("User", userSchema);

export async function createUser(user: User) {
  if (!user.id) {
    throw new Error("User ID is required");
  }

  const res = await User.create(user, (err: any) => {
    if (err) {
      throw new Error(err);
    }
  });

  return res;
}

export async function getUserDashboard(id: User) {
  if (!id) {
    throw new Error("User ID is required");
  }

  try {
    const userDashbaord = await User.findOne({ id });
    return userDashbaord;
  } catch (error) {
    logger.error(error);
    throw new Error(`Could not find user with ID ${id}`);
  }
}

// export async function
