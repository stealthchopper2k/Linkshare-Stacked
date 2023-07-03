import { FileStoreType } from "../enums/dashboard";

export interface File {
  id?: number;
  name: string;
  url?: string;
  category: string;
  date: Date;
}

export interface Conditions {
  All: (file_array: File[]) => File[];
  Recent: (values: File[]) => File[];
  Oldest: (values: File[]) => File[];
}

export type FilterFunc = (isChecked: boolean, val: keyof Conditions) => void;

export interface Filter {
  FilterClick: FilterFunc;
  values: Array<keyof Conditions>;
}

// changeable boxes holding files
export interface FileBoxProps {
  filter: Filter;
  files: File[];
  style: FileStoreType;
}

export interface User {
  id: number;
  username: string;
  metadata: {};
}

export interface DashboardState {
  user: User;
  login_state: boolean;
}
