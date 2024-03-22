import { IonBadge, IonButton, IonCardContent, IonChip, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal} from '@ionic/react';
import React, { useRef, useState } from 'react';
import {  Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { league_spartan, league_spartan_light } from './Menu';
import Store from '../../store';
import ModalWithFilter from './ModalWithFilter';
import { useSwipeable } from 'react-swipeable';
import { refreshCircle, refreshCircleOutline } from 'ionicons/icons';


const SelectedItemsCard = ({ combinations, budget }) => {

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

const handlers = useSwipeable({
  onSwipedLeft: () => {
    // Handle swipe left action
    console.log('Swiped left!');
    // Implement logic to shift the current combo out of view
    const card = document.querySelector('.card-container');
    if (card) {
      card.style.transform = 'translateX(-100%)'; // Shift the card out of view to the left
      setTimeout(() => {
        // Implement logic to navigate to the next combo
        console.log('Navigate to next combo');
        // You can implement your navigation logic here, e.g., update state to render the next combo
        // Example: setSelectedComboIndex(selectedComboIndex + 1);
        card.style.transform = ''; // Reset the transform after the animation
      }, 300); // Adjust the delay as needed to match your animation duration
    }
  },
  onSwipedRight: () => {
    // Handle swipe right action
    console.log('Swiped right!');
    // Implement logic to shift the current combo out of view
    const card = document.querySelector('.card-container');
    if (card) {
      card.style.transform = 'translateX(100%)'; // Shift the card out of view to the right
      setTimeout(() => {
        // Implement logic to navigate to the previous combo
        console.log('Navigate to previous combo');
        // You can implement your navigation logic here, e.g., update state to render the previous combo
        // Example: setSelectedComboIndex(selectedComboIndex - 1);
        card.style.transform = ''; // Reset the transform after the animation
      }, 300); // Adjust the delay as needed to match your animation duration
    }
  },
});


  return (
    <IonCardContent style={{ padding: '0px'}} {...handlers}> 
    <div className="w-full max-w-[23rem]">
      {combinations.map((combo, index) => (
      <Card key={index}  className="mt-15 mb-5 rounded-xl relative p-5" style={{ boxShadow: 'none', border: '0.8px solid'}}>
        <div className="right-0 mb-2 flex-shrink-0 ml-auto flex items-center gap-2">
          <IonChip color="primary" className={`${league_spartan.className} text-l mt-1`}>Total: ${combo.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)}</IonChip>
          </div>
          {combo.map((item, index2) => (
            <Card key={index2} className="w-full max-w-[48rem] flex-row mb-4" >
              <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
                <img
                  src={item.item_image_url || 'default-image-url'}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
                    <div className="absolute top-1 left-1">
                    <IonIcon
  icon={refreshCircle}
  onClick={() => {
    setIsOpen(true);
    setindexToChange([index, index2]);
    setComboPrice([combo, item.item_price]);
  }}
  shape='round'
  className="ion-margin-end"
  style={{
    color: 'white',
    fontSize: '1.5rem',
    '--box-shadow': '0px 2px 4px rgba(0, 0, 0, 0.1)', // Adjust the shadow as needed
    padding: '8px', // Add padding for space around the icon
    borderRadius: '50%', // Make it round
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
              className="flex-shrink-0 ml-auto flex items-center gap-2"
              style={{
                border: 'solid 0.2px',
                boxShadow: 'none',
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
      <ModalWithFilter  isOpen={isOpen}  setIsOpen={setIsOpen} groupedMenuItems={groupedMenuItems} replaceItemInCombo={replaceItemInCombo} remainingBudget={remainingBudget}/>
    </IonCardContent> 
    
  );
};

export default SelectedItemsCard;
