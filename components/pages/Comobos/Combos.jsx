import { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { setMenuItems } from '../../../store/actions';
import {  Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { IonBadge,  IonCardContent, IonIcon} from '@ionic/react';
import { arrowForward, caretBackOutline, caretForwardOutline, cashOutline } from 'ionicons/icons';
import Image from 'next/image';


export const league_spartan = League_Spartan({ weight: ['500'], subsets: ['latin'] });
export const league_spartan_light = League_Spartan({ weight: ['500'], subsets: ['latin'] });

// type MenuItems = Database['public']['Tables']['menu_items']['Row'] & { item_image_url?: string | null };
const supabase = createClientComponentClient();

const ComboCard = ({ userId, combination }) => {
  const [budget, setBudget] = useState(35);

  console.log({combination})

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { data, error } = await supabase
          .from('menu_items')
          .select('*' )
          .eq('uid', userId); 
  
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
        setMenuItems(itemsData); // Update the store with fetched menu items
      } catch (error) {
        console.error('Error fetching menu items:', error);
        // Handle the error as needed
      }
    };
  
    fetchAndSetMenuItems();
  }, [userId]);

  // const menuItems = Store.useState(s => s.menuItems); 

const truncateText = (text, maxWords) => {
  const words = text?.split(/\s+/);
  if (words?.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

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

const filteredChefCombos = combination.filter(combo =>
  combo.combo_items.comboItems.reduce((acc, item) => acc + item.item_price, 0) <= budget
);

console.log({filteredChefCombos})
 
  return (
    <div>
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
      Chef Reccommended Combos
    </IonBadge>
  </div>
<div style={{ textAlign: 'center', padding: '8px', marginBottom: '20px'}}>
  <IonIcon icon={caretBackOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingRight: '7px' }} onClick={decreaseBudget} />
  <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', color: '#2D3142', borderRadius: '20px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '20px', margin: '0 auto' }}>
    <IonIcon icon={cashOutline} style={{ fontSize: '30px', marginRight: '10px', color: '#333646' }} />
    <input type="number" value={budget} onChange={handleBudgetChange} className={league_spartan.className} style={{ fontSize: '30px', backgroundColor: 'transparent', border: 'none', color: '#333646', textAlign: 'center', width: '50px' }} />
  </div>
  <IonIcon icon={caretForwardOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingLeft: '7px' }} onClick={increaseBudget} />
</div>
    <IonCardContent style={{ padding: '0px'}}> 
    <div className="w-full flex-column max-w-[23rem]">
      {filteredChefCombos.map((combo, index) => (
      <Card key={index}  className="mt-15 mb-5 rounded-xl relative p-5" style={{ boxShadow: 'none', border: '0.8px solid'}}>
      <div className="rounded-t-xl text-black py-2 px-4 absolute top-0 left-0 right-0 mb-10 flex items-center justify-between" style={{ backgroundColor: '#f4f5f8' }}>
        {/* {combo.combo_items.comboName} */}
          <div className={`${league_spartan.className} text-l mt-1`} style={{}}>  {combo.combo_items.comboName}</div>
          <div className={`${league_spartan.className} text-l mt-1`} style={{}}>Total: ${combo.combo_items.comboItems.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)}</div>
          </div>
          <div style={{ marginBottom: '70px'}}></div>
          {combo.combo_items.comboItems.map((item, index2) => (
            <Card key={index2} className="w-full max-w-[48rem] mb-4" >
              <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
                <img
                  src={item.item_image_url || 'default-image-url'}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className='p-2'>
              <Typography style={{ fontWeight: 'bold' ,color: '#333',fontSize: '1rem'}} className={league_spartan.className}>
                  {item.item_name}
              </Typography>
              <Typography style={{ fontSize: '0.8rem' }} className={league_spartan.className}>
                  ${item.item_price}
              </Typography>
              <div className="relative flex items-center justify-between">
                <Typography color="gray" variant="p" className={league_spartan_light.className} style={{ color: '#333'}}>
                  {truncateText(item.item_description, 5)}
                </Typography>
              </div>
              </CardBody>
          </Card>
          ))}
            <Button
              onClick={() => addToCart(combo)}
              className="flex items-center justify-between"
              style={{
                color: 'white',
                background: '#2D3142',
                borderRadius: '9999px',
                padding: '10px 12px', 
                fontSize: '13.5px', 
                fontWeight: 'bold',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)', 
                marginBottom: '50px',
              }}
            >
              Add Combo
              <IonIcon icon={arrowForward}/>
            </Button>
            <div className={`${league_spartan.className} rounded-b-xl text-black py-2 px-4 absolute bottom-0 left-0 right-0 mt-20 flex items-center gap-3`} style={{ backgroundColor: '#f4f5f8' }}>
            <div className="rounded-full overflow-hidden">
    <Image
      src="/chef.jpeg"
      alt="Chef Image"
      width={30}
      height={30}
    />
  </div>
      {combo.combo_items.comboOwner} - {combo.combo_items.chefComment}
                </div>
        </Card>
      ))}
    </div>
    </IonCardContent> 
    </div>
  )
  
};

export default ComboCard;
