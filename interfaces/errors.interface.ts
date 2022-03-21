export interface IError {
  key: string;
  message: string;
};

export interface IErrorTransformed {
  [key: string] : IError
}