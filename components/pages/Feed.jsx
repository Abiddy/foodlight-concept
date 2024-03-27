import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonChip,
  IonTabBar,
} from '@ionic/react';
import Notifications from './Notifications';
import { useCallback, useEffect, useState } from 'react';
import { cart, notificationsOutline } from 'ionicons/icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ComboCardWrapper from './ComboCardWrapper';
import { League_Spartan } from 'next/font/google';
import Image from 'next/image'
import { league_spartan_light } from './Comobos/Combos';


const league_spartan = League_Spartan({ weight: ['700'], subsets: ['latin'] });

const supabase = createClientComponentClient();

const Feed = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchComboData = useCallback(async () => {
    try {

      const { data, error } = await supabase
        .from('combo_cards')
        .select('*')
        .eq('uid', '89338523-a2e1-4cf2-83a7-52e828eabc01');

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      alert('Error fetching combination data!');
      return [];
    } 
  }, []);

  const [comboData, setComboData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchComboData();
      setComboData(data);
    };

    fetchData();
  }, [fetchComboData]);

  return (
    <IonPage >
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
      <IonContent className="ion-padding" fullscreen style={{ backgroundColor: 'rgb(228, 84, 30)' }}>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />
      <ComboCardWrapper userId={'89338523-a2e1-4cf2-83a7-52e828eabc01'} combination={comboData} />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
