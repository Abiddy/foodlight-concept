import { IonButton, IonCardContent, IonChip, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal} from '@ionic/react';
import React, { useRef, useState } from 'react';
import {  Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { league_spartan, league_spartan_light } from './Menu';
import Store from '../../store';
import ModalWithFilter from './ModalWithFilter';

const SelectedItemsCard = ({ combinations }) => {

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

  return (
    <IonCardContent style={{ padding: '0px'}}> 
    <div className="w-full max-w-[23rem]">
      {combinations.map((combo, index) => (
      <Card key={index}  className="mt-15 mb-5 rounded-xl relative p-5">
        <div className="right-0 mb-2 flex-shrink-0 ml-auto flex items-center gap-2">
          <IonChip color="success" className={`${league_spartan.className} text-l mt-1`}>Total: ${combo.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)}</IonChip>
          </div>
          {combo.map((item, index2) => (
            <Card key={index2} className="w-full max-w-[48rem] flex-row mb-4" style={{ boxShadow: 'none', border: '0.8px solid'}}>
              <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
                <img
                  src={item.item_image_url || 'default-image-url'}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className='p-2'>
              <Typography style={{ fontWeight: 'bold', color: '#333' ,fontSize: '1rem'}} className={league_spartan.className}>
                  {item.item_name}
              </Typography>
              <Typography style={{ fontSize: '0.8rem' }} className={league_spartan.className}>
                  ${item.item_price}
              </Typography>
              <div className="relative flex items-center justify-between">
                <Typography color="gray" variant="p" className={league_spartan_light.className}>
                  {truncateText(item.item_description, 5)}
                </Typography>
              </div>
              <IonButton
                onClick={() => {
                  setIsOpen(true)
                  setindexToChange([index, index2])
                }}
                shape='round'
                size='small'
                className="ion-margin-end"
                style={{ fontSize: '10px' }}          
              >
                Change
              </IonButton>
              </CardBody>
          </Card>
          ))}
            <Button
              onClick={() => addToCart(item)}
              className="flex-shrink-0 ml-auto flex items-center gap-2"
              style={{
                color: '#007bff',
                borderRadius: '9999px',
                padding: '10px 12px', 
                fontSize: '13.5px', 
                fontWeight: 'bold'
              }}
            >
              Add Combo
            </Button>
        </Card>
      ))}
    </div>
      <ModalWithFilter  isOpen={isOpen}  setIsOpen={setIsOpen} groupedMenuItems={groupedMenuItems} replaceItemInCombo={replaceItemInCombo} />
    </IonCardContent> 
    
  );
};

export default SelectedItemsCard;
