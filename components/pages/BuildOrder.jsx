import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Store from '../../store';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonIcon, IonToast, IonChip,  IonBadge, IonButtons } from '@ionic/react';
import {  arrowDownCircle, arrowDownCircleOutline, caretBackOutline, caretForwardOutline, cart, cashOutline, chevronBackOutline, chevronDown, chevronForwardOutline, notificationsOutline} from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUtensils, faGlassCheers, faIceCream} from '@fortawesome/free-solid-svg-icons';
import { League_Spartan } from 'next/font/google';
import buildCombos from './buildCombosUtils';
import SelectedItemsCard from './SelectedItemsCard';
import { Button } from '@material-tailwind/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const league_spartan = League_Spartan({ weight: ['500'], subsets: ['latin'] });
export const league_spartan_light = League_Spartan({ weight: ['400'], subsets: ['latin'] });
export const league_spartan_bold = League_Spartan({ weight: ['600'], subsets: ['latin'] });


const BuildOrder = () => {
  const [order, setOrder] = useState([]); 
  const [orderCounts, setOrderCounts] = useState({
    drinks: 0,
    starter: 0,
    maincourse: 0,
    dessert: 0
  });
  const [isOpen, setIsOpen] = useState(false);
  const [matchingItems, setMatchingItems] = useState([])

  const [budget, setBudget] = useState('25');

  const [menuItems, setMenuItems] =  useState([]);

  console.log({menuItems})
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*' )
          // .eq('uid', userId); 
  
        if (error) {
          console.error('Error fetching menu items:', error);
          return [];
        }
  
        const itemsWithUrls = await Promise.all(
          data.map(async (item) => {
            const { data: publicUrl, error: urlError } = await supabase.storage.from('menu-images').getPublicUrl(item.item_image || '');
            if (urlError) {
              console.error('Error fetching public URL:', urlError);
              throw urlError;
            }
    
            return {
              ...item,
              item_image_url: publicUrl?.publicUrl || null,
            };
          })
        );
    
        return itemsWithUrls;
      } catch (error) {
        console.error('Error fetching menu items with image URLs:', error);
        return [];
      }
    };
  
    const fetchAndSetMenuItems = async () => {
      try {
        const itemsData = await fetchMenuItems();
        setMenuItems(itemsData);
        // settingMenuItems(itemsData) // Update the store with fetched menu items
      } catch (error) {
        console.error('Error fetching menu items:', error);
        // Handle the error as needed
      }
    };
  
    fetchAndSetMenuItems();
  }, []);

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
        <IonToolbar style={{ '--background': 'white', color: 'white', height: '70px', boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px'  }}>
          <Image
            src="/foodLight4.png"
            width={50}
            height={50}
            alt="Picture of the author"
          />     
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} style={{ '--background': 'transparent', color: 'black' }} />
            </IonButton>
            <IonButton onClick={() => set(true)}>
              <IonIcon icon={cart} style={{ '--background': 'transparent', color: 'black' }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>

      </IonHeader>
      <IonContent className="ion-padding" fullscreen={true}> 
      <img src='header1.png'></img>
      {/* <div style={{
                  // backgroundColor: '#525252', // Light background color
                  // border: 'grey 0.8px solid',
                  position: 'absolute',
            
                  color: 'black',
                  width: '100%',
                  padding: '15px',
                  marginTop: '10px',
                  textAlign: 'center',
                  borderRadius: '10px', // Rounded edges
                }}
               className={league_spartan.className}>
    <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Explore the best combos based on your preference!</h1>
  </div> */}

      {/* Budget Section */}

    <div style={{ textAlign: 'center', padding: '8px', paddingTop: '4px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'
       }}>
        <IonBadge
          className={league_spartan_light.className}
          style={{
            backgroundColor: 'white',
            color: 'black',         
            fontSize: '16px'
          }}
          color='primary'
        >
          Max Price
        </IonBadge>
      </div>
      <IonIcon icon={chevronBackOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingRight: '7px' }} onClick={decreaseBudget} />
      <div style={{ 
        // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        color: '#2D3142', borderRadius: '20px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '20px', margin: '0 auto' }}
        >
        <input 
        type="number" value={budget} 
        onChange={handleBudgetChange} 
        className={league_spartan_bold.className} 
        style={{ fontSize: '40px', backgroundColor: 'transparent', border: 'none', color: '#333646', textAlign: 'center', width: '50px' }} />
      </div>
      <IonIcon icon={chevronForwardOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingLeft: '7px' }} onClick={increaseBudget} />
    </div>
      <div  style={{ textAlign: 'center', marginBottom: '20px' ,
      //  boxShadow: '1px 4px 6px rgba(0.1, 0.1, 0.1, 0.1)', 
       borderRadius: '20px'}}> 
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
       <div style={{ display: 'flex', justifyContent: 'center', padding: '3px' }}>
       <div
              onClick={handleMakeOrder} 
              className={league_spartan.className} 
              style={{
               
                color: 'black',
                borderRadius: '9999px',
                padding: '10px 12px', 
                fontSize: '18px', 
                fontWeight: 'bold',
                boxShadow: 'none', 
                margin: '0 auto',
                background: 'white',
                border: 'solid 1.6px black'
              }}
            >
             Explore
          </div>
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
