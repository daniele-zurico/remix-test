import { INotification } from "./main.interface";

export type IStorageDocument = {
  documentNumber: string;
  userReference: string;
  startedAt: string;
};

export interface ICompletedStorageDocument {
  createdAt: string;
  documentNumber: string;
  documentUri: string;
  status: string;
};

export interface IDashboardData {
  inProgress: IStorageDocument[];
  completed: ICompletedStorageDocument[];
  notification: INotification;
};