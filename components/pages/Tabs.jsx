import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonButtons, IonButton, IonToolbar } from '@ionic/react';
import { book, cart, fastFood, heart, home, notificationsOutline } from 'ionicons/icons';

import Feed from './Feed';
import Menu from './Menu';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import BuildOrder from './BuildOrder';
import Image from 'next/image';

const Tabs = () => {


  return (
    <IonTabs>
      <IonRouterOutlet>
      <Route path="/" render={() => <Feed />} exact={true} />
        <Route path="/tabs/feed" render={() => <Feed />} exact={true} />
        <Route path="/tabs/build-order" render={() => <BuildOrder />} exact={true} />
        <Route path="/tabs/menu" render={() => <Menu  />} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/feed" />} exact={true} />
      </IonRouterOutlet>
      <IonHeader>
        <IonToolbar style={{ '--background': '#00BF63', color: 'white', height: '70px', boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px'  }}>
          <Image
            src="/foodLight.png"
            width={80}
            height={80}
            alt="Picture of the author"
          />     
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} style={{ '--background': 'transparent', color: 'white' }} />
            </IonButton>
            <IonButton onClick={() => set(true)}>
              <IonIcon icon={cart} style={{ '--background': 'transparent', color: 'white' }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonTabBar 
        slot='bottom' 
        style={{ 
        '--background': 'white', 
        color: 'white', 
        height: '70px', 
      }}>
      <IonTabButton tab="tab1" href="/" style={{ color: '#00BF63' }}>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/feed" style={{ color: '#00BF63' }}>
          <IonIcon icon={heart} />
          <IonLabel>Chef Combos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/build-order" style={{ color: '#00BF63' }}>
          <IonIcon icon={fastFood} />
          <IonLabel>Build Your Own</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/menu" style={{ color: '#00BF63' }}>
          <IonIcon icon={book} />
          <IonLabel>Full Menu</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
