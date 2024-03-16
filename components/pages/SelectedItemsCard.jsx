import { IonChip} from '@ionic/react';
import React from 'react';
import {  Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { league_spartan, league_spartan_light } from './Menu';

const SelectedItemsCard = ({ combinations }) => {

  const truncateText = (text, maxWords) => {
    const words = text?.split(/\s+/);
    if (words?.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
};

  console.log({combinations})
  return (
    <div>
      {combinations.map((combo, index) => (
      <div key={index}  className=" mt-15 mb-5 rounded-xl relative">
        <div className="absolute right-0 p-2">
          <IonChip color="success" className={`${league_spartan.className} text-l mt-1`}>Total: ${combo.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)}</IonChip>
          </div>
          <br />
          <br />
          {combo.map((item, itemIndex) => (
            <Card key={item.id} className="w-full max-w-[48rem] flex-row mb-4">
            <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
              <img
                src={item.item_image_url || 'default-image-url'}
                alt="card-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody className='p-2'>
            <Typography style={{ fontWeight: 'bold', color: '#333' ,fontSize: '1rem'}} className={league_spartan.className}>
                {item.item_name}
            </Typography>
            <Typography style={{ fontSize: '0.8rem' }} className={league_spartan.className}>
                ${item.item_price}
            </Typography>
            <div className="relative flex items-center justify-between">
              <Typography color="gray" variant="p" className={league_spartan_light.className}>
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
                color: '#007bff',
                borderRadius: '9999px',
                padding: '10px 12px', // Increased padding for a slightly bigger button
                fontSize: '13.5px', // Increased font size for a slightly bigger button
                fontWeight: 'bold'
              }}
            >
              Add Combo
            </Button>
            <div style={{ borderBottom: '0.1px solid grey', width: '100%', marginTop: '20px' }}></div>
        </div>
      ))}
    </div>
  );
};

export default SelectedItemsCard;
