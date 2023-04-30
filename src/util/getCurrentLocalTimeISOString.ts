// TODO combine all date/time related functions into a TimeUtils.ts

export const getCurrentLocalTimeString = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Convert minutes to milliseconds
  const localTime = new Date(now.getTime() - timezoneOffset);
  const localISOString = localTime.toISOString().slice(0, 19);
  return localISOString;
};

export const getLocalTimeStringFromDate = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000; // Convert minutes to milliseconds
  const localTime = new Date(date.getTime() - timezoneOffset);
  const localISOString = localTime.toISOString().slice(0, 19);
  return localISOString;
};
