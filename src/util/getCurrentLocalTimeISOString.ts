export const getCurrentLocalTimeISOString = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert minutes to milliseconds
  const localTime = new Date(now.getTime() - timezoneOffset);
  const localISOString = localTime.toISOString().slice(0, 19);
  return localISOString;
};
