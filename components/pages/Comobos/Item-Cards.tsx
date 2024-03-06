// ItemCard.jsx
import { IonChip } from '@ionic/react';
import React from 'react';
import { league_spartan } from './Combos';

const ItemCard = ({ item }) => {

  return (
    <div className="relative flex w-full flex-col rounded-xl bg-transparent bg-clip-border  shadow-none">
      <div className="relative flex items-center justify-between gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden bg-transparent shadow-none rounded-xl bg-clip-border">
        <div className='flex items-center'>
          <div className="w-[58px] h-[58px] overflow-hidden rounded-full  flex-col flex-shrink-0">
            <img
              src={item.item_image_url || 'default-image-url'}
              alt={item.item_name}
              className="object-cover w-full h-full rounded"
            />
          </div>
          <div className="flex flex-col gap-0.5 ml-6 items-start">
     
            <div className="flex">
                <h5 className="block font-sans text-l antialiased font-semibold leading-snug tracking-normal ">
                {item.item_name}
                </h5>  
            </div>
            <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">
              {item.item_description}
            </p>
          </div>
        </div>
        <IonChip color="success" className={`${league_spartan.className} text-l mt-1 mr-4`}>${item.item_price}</IonChip>
      </div>
    </div>
  );
};

export default ItemCard;
