import { SetStateAction } from 'react';
import { User } from "./user";

export interface DashboardState {
  user: User;
  login_state: boolean;
}

export interface File {
  file_id: string;
  name: string;
  url: string;
  category: string;
  date: string;
  client_id: string;
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
  condition_keys: Array<keyof Conditions>;
}

export type KeyedBox = {
  [property: string]: {};
}

export interface FetchedFiles {
  files: File[];
  collection_name: string;
  [key: string]: any;
}

export interface Container {
  [property: string]: FetchedFiles;
}
