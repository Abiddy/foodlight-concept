import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Store from '../../store';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonIcon, IonToast, IonChip,  IonBadge, IonButtons } from '@ionic/react';
import {  caretBackOutline, caretForwardOutline, cart, cashOutline, chevronDown} from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUtensils, faGlassCheers, faIceCream} from '@fortawesome/free-solid-svg-icons';
import { League_Spartan } from 'next/font/google';
import buildCombos from './buildCombosUtils';
import SelectedItemsCard from './SelectedItemsCard';

export const league_spartan = League_Spartan({ weight: ['500'], subsets: ['latin'] });
export const league_spartan_bold = League_Spartan({ weight: ['700'], subsets: ['latin'] });


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

  console.log(order)
  console.log({matchingItems})
  const [budget, setBudget] = useState('25');

  const decreaseBudget = () => {
    const newBudget = parseInt(budget) - 5;
    setBudget(newBudget.toString());
  };
  
  const increaseBudget = () => {
    const newBudget = parseInt(budget) + 5;
    setBudget(newBudget.toString());
  };

  // Event handler to update the budget when the input changes
  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  // Event handler to call buildCombos with the budget
  const handleMakeOrder = () => {
      // Call buildCombos with order, menuItems, setMatchingItems, and budget
      buildCombos(order, menuItems, setMatchingItems, budget, setOrder);
  };


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
            <Image src="/logo2.png" width={80} height={80} alt="Logo" />
          </div>
          <IonButtons slot="end">
            <IonButton onClick={() => set(true)}>
              <IonIcon icon={cart} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen={true}> 

      {/* Budget Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IonBadge
          className={league_spartan.className}
          style={{
            margin: '20px',
            padding: '10px',
            backgroundColor: 'white',
            color: 'black',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
          color='primary'
        >
          Find the best budget-based meals
        </IonBadge>
      </div>
    <div style={{ textAlign: 'center', padding: '8px' }}>
      <IonIcon icon={caretBackOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingRight: '7px' }} onClick={decreaseBudget} />
      <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', color: '#2D3142', borderRadius: '20px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '20px', margin: '0 auto' }}>
        <IonIcon icon={cashOutline} style={{ fontSize: '30px', marginRight: '10px', color: '#333646' }} />
        <input type="number" value={budget} onChange={handleBudgetChange} className={league_spartan_bold.className} style={{ fontSize: '30px', backgroundColor: 'transparent', border: 'none', color: '#333646', textAlign: 'center', width: '50px' }} />
      </div>
      <IonIcon icon={caretForwardOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingLeft: '7px' }} onClick={increaseBudget} />
    </div>
    <div style={{ textAlign: 'center', padding: '8px' }}>
        <IonIcon icon={chevronDown} style={{ fontSize: '40px', marginTop: '20px' }} onClick={handleMakeOrder} />
    </div>
      <div  style={{ textAlign: 'center', marginBottom: '20px' , boxShadow: '1px 4px 6px rgba(0.1, 0.1, 0.1, 0.1)', borderRadius: '20px'}}> 
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

             {/* PREFERENCE TAB SECTION Starts HERE */}

        {/* <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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

        <div style={{ display: 'flex', justifyContent: 'center',  marginBottom: '20px'}}>
            <IonButton    style={{ '--box-shadow': 'none', 'paddingRight': '10px' }} shape='round' color="dark" size="small"  onClick={() => { 
                  if (order.length === 0) {
                      setIsOpen(true);
                  } else {
                      buildCombos(order, menuItems, setMatchingItems, budget);
                  }
              }}>
                <IonBadge >{orderCounts.dessert}</IonBadge>
                Add Preferances
              </IonButton>
        </div>
          <IonToast isOpen={isOpen} message="Add item preferences to make your order!" duration={5000}></IonToast> */}

      {/* PREFERENCE TAB SECTION ENDS HERE */}

      {matchingItems? 
      <SelectedItemsCard combinations={matchingItems} budget={budget} />: ''}
      </IonContent>
    </IonPage>
  );
};

export default BuildOrder;
