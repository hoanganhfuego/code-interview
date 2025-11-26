import { ICON_NAME_MAP } from "./constants";

export const getTokenIconUrl = (symbol: string): string => {
  if (ICON_NAME_MAP[symbol]) symbol = ICON_NAME_MAP[symbol];
  return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`;
};