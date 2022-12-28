const DEFAULT_DEBOUNCE_DELAY_IN_MILISECONDS = 300;

const debounce: (
  func: (...args: string[]) => void,
  timeInMilliseconds?: number
) => (...args: string[]) => void = (
  func: (...args: string[]) => void,
  timeInMilliseconds = DEFAULT_DEBOUNCE_DELAY_IN_MILISECONDS
) => {
  let timer: NodeJS.Timeout;
  return (...args: string[]): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply<any, string[], void>(this, args);
    }, timeInMilliseconds);
  };
};

export { debounce };
