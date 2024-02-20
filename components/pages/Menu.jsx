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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { MenuCard } from '../MenuCard';
import { League_Spartan } from 'next/font/google';
import Cart from './Cart';
import { fetchMenuItemsFromCombo } from './Comobos/Combos';


const league_spartan = League_Spartan({ weight: ['600'], subsets: ['latin'] });

// const supabase = createClientComponentClient(); // Initialize Supabase client

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  // const fetchMenuItems = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('menu_items')
  //       .select('id, item_name, item_description, item_price, item_image, uid, item_type')
  //       .eq('uid', '1f358f02-322f-4edd-af31-4bec37bd0ac9'); 
  
  //     if (error) {
  //       console.error('Error fetching menu items:', error);
  //       return [];
  //     }

  //     const itemsWithUrls = await Promise.all(
  //       data.map(async (item) => {
  //         const { data: publicUrl, error: urlError } = await supabase.storage.from('menu-images').getPublicUrl(item.item_image || '');
  //         if (urlError) {
  //           console.error('Error fetching public URL:', urlError);
  //           throw urlError;
  //         }
  
  //         return {
  //           ...item,
  //           item_image_url: publicUrl?.publicUrl || null,
  //         };
  //       })
  //     );
  
  //     return itemsWithUrls;
  //   } catch (error) {
  //     console.error('Error fetching menu items with image URLs:', error);
  //     return [];
  //   }
  // };

  // useEffect(() => {
  //   const fetchAndSetMenuItems = async () => {
  //     try {
  //       const itemsData = await fetchMenuItems();
  //       setMenuItems(itemsData);
  //     } catch (error) {
  //       console.error('Error fetching menu items:', error);
  //       // Handle the error as needed
  //     }
  //   };
  
  //   fetchAndSetMenuItems();
  // }, []);
  

  // Group menu items by item_type


  // useEffect(() => {
  //   const fetchMenuItems = async () => {
  //     try {
  //       const itemsData = await fetchMenuItemsFromCombo('1f358f02-322f-4edd-af31-4bec37bd0ac9'); // Pass the appropriate userId here
  //       setMenuItems(itemsData);
  //     } catch (error) {
  //       console.error('Error fetching menu items:', error);
  //       // Handle the error as needed
  //     }
  //   };

  //   if (menuItems.length === 0) {
  //     fetchMenuItems();
  //   }
  // }, [menuItems]);


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
      // If the item already exists in the cart, update its quantity
      existingItem.quantity += 1;
      setCart([...cart]); // Trigger state update to re-render
    } else {
      // If the item doesn't exist in the cart, add it with quantity 1
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

  console.log({cart})

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
  {menuItems.length > 0 ? (
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
