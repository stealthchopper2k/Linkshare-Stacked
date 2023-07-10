import { Document, Types } from "mongoose";

export enum FileStoreType {
  "timeline",
  "size",
  "custom",
}

export interface File {
  file_id?: number;
  name: string;
  url: string; // url to tree
  category: string;
  date: string;
}

// changeable boxes holding files
export interface FileBoxProps extends Document {
  files: Types.Array<File>;
  collection_name: string;
  style: FileStoreType;
}

export interface UserDashboard extends Document {
  boxes: FileBoxProps[];
  settings: {};
  user_id: string;
}

// export type updatableDashboard<DashObj> = {
//   [K in keyof DashObj]: DashObj[K] extends object ? K : never;
// }[keyof DashObj];
