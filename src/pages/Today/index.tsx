import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import CalorieDisplay from "./CalorieDisplay";
import { createUseStyles } from "react-jss";
import { add, trash } from "ionicons/icons";
import AddEntryModal from "../../components/AddEntryModal";
import { useFoodEntries } from "../../hooks/useFoodEntries";

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
  const { clearFoodEntries } = useFoodEntries();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Today</IonTitle>
          <IonButtons slot="end">
            <IonButton id="reset-calories-trigger">
              <IonIcon icon={trash}></IonIcon>
            </IonButton>
            <IonButton id="open-add-entry-modal">
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={classes.pageContent}>
          <CalorieDisplay />
        </div>
        <AddEntryModal />
        <IonAlert
          header="Clear data?"
          message="Clear food entries for entire day?  This cannot be undone."
          trigger="reset-calories-trigger"
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "OK",
              role: "confirm",
              handler: () => {
                clearFoodEntries();
              },
            },
          ]}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default Today;
