import { INotification } from "./main.interface";

export type IProcessingStatement = {
  documentNumber: string;
  userReference: string;
  startedAt: string;
};

export interface ICompletedProcessingStatement {
  createdAt: string;
  documentNumber: string;
  documentUri: string;
  status: string;
};

export interface IDashboardPSData {
  inProgress: IProcessingStatement[];
  completed: ICompletedProcessingStatement[];
  notification: INotification;
};