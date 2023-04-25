import { IonText } from "@ionic/react";
import { createUseStyles } from "react-jss";
import { useFoodEntries } from "../../hooks/useFoodEntries";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  calorieDisplay: {
    color: "white",
    fontSize: "7em",
    fontWeight: 500,
    lineHeight: "0.75em",
  },
  caloriesLabel: {
    color: "white",
    fontSize: "1.5em",
  },
});

const CalorieDisplay = () => {
  const classes = useStyles();
  const { isLoading, calorieCount } = useFoodEntries();

  return (
    <div className={classes.container}>
      <IonText className={classes.calorieDisplay}>
        {isLoading ? "----" : calorieCount}
      </IonText>
      <IonText className={classes.caloriesLabel}>calories</IonText>
    </div>
  );
};

export default CalorieDisplay;
