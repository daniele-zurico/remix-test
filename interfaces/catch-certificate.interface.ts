import { INotification } from "./notification.interface";
import { IErrorTransformed } from "./errors.interface";

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