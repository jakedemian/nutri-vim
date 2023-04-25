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
import { add } from "ionicons/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTestValueStorageKey, useTestValue } from "../../hooks/useTestValue";
import debounce from "lodash/debounce";
import AddEntryModal from "../../components/AddEntryModal";

const useStyles = createUseStyles({
  pageContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

const Today: React.FC = () => {
  const { updateTestValue } = useTestValue();

  const onAddClick = debounce(async () => {
    console.log("click!");
    const value = await AsyncStorage.getItem(getTestValueStorageKey());
    const numberValue = !!value && !isNaN(Number(value)) ? Number(value) : 0;

    updateTestValue(numberValue + 2);
  }, 100);

  const classes = useStyles();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Today</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onAddClick} id="open-add-entry-modal">
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
