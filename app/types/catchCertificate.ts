import { INotification } from "./main";
import { IErrorTransformed } from "./errors";

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

export interface IUserReferenceProps {
  userReference?: string;
  errors?: IErrorTransformed;
};

export interface IProduct {
  product: string;
  commodityCode: string;
};