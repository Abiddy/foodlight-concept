import React, { useState, useEffect, useCallback } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButtons,
  IonIcon,
  IonButton,
  IonModal,
  IonTitle,
} from '@ionic/react';
import { League_Spartan } from 'next/font/google';
import Cart from './Cart';
import Store from '../../store';
import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import ItemPreferencesModal from './ItemPreferencesModal';
import { cartOutline, chevronDown, notifications } from 'ionicons/icons';


export const league_spartan = League_Spartan({ weight: ['600'], subsets: ['latin'] });
export const league_spartan_light = League_Spartan({ weight: ['400'], subsets: ['latin'] });

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // console.log({itemPreferences})

  const showPreferencesModal = (item) => {
    setItem(item); 
    setIsOpen(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const menuItems = Store.useState(s => s.menuItems);

  console.log({menuItems})

  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const { item_type } = item;
    if (!acc[item_type]) {
      acc[item_type] = [];
    }
    acc[item_type].push(item);
    return acc;
  }, {});

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      setCart([...cart]); 
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      const existingItem = updatedCart[existingItemIndex];
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        // If quantity is 1, remove the item from the cart
        updatedCart.splice(existingItemIndex, 1);
      }
      setCart(updatedCart);
    }
  };

  const truncateText = (text, maxWords) => {
    const words = text?.split(/\s+/);
    if (words?.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
};


  return (
    <IonPage>
      <IonHeader>
      <IonToolbar style={{ '--background': 'white', color: 'black', height: '70px', boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px'  }}>
          <Image
            src="/foodLight4.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />  
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '5px', color: 'black' }}>Random Street Location</span>
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
      <IonContent>
  {menuItems? (
    Object.entries(groupedMenuItems).map(([itemType, items]) => (
      <IonCard key={itemType} style={{ boxShadow: 'none', border: 'none', margin: '0px' }}>
        <IonCardHeader style={{ paddingBottom: '0px', paddingTop: '0px'}}>
          <h4 className={league_spartan.className}>{itemType.charAt(0).toUpperCase() + itemType.slice(1)}</h4>
        </IonCardHeader>
        <Cart open={showCart} onDidDismiss={() => setShowCart(false)} cart={cart}/>
        <IonCardContent style={{ paddingTop: '0px', paddingBottom: '0px'}}> 
        <div className="w-full max-w-[23rem]">
          {items.map((item) => (
            <Card key={item.id} className="w-full max-w-[48rem] flex-row mb-4">
              <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
                <img
                  src={item.item_image_url || 'default-image-url'}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className='p-2'>
              <Typography style={{ fontWeight: 'bold', color: '#333' ,fontSize: '1rem'}} className={league_spartan.className}>
                  {item.item_name}
              </Typography>
              <Typography style={{ fontSize: '0.8rem' }} className={league_spartan.className}>
                  ${item.item_price}
              </Typography>
              <div className="relative flex items-center justify-between">
                <Typography color="gray" variant="p" className={league_spartan_light.className}>
                  {truncateText(item.item_description, 5)}
                </Typography>
                <Button
                    onClick={() => showPreferencesModal(item)}
                    className="flex items-center justify-between"
                    style={{
                    color: 'white',
                    background: '#2D3142',
                    borderRadius: '9999px',
                    padding: '7px 12px', 
                    fontSize: '10.5px', 
                    fontWeight: 'bold',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)', 
                    }}
                 >
                   Add
                </Button>
              </div>                
              </CardBody>
            </Card>
          ))}
        </div>
        </IonCardContent>
      </IonCard>
    ))
  ) : (
    <div>Loading...</div>
  )}
</IonContent>
      {isOpen && 
      <ItemPreferencesModal item={item} isOpen={isOpen} setIsOpen={setIsOpen}/>}
    </IonPage>
  );
};

export default Menu;
