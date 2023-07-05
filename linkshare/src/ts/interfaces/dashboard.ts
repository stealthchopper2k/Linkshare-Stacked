import { Url } from "next/dist/shared/lib/router/router";
import { FileStoreType } from "../enums/dashboard";

export interface DashboardState {
  user: User;
  login_state: boolean;
}

export interface User {
  id: number;
  username: string;
  metadata: {};
}

export interface File {
  id?: number;
  name: string;
  url: string;
  category: string;
  date: string;
}

// changeable boxes holding files
export interface FileBoxProps {
  files: File[];
  style: FileStoreType;
}

export interface Conditions {
  All: (file_array: File[]) => File[];
  Recent: (values: File[]) => File[];
  Oldest: (values: File[]) => File[];
}

export type FilterFunc = (val: keyof Conditions) => void;

export interface Filter {
  FilterClick: FilterFunc;
  values: Array<keyof Conditions>;
}
