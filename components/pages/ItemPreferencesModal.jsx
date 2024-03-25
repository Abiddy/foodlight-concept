import React from 'react';
import { IonModal } from '@ionic/react';

const ItemPreferencesModal = ({ itemPreferences, closeModal }) => {
  return (
    <IonModal onClose={closeModal}>
      <h2>Item Preferences</h2>
      {itemPreferences.map(preference => (
        <div key={preference.id}>
          <h3>{preference.optionHeader}</h3>
          <p>Required: {preference.required ? 'Yes' : 'No'}</p>
          <p>Type: {preference.optionType}</p>
          <p>Options: {preference.optionList}</p>
        </div>
      ))}
    </IonModal>
  );
};

export default ItemPreferencesModal;
