import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import {  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonButtons, IonButton, IonToolbar } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Tabs from './pages/Tabs';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Menu from './pages/Menu';
import BuildOrder from './pages/BuildOrder';
import { book, cart, fastFood, heart, home, notificationsOutline } from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

setupIonicReact({});

const AppShell = () => {


  return (
    <IonApp>
     
      <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet id="main">
          <Route path="/home" render={() => <Home/>} />
          {/* <Route path="/tabs" render={() => <Tabs/>} /> */}
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
          <Route path="/store/:username" component={Feed} exact={true} />
          <Route path="/build-order" render={() => <BuildOrder/>} exact={true} />
          <Route path="/menu" render={() => <Menu/>} exact={true} />
        </IonRouterOutlet>
      <IonTabBar 
        slot='bottom' 
        style={{ 
        '--background': 'white', 
        color: 'white', 
        height: '70px', 
      }}>
<IonTabButton tab="tab1" href="/home" style={{ color: 'black' }}>
  <FontAwesomeIcon icon={faHouse} style={{ fontSize: '3em' }} />
  <IonLabel style={{ fontSize: '1em' }}>Explore</IonLabel>
</IonTabButton>
<IonTabButton tab="tab3" href="/build-order" style={{ color: 'black' }}>
  <IonIcon icon={fastFood} style={{ fontSize: '3em' }} />
  <IonLabel style={{ fontSize: '1em' }}>Feelin Lucky</IonLabel>
</IonTabButton>
        {/* <IonTabButton tab="tab4" href="/menu" style={{ color: 'black' }}>
          <IonIcon icon={book} />
          <IonLabel>Full Menu</IonLabel>
        </IonTabButton> */}
      </IonTabBar>
    </IonTabs>
    </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
