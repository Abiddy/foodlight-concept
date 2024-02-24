import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
} from '@ionic/react';
import Notifications from './Notifications';
import { useCallback, useEffect, useState } from 'react';
import { cart, notificationsOutline } from 'ionicons/icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ComboCardWrapper from './ComboCardWrapper';
import { League_Spartan } from 'next/font/google';


const league_spartan = League_Spartan({ weight: ['700'], subsets: ['latin'] });

const supabase = createClientComponentClient();

const Feed = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchComboData = useCallback(async () => {
    try {

      const { data, error } = await supabase
        .from('combo_cards')
        .select('*')
        .eq('uid', '1f358f02-322f-4edd-af31-4bec37bd0ac9');

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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>WhatsOnMyMenu</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => set(true)}>
              <IonIcon icon={cart} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />
        <h1 className={league_spartan.className}>Chefs Combos</h1>
        <p1 >Find the best chef reccommended combinations based on your budget!</p1>
      <ComboCardWrapper userId={'1f358f02-322f-4edd-af31-4bec37bd0ac9'} combination={comboData} />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
