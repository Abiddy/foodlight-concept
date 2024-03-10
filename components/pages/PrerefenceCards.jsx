import React, { useState, useRef } from 'react';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonModal, IonList, IonItem, IonLabel, IonCheckbox, IonIcon } from '@ionic/react';
import { closeCircle } from 'ionicons/icons';

const keywords = {
  drinks: ["red tea", "espresso", "pistachio", "latté", "green tea", "macchiato"],
  starter: ["chicken", "pesto", "tuna", "soup", "salad", "bruschetta", "shrimp cocktail", "caprese salad", "garlic bread", "crab cakes"],
  maincourse: ["pizza", "burger", "pasta"],
  dessert: ["cake", "ice cream", "chocolate"],
};

function PreferenceCards({ itemKey, selectedCategory, keywordsSelected, handleRemoveOrder, setOrder, order }) {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const modalRef = useRef(null);

  console.log(order[itemKey])

  console.log({selectedKeywords})

  const handleKeywordSelection = (keyword) => {
    setSelectedKeywords(prevSelected => prevSelected.includes(keyword) ? prevSelected.filter(k => k !== keyword) : [...prevSelected, keyword]);
  };

  const handleConfirm = () => {
    const updatedOrder = [...order];
    console.log({updatedOrder})
    updatedOrder[itemKey][selectedCategory] = selectedKeywords;
    
  
    setOrder(updatedOrder);
    setSelectedKeywords([]); 
    modalRef.current.dismiss();
  };
  

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <div >
        <div onClick={() => modalRef.current.present()} style={{ cursor: 'pointer' }}>
            <div>{selectedCategory}</div>
            <div slot="end" id={`select-${selectedCategory}`}>
              {keywordsSelected}
            </div>
          </div>
        </div>
        <IonIcon style={{ color: 'black'}} icon={closeCircle} onClick={() => handleRemoveOrder(itemKey)}/>
      </div>

      <IonModal ref={modalRef} id={`modal-${selectedCategory}`}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modalRef.current.dismiss()}>Cancel</IonButton>
            </IonButtons>
            <IonTitle>Select Keywords</IonTitle>
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
