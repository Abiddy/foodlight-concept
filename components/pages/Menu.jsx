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
  IonList,
  IonButtons,
  IonIcon,
  IonButton,
  IonMenuButton,
} from '@ionic/react';
import { MenuCard } from '../MenuCard';
import { League_Spartan } from 'next/font/google';
import Cart from './Cart';
import Store from '../../store';


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

  const addToCart = (item) => {
    // const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    // if (existingItem) {
    //   existingItem.quantity += 1;
    //   setCart([...cart]); 
    // } else {
    //   setCart([...cart, { ...item, quantity: 1 }]);
    // }
  };
  
  const removeFromCart = (item) => {
    // const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    // if (existingItemIndex !== -1) {
    //   const updatedCart = [...cart];
    //   const existingItem = updatedCart[existingItemIndex];
    //   if (existingItem.quantity > 1) {
    //     existingItem.quantity -= 1;
    //   } else {
    //     // If quantity is 1, remove the item from the cart
    //     updatedCart.splice(existingItemIndex, 1);
    //   }
    //   setCart(updatedCart);
    // }
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
              <IonIcon icon={cart} />
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
          <IonList>
            {items.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))}
          </IonList>
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
