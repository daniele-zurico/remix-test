import { ILanguages } from "./language";

export interface IMainAppProps {
  locale: 'en' | 'cy'
}
export interface IMainPageProps extends IMainAppProps {
  languages: ILanguages;
}

export interface INotification {
  title: string;
  message: string;
};