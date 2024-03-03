import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Store from '../../store';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButton, IonIcon, IonModal } from '@ionic/react';
import { cart } from 'ionicons/icons';
import MenuSelectionModal from './MenuSelectionModal';

const BuildOrder = () => {
  const modal = useRef(null);

  const menuItems = Store.useState((s) => s.menuItems);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState([]); 

  const keywords = {
    drinks: ["orange", "cold", "hot", "coffee", "fruity"],
    starter: ["chicken", "pesto", "tuna"],
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
      <div  style={{ textAlign: 'center'}}> {/* Center-align the buttons */}
        {Object.keys(keywords).map((category) => (
          <IonButton key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </IonButton>
        ))}
       </div>
       <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.5} breakpoints={[0, 0.25, 0.5, 0.75, 1]} isOpen={showModal} onDidDismiss={() => setShowModal(false)}> 
       <div className="modal-content">  
              <MenuSelectionModal
              category={selectedCategory}
              keywords={keywords[selectedCategory]}
              orders={order}
          
              onAdd={handleAddOrder} // Pass down the function to add order
            />
            </div>
            </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default BuildOrder;
