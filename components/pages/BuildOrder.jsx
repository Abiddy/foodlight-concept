import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Store from '../../store';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonIcon, IonToast, IonPopover, IonChip, IonRange, IonInput, IonSegment, IonSegmentButton, IonLabel, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAccordion, IonAccordionGroup } from '@ionic/react';
import { arrowBackOutline, arrowDownCircle, arrowDownCircleOutline, arrowDownOutline, arrowForwardOutline, caretBackOutline, caretDownCircle, caretDownOutline, caretForwardCircleOutline, caretForwardOutline, caretUpCircle, caretUpOutline, cart, cashOutline, chevronDown, happyOutline} from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUtensils, faGlassCheers, faIceCream, faDollarSign, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { League_Spartan } from 'next/font/google';
import buildCombos from './buildCombosUtils';
import SelectedItemsCard from './SelectedItemsCard';
import PreferenceCards from './PrerefenceCards';

const league_spartan = League_Spartan({ weight: ['500'], subsets: ['latin'] });
const league_spartan_bold = League_Spartan({ weight: ['700'], subsets: ['latin'] });


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
            <Image src="/logo2.png" width={70} height={70} alt="Logo" />
          </div>
          <IonButton slot="end" id="open-modal" expand="block">
            <IonIcon icon={cart} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen={true}> 

      {/* Budget Section */}
 
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <h5 className={league_spartan.className} style={{ marginRight: '10px'}}>Find the best combos under budget</h5>
          <IonIcon style={{fontSize: '25px' }} icon={happyOutline} />
        </div>

        <div style={{ textAlign: 'center', padding: '8px' }}>
        <IonIcon icon={caretBackOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#007bff',paddingRight: '7px' }} onClick={decreaseBudget} />
          <div style={{ border: '0.5px solid #007bff', color: '#007bff', borderRadius: '20px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '20px', margin: '0 auto' }}>
            <IonIcon icon={cashOutline} style={{ fontSize: '30px', marginRight: '10px' }}/>
            <input type="number" value={budget} onChange={handleBudgetChange} className={league_spartan_bold.className} style={{ fontSize: '30px', backgroundColor: 'transparent', border: 'none', color: '#007bff', textAlign: 'center', width: '50px' }} />
          </div>
          <IonIcon icon={caretForwardOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#007bff', paddingLeft: '7px' }} onClick={increaseBudget} />
        </div>
        <div style={{ textAlign: 'center', padding: '8px' }}>
            {/* WHEN I CLICK ON THIS ICON BELOW, I WANT TO CALL THE BUILDCOMBOS FUNCTION WITH THE BUDGET ENTERED IN THE INPUT ABOVE */}
            <IonIcon icon={chevronDown} style={{ fontSize: '40px', marginTop: '20px' }} onClick={handleMakeOrder} />
        </div>


      {/* THIS IS THE PREFERENCE TAB SECTION, PUT THIS SECTION INSIDE AN IONACCORDIAN */}
      {/* <IonAccordionGroup>
      <IonAccordion value="first" toggleIcon={caretDownCircle} toggleIconSlot="start"> */}

      <p style={{  textAlign: 'center', padding: '8px' }} className={league_spartan.className}>Add items to your order from the categories below</p>
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

        <div style={{ display: 'flex', justifyContent: 'center',  marginBottom: '20px'}}>
            <IonButton    style={{ '--box-shadow': 'none', 'paddingRight': '10px' }} shape='round' color="dark" size="medium"  onClick={() => { 
                  if (order.length === 0) {
                      setIsOpen(true);
                  } else {
                      buildCombos(order, menuItems, setMatchingItems, budget);
                  }
              }}>
                <IonBadge >{orderCounts.dessert}</IonBadge>
                Items | Make My Order
              </IonButton>
        </div>
          <IonToast isOpen={isOpen} message="Add item preferences to make your order!" duration={5000}></IonToast>

          {/* </IonAccordion>
          </IonAccordionGroup> */}

      {/* PREFERENCE TAB SECTION ENDS HERE */}


      {matchingItems? 
      <SelectedItemsCard combinations={matchingItems}/>: ''}

      </IonContent>
    </IonPage>
  );
};

export default BuildOrder;
