
import React  from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonIcon,
  IonButton, 
  IonSearchbar,
  IonItem, IonLabel, IonList, IonThumbnail, IonChip, IonGrid, IonCardContent, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonBadge 
} from '@ionic/react';
import Image from 'next/image';
import { cartOutline, chevronDown, chevronForward, chevronUp, mapOutline, notifications } from 'ionicons/icons';
import { league_spartan } from './Menu';
import { useHistory } from 'react-router';
import AppShell from '../AppShell';
import Feed from './Feed';


const data = [
  {
    shop: 'BORJSTAR SHAWARMA SHOP',
    shopMeta: 'Borjstar',
    shopImg: 'logo3.png',
    price: '$25',
    items: [
      { name: 'Beef shawarma plate', img: 'item5.png' },
      { name: 'Shawarma chicken Wrap', img: 'item4.png' },
      { name: 'Mendi Rice', img: 'rice.png' }
    ]
  },
  {
    shop: 'McDonalds',
    shopMeta: 'UrthCafe',
    shopImg: 'logo1.png',
    price: '$8',
    items: [
      { name: 'Combo Meal 4', img: 'combo4.png' },
      { name: 'Combo Meal 5', img: 'combo5.png' },
      { name: 'Combo Meal 6', img: 'combo6.png' }
    ]
  },
  {
    shop: 'Urth Cafe',
    shopMeta: 'UrthCafe',
    shopImg: 'logo2.png',
    price: '$12',
    items: [
      { name: 'Combo Meal 7', img: 'combo7.png' },
      { name: 'Combo Meal 8', img: 'combo8.png' },
      { name: 'Combo Meal 9', img: 'combo9.png' }
    ]
  }
];

const data2 = [
  {
    shop: 'BORJSTAR SHAWARMA SHOP',
    shopImg: 'logo3.png',
    name: 'Beef shawarma plate',
    price: '$9',
    img: 'item5.png',
  },
  {
    shop: 'BORJSTAR SHAWARMA SHOP',
    shopImg: 'logo2.png',
    name: 'Beef shawarma plate',
    price: '$12',
    img: 'item5.png',
  },
  {
    shop: 'BORJSTAR SHAWARMA SHOP',
    shopImg: 'logo3.png',
    name: 'Beef shawarma plate',
    price: '$12',
    img: 'item5.png',
  },
];

const topData = [
  { username: "UrthCafe" , count: 35, img: "item3.png", shopImg: "logo2.png", shop: "Urth Cafe", item: "Breakfast Burrito" },
  { username: "Borjstar", count: 27, img: "item4.png", shopImg: "logo3.png", shop: "Borjstar Shawarma Shop", item: "Beef shawarma plate" },
  { username: "UrthCafe", count: 27, img: "item1.png", shopImg: "logo1.png", shop: "McDonalds", item: "Deluxe Breakfast with Muffin" },
  { username: "UrthCafe", count: 20, img: "item2.png", shopImg: "logo2.png", shop: "Urth Cafe", item: "Panini Chicken El Diablo" },
  { username: "Borjstar", count: 18, img: "item5.png", shopImg: "logo3.png", shop: "Borjstar Shawarma Shop", item: "Shawarma chicken Wrap" }
];

const Home = () => {

  const history = useHistory();

  const redirectToStore = (username) => {
    history.push(`/store/${username}`);
  };

  return (
    <IonPage>
    <IonHeader>
    <IonToolbar style={{ '--background': 'white', color: 'white', height: '70px', boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px'  }}>
    <IonButtons slot="start">
        <Image
          src="/foodLight4.png"
          width={50}
          height={50}
          alt="Picture of the author"
        />  
          </IonButtons>
        
          <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '5px', marginLeft: '4rem', color: 'black' }}>15888, Apollo Pl</span>
      <IonIcon icon={chevronDown} style={{ fontSize: '1.5em', color: 'black' }} />
    </div>  

        <IonButtons slot="end">
          <IonButton onClick={() => setShowNotifications(true)}>
            <IonIcon icon={notifications} style={{ '--background': 'transparent', color: 'black' }} />
          </IonButton>
          <IonButton onClick={() => set(true)}>
            <IonIcon icon={cartOutline} style={{ '--background': 'transparent', color: 'black' }} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ion-padding'>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <IonSearchbar color='dark' style={{ paddingLeft: '0px'}}></IonSearchbar>
      <IonIcon icon={mapOutline}  style={{ fontSize: '2em' }}/>
      </div>



      {/* IONLIST START */}
    
      <h1 className={league_spartan.className}>Top 5 Dishes In Gardena</h1>

<IonList inset={false} lines='none' style={{ position: 'relative' }}>
  {topData.map((combo, index) => (
    <IonGrid key={index} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <div>
        {/* <FontAwesomeIcon icon={faStar} style={{ marginRight: '10px', color: '#FFC300'}} /> */}
        <IonIcon icon={chevronUp} style={{ marginRight: '10px' }} />
        <p className={league_spartan.className} style={{ fontSize: '14px' }}>{combo.count}</p>
      </div>
      <IonItem color='dark' style={{ borderRadius: '10px', marginBottom: '5px', flex: '1', width: '100%' }}>
        <IonThumbnail slot="start" style={{ borderRadius: '50%', marginTop: '15px' }}>
          <img src={combo.img} alt="Combo Item" style={{ width: '70px', height: '50px' }} />
        </IonThumbnail>
        <IonGrid style={{ width: '100%' }}>
          <IonChip style={{ color: 'black', padding: '0px', margin: '0px', background: 'rgba(0, 0, 0, 0)' }}>
            <img src={combo.shopImg} alt="Chip Image" style={{ borderRadius: '50%', marginRight: '5px', width: '20px', height: '20px' }} />
            <p style={{ fontSize: '0.7rem' }}>{combo.shop}</p>
          </IonChip>
          <IonLabel className={league_spartan.className}>{combo.item}</IonLabel>
        </IonGrid>
        <IonIcon icon={chevronForward} style={{ fontSize: '1.5em' }} onClick={() => redirectToStore(combo.username)} />
      </IonItem>
    </IonGrid>
  ))}
</IonList>

    {/* FOODLIGHT COMBOS START */}

    <h1 className={league_spartan.className} style={{ marginBottom: '0px'}}>FoodLight Combos</h1>

    <div style={{ display: 'flex', margin: '0px',overflow: 'scroll', width: '600vw' }}>
      {data.map((combo, index) => (
       <IonCard key={index} style={{ borderRadius: '10px', backgroundColor: 'light', width: '300px', marginRight: '10px' }}>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              
            <IonChip style={{ color: 'black', padding: '0px', margin: '0px', background: 'rgba(0, 0, 0, 0)' }}>
        <img src={combo.shopImg} alt="Chip Image" style={{ borderRadius: '50%', marginRight: '5px', width: '20px', height: '20px' }} />
        <p  style={{ fontSize: '0.7rem'}}>{combo.shop}</p>
        </IonChip>
          
              <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{combo.price}</p>
            </div>
            <IonList lines="none">
              {combo.items.map((item, itemIndex) => (
                <IonItem key={itemIndex}>
                  <img src={item.img} alt={item.name} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                  <IonLabel className={league_spartan.className} style={{ marginLeft: '10px' }}>{item.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
            <IonIcon icon={chevronForward} style={{ fontSize: '1.5em', position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }} />
          </IonCardContent>
        </IonCard>
      ))}
      </div>



    {/* BUDGET MEALS START */}
    <h1 className={league_spartan.className} style={{ marginBottom: '0px'}}>Budget Meals</h1>

<IonList lines="none" style={{ display: 'flex', overflowX: 'scroll', width: '600vw'  }}>
<div style={{ display: 'flex', paddingRight: '10px' }}>
  {data2.map((combo, index) => (
    <IonCard key={index} style={{ width: '250px', height: '300px'}}>
    <img alt="Silhouette of mountains" src="item5.png" style={{ height: '150px', width: '250px'}} />
    <IonBadge color="light" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1' , fontSize: '20px'}}>
          {combo.price}
        </IonBadge>
    <IonCardHeader>
      <IonCardTitle style={{ fontSize: '20px'}}>{combo.name}</IonCardTitle>
      <IonCardSubtitle>         
        <IonChip style={{ color: 'black', padding: '0px', margin: '0px', background: 'rgba(0, 0, 0, 0)' }}>
        <img src={combo.shopImg} alt="Chip Image" style={{ borderRadius: '50%', marginRight: '5px', width: '20px', height: '20px' }} />
        <p  style={{ fontSize: '0.7rem'}}>{combo.shop}</p>
        </IonChip></IonCardSubtitle>
    </IonCardHeader>

    <IonCardContent>Heres a small text description for the card content. Nothing more, nothing less.</IonCardContent>
  </IonCard>
  ))}
  </div>
</IonList>

   
    </IonContent>
  
    </IonPage>
  )

  };
  
  export default Home;