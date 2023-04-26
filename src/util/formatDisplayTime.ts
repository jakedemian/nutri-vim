export const formatDisplayTime = (localISOString: string) => {
  if (!localISOString) {
    return "";
  }

  const date = new Date(localISOString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12; // Convert 0 to 12 for display purposes
  const displayMinutes = minutes.toString().padStart(2, "0");

  return `${displayHours}:${displayMinutes} ${amOrPm}`;
};
