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
    <IonPage style={{ backgroundColor: 'rgb(228, 84, 30)',  "!important": true }}>
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
      <IonContent className="ion-padding" fullscreen style={{ backgroundColor: 'rgb(228, 84, 30)' }}>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />
        <div style={{ textAlign: 'center', width: '100%' }} >
        <IonChip className={league_spartan_light.className}  color="primary">Chef Reccomended Meals</IonChip>
        </div>
      <ComboCardWrapper userId={'89338523-a2e1-4cf2-83a7-52e828eabc01'} combination={comboData} />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
