import Image from 'next/image';
import Store from '../../store';
import * as selectors from '../../store/selectors';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { League_Spartan } from 'next/font/google';
import { cart } from 'ionicons/icons';


const league_spartan = League_Spartan({ weight: ['600'], subsets: ['latin'] });

const ListEntry = ({ list, ...props }) => (
  <IonItem routerLink={`/tabs/lists/${list.id}`} className="list-entry">
    <IonLabel>{list.name}</IonLabel>
  </IonItem>
);

const AllLists = ({ onSelect }) => {
  const lists = Store.useState(selectors.getLists);

  return (
    <>
      {lists.map((list, i) => (
        <ListEntry list={list} key={i} />
      ))}
    </>
  );
};

const Lists = () => {

  const menuItems = Store.useState(s => s.menuItems);
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
            <IonButton onClick={() => set(true)}>
              <IonIcon icon={cart} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
        </IonHeader>
        <h1 className={league_spartan.className}> Find orders based on your preference!</h1>
      </IonContent>
    </IonPage>
  );
};

export default Lists;
