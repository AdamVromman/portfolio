import { Language } from "./Constants";

export const getLanguage = (astroInput: any): Language => {
  return (astroInput as Language) || Language.EN;
};
