import { IonText } from "@ionic/react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  calorieDisplay: { color: "white", fontSize: "5em" },
});

const CalorieDisplay = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <IonText className={classes.calorieDisplay}>1234</IonText>
      <IonText>calories</IonText>
    </div>
  );
};

export default CalorieDisplay;
