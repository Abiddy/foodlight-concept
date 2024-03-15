import { IonCardContent, IonCardHeader, IonChip, IonCol, IonGrid, IonRow } from '@ionic/react';
import React from 'react';
import { league_spartan } from './Comobos/Combos';

const SelectedItemsCard = ({ combinations }) => {

  const truncateText = (text, maxWords) => {
    const words = text?.split(/\s+/);
    if (words?.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
};

  console.log({combinations})
  return (
    <div>
      {combinations.map((combo, index) => (
        <div key={index}  style={{ marginBottom: '50px' }} className="p-2 text-center mt-15 mb-15 border border-gray-300 shadow-md rounded-xl relative">
          <div className="absolute right-0 p-2">
          <IonChip color="success" className={`${league_spartan.className} text-l mt-1 mr-4`}>Total: ${combo.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)}</IonChip>
          </div>
          <br />
          <br />
          {combo.map((item, itemIndex) => (
            <div key={itemIndex}>
            <IonChip color="primary" className={`${league_spartan.className} text-lg`} >{item.item_category}</IonChip>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="4" style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                      <img src={item.item_image_url} alt={item.item_name} style={{ width: '100%', height: 'auto', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} />
                    </IonCol>
                    <IonCol size="5">          
                      <h3 style={{ fontWeight: 'bold'}}>{item.item_name}</h3>         
                      <p style={{ color: '#888', fontSize: '12px' }}>{truncateText(item.item_description, 10)}</p> 
                    </IonCol>
                    <IonCol size="3">       
                        <IonChip color="success" className={`${league_spartan.className} text-l mt-1 mr-4`}>${item.item_price}</IonChip>             
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SelectedItemsCard;
