import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/react';
import Notifications from './Notifications';
import { useCallback, useEffect, useState } from 'react';
import { cart, notificationsOutline } from 'ionicons/icons';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ComboCardWrapper from './ComboCardWrapper';
import { League_Spartan } from 'next/font/google';
import Image from 'next/image'


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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='p-2'>
        <Image
      src="/logo2.png"
      width={70}
      height={70}
      alt="Picture of the author"
    />
    </div>
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
        <h1 className={league_spartan.className}>Chef Combos</h1>
        <p1 >Find the best chef reccommended combinations based on your budget!</p1>
      <ComboCardWrapper userId={'89338523-a2e1-4cf2-83a7-52e828eabc01'} combination={comboData} />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
