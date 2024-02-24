import React, { useState, useEffect, useCallback } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonIcon,
  IonButton,
  IonMenuButton,
} from '@ionic/react';
import { League_Spartan } from 'next/font/google';
import Cart from './Cart';
import Store from '../../store';
import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { cart as cartIcon } from 'ionicons/icons';


const league_spartan = League_Spartan({ weight: ['600'], subsets: ['latin'] });

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const menuItems = Store.useState(s => s.menuItems);


  const groupedMenuItems = menuItems.reduce((acc, item) => {
    const { item_type } = item;
    if (!acc[item_type]) {
      acc[item_type] = [];
    }
    acc[item_type].push(item);
    return acc;
  }, {});
  console.log({groupedMenuItems})

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

  console.log({menuItems})

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonTitle className={league_spartan.className}>Full Menu</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowCart(true)}>
              <IonIcon icon={cartIcon} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
  {menuItems? (
    Object.entries(groupedMenuItems).map(([itemType, items]) => (
      <IonCard key={itemType} style={{ boxShadow: 'none', border: 'none' }}>
        <IonCardHeader>
          <IonCardTitle className={league_spartan.className}>{itemType.charAt(0).toUpperCase() + itemType.slice(1)}</IonCardTitle>
        </IonCardHeader>
        <Cart open={showCart} onDidDismiss={() => setShowCart(false)} cart={cart}/>
        <IonCardContent> 
          {items.map((item) => (
            <Card key={item.id} className="w-full max-w-[48rem] flex-row mb-4">
              <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
                <img
                  src={item.item_image_url || 'default-image-url'}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className='p-5'>
                <Typography variant="h2" className="mb-2">
                  {item.item_name}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  ${item.item_price}
                </Typography>
                <Typography color="gray" className="mb-4 font-normal">   
                  {item.item_description}
                </Typography>
                <a href="#" className="inline-block">
                  <Button
                    onClick={() => addToCart(item)}
                    variant="text"
                    className="flex items-center gap-2"
                  >
                    Add
                  </Button>
                </a>
              </CardBody>
            </Card>
          ))}
        </IonCardContent>
      </IonCard>
    ))
  ) : (
    <div>Loading...</div>
  )}
</IonContent>

    </IonPage>
  );
};

export default Menu;
