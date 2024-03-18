import React, { useEffect, useState } from 'react';
import { IonModal, IonList, IonItem, IonChip, IonButton } from '@ionic/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { league_spartan_light } from './Menu';
import { league_spartan } from './Comobos/Combos';



const supabase = createClientComponentClient();

const ModalWithFilter = ({ isOpen, setIsOpen, groupedMenuItems, replaceItemInCombo }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [menu_keywords, setKeywords] = useState([])

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('menu_keywords' )
          .eq('id', '89338523-a2e1-4cf2-83a7-52e828eabc01')
          .single(); 
  
        if (error) {
          console.error('Error fetching keywords:', error);
          return [];
        }
        return data.menu_keywords || [];
      } catch (error) {
        console.error('Error fetching keywords:', error);
        return [];
      }
    };
  
    const fetchAndSetMenuKeywords = async () => {
      try {
        const itemsData = await fetchKeywords();
        setKeywords(itemsData); // Update the store with fetched menu items
      } catch (error) {
        console.error('Error fetching menu items:', error);
        // Handle the error as needed
      }
    };
  
    fetchAndSetMenuKeywords();
  }, []);

  console.log({menu_keywords})


  const keywords = menu_keywords;

  useEffect(() => {
    setFilteredItems(Object.values(groupedMenuItems).flat());
  }, [groupedMenuItems]);

  // Filter items based on selected keyword
  const filterItems = (keyword) => {
    const filtered = [];
    Object.values(groupedMenuItems).forEach((items) => {
      items.forEach((item) => {
        if (
          item.item_name.toLowerCase().includes(keyword) ||
          (item.item_description &&
            item.item_description.toLowerCase().includes(keyword))
        ) {
          filtered.push(item);
        }
      });
    });
    setFilteredItems(filtered);
  };

  // Reset filter and close modal
  const closeAndResetFilter = () => {
    setFilteredItems([]);
    setIsOpen(false);
  };

  return (
    <IonModal
      id="example-modal"
      isOpen={isOpen}
      onDidDismiss={closeAndResetFilter}
    >
      <div className="wrapper" style={{ maxHeight: '80vh', overflowY: 'auto' , padding: '10px'}}>
      <div className={`${league_spartan.className}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5px' }}>
          Select Item
        </div>
        <IonList lines="none">

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', padding: '10px', fontSize: '8px' , marginTop: '10px', marginBottom: '40px'}}>
            {keywords?.map((keyword, index) => (
              <IonChip color='light' key={index} onClick={() => filterItems(keyword)}>
                {keyword}
              </IonChip>
            ))}
          </div>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <IonItem
                key={index}
                button={true}
                detail={false}
                onClick={() => {
                    setIsOpen(false); // Close the modal
                    replaceItemInCombo(item); // Function to replace the item in the combo
                  }}
                style={{ }}
              >
                <img
                  src={item.item_image_url || 'default-image-url'}
                  alt="card-image"
                  className="object-cover m-0 w-12 h-12 rounded-full"
                  style={{ minWidth: '42px', minHeight: '42px', padding: '5px' }}
                />
                <p style={{ fontSize: '0.9rem', marginLeft: '10px' }}>{item.item_name}</p>

                <IonButton style={{ marginLeft: 'auto' }}>Replace</IonButton>
           

              </IonItem>
            ))
          ) : (
            <p>No items matching the selected keyword.</p>
          )}
        </IonList>
      </div>
    </IonModal>
  );
};

export default ModalWithFilter;
