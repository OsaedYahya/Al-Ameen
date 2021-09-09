export const compareVersions = (minVersion: string, currentVersion: string): boolean => {
  const minVersionInt = parseInt(minVersion.replace(/\./g, ""));
  const currentVersionInt = parseInt(currentVersion.replace(/\./g, ""));
  return minVersionInt > currentVersionInt;
};
