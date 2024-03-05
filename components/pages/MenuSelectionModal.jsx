import {  IonChip, IonIcon, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { closeCircle } from 'ionicons/icons';

const league_spartan = League_Spartan({ weight: ['400'], subsets: ['latin'] });

const MenuSelectionModal = ({ category, keywords, orders, categoryIcons, onAdd, setOrders  }) => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleKeywordToggle = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((kw) => kw !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleAdd = () => {
    const newOrder = { [category]: selectedKeywords };
    onAdd(newOrder); 
    setSelectedKeywords([]);
  };

  console.log({orders})

  const handleRemoveOrder = (indexToRemove) => {
    const updatedOrders = orders.filter((order, index) => index !== indexToRemove);
    // Update the state with the filtered orders
    setOrders(updatedOrders);
  };
  

  return (  
    <>
      <div className="modal-content" style={{ padding: '20px'}}>
        <p  style={{ paddingTop: '20px', textAlign: 'center'}} className={league_spartan.className}>Choose your preference</p>
        <br/>
        {keywords.map((keyword) => (
           <IonChip 
           color={selectedKeywords.includes(keyword) ? 'tertiary' : 'secondary'}
            key={keyword}
            onClick={() => handleKeywordToggle(keyword)}
            className={selectedKeywords.includes(keyword) ? 'selected' : ''}
          >
            {keyword}
          </IonChip>
        ))}
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IonChip color="primary" onClick={handleAdd}>Add</IonChip>
        </div>

          {orders.map((order, index) => {
            if (order[category]) {
              return (
                <div key={index}>
                  {Object.entries(order).map(([cat, keys]) => (
                  <IonChip key={cat} color="success">
                    <FontAwesomeIcon icon={categoryIcons[category]} size="1x" style={{ color: 'grey', padding: '10px' }} />
                    <IonLabel style={{ color: 'black', display: 'flex', alignItems: 'center' }}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex' }}>
                        {keys.map((key) => (
                          <li key={key} style={{ marginRight: '10px' }}>{key}</li>
                        ))}
                      </ul>
                    </IonLabel>
                    <IonIcon style={{ color: 'black'}} icon={closeCircle} onClick={() => handleRemoveOrder(index)}/>
                  </IonChip>
                  ))}
                </div>
              );
            } else {
              return null; 
            }
          })}
 
      </div>
      </>
  );
};

export default MenuSelectionModal;
