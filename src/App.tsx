import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { listSharp, todaySharp } from "ionicons/icons";
import { createUseStyles } from "react-jss";

import Today from "src/pages/Today";
import List from "src/pages/List";
import ContentWrapper from "src/components/ContentWrapper";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "src/theme/variables.css";
import "src/index.css";

setupIonicReact();

const useStyles = createUseStyles({
  tabBar: {
    height: 64,
  },
  tabLabel: {
    fontSize: 18,
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/today">
                <ContentWrapper title="Today">
                  <Today />
                </ContentWrapper>
              </Route>
              <Route exact path="/list">
                <ContentWrapper title="List">
                  <List />
                </ContentWrapper>
              </Route>
              <Route exact path="/">
                <Redirect to="/today" />
              </Route>
            </Switch>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className={classes.tabBar}>
            <IonTabButton tab="today" href="/today">
              <IonIcon aria-hidden="true" icon={todaySharp} size="large" />
              <IonLabel className={classes.tabLabel}>Today</IonLabel>
            </IonTabButton>
            <IonTabButton tab="list" href="/list">
              <IonIcon aria-hidden="true" icon={listSharp} size="large" />
              <IonLabel className={classes.tabLabel}>List</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
