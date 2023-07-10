import { User } from "../utils/interface/user";
import { UserDashboard } from "../utils/interface/dashboard";
import { Schema, model, startSession } from "mongoose";
import logger from "../logger";
import { UserDashboardModel } from "./dashboard.model";

const userSchema: Schema = new Schema<User>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  metadata: { type: Object, required: true },
});

const User = model<User>("User", userSchema);

// create user and assign dashboard relative to ID
export async function createUser(
  id: string,
  dashboard: UserDashboard
): Promise<User | { error: string }> {
  // Start the session
  const session = await startSession();

  // Start a transaction
  session.startTransaction();

  try {
    // Create the user
    const user = new User({ id });

    await user.save({ session });

    // Add the user ID to the dashboard
    dashboard.user_id = user._id;

    // Create the user dashboard
    const userDashboard = new UserDashboardModel(dashboard);

    await userDashboard.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return user as User; //only returns user, dashboard is initiated in client side
  } catch (e) {
    await session.abortTransaction();
    session.endSession();

    logger.error(
      `Error during createUser transaction, aborting: ${e} session: ${session}`
    );

    throw new Error("Could not create user");
  }
}

export async function getUser({ id }: User) {
  try {
    const user = (await User.findOne({ id })) as User;
    return user;
  } catch (e) {
    logger.error(`Error getting user: ${e}`);
    throw new Error(`Could not find user ID: ${id}`);
  }
}

export async function updateUser({ id }: User, user: User) {
  try {
    const newUser = User.findOneAndUpdate({ user_id: id }, user, { new: true }); // update and return
    return newUser;
  } catch (e) {
    logger.error(`Error updating user of ID: ${user.id}, Error:${e} `);
    throw new Error(`Error updating user`);
  }
}
