// ComboCard.tsx
import React, { useState, useEffect } from 'react';
import { League_Spartan } from 'next/font/google';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../types/supabase';
import ItemCard from './Item-Cards';
import { IonRange } from '@ionic/react';

const league_spartan = League_Spartan({ weight: ['600'], subsets: ['latin'] });

type MenuItems = Database['public']['Tables']['menu_items']['Row'] & { item_image_url?: string | null };
const supabase = createClientComponentClient<Database>();

const ComboCard = ({ userId, combination }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10);

  const fetchMenuItems = async (): Promise<MenuItems[]> => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('id, item_name, item_description, item_price, item_image, uid')
        .eq('uid', userId); // Add a filter to only fetch items belonging to the logged-in user
  
      if (error) {
        console.error('Error fetching menu items:', error);
        return [];
      }
  
      // Fetch public URLs for each image
      const itemsWithUrls = await Promise.all(
        data.map(async (item) => {
          const { data: publicUrl, error: urlError } = await supabase.storage.from('menu-images').getPublicUrl(item.item_image || '');
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

  const calculateTotalPrice = (itemIds, menuItems) => {
    let totalPrice = 0;

    Object.values(itemIds).forEach((items) => {
      items.forEach((itemId) => {
        const selectedItem = menuItems.find((item) => item.id === itemId);
        if (selectedItem) {
          totalPrice += selectedItem.item_price;
        }
      });
    });

    return totalPrice;
  };

  const filteredCombinations = combination.filter((combo) => {
    const totalPrice = calculateTotalPrice(combo.item_ids, menuItems);
    return totalPrice <= maxPrice;
  });

  console.log({filteredCombinations})
 

  return (
    <div style={{ maxWidth: '500px' }}>

     <IonRange 
     aria-label="Range with ionChange" 
     pin={true}       
     onIonChange={({ detail }) =>  setMaxPrice(detail.value)}>
     </IonRange>
      {filteredCombinations.map((combo, index) => (
        <div key={index} style={{ marginBottom: '50px' }} className=" rounded-lg p-6 text-center mt-15 mb-15  dark:bg-gray-900">
          <div className="flex justify-between p-5">
            <h3 className={`${league_spartan.className} text-3xl`}>#{combo.index[0]}</h3>
            <p className={`${league_spartan.className} text-3xl`}>${calculateTotalPrice(combo.item_ids, menuItems).toFixed(2)}</p>
          </div>
          <div className='pl-5 pr-5'>
            {Object.entries(combo.item_ids).map(([header, items]) => (
              <div key={header} className="mb-4">
                <div className="flex items-center gap-0 mt-7 mb-5">
                  <h3 className={`${league_spartan.className} text-2xl mt-1 mr-4`}>{header}</h3>
                </div>
                {items.map((itemId) => {
                  const selectedItem = menuItems.find((item) => item.id === itemId);
                  if (selectedItem) {
                    return <ItemCard key={itemId} item={selectedItem} />;
                  } else {
                    return null; 
                  }
                })}                                  
              </div>
            ))}
          </div>
        </div> 
      ))}
    </div>
  );
};

export default ComboCard;
