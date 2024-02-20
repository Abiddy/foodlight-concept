import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/react';

const Cart = ({ open, onDidDismiss, cart }) => {

    console.log({cart})
  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
          <IonButton slot="end" fill="clear" color="dark" onClick={onDidDismiss}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent> 
          {cart.map((item) => (
            <IonItem key={item.id}>
              <IonLabel>
                <h2>{item.item_name}</h2>
                <p>Price: ${item.item_price}</p>
                <p>Quantity: {item.quantity}</p>
              </IonLabel>
              <IonButton slot="end" color="danger" onClick={() => removeFromCart(item)}>
                Remove
              </IonButton>
            </IonItem>
          ))}
      </IonContent>
    </IonModal>
  );
};

export default Cart;
