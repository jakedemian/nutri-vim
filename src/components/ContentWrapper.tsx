import React from "react";
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
import { add, trash } from "ionicons/icons";
import { Toaster } from "react-hot-toast";
import { createUseStyles } from "react-jss";

import AddEntryModal from "src/components/AddEntryModal";
import { useFoodEntries } from "src/hooks/useFoodEntries";

const useStyles = createUseStyles({
  title: {
    fontSize: 24,
  },
});

const ContentWrapper: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  const classes = useStyles();
  const { clearFoodEntries } = useFoodEntries();

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle className={classes.title}>{title}</IonTitle>
            <IonButtons slot="end">
              <IonButton id="reset-calories-trigger">
                <IonIcon icon={trash} size="large"></IonIcon>
              </IonButton>
              <IonButton id="open-add-entry-modal">
                <IonIcon icon={add} size="large"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {children}
          <Toaster position="bottom-center" reverseOrder={false} />
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
    </>
  );
};

export default ContentWrapper;
