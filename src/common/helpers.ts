export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const resolveAssetURL = (
  relativeFolderPath: string,
  filenameWithExtension: string,
  base?: string
) => {
  return new URL(`${relativeFolderPath}/${filenameWithExtension}`, base).href;
};
