const CONFIG = {
  MMO_ECC_ORCHESTRATION_SVC_URL: process.env.MMO_ECC_ORCHESTRATION_SVC_URL,
  MMO_ECC_REFERENCE_SVC_URL: process.env.MMO_ECC_REFERENCE_SVC_URL,
  LIMIT_ADD_SPECIES: process.env.LIMIT_ADD_SPECIES
};

export const supportedLanguages = {
  en: { displayName: 'English', description: 'Change the language to English' },
  cy: { displayName: 'Cymraeg', description: 'Newid yr iaith ir Gymraeg' }
};

export const defaultLocale: 'en' = 'en';

export default CONFIG;
