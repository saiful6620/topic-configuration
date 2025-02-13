import { SelectOptionType } from "../models/options";

export const getReactSelectOptionsFormat = <T>(
  data: T,
  labelKey: string,
  valueKey: string
): SelectOptionType[] => {
  let options: SelectOptionType[] = [];
  if (data && data instanceof Array) {
    options = data.map((item) => {
      return { label: item[labelKey], value: item[valueKey].toString() };
    });
  }
  return options;
};

export type ColorGroup = "colorGroupSix" | "colorGroupFour";
export const getSentimentColorByValue = (
  value: string,
  group: ColorGroup = "colorGroupSix"
): string => {
  const colorGroup = {
    colorGroupSix: {
      veryNegative: "#EB2834",
      negative: "#FF9A40",
      mixed: "#FFCB47",
      positive: "#A9CF33",
      veryPositive: "#359447",
      neutral: "#EEEEEE",
    },

    colorGroupFour: {
      negative: "#FF7681",
      mixed: "#FFCB47",
      positive: "#45B75B",
      neutral: "#EEEEEE",
    },
  };

  const colors = colorGroup[group as keyof typeof colorGroup];
  return colors[value as keyof typeof colors];
};
