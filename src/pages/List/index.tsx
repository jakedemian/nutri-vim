import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, iceCreamSharp, pencilSharp, trash } from "ionicons/icons";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useFoodEntries } from "../../hooks/useFoodEntries";
import { Entry } from "../../common/types";

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
  const { foodEntries, deleteFoodEntry, isLoading } = useFoodEntries();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    let ampm: string = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesString: string =
      minutes < 10 ? "0" + minutes.toString() : minutes.toString();

    return `${hours}:${minutesString} ${ampm}`;
  }

  let content = <div>Loading</div>;
  if (isLoading) {
    return content;
  }

  content = (
    <IonContent fullscreen>
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
                      <IonButton
                        onClick={() => console.log(`edit ${entry.name}`)}
                      >
                        <IonIcon icon={pencilSharp}></IonIcon>
                      </IonButton>
                      <IonButton
                        onClick={() => {
                          // TODO Show an alert first!!!!
                          deleteFoodEntry(entry.id);
                        }}
                      >
                        <IonIcon icon={trash}></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </div>
                ) : (
                  <IonText className={classes.time}>
                    {formatDate(entry.createdAt)}
                  </IonText>
                )}
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      ))}
      <div className={classes.footer}>
        <IonIcon icon={iceCreamSharp} style={{ fontSize: 24 }} />
        <IonText>That's all, folks!</IonText>
      </div>
    </IonContent>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            {/* TODO wrap IonRouterOutlet in App.tsx in another component
             that handles the alert and modal stuff, as well as this header */}
            <IonButton id="reset-calories-trigger">
              <IonIcon icon={trash}></IonIcon>
            </IonButton>
            <IonButton id="open-add-entry-modal">
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {content}
    </IonPage>
  );
};

export default List;
