import { INotification } from "./main";
import { IError } from "./errors";

export interface IAccessibleAutocomplteProps {
  id: string;
  name: string;
  defaultValue?: string;
  defaultSelectMessage?: string;
  nojsValues: ISpecies[];
}

export type ICatchCertificate = {
  documentNumber: string;
  userReference?: string;
  startedAt: string;
  status: string;
  isFailed: boolean;
};

export interface ICompletedCertificate {
  createdAt: string;
  userReference?: string;
  documentNumber: string;
  documentUri: string;
  status: string;
};

export interface IDashboardData {
  inProgress: ICatchCertificate[];
  completed: ICompletedCertificate[];
  notification: INotification;
};

export interface IUserReference {
  userReference?: string;
  errors?: IError[];
};

export interface IProduct {
  id: string;
  species: string;
  speciesCode: string;
  state: string;
  stateLabel: string;
  presentation: string;
  presentationLabel: string;
  commodityCode: string;
  commodityCodeDescription: string;
};

export interface ISpecies {
  faoCode: string;
  faoName: string;
  scientificName: string;
}

export interface IStates {
  label: string;
  value: string;
}

export interface IPresentation {
  label: string;
  value: string;
}

export interface ICommodityCodes {
  label: string;
  value: string;
}