import {
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
            {/* TODO add alert confirmation */}
            <IonButton onClick={() => clearFoodEntries()}>
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
      </IonContent>
    </IonPage>
  );
};

export default Today;
