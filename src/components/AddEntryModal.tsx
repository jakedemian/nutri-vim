import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { arrowBack } from "ionicons/icons";
import React, { useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { useFoodEntries } from "../hooks/useFoodEntries";
import { v4 } from "uuid";

const useStyles = createUseStyles({
  form: {
    marginBottom: 16,
  },
  formItem: {
    marginTop: 4,
    marginBottom: 4,
  },
});

type AddEntryFormData = {
  name?: string;
  calories?: number;
};

const AddEntryModal = () => {
  const classes = useStyles();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [formState, setFormState] = useState<AddEntryFormData>({});
  const { addFoodEntry } = useFoodEntries();

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function cancel() {
    modal.current?.dismiss();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log(`${formState.name} -> ${formState.calories}`);

      if (!formState.name || !formState.calories) {
        return;
      }

      // TODO need validation around formState.calories being a number

      addFoodEntry({
        id: v4(),
        name: formState.name,
        calories: Number(formState.calories),
        createdAt: new Date(),
      });
    }

    setFormState({});
  }

  return (
    <IonModal
      ref={modal}
      trigger="open-add-entry-modal"
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={cancel}>
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Add Food</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className={classes.form}>
          <IonItem className={classes.formItem}>
            <IonInput
              label="Food"
              labelPlacement="stacked"
              type="text"
              placeholder="What did you eat?"
              value={formState.name}
              onIonInput={(e) => {
                const val = (e.target.value as string) || "";

                if (val) {
                  setFormState({
                    ...formState,
                    name: val,
                  });
                }
              }}
            />
          </IonItem>
          <IonItem className={classes.formItem}>
            <IonInput
              label="Calories"
              labelPlacement="stacked"
              type="number"
              placeholder="How many calories?"
              value={formState.calories}
              onIonInput={(e) => {
                const val = (e.target.value as number) || null;

                if (val) {
                  setFormState({
                    ...formState,
                    calories: val,
                  });
                }
              }}
            />
          </IonItem>
        </div>
        <IonButton
          onClick={() => confirm()}
          expand="block"
          disabled={!formState.name || !formState.calories}
        >
          Add
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default AddEntryModal;
