import React, { useState, useEffect } from 'react';
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
  IonItem,
  IonThumbnail,
  IonLabel,
  IonCardSubtitle,
  IonButton,
  IonChip,
} from '@ionic/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { MenuCard } from '../MenuCard';

const supabase = createClientComponentClient(); // Initialize Supabase client

const MenuItemCard = ({ item, cart, addToCart, removeFromCart }) => {
  const cartItem = cart.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  console.log({cartItem})
  console.log({quantity})

  return (
    <IonItem lines="none">
      <IonCardContent style={{ border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <IonThumbnail slot="start">
        <img
          src={item.item_image_url || 'default-image-url'}
          alt={item.item_name}
          className="object-cover w-full h-full rounded"
        />
      </IonThumbnail>
        <IonLabel>{item.item_name}</IonLabel>
        <IonCardSubtitle>{item.item_description}</IonCardSubtitle>
        <IonCardSubtitle>${item.item_price}</IonCardSubtitle>
        <IonChip style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IonButton size="small" fill="outline"  shape="round" onClick={() => removeFromCart(item)}>-</IonButton>
          <IonLabel>{quantity}</IonLabel>
          <IonButton size="small" fill="outline" shape="round" onClick={() => addToCart(item)}>+</IonButton>
        </IonChip>
      </IonCardContent>
    </IonItem>
  );
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('id, item_name, item_description, item_price, item_image, uid, item_type')
        .eq('uid', '1f358f02-322f-4edd-af31-4bec37bd0ac9'); // Add a filter to only fetch items belonging to the logged-in user

      if (error) {
        console.error('Error fetching menu items:', error);
        return [];
      }

      // Fetch public URLs for each image
      const itemsWithUrls = await Promise.all(
        data.map(async (item) => {
          const { data: publicUrl, error: urlError } = await supabase.storage.from('menu-images').getPublicUrl(
            item.item_image || ''
          );
          if (urlError) {
            console.error('Error fetching public URL:', urlError);
            throw urlError;
          }

          return {
            ...item,
            item_image_url: publicUrl?.publicUrl || null,
          };
        })
      );

      return itemsWithUrls;
    } catch (error) {
      console.error('Error fetching menu items with image URLs:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAndSetMenuItems = async () => {
      try {
        const itemsData = await fetchMenuItems();
        setMenuItems(itemsData);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        // Handle the error as needed
      }
    };

    fetchAndSetMenuItems();
  }, []);

  // Group menu items by item_type
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
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {Object.entries(groupedMenuItems).map(([itemType, items]) => (
          <IonCard key={itemType} style={{ boxShadow: 'none', border: 'none' }}>
            <IonCardHeader>
              <IonCardTitle>{itemType}</IonCardTitle>
            </IonCardHeader>
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
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Menu;
