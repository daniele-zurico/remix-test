export interface ILanguage {
  displayName: string;
  description: string;
};

export interface ILanguages {
  [key: string]: ILanguage,
};