const DEFAULT_SLEEP_TIME = Number(process.env.DEFAULT_SIMULATED_LATENCY) || 0;

export const sleep = (ms: number = DEFAULT_SLEEP_TIME) =>
  new Promise((resolve) => setTimeout(resolve, ms));
