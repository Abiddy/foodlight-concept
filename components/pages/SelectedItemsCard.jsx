import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonChip } from '@ionic/react';
import { league_spartan } from './Comobos/Combos';

const SelectedItemsCard = ({ matchingItems }) => {
  // Calculate total price
  const totalPrice = matchingItems.reduce((acc, combo) => {
    return acc + combo.items[0].item_price;
  }, 0);

  return (
    <div style={{ marginBottom: '50px' }} className="p-2 text-center mt-15 mb-15 border border-gray-300 shadow-md rounded-xl relative">
      <div className="absolute top-0 right-0 p-2">
        <IonChip color="primary" className={`${league_spartan.className} text-l`}>Total: ${totalPrice.toFixed(2)}</IonChip>
      </div>
      <br/>
      <br/>
      {matchingItems.map((combo, index) => (
        <div key={index}>
   <h3  className={`${league_spartan.className} text-lg`} style={{ display: 'flex', textAlign: 'left', marginLeft: '10px'}}>{combo.category} </h3>
          {combo.items.length > 0 && (
            <div key={index}>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    {/* Image Column */}
                    <IonCol size="4" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                      {/* Replace 'imageSrc' with the actual URL of the image */}
                      <img src={combo.items[0].item_image_url} alt={combo.items[0].item_name} style={{ width: '100%', height: 'auto', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} />
                    </IonCol>
                    {/* Name and Description Column */}
                    <IonCol size="5">
                      <IonCardHeader>
                        <h2>{combo.items[0].item_name}</h2>
                      </IonCardHeader>
                      <IonCardContent>
                        <p>{combo.items[0].item_description}</p>
                      </IonCardContent>
                    </IonCol>
                    {/* Price Column */}
                    <IonCol size="3">
                      <IonCardContent>
                        <IonChip color="success" className={`${league_spartan.className} text-l mt-1 mr-4`}>${combo.items[0].item_price}</IonChip>
                      </IonCardContent>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SelectedItemsCard;
