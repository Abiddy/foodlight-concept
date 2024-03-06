import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Store from '../../store';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonIcon, IonModal } from '@ionic/react';
import { cart } from 'ionicons/icons';
import BuildOrderModal from './BuildOrderModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faUtensils, faGlassCheers, faIceCream } from '@fortawesome/free-solid-svg-icons';
import { League_Spartan } from 'next/font/google';

const league_spartan = League_Spartan({ weight: ['400'], subsets: ['latin'] });


const BuildOrder = () => {
  const modal = useRef(null);

  const menuItems = Store.useState((s) => s.menuItems);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState([]); 
  const [orderCounts, setOrderCounts] = useState({
    drinks: 0,
    starter: 0,
    maincourse: 0,
    dessert: 0
  });

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

  const keywords = {
    drinks: ["orange", "cold", "hot", "coffee", "fruity"],
    starter: ["chicken", "pesto", "tuna", "soup", "salad", "bruschetta", "shrimp cocktail", "caprese salad", "garlic bread", "crab cakes"],
    maincourse: ["pizza", "burger", "pasta"],
    dessert: ["cake", "ice cream", "chocolate"],
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleAddOrder = (newOrder) => {
    setOrder([...order, newOrder]); // Update order state
  };

  const categoryIcons = {
    drinks: faGlassCheers,
    starter: faCoffee,
    maincourse: faUtensils,
    dessert: faIceCream
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
      <h3 style={{  textAlign: 'center', padding: '8px' }} className={league_spartan.className}>Add preferences from the categories below</h3>
      <div  style={{ textAlign: 'center'}}> 
        {Object.keys(keywords).map((category) => (
          <div key={category} className='class="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" ' style={{ display: 'inline-block', textAlign: 'center', marginRight: '10px', padding: '20px' }} onClick={() => handleCategoryClick(category)}>
            <FontAwesomeIcon icon={categoryIcons[category]} size="2x" style={{ color: 'rgb(61, 61, 61)' }}/>
            {orderCounts[category] > 0 && (
              <span class="absolute inset-0 object-right-top -mr-6">
                <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                  {orderCounts[category]}
                </div>
              </span>
            )}
            <span style={{ display: 'block' }} className={league_spartan.className}>{category}</span>
          </div>
        ))}
       </div>
       <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.75} breakpoints={[0, 0.25, 0.5, 0.75, 1]} isOpen={showModal} onDidDismiss={() => setShowModal(false)} handle="true"> 
       <div className="modal-content">  
              <BuildOrderModal
              category={selectedCategory}
              keywords={keywords[selectedCategory]}
              orders={order}
              categoryIcons={categoryIcons}      
              onAdd={handleAddOrder} // Pass down the function to add order
              setOrders={setOrder}  
            />
            </div>
            </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default BuildOrder;
