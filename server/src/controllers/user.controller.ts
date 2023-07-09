import { User } from "../utils/interface/user";
import { UserDashboard } from "../utils/interface/dashboard";
import { Schema, model, startSession } from "mongoose";
import logger from "../logger";

const userSchema: Schema = new Schema<User>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  metadata: { type: Object, required: true },
});

const userDashboard: Schema = new Schema<UserDashboard>({
  boxes: [{ type: Object, required: true }],
  user_id: { type: String, required: true },
});

const User = model<User>("User", userSchema);

const UserDashboard = model<UserDashboard>("userDashboard", userDashboard);

// create user and assign dashboard relative to ID
export async function createUser(
  id: string,
  dashboard: UserDashboard
): Promise<User | { error: string }> {
  if (!id) {
    throw new Error("User ID is required");
  }

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
    const userDashboard = new UserDashboard(dashboard);

    await userDashboard.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return user as User;
  } catch (e) {
    await session.abortTransaction();
    session.endSession();

    logger.error(
      `Error during createUser transaction, aborting: ${e} session: ${session}`
    );
    throw new Error("Could not create user");
  }
}

export async function getUserDashboard(id: User) {
  if (!id) {
    throw new Error("User ID is required");
  }

  try {
    const userDashboard = await User.findOne({ id });
    return userDashboard;
  } catch (error) {
    logger.error(error);
    throw new Error(`Could not find user with ID ${id}`);
  }
}

// export async function
