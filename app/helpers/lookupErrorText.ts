import { IError, IErrorTransformed, ErrorLookup } from "../types/errors";

const anyEmpty = ((label: string) => `Enter the ${label}`);

export const getErrorMessage = (key: string, params: string[] = []): string => {
  const errors: ErrorLookup = {
    'error.userReference.string.max': 'Enter your reference as 50 characters or fewer',
    'error.userReference.string.pattern.base': 'Enter your reference as a combination of letters, numbers, hyphens, slashes and full stops',
    'error.species.any.empty': anyEmpty('common name or FAO code'),
    'error.species.any.required': anyEmpty('common name or FAO code'),
    'error.species.any.invalid': anyEmpty('common name or FAO code'),
    'error.species.string.empty': anyEmpty('common name or FAO code'),
    'error.species.string.required': anyEmpty('common name or FAO code'),
    'error.species.string.invalid': anyEmpty('common name or FAO code'),
    'error.state.any.required': 'Select the state',
    'error.state.any.empty': 'Select the state',
    'error.state.string.empty': 'Select the state',
    'error.presentation.any.required': 'Select the presentation',
    'error.presentation.any.empty': 'Select the presentation',
    'error.presentation.string.empty': 'Select the presentation',
    'error.commodity_code.any.required': 'Select a commodity code',
    'error.commodity_code.any.invalid': 'Select a commodity code',
    'error.commodity_code.string.empty': 'Select a commodity code',
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