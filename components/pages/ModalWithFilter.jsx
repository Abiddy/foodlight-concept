import React, { useEffect, useState } from 'react';
import { IonModal, IonList, IonItem, IonChip, IonButton, IonPopover, IonIcon, IonBadge } from '@ionic/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { league_spartan, league_spartan_light } from './Comobos/Combos';
import { filter, filterCircle, filterOutline } from 'ionicons/icons';

const supabase = createClientComponentClient();

const ModalWithFilter = ({ isOpen, setIsOpen, groupedMenuItems, replaceItemInCombo, remainingBudget }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [menu_keywords, setKeywords] = useState([]);
  const [itemsBelowBudget, setItemsBelowBudget] = useState([]);
  const [itemsAboveBudget, setItemsAboveBudget] = useState([]);

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
        setKeywords(itemsData); 
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
  
    fetchAndSetMenuKeywords();
  }, []);

  useEffect(() => {
    setFilteredItems(Object.values(groupedMenuItems).flat());
  }, [groupedMenuItems]);

  useEffect(() => {
    const belowBudget = [];
    const aboveBudget = [];
  
    filteredItems.forEach((item) => { // Loop directly through filteredItems
      if (item.item_price <= remainingBudget) {
        belowBudget.push(item);
      } else {
        aboveBudget.push(item);
      }
    });
  
    setItemsBelowBudget(belowBudget);
    setItemsAboveBudget(aboveBudget);
  }, [filteredItems, remainingBudget]);
  

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
  const [showPopover, setShowPopover] = useState(false);

  return (
    <IonModal
      id="example-modal"
      isOpen={isOpen}
      onDidDismiss={closeAndResetFilter}
    >
      <div className="wrapper" style={{ maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <h3 className={`${league_spartan_light.className}`}>
            Replace Item
        </h3>
        <IonIcon
            icon={filterCircle}
            style={{ fontSize: '1rem', cursor: 'pointer' }} 
            onClick={(e) => {
            e.persist();
            setShowPopover(true);
            }}
        />
        </div>
        
        {/* IonChip keywords section */}
        <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
        side="top"
      >
          <div className={`${league_spartan.className}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            Select Keywords
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', padding: '10px', fontSize: '8px', maxWidth: '300px' }}>
          {menu_keywords?.map((keyword, index) => (
            <IonChip color='primary' key={index} onClick={() => filterItems(keyword)}>
              {keyword}
            </IonChip>
          ))}
        </div>
      </IonPopover>
      <IonList >


        {/* BELOW BUDGET */}
          {itemsBelowBudget.length > 0 && (
            <div>
                <div style={{ marginTop: '10px',  marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <IonBadge  style={{ fontSize: '14px'}} className={`${league_spartan.className}`} color='primary'>Below Budget</IonBadge>
              </div>
              {itemsBelowBudget.map((item, index) => (
                <IonItem
                  key={index}
                  button={true}
                  detail={false}
                  onClick={() => {
                    setIsOpen(false); 
                    replaceItemInCombo(item); 
                  }}
                  style={{ margin: '20px'}}
                >
                  <img
                    src={item.item_image_url || 'default-image-url'}
                    alt="card-image"
                    className="object-cover m-0 w-12 h-12 rounded-full"
                    style={{ minWidth: '42px', minHeight: '42px', padding: '5px' }}
                  />
                  <p  className={`${league_spartan_light.className}`} style={{ fontSize: '0.9rem', marginLeft: '10px' }}>{item.item_name}</p>

                  <IonChip color='success' className={`${league_spartan.className}`} style={{ marginLeft: 'auto', fontSize: '14px' }}>${item.item_price}</IonChip>
                </IonItem>
              ))}
            </div>
          )}


          {/* ABOVE BUDGET */}
          {itemsAboveBudget.length > 0 && (
            <div>
                <div style={{ marginTop: '10px',  marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <IonBadge  style={{ fontSize: '14px'}} className={`${league_spartan.className}`} color='warning'>Above Budget</IonBadge>
              </div>
              {itemsAboveBudget.map((item, index) => (
                <IonItem
                  key={index}
                  button={true}
                  detail={false}
                  onClick={() => {
                    setIsOpen(false);
                    replaceItemInCombo(item); 
                  }}
                  style={{ padding: '5px'}}
                >
                  <img
                    src={item.item_image_url || 'default-image-url'}
                    alt="card-image"
                    className="object-cover m-0 w-12 h-12 rounded-full"
                    style={{ minWidth: '42px', minHeight: '42px', padding: '5px' }}
                  />
                  <p className={`${league_spartan_light.className}`} style={{ fontSize: '0.9rem', marginLeft: '10px' }}>{item.item_name}</p>

                  <IonChip color='success' className={`${league_spartan.className}`} style={{ marginLeft: 'auto', fontSize: '14px' }}>${item.item_price}</IonChip>
                </IonItem>
              ))}
            </div>
          )}
        </IonList>
      </div>
    </IonModal>
  );
};

export default ModalWithFilter;
