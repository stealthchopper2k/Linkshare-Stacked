import { User } from "./user";
import { FileStoreType } from "../enums/dashboard";

export interface DashboardState {
  user: User;
  login_state: boolean;
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
  collection: string;
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

declare module "@mui/system" {
  interface BreakpointOverrides {
    // Your custom breakpoints
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    // Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
