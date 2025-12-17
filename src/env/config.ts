/**
 * Retrieves an environment variable value safely.
 *
 * @param envKey - the environment variable key to retrieve
 * @returns the environment variable value or throws an error if not found
 */
export const getEnvSafely = (envKey: string) => {
  const envVal = process.env[envKey];
  if (!envVal) throw new Error(`Missing variable ${envKey}!`);
  return envVal;
};
