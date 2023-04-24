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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "react-query";
import {
  getTestValueQueryKey,
  getTestValueStorageKey,
} from "../../hooks/useTestValue";
import debounce from "lodash/debounce";

const useStyles = createUseStyles({
  pageContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

const Today: React.FC = () => {
  const queryClient = useQueryClient();

  const onFabClick = debounce(async () => {
    const value = await AsyncStorage.getItem(getTestValueStorageKey());
    const numberValue = !!value && !isNaN(Number(value)) ? Number(value) : 0;

    AsyncStorage.setItem(
      getTestValueStorageKey(),
      (numberValue + 1).toString()
    ).then(() => {
      queryClient.invalidateQueries(getTestValueQueryKey());
    });
  }, 25);

  const classes = useStyles();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={classes.pageContent}>
          <CalorieDisplay />
        </div>
      </IonContent>
      <IonFab slot="fixed" vertical="top" horizontal="end">
        <IonFabButton onClick={onFabClick}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Today;
