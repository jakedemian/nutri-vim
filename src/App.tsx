import { Redirect, Route } from "react-router-dom";
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
import Today from "./pages/Today";
import List from "./pages/List";

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
import "./theme/variables.css";
import "./index.css";
import ContentWrapper from "./components/ContentWrapper";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/today">
            <ContentWrapper>
              <Today />
            </ContentWrapper>
          </Route>
          <Route exact path="/list">
            <ContentWrapper>
              <List />
            </ContentWrapper>
          </Route>
          <Route exact path="/">
            <Redirect to="/today" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="today" href="/today">
            <IonIcon aria-hidden="true" icon={todaySharp} />
            <IonLabel>Today</IonLabel>
          </IonTabButton>
          <IonTabButton tab="list" href="/list">
            <IonIcon aria-hidden="true" icon={listSharp} />
            <IonLabel>List</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
