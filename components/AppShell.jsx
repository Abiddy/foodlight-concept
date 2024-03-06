import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Tabs from './pages/Tabs';

setupIonicReact({});

// window.matchMedia("(prefers-color-scheme: light)").addListener(async (status) => {
//   try {
//     await StatusBar.setStyle({
//       style: Style.Light,
//     });
//   } catch {}
// });

const AppShell = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/tabs" render={() => <Tabs />} />
          <Route path="/" render={() => <Redirect to="/tabs/feed" />} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
