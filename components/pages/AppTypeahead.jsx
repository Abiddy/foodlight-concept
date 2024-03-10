import React, { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/react';



function AppTypeahead() {
  const [workingSelectedValues, setWorkingSelectedValues] = useState([...props.selectedItems]);

  const isChecked = (value) => {
    return workingSelectedValues.includes(value);
  };

  const cancelChanges = () => {
    const { onSelectionCancel } = props;
    if (onSelectionCancel !== undefined) {
      onSelectionCancel();
    }
  };

  const confirmChanges = () => {
    const { onSelectionChange } = props;
    if (onSelectionChange !== undefined) {
      onSelectionChange(workingSelectedValues);
    }
  };

  const checkboxChange = (ev) => {
    const { checked, value } = ev.detail;

    if (checked) {
      setWorkingSelectedValues([...workingSelectedValues, value]);
    } else {
      setWorkingSelectedValues(workingSelectedValues.filter((item) => item !== value));
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={cancelChanges}>Cancel</IonButton>
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={confirmChanges}>Done</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light" class="ion-padding">
        <IonList id="modal-list" inset={true}>
          {props.items.map((item) => (
            <IonItem key={item.value}>
              <IonCheckbox value={item.value} checked={isChecked(item.value)} onIonChange={checkboxChange}>
                {item.text}
              </IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
}
export default AppTypeahead;
