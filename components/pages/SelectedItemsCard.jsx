import { IonBadge, IonButton, IonCard, IonCardContent, IonChip, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal} from '@ionic/react';
import React, { useRef, useState } from 'react';
import {  Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { league_spartan, league_spartan_light } from './Menu';
import Store from '../../store';
import ModalWithFilter from './ModalWithFilter';
import { arrowForward, refresh} from 'ionicons/icons';


const SelectedItemsCard = ({ combinations, budget }) => {

  console.log({combinations})

  const truncateText = (text, maxWords) => {
    const words = text?.split(/\s+/);
    if (words?.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
};

const [isOpen, setIsOpen] = useState(false);
const menuItems = Store.useState(s => s.menuItems);

 const groupedMenuItems = menuItems.reduce((acc, item) => {
  const { item_type } = item;
  if (!acc[item_type]) {
    acc[item_type] = [];
  }
  acc[item_type].push(item);
  return acc;
}, {});

console.log({combinations})

const [indexToChange, setindexToChange] = useState([])

const replaceItemInCombo = (newItem) => {
  const [combinationIndex, itemIndex] = indexToChange;
  const updatedCombinations = [...combinations];  
  updatedCombinations[combinationIndex][itemIndex] = newItem;
}

const [remainingBudget, setRemainingBudget] = useState()
console.log(remainingBudget)
const setComboPrice = (data) => {
  const [combo, item_price] = data
  const totalPrice = combo.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)
  const budgetLeft = (budget - totalPrice) + item_price;

  setRemainingBudget(budgetLeft.toFixed(2))
}

  return (
    <IonCardContent style={{ padding: '0px', marginTop: '30px'}}> 
    <div className="w-full max-w-[23rem]">
      {combinations.map((combo, index) => (
      <IonCard key={index} style={{ padding: '20px',borderRadius: '10px', backgroundColor: 'light', minWidth: '300px', flex: '0 0 auto', marginRight: '10px' }}>
        <div className="right-0 mb-2 flex-shrink-0 ml-auto flex items-center gap-2" style={{ marginLeft: 'auto' }}>
          <IonBadge color="warning" className={`${league_spartan.className} text-l mt-1`} style={{ padding: '10px'}}>Total: ${combo.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)}</IonBadge>
          </div>


          <IonList lines="none">
          {combo.map((item, itemIndex) => (
            <IonItem key={itemIndex}>
              <img 
              src={item.item_image_url || 'default-image-url'}
              alt="card-image" 
              style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              <IonLabel className={league_spartan.className} style={{ marginLeft: '10px' }}>{item.item_name}</IonLabel>
              <IonIcon
                    icon={refresh}
                    onClick={() => {
                      setIsOpen(true);
                      setindexToChange([index, itemIndex]);
                      setComboPrice([combo, item.item_price]);
                    }}
                    shape='round'
                    className="ion-margin-end"
                    style={{
                      color: 'black',
                      fontSize: '1.3rem',
                      border: 'solid white',
                      backgroundColor: 'white',
                      // boxShadow: '0px 2px 4px rgba(0, 0, 0, 5)',
                      padding: '0px', 
                      borderRadius: '50%',

                    }}
                  />
            </IonItem>
            
          ))}
        </IonList>



   
            {/* <Button
              onClick={() => addToCart(item)}
              className="flex items-center justify-between"
              style={{
                color: 'white',
                background: '#2D3142',
                borderRadius: '9999px',
                padding: '10px 12px', 
                fontSize: '13.5px', 
                fontWeight: 'bold',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)', 
                width: '100%'
              }}
            >
              Add Combo
              <IonIcon icon={arrowForward}/>
            </Button> */}
        </IonCard>
      ))}
    </div>
      <ModalWithFilter  isOpen={isOpen}  setIsOpen={setIsOpen} groupedMenuItems={groupedMenuItems} replaceItemInCombo={replaceItemInCombo} remainingBudget={remainingBudget}/>
    </IonCardContent> 
    
  );
};

export default SelectedItemsCard;
