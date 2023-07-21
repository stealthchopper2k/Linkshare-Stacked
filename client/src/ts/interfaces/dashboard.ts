import { User } from "./user";
import { FileStoreType } from "../enums/dashboard";

export interface DashboardState {
  user: User;
  login_state: boolean;
}

export interface File {
  file_id: number;
  name: string;
  url: string;
  category: string;
  date: string;
}

// changeable boxes holding files
export interface FileBoxProps {
  box_id: string;
  files: File[];
  collection_name: string;
}

export interface Conditions {
  All: (file_array: File[]) => File[];
  Recent: (values: File[]) => File[];
  Oldest: (values: File[]) => File[];
}

export type CollectionFunc = (
  arg0: React.ChangeEvent<HTMLInputElement>
) => void;

export interface CollectionTag {
  collection_name: string;
  CollectionInput: CollectionFunc;
}

export type FilterFunc = (val: keyof Conditions) => void;

export interface Filter {
  FilterClick: FilterFunc;
  values: Array<keyof Conditions>;
}
