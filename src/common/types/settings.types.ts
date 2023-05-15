export type SettingsKey = 'autoResetDaily';
/* will eventually look like:
export type SettingsKeys =
  | "autoResetDaily"
  | "calorieDisplayUnits"
  | "dailyGoalCalories"
  | "dailyGoalTrackingStyle";
*/

export type SettingsValue = string | number | boolean;

export type Settings = {
  [key in SettingsKey]: Setting;
};

export type Setting = {
  value: SettingsValue;
  options?: string[] | number[];
};
