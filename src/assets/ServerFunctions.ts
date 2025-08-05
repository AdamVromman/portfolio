import { Language } from "./Constants";

export const getLanguage = (astroInput: any): Language => {
  return (astroInput as Language) || Language.EN;
};

export const slugToLanguageKey = (
  slug: string
): "clubSofa" | "trainWorld" | "transfoIntiem" | "qausal" | "allEyesOnGaza" => {
  switch (slug) {
    case "club-sofa":
      return "clubSofa";
    case "train-world":
      return "trainWorld";
    case "transfo-intiem":
      return "transfoIntiem";
    case "qausal":
      return "qausal";
    case "all-eyes-on-gaza":
      return "allEyesOnGaza";
    default:
      return "clubSofa";
  }
};
