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
import React from "react";
import { Toaster } from "react-hot-toast";
import AddEntryModal from "./AddEntryModal";
import { useFoodEntries } from "../hooks/useFoodEntries";

const ContentWrapper: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  const { clearFoodEntries } = useFoodEntries();
  console.log("rendering with title: ", title);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>{title}</IonTitle>
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
