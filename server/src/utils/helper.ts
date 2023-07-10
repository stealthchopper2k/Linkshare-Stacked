export const raise = (param: any, message: string) => {
  throw new Error(`${message} : ${param}`);
};
