import {  IonButton, IonChip, IonIcon, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { closeCircle } from 'ionicons/icons';

const league_spartan = League_Spartan({ weight: ['400'], subsets: ['latin'] });

const BuildOrderModal = ({ category, keywords, orders, categoryIcons, onAdd, setOrders  }) => {
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
      <div className="modal-content" style={{ padding: '20px', backgroundColor: 'rgb(228, 84, 30)'}}>
        <h3  style={{ paddingTop: '20px', textAlign: 'center', color: 'white'}} className={league_spartan.className}>Select preference</h3>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
          {keywords.map((keyword) => (
            <IonButton 
            size='small'
            shape='round'
              color={selectedKeywords.includes(keyword) ? 'dark' : 'light'}
              key={keyword}
              onClick={() => handleKeywordToggle(keyword)}
              className={selectedKeywords.includes(keyword) ? 'selected' : ''}
              style={{ marginBottom: '8px',  '--box-shadow': 'none' }}
            >
              {keyword}
            </IonButton>
          ))}
        </div>

        <br/>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
        <IonButton    style={{ marginBottom: '20px',  '--box-shadow': 'none' }} shape='round' color="dark" size="medium"  onClick={handleAdd}>Add</IonButton>
        </div>

          {orders.map((order, index) => {
            if (order[category]) {
              return (
                <div key={index} style={{ display: 'flex', justifyContent: 'center'}}>
                  {Object.entries(order).map(([cat, keys]) => (
                    
                  <IonChip  outline={true} key={cat} style={{ backgroundColor: 'white' }} >
                    <FontAwesomeIcon icon={categoryIcons[category]} size="2x" style={{ color: 'black', padding: '10px' }} />
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

export default BuildOrderModal;
