/**
 * sleep for ms
 * @param ms what ms to sleep
 */
 export const sleep = (
  time: number
): Promise<string> & { cancel: () => void } => {
  let timer: ReturnType<typeof setTimeout>;
  let rejector: (reason?: any) => void;
  const promise = new Promise<string>((resolve, reject) => {
    rejector = reject;
    timer = setTimeout(() => {
      resolve('original');
    }, time);
  }) as any;

  promise.cancel = () => {
    rejector();
    clearTimeout(timer);
  };

  return promise;
};
