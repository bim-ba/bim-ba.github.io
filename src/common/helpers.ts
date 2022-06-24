export const generateRandomNumber = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max + 1 - min));

export const shuffle = <T>(...data: Array<T>) => {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
};
