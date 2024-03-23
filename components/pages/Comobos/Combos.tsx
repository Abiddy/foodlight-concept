import React, { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../types/supabase';
import ItemCard from './Item-Cards';
import { IonBadge, IonChip, IonIcon } from '@ionic/react';
import Store from '../../../store';
import { setMenuItems } from '../../../store/actions';
import { caretBackOutline, caretForwardOutline, cashOutline } from 'ionicons/icons';
import { league_spartan_bold } from '../BuildOrder';


export const league_spartan = League_Spartan({ weight: ['500'], subsets: ['latin'] });
export const league_spartan_light = League_Spartan({ weight: ['500'], subsets: ['latin'] });

type MenuItems = Database['public']['Tables']['menu_items']['Row'] & { item_image_url?: string | null };
const supabase = createClientComponentClient<Database>();

const ComboCard = ({ userId, combination }) => {
  const [budget, setBudget] = useState(35);

  console.log({combination})

  useEffect(() => {
    const fetchMenuItems = async (): Promise<MenuItems[]> => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('id, item_name, item_description, item_price, item_image, uid, item_type, item_category' )
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
    const totalPrice = calculateTotalPrice(combo.item_ids); 
    return totalPrice <= budget;
  });

  const decreaseBudget = () => {
    const newBudget = budget - 5;
    setBudget(newBudget);
  };
  
  const increaseBudget = () => {
    const newBudget = budget + 5;
    setBudget(newBudget);
  };

   const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };
 
  return (
    <div style={{ maxWidth: '500px', marginTop: '10px' }}>
              <div style={{ textAlign: 'center', width: '100%' }} >
              <IonBadge
                className={league_spartan.className}
                style={{
                  margin: '20px',
                  padding: '10px',
                  backgroundColor: 'white',
                  color: 'black',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                color='primary'
                 >Chef Reccomended Meals
                 </IonBadge>
        </div>
        <div style={{ textAlign: 'center', padding: '8px' }}>
          <IonIcon icon={caretBackOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingRight: '7px' }} onClick={decreaseBudget} />
          <div style={{       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', color: '#2D3142', borderRadius: '20px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '20px', margin: '0 auto' }}>
            <IonIcon icon={cashOutline} style={{ fontSize: '30px', marginRight: '10px', color: '#333646' }} />
            <input type="number" value={budget} onChange={handleBudgetChange} className={league_spartan_bold.className} style={{ fontSize: '30px', backgroundColor: 'transparent', border: 'none', color: '#333646', textAlign: 'center', width: '50px' }} />
          </div>
          <IonIcon icon={caretForwardOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingLeft: '7px' }} onClick={increaseBudget} />
        </div>

        {filteredCombinations.map((combo, index) => {
         const nonEmptyHeaders = Object.entries(combo.item_ids).filter(([header, items]) => items.length > 0);
          return (
            
            <div key={index} style={{ marginBottom: '50px' }} className="p-2 text-center mt-15 mb-15  border border-gray-300 shadow-md rounded-xl">
              <div className="flex justify-between p-3">
                <h1 className={league_spartan.className}>Combo #{combo.index[0]}</h1>
                <h1 className={league_spartan.className}>${calculateTotalPrice(combo.item_ids)}</h1>
              </div>
              <div className='pl-5 pr-5'>
                {nonEmptyHeaders.map(([header, items]) => (
                  <div key={header} className="mb-1">
                    <div className="flex items-center gap-0 ">
                      <IonChip className={`${league_spartan.className} text-l mt-1 mr-4`} color="success">{header}</IonChip>
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
