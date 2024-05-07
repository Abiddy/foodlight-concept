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
import { useParams } from 'react-router';


const league_spartan = League_Spartan({ weight: ['700'], subsets: ['latin'] });

const supabase = createClientComponentClient();

const Feed = () => {
  const { username } = useParams();
  const [id, setId] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  console.log(id, username)

  useEffect(() => {
    const fetchProfileId = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single(); // Assuming username is unique

        if (error) {
          throw error;
        }

        setId(data.id || '');
      } catch (error) {
        console.error('Error fetching profile ID:', error.message);
      }
    };

    fetchProfileId();
  }, [username]); 

  const fetchComboData = useCallback(async () => {
    try {

      const { data, error } = await supabase
        .from('combo_cards')
        .select('*')
        .eq('uid', id);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      alert('Error fetching combination data!');
      return [];
    } 
  }, [id]);

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
        <IonToolbar style={{ '--background': 'white', color: 'black', height: '70px', boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' , border: '0px' }}>
          <Image
            src="/foodLight4.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />     
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} style={{  color: 'black' }} />
            </IonButton>
            <IonButton onClick={() => set(true)}>
              <IonIcon icon={cart} style={{ '--background': 'transparent', color: 'black' }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen style={{ backgroundColor: 'rgb(228, 84, 30)' }}>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />
      <ComboCardWrapper userId={id} combination={comboData} />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
