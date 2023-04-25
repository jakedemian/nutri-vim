import { IonText } from "@ionic/react";
import { createUseStyles } from "react-jss";
// import { useTestValue } from "../../hooks/useTestValue";

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
  //   const { testValue, isLoading } = useTestValue();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <IonText className={classes.calorieDisplay}>1234</IonText>
      <IonText className={classes.caloriesLabel}>calories</IonText>

      {/* {isLoading ? (
        <div>Loading...</div>
      ) : (
        <IonText>{testValue || "no value"}</IonText>
      )} */}
    </div>
  );
};

export default CalorieDisplay;
