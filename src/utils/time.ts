import { jestFakeTimersAreEnabled } from './jestFakeTimersAreEnabled';
import { sleep } from './sleep';

/**
 * polling execute function
 * @param fn
 * @param interval interval time
 */
export const polling = (
  fn: () => boolean | Promise<boolean>,
  interval: number
): ReturnType<typeof sleep> => {
  let finished = false;
  let sleepPromise: ReturnType<typeof sleep>;

  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise<void>(async (resolve, reject) => {
    if (typeof fn !== 'function') {
      resolve();
      return;
    }

    while (!finished) {
      finished = await fn();

      sleepPromise = sleep(interval);

      // use that to prevent run in production
      if (process.env.NODE_ENV === 'test' && jestFakeTimersAreEnabled()) {
        jest.advanceTimersByTime(interval);
      }

      sleepPromise.catch(() => {
        reject();
      });

      await sleepPromise;
    }

    resolve();
  }) as any;

  promise.cancel = () => {
    sleepPromise.cancel();
    finished = true;
  };

  return promise;
};

/**
 * Polling check `fn` result until `fn` return true or timeout will be completed.
 */
export const waitWithCheck = async (
  fn: () => boolean | Promise<boolean>,
  { interval = 100, timeout = 1000 * 5 } = {}
) => {
  if (typeof fn !== 'function') return;

  const poolingPromise = polling(fn, interval);
  const timeoutPromise = sleep(timeout);

  await Promise.race([
    poolingPromise,
    timeoutPromise.then(() => {
      throw new Error(`${timeout} ms timeout error`);
    }),
  ]).finally(() => {
    timeoutPromise.cancel();
    poolingPromise.cancel();
  });
};
