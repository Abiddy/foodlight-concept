import {  IonButton, IonChip, IonContent, IonHeader, IonItem, IonList, IonModal, IonToolbar } from '@ionic/react';
import React, { useRef, useState } from 'react';

const MenuSelectionModal = ({ category, keywords, orders, onAdd }) => {
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

  return (  
    <>
      <div className="modal-content">
        <p>Choose your preference</p>
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
          <IonChip color="primary" onClick={handleAdd}>Add</IonChip>

          {orders.map((order, index) => {
            if (order[category]) {
              return (
                <div key={index}>
                  {Object.entries(order).map(([cat, keys]) => (
                    <div key={cat}>
                      <h3>{cat}</h3>
                      <ul>
                        {keys.map((key) => (
                          <li key={key}>{key}</li>
                        ))}
                      </ul>
                    </div>
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
