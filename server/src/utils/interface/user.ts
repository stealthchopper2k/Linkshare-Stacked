import { Document } from "mongoose";

export interface User extends Document {
  user_id: any;
  username: string;
  metadata: {};
}

export type updatableUserInfo<UserObj> = {
  [K in keyof UserObj]: UserObj[K] extends string | object ? K : never;
}[keyof UserObj];
