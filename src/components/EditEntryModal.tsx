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
import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { useFoodEntries } from "../hooks/useFoodEntries";
import { Entry } from "../common/types";

const useStyles = createUseStyles({
  form: {
    marginBottom: 16,
  },
  formItem: {
    marginTop: 4,
    marginBottom: 4,
  },
});

type EditEntryFormData = {
  name?: string;
  calories?: string;
};

type EditEntryModalProps = {
  entryId: string | null;
  onDismiss: () => void;
};

const EditEntryModal: React.FC<EditEntryModalProps> = ({
  entryId,
  onDismiss,
}) => {
  const classes = useStyles();
  const input = useRef<HTMLIonInputElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);

  const [formState, setFormState] = useState<EditEntryFormData>({});
  const [editingEntry, setEditingEntry] = useState<Entry | undefined>();
  const { updateFoodEntry, foodEntries } = useFoodEntries();

  useEffect(() => {
    if (entryId && foodEntries && foodEntries.length > 0) {
      const thisEntry: Entry = foodEntries.find(
        (entry: Entry) => entry.id === entryId
      );

      setEditingEntry(thisEntry);
      setFormState({
        name: thisEntry.name,
        calories: thisEntry.calories.toString(),
      });
    }
  }, [foodEntries, entryId]);

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function cancel() {
    modal.current?.dismiss();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      if (!editingEntry || !formState.name || !formState.calories) {
        return;
      }

      // TODO need better validation around formState.calories being a number
      const updatedEntry: Entry = {
        id: editingEntry.id,
        name: formState.name,
        calories: Number(formState.calories),
        createdAt: editingEntry.createdAt,
      };

      updateFoodEntry(updatedEntry);
    }

    setFormState({});
    onDismiss();
  }

  return (
    <IonModal
      ref={modal}
      isOpen={!!entryId}
      onWillDismiss={(ev) => onWillDismiss(ev)}
    >
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={cancel}>
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Food</IonTitle>
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
                const val = (e.target.value as string) || "";

                setFormState({
                  ...formState,
                  calories: val,
                });
              }}
            />
          </IonItem>
        </div>
        <IonButton
          onClick={() => confirm()}
          expand="block"
          disabled={
            !formState.name ||
            !formState.calories ||
            isNaN(Number(formState.calories)) ||
            Number(formState.calories) <= 0
          }
        >
          Save
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default EditEntryModal;