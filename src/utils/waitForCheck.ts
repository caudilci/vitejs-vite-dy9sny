import { waitWithCheck } from './time';

/**
 * Polling check `fn` result until `fn` return true or timeout will be completed.
 * @param fn
 * @param param1
 * @returns
 */
export const waitForCheck = async (
  fn: () => any | Promise<any> | void,
  { interval = 100, timeout = 1000 * 5 } = {}
) => {
  let lastError: any;

  const callback = async () => {
    try {
      await fn();

      return true;
    } catch (e) {
      lastError = e;
      return false;
    }
  };

  return waitWithCheck(callback, { interval, timeout }).catch(() => {
    throw lastError;
  });
};
