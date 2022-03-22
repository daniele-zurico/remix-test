export interface IError {
  key: string;
  message: string;
};

export interface IErrorTransformed {
  [key: string] : IError
}
export interface ErrorLookup {
  [key: string]: string
}