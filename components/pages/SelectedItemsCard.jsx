import { IonBadge, IonButton, IonCardContent, IonChip, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal} from '@ionic/react';
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
    <IonCardContent style={{ padding: '0px'}}> 
    <div className="w-full max-w-[23rem]">
      {combinations.map((combo, index) => (
      <Card key={index}  className="mt-15 mb-5 rounded-xl relative p-5" style={{ boxShadow: 'none', border: '0.8px solid'}}>
        <div className="right-0 mb-2 flex-shrink-0 ml-auto flex items-center gap-2">
          <IonBadge color="warning" className={`${league_spartan.className} text-l mt-1`} style={{ padding: '10px'}}>Total: ${combo.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)}</IonBadge>
          </div>
          {combo.map((item, index2) => (
            <Card key={index2} className="w-full max-w-[48rem] flex-row mb-4" >
              <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
                <img
                  src={item.item_image_url || 'default-image-url'}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 left-2">
                    <IonIcon
                    icon={refresh}
                    onClick={() => {
                      setIsOpen(true);
                      setindexToChange([index, index2]);
                      setComboPrice([combo, item.item_price]);
                    }}
                    shape='round'
                    className="ion-margin-end"
                    style={{
                      color: 'black',
                      fontSize: '1.3rem',
                      border: 'solid white',
                      backgroundColor: 'white',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 5)',
                      padding: '0px', 
                      borderRadius: '50%',

                    }}
                  />
                </div>
              </CardHeader>
              <CardBody className='p-2'>
              <Typography style={{ fontWeight: 'bold' ,color: '#333',fontSize: '1rem'}} className={league_spartan.className}>
                  {item.item_name}
              </Typography>
              <Typography style={{ fontSize: '0.8rem' }} className={league_spartan.className}>
                  ${item.item_price}
              </Typography>
              <div className="relative flex items-center justify-between">
                <Typography color="gray" variant="p" className={league_spartan_light.className} style={{ color: '#333'}}>
                  {truncateText(item.item_description, 5)}
                </Typography>
              </div>
              </CardBody>
          </Card>
          ))}
            <Button
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
              }}
            >
              Add Combo
              <IonIcon icon={arrowForward}/>
            </Button>
        </Card>
      ))}
    </div>
      <ModalWithFilter  isOpen={isOpen}  setIsOpen={setIsOpen} groupedMenuItems={groupedMenuItems} replaceItemInCombo={replaceItemInCombo} remainingBudget={remainingBudget}/>
    </IonCardContent> 
    
  );
};

export default SelectedItemsCard;
