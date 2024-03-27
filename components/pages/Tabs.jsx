import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonHeader, IonButtons, IonButton, IonToolbar } from '@ionic/react';
import { book, cart, cog, fastFood, flash, heart, home, list, notificationsOutline } from 'ionicons/icons';

import Home from './Feed';
import Menu from './Menu';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import BuildOrder from './BuildOrder';
import Image from 'next/image';
// import ErrorBoundary from './ErrorBoundary';

const Tabs = () => {


  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/feed" render={() => <Home />} exact={true} />
        <Route path="/tabs/build-order" render={() => <BuildOrder />} exact={true} />
        {/* <Route path="/tabs/lists/:listId" render={() => <ListDetail />} exact={true} /> */}
        <Route path="/tabs/menu" render={() => 
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <Menu  />
          </ErrorBoundary>
        } exact={true} />
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
      <IonTabBar slot='bottom' style={{ '--background': '#00BF63', color: 'white', height: '70px', boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.2)' }}>
      <IonTabButton tab="tab1" href="/tabs/feed" style={{ color: 'white' }}>
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/feed" style={{ color: 'white' }}>
          <IonIcon icon={heart} />
          <IonLabel>Chef Combos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/build-order" style={{ color: 'white' }}>
          <IonIcon icon={fastFood} />
          <IonLabel>Build Your Own</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/menu" style={{ color: 'white' }}>
          <IonIcon icon={book} />
          <IonLabel>Full Menu</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
