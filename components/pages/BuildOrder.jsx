import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Store from '../../store';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonIcon, IonToast, IonPopover, IonChip, IonRange, IonInput, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { cart} from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUtensils, faGlassCheers, faIceCream, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { League_Spartan } from 'next/font/google';
import buildCombos from './buildCombosUtils';
import SelectedItemsCard from './SelectedItemsCard';
import PreferenceCards from './PrerefenceCards';

const league_spartan = League_Spartan({ weight: ['400'], subsets: ['latin'] });


const BuildOrder = () => {
  const menuItems = Store.useState((s) => s.menuItems);
  const [order, setOrder] = useState([]); 
  const [orderCounts, setOrderCounts] = useState({
    drinks: 0,
    starter: 0,
    maincourse: 0,
    dessert: 0
  });
  const [isOpen, setIsOpen] = useState(false);
  const [matchingItems, setMatchingItems] = useState([])

  console.log({order})

    // Function to calculate the number of orders for each category
    const calculateOrderCounts = () => {
      const counts = {
        drinks: 0,
        starter: 0,
        maincourse: 0,
        dessert: 0
      };
      order.forEach((item) => {
        const category = Object.keys(item)[0];
        counts[category]++;
      });
      setOrderCounts(counts);
    };
  
    useEffect(() => {
      calculateOrderCounts();
    }, [order]);


    // KEYWORDS NEED TO BE LOWERCASE!

  const keywords = {
    drinks: [ "red tea", "espresso", "pistachio", "latté", "green tea", "macchiato"],
    starter: ["chicken", "pesto", "tuna", "soup", "salad", "bruschetta", "shrimp cocktail", "caprese salad", "garlic bread", "crab cakes"],
    maincourse: ["pizza", "burger", "pasta"],
    dessert: ["cake", "ice cream", "chocolate"],
  };

  const handleCategoryClick = (category) => {
     const newOrder = { [category]: [] }
     setOrder([...order, newOrder]);
  };


  const categoryIcons = {
    drinks: faGlassCheers,
    starter: faCoffee,
    maincourse: faUtensils,
    dessert: faIceCream
  };

  const handleRemoveOrder = (indexToRemove) => {
    const updatedOrders = order.filter((order, index) => index !== indexToRemove);
    setOrder(updatedOrders);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className='p-2'>
            <Image src="/logo2.png" width={70} height={70} alt="Logo" />
          </div>
          <IonButton slot="end" id="open-modal" expand="block">
            <IonIcon icon={cart} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen={true}> 

      {/* ADDING PREFERENCES FROM CATEGORIES */}

      <h4 style={{  textAlign: 'center', padding: '8px' }} className={league_spartan.className}>Select your preferences from the categories</h4>
      <div  style={{ textAlign: 'center', marginBottom: '20px'}}> 
        {Object.keys(keywords).map((category) => (
          <div key={category} className="py-4 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" style={{ display: 'inline-block', textAlign: 'center', marginRight: '10px', padding: '10px' }} onClick={() => handleCategoryClick(category)}>
            <FontAwesomeIcon icon={categoryIcons[category]} size="2x" style={{ color: 'rgb(61, 61, 61)' }}/>
            {orderCounts[category] > 0 && (
              <span className="absolute inset-0 object-right-top -mr-6">
                <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                  {orderCounts[category]}
                </div>
              </span>
            )}
            <span style={{ display: 'block' }} className={league_spartan.className}>{category}</span>
          </div>
        ))}
       </div>

       <div style={{ textAlign: 'center', marginBottom: '20px' }}>
       {order.map((item, index) => (
          <PreferenceCards
            key={index} // Add key prop here
            itemKey={index}
            selectedCategory={Object.keys(item)} 
            keywordsSelected={Object.values(item)} 
            handleRemoveOrder={() => handleRemoveOrder(index)} 
            setOrder={setOrder}
            order={order}
          />
        ))}
        </div>


      {/* BUTTON TO DISPLAY THE RESULT COMBOS */}
        <div style={{ display: 'flex', justifyContent: 'center',  marginBottom: '20px'}}>
            <IonButton    style={{ '--box-shadow': 'none', 'paddingRight': '10px' }} shape='round' color="dark" size="medium"  onClick={() => { 
                  if (order.length === 0) {
                      setIsOpen(true);
                  } else {
                      buildCombos(order, menuItems, setMatchingItems);
                  }
              }}>Make My Order</IonButton>

            <IonButton style={{ '--box-shadow': 'none' }} shape='round' color="light" size="medium">
              <FontAwesomeIcon icon={faDollarSign} style={{ 'paddingLeft': '10px'}}/>
              <IonInput style={{ 'maxWidth': '30px' }}></IonInput>
            </IonButton>
        </div>
          <IonToast isOpen={isOpen} message="Add item preferences to make your order!" duration={5000}></IonToast>

      {/* CARD COMPONENT THAT TAKES IN matchingItems TO DISPLAY THE COMBOS */}
      {matchingItems? 
      <SelectedItemsCard matchingItems={matchingItems}/>: ''}

      </IonContent>
    </IonPage>
  );
};

export default BuildOrder;
