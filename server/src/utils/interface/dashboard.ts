import { Document, Types } from "mongoose";

export enum FileStoreType {
  "timeline",
  "size",
  "custom",
}

export interface File {
  id?: number;
  name: string;
  url: string;
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
  user_id: string;
}
