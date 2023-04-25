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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/today">
            <Today />
          </Route>
          <Route exact path="/list">
            <List />
          </Route>
          {/* <Route path="/tab3">
            <Tab3 />
          </Route> */}

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
          {/* <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton> */}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
