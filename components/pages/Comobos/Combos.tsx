import React, { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../types/supabase';
import ItemCard from './Item-Cards';
import { IonRange } from '@ionic/react';
import Store from '../../../store';
import { setMenuItems } from '../../../store/actions';


const league_spartan = League_Spartan({ weight: ['700'], subsets: ['latin'] });

type MenuItems = Database['public']['Tables']['menu_items']['Row'] & { item_image_url?: string | null };
const supabase = createClientComponentClient<Database>();

const ComboCard = ({ userId, combination }) => {
  const [maxPrice, setMaxPrice] = useState(10); 

  useEffect(() => {
    const fetchMenuItems = async (): Promise<MenuItems[]> => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('id, item_name, item_description, item_price, item_image, uid, item_type')
          .eq('uid', userId); 
  
        if (error) {
          console.error('Error fetching menu items:', error);
          return [];
        }
  
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
  
    const fetchAndSetMenuItems = async () => {
      try {
        const itemsData = await fetchMenuItems();
        setMenuItems(itemsData); // Update the store with fetched menu items
      } catch (error) {
        console.error('Error fetching menu items:', error);
        // Handle the error as needed
      }
    };
  
    fetchAndSetMenuItems();
  }, [userId]);

  const menuItems = Store.useState(s => s.menuItems); 

  const calculateTotalPrice = (itemIds) => {
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
    const totalPrice = calculateTotalPrice(combo.item_ids); // Use menuItems retrieved from the store
    return totalPrice <= maxPrice;
  });

  console.log({filteredCombinations});
 
  return (
    <div style={{ maxWidth: '500px', marginTop: '30px' }}>
        <div  style={{ 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: 'white', 
              borderRadius: '30px', 
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              padding: '25px',
              maxWidth: '250px',
              marginBottom: '20px',
              margin: '20px auto',
              boxSizing: 'border-box',
              maxHeight: '50px',
            }}>
          <p className={league_spartan.className} style={{ marginRight: '1rem', color: 'black' }}>Budget</p>
          <IonRange 
            style={{ padding: '0' }}
            ticks={true} 
            snaps={true}
            aria-label="Range with ionChange" 
            pin={true}    
            max={300}   
            onIonChange={({ detail }) =>  setMaxPrice(detail.value)}
          />
        </div>

        {filteredCombinations.map((combo, index) => {
  // Filter out the headers/keys with empty arrays
  const nonEmptyHeaders = Object.entries(combo.item_ids).filter(([header, items]) => items.length > 0);

  return (
    <div key={index} style={{ marginBottom: '50px' }} className="p-2 text-center mt-15 mb-15  border border-gray-300 shadow-md rounded-xl">
      <div className="flex justify-between p-3">
        <h1 className={league_spartan.className}>Combo #{combo.index[0]}</h1>
        <h1 className={league_spartan.className}>${calculateTotalPrice(combo.item_ids)}</h1>
      </div>
      <div className='pl-5 pr-5'>
        {nonEmptyHeaders.map(([header, items]) => (
          <div key={header} className="mb-4">
            <div className="flex items-center gap-0 mt-7 mb-5">
              <h3 className={`${league_spartan.className} text-2xl mt-1 mr-4`}>{header}</h3>
            </div>
            {items.map((itemId) => {
              const selectedItem = menuItems.find((item) => item.id === itemId); // Access menuItems from the store
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
  );
})}

    </div>
  );
};

export default ComboCard;
