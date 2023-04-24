import { IonText } from "@ionic/react";
import { createUseStyles } from "react-jss";
import { useTestValue } from "../../hooks/useTestValue";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  calorieDisplay: { color: "white", fontSize: "5em" },
});

const CalorieDisplay = () => {
  const { testValue, isLoading } = useTestValue();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <IonText className={classes.calorieDisplay}>1234</IonText>
      <IonText>calories</IonText>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <IonText>{testValue || "no value"}</IonText>
      )}
    </div>
  );
};

export default CalorieDisplay;
