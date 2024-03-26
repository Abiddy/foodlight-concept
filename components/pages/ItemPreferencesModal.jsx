import React, { useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, closeOutline, removeCircle } from 'ionicons/icons';

const ItemPreferencesModal = ({ item, isOpen, setIsOpen }) => {

    const renderOptions = () => {
        const [options, setOptions] = useState([]);

        const handleDecrease = (optionArray) => {
            if (optionArray[1] > 0) {
                const updatedOptions = [...options];
                const index = updatedOptions.findIndex(opt => opt[0] === optionArray[0]);
                if (index !== -1) {
                    updatedOptions[index][1] -= 1;
                    setOptions(updatedOptions);
                }
            }
        };
    
        const handleIncrease = (optionArray) => {
            const updatedOptions = [...options];
            const index = updatedOptions.findIndex(opt => opt[0] === optionArray[0]);
            if (index !== -1) {
                updatedOptions[index][1] += 1;
                setOptions(updatedOptions);
            }
        };
        if (!item || !item.item_preferences) return null;
    
        return item.item_preferences.map((preference) => (
          <div key={preference.id}>
            <p>{preference.optionHeader}</p>
            {/* Render based on optionType */}
            {preference.optionType === 'select-one' && (
              <ul>
                {preference.optionList.split(',').map((option) => (
                  <li key={option}>
                    <input type="radio" name={preference.optionHeader} value={option} /> {option}
                  </li>
                ))}
              </ul>
            )}
            {preference.optionType === 'select-multiple' && (
              <ul>
                {preference.optionList.split(',').map((option) => (
                  <li key={option}>
                    <input type="checkbox" name={preference.optionHeader} value={option} /> {option}
                  </li>
                ))}
              </ul>
            )}
{preference.optionType === 'increase-decrease-option' && (
    <ul>
        {preference.optionList.split(',').map((option, index) => { // Add index parameter to map function
            const optionArray = [option, 0]; // Initialize quantity to 0 for each option
            return (
                <li key={optionArray[0]}>
                    <div>
                        <span>{optionArray[0]}</span>
                        <IonIcon size='s' icon={removeCircle} onClick={() => handleDecrease(optionArray, index)}/> {/* Pass index to handleDecrease */}
                        <span>{optionArray[1]}</span>
                        <IonIcon size='s' icon={addCircle} onClick={() => handleIncrease(optionArray, index)}/> {/* Pass index to handleIncrease */}
                    </div>
                </li>
            );
        })}
    </ul>
)}
          </div>
        ));
      };

      


  return (
    <IonModal isOpen={isOpen}>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="end">
            <IonIcon icon={closeOutline} size="large" onClick={() => setIsOpen(false)}/>
          {/* <IonButton onClick={() => setIsOpen(false)}>Close</IonButton> */}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">

    <h2 style={{ fontWeight: 'bold' }}>{item.item_name}</h2>
  <p style={{ fontSize: '0.9rem', color: '#777' }}>{item.item_description}</p>
  <img
    src={item.item_image_url || 'default-image-url'}
    alt="item-image"
    style={{ width: '100%', borderRadius: '10px', marginTop: '10px' }}
  />

        {/* {item && item.item_preferences.map(preference => (
        <div key={preference.id}>
            <h3>{preference.optionHeader}</h3>
            <p>Required: {preference.required ? 'Yes' : 'No'}</p>
            <p>Type: {preference.optionType}</p>
            <p>Options: {preference.optionList}</p>
        </div>
        ))} */}
                {renderOptions()}
    </IonContent>
  </IonModal>
  );
};

export default ItemPreferencesModal;
