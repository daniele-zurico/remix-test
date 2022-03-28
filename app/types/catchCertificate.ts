import { INotification } from "./main";
import { IError } from "./errors";

export interface IAccessibleAutocomplteProps {
  id: string;
  name: string;
  value?: string;
  defaultValue?: string;
  defaultSelectMessage?: string;
  nojsValues: ISpecies[];
  onChange: (event: any) => void;
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

export interface ILabelAndValue {
  label: string;
  value: string;
}

export interface ICodeAndDescription {
  code: string,
  description: string
}
export interface ISpecieStateLookupResult {
  presentations: ICodeAndDescription[],
  state: ICodeAndDescription
}

export interface ICommodityCode {
  code: string,
  description: string,
  faoName: string,
  stateLabel: string,
  presentationLabel: string
}

export interface ISearchState {
  states: ILabelAndValue[]; 
  presentations: ILabelAndValue[]
}