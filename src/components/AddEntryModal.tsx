import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonPopover,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { arrowBack } from "ionicons/icons";
import { createUseStyles } from "react-jss";
import { useFoodEntries } from "../hooks/useFoodEntries";
import { v4 } from "uuid";
import { formatDisplayTime } from "../util/formatDisplayTime";
import { getCurrentLocalTimeISOString } from "../util/getCurrentLocalTimeISOString";

const useStyles = createUseStyles({
  form: {
    marginBottom: 16,
  },
  formItem: {
    marginTop: 4,
    marginBottom: 4,
  },
  timeContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  timeTextContainer: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 8,
    paddingBottom: 8,
  },
  timePopoverButtons: { display: "flex", justifyContent: "flex-end" },
});

type AddEntryFormData = {
  name?: string;
  calories?: string;
  time?: string;
};

const AddEntryModal = () => {
  const classes = useStyles();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [formState, setFormState] = useState<AddEntryFormData>({});
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const { addFoodEntry } = useFoodEntries();

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function cancel() {
    modal.current?.dismiss();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      // TODO need better validation logic
      if (!formState.name || !formState.calories || !formState.time) {
        return;
      }

      addFoodEntry({
        id: v4(),
        name: formState.name,
        calories: Number(formState.calories),
        time: formState.time,
        createdAt: new Date().toString(),
      });
    }

    setFormState({});
  }

  return (
    <IonModal
      ref={modal}
      trigger="open-add-entry-modal"
      onWillDismiss={(ev) => onWillDismiss(ev)}
      onWillPresent={() => {
        setFormState({
          ...formState,
          time: getCurrentLocalTimeISOString(),
        });
      }}
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

                setFormState({
                  ...formState,
                  name: val,
                });
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
          <IonItem>
            <div className={classes.timeContainer}>
              <div className={classes.timeTextContainer}>
                <IonText style={{ fontSize: 12 }}>Time</IonText>
                <IonText>{formatDisplayTime(formState.time as string)}</IonText>
              </div>
              <IonButton onClick={() => setShowPopover(true)}>Change</IonButton>
            </div>
          </IonItem>
        </div>
        <IonButton
          onClick={() => confirm()}
          expand="block"
          disabled={
            !formState.name ||
            !formState.calories ||
            isNaN(Number(formState.calories))
          }
        >
          Add
        </IonButton>
        <IonPopover
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)}
        >
          <IonDatetime
            presentation="time"
            value={formState.time}
            onIonChange={(e) => {
              const val = (e.target.value as string) || "";
              setFormState({
                ...formState,
                time: val,
              });
            }}
          ></IonDatetime>
          <IonButton
            fill="clear"
            style={{ fontWeight: 700 }}
            onClick={() => setShowPopover(false)}
          >
            Save
          </IonButton>
        </IonPopover>
      </IonContent>
    </IonModal>
  );
};

export default AddEntryModal;
