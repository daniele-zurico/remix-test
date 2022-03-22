import { IError, IErrorTransformed, ErrorLookup } from "interfaces/errors.interface";

export const getErrorMessage = (key: string, params: string[] = []): string => {
  const errors: ErrorLookup = {
    'error.userReference.string.max': 'Enter your reference as 50 characters or fewer',
    'error.userReference.string.pattern.base': 'Enter your reference as a combination of letters, numbers, hyphens, slashes and full stops'
  };

  return errors[key] || key;
};

export const getTransformedError = (errors: IError[]): IErrorTransformed => {
  const errorTransformed: IErrorTransformed = {};
  
  errors.forEach((error: IError) => {
    errorTransformed[error.key] = {
      key: error.key,
      message: error.message
    };
  });

  return errorTransformed;
}