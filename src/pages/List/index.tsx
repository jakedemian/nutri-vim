import React from "react";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
} from "@ionic/react";
import { iceCreamSharp, pencilSharp, trash } from "ionicons/icons";
import { useState } from "react";
import { createUseStyles } from "react-jss";

import { useFoodEntries } from "src/hooks/useFoodEntries";
import { Entry } from "src/common/types";
import EditEntryModal from "src/components/EditEntryModal";
import { formatDisplayTime } from "src/util/formatDisplayTime";

const useStyles = createUseStyles({
  footer: {
    color: "#444",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    userSelect: "none",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    color: "white",
    userSelect: "none",
  },
  cardLeftContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  cardRightContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  foodName: {
    fontSize: "1.75em",
  },
  calories: {
    fontSize: "1em",
    fontStyle: "italic",
    color: "#ddd",
  },
  time: {
    fontSize: "1.75em",
    overflowX: "auto",
    whiteSpace: "nowrap",
  },
});

const List: React.FC = () => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState<number>(-1);
  const [deletingEntryId, setDeletingEntryId] = useState<string | null>(null);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const { foodEntries, deleteFoodEntry, isLoading } = useFoodEntries();

  const onEditModalDismissed = () => {
    setEditingEntryId(null);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      {foodEntries.map((entry: Entry, index: number) => (
        <IonCard key={index} color={selectedItem === index ? "primary" : ""}>
          <IonCardContent>
            <div className={classes.card}>
              <div
                className={classes.cardLeftContent}
                onClick={() =>
                  selectedItem === index
                    ? setSelectedItem(-1)
                    : setSelectedItem(index)
                }
              >
                <IonText className={classes.foodName}>{entry.name}</IonText>
                <IonText className={classes.calories}>
                  {entry.calories} calories
                </IonText>
              </div>
              <div className={classes.cardRightContent}>
                {selectedItem === index ? (
                  <div>
                    <IonButtons slot="end">
                      <IonButton onClick={() => setEditingEntryId(entry.id)}>
                        <IonIcon icon={pencilSharp} size={"large"}></IonIcon>
                      </IonButton>
                      <IonButton /*id="delete-entry-trigger"*/
                        onClick={() => setDeletingEntryId(entry.id)}
                      >
                        <IonIcon icon={trash} size={"large"}></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </div>
                ) : (
                  <IonText className={classes.time}>
                    {formatDisplayTime(entry.time)}
                  </IonText>
                )}
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      ))}
      <div className={classes.footer}>
        <IonIcon icon={iceCreamSharp} style={{ fontSize: 24 }} />
        <IonText>That&apos;s all, folks!</IonText>
      </div>
      <IonAlert
        header="Delete entry?"
        message="Are you sure you want to delete this entry?  This can't be undone."
        isOpen={!!deletingEntryId}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              setDeletingEntryId(null);
            },
          },
          {
            text: "OK",
            role: "confirm",
            handler: () => {
              deleteFoodEntry(foodEntries[selectedItem].id);
              setDeletingEntryId(null);
            },
          },
        ]}
      ></IonAlert>
      <EditEntryModal
        entryId={editingEntryId}
        onDismiss={onEditModalDismissed}
      />
    </>
  );
};

export default List;
