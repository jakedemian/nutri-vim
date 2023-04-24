import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
import CalorieDisplay from "./CalorieDisplay";
import { createUseStyles } from "react-jss";
import { add } from "ionicons/icons";

const useStyles = createUseStyles({
  pageContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

const Today: React.FC = () => {
  const classes = useStyles();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={classes.pageContent}>
          <CalorieDisplay />
        </div>
      </IonContent>
      <IonFab slot="fixed" vertical="top" horizontal="end">
        <IonFabButton onClick={() => console.log("click!")}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Today;
