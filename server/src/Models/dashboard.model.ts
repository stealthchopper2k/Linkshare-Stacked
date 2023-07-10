import { Schema, model, Types } from "mongoose";
import { UserDashboard } from "../utils/interface/dashboard";
import logger from "../logger";
import { User } from "../utils/interface/user";

export const userDashboard: Schema = new Schema<UserDashboard>({
  boxes: [{ type: Object, required: true }],
  settings: { type: Object, required: true },
  user_id: { type: String, required: true },
});

export const UserDashboardModel = model<UserDashboard>(
  "userDashboard",
  userDashboard
);

export async function getUserDashboard({ id }: User) {
  try {
    const userDashboard = await UserDashboardModel.findOne({ user_id: id });
    return userDashboard;
  } catch (e) {
    logger.error(`Error during getUserDashboard ${e}`);
    throw new Error(`Error getting user dashboard: ${e}`);
  }
}

export async function updateSettings(
  { id }: User,
  { settings }: UserDashboard
) {
  try {
    const user = await UserDashboardModel.findOneAndUpdate(
      {
        user_id: id,
      },
      settings,
      {
        new: true,
      }
    );
    return user;
  } catch (e) {
    logger.error(`Error getting user: ${e}`);
    throw new Error(`Could not find user ID: ${id}`);
  }
}

export async function updateDashboard({ id }: User, dashboard: UserDashboard) {
  try {
    const update = await UserDashboardModel.findOneAndUpdate(
      { user_id: id },
      dashboard,
      { new: true }
    );
    return update;
  } catch (e) {
    logger.error(`Error during updateDashboard ${e}`);
    throw new Error(`Error updating user dashboard: ${e}`);
  }
}
