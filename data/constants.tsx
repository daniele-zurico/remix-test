import { ILanguages } from "interfaces/language.interface";

export enum Journeys {
  CatchCertificate = "catchcertificate",
  ProcessingStatement = "processingstatement",
  storageDocument = "storagedocument"
};

export const supportedLanguages: ILanguages = {
  en: { displayName: 'English', description: 'Change the language to English' },
  cy: { displayName: 'Cymraeg', description: 'Newid yr iaith ir Gymraeg' }
};

export const defaultLocale: 'en' = 'en';