import React, { useState, useRef } from 'react';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonModal, IonList, IonItem, IonLabel, IonCheckbox, IonIcon, IonBadge } from '@ionic/react';
import { removeCircleSharp } from 'ionicons/icons';

const keywords = {
  drinks: ["red tea", "espresso", "pistachio", "latté", "green tea", "macchiato"],
  starter: ["chicken", "pesto", "tuna", "soup", "salad", "bruschetta", "shrimp cocktail", "caprese salad", "garlic bread", "crab cakes"],
  maincourse: ["pizza", "burger", "pasta"],
  dessert: ["cake", "ice cream", "chocolate"],
};

function PreferenceCards({ itemKey, selectedCategory, keywordsSelected, handleRemoveOrder, setOrder, order }) {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const modalRef = useRef(null);

  const handleKeywordSelection = (keyword) => {
    setSelectedKeywords(prevSelected => prevSelected.includes(keyword) ? prevSelected.filter(k => k !== keyword) : [...prevSelected, keyword]);
  };

  const handleConfirm = () => {
    const updatedOrder = [...order];
    updatedOrder[itemKey][selectedCategory] = selectedKeywords;
    
  
    setOrder(updatedOrder);
    setSelectedKeywords([]); 
    modalRef.current.dismiss();
  };
  

  return (
    <>
      <div style={{ display: 'inline-block', border: '0.5px solid black', borderRadius: '20px', padding: '5px', margin: '5px' }}>  
        <div onClick={() => modalRef.current.present()} style={{ cursor: 'pointer', display: 'inline-block', marginRight: '30px' }} >
            <div>{selectedCategory}</div>
            <IonBadge slot="end" id={`select-${selectedCategory}`}>
              {keywordsSelected}
            </IonBadge>
          </div>
        <IonIcon style={{ color: 'black'}} icon={removeCircleSharp} onClick={() => handleRemoveOrder(itemKey)}/>
      </div>

      <IonModal ref={modalRef} id={`modal-${selectedCategory}`}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modalRef.current.dismiss()}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>{selectedCategory}</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={handleConfirm}>Confirm</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {keywords[selectedCategory].map((keyword, index) => (
              <IonItem key={index}>
                <IonLabel>{keyword}</IonLabel>
                <IonCheckbox aria-label='abc' slot="end" checked={selectedKeywords.includes(keyword)} onIonChange={() => handleKeywordSelection(keyword)} />
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
}

export default PreferenceCards;
