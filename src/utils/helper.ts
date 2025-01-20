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
