import { useEffect, useState } from 'react';
import { League_Spartan } from 'next/font/google';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { setMenuItems } from '../../../store/actions';
import {  Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { IonBadge,  IonCard,  IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonIcon, IonItem, IonLabel, IonList} from '@ionic/react';
import { arrowForward, caretBackOutline, caretForwardOutline, cashOutline, chevronForward } from 'ionicons/icons';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import Store from '../../../store';


export const league_spartan = League_Spartan({ weight: ['500'], subsets: ['latin'] });
export const league_spartan_light = League_Spartan({ weight: ['500'], subsets: ['latin'] });

// type MenuItems = Database['public']['Tables']['menu_items']['Row'] & { item_image_url?: string | null };
const supabase = createClientComponentClient();

const ComboCard = ({ userId, combination }) => {

  const [menuItems, setMenuItems] =  useState([]);

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
        setMenuItems(itemsData);
        // settingMenuItems(itemsData) // Update the store with fetched menu items
      } catch (error) {
        console.error('Error fetching menu items:', error);
        // Handle the error as needed
      }
    };
  
    fetchAndSetMenuItems();
  }, [userId]);


const truncateText = (text, maxWords) => {
  const words = text?.split(/\s+/);
  if (words?.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

// const decreaseBudget = () => {
//   const newBudget = parseInt(budget) - 5;
//   setBudget(newBudget.toString());
// };

// const increaseBudget = () => {
//   const newBudget = parseInt(budget) + 5;
//   setBudget(newBudget.toString());
// };

// Event handler to update the budget when the input changes
// const handleBudgetChange = (event) => {
//   setBudget(event.target.value);
// };

// const filteredChefCombos = combination.filter(combo =>
//   combo.combo_items.comboItems.reduce((acc, item) => acc + item.item_price, 0) <= budget
// );

// const menuItems = Store.useState(s => s.menuItems);

const groupedMenuItems = menuItems.reduce((acc, item) => {
  const { item_type } = item;
  if (!acc[item_type]) {
    acc[item_type] = [];
  }
  acc[item_type].push(item);
  return acc;
}, {});
 
  return (
    <div>
    {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
  </div> */}
{/* <div style={{ textAlign: 'center', padding: '8px', marginBottom: '20px'}}>
  <IonIcon icon={caretBackOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingRight: '7px' }} onClick={decreaseBudget} />
  <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', color: '#2D3142', borderRadius: '20px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '20px', margin: '0 auto' }}>
    <IonIcon icon={cashOutline} style={{ fontSize: '30px', marginRight: '10px', color: '#333646' }} />
    <input type="number" value={budget} onChange={handleBudgetChange} className={league_spartan.className} style={{ fontSize: '30px', backgroundColor: 'transparent', border: 'none', color: '#333646', textAlign: 'center', width: '50px' }} />
  </div>
  <IonIcon icon={caretForwardOutline} style={{ fontSize: '30px', cursor: 'pointer', color: '#333646', paddingLeft: '7px' }} onClick={increaseBudget} />
</div> */}
    {/* <IonCardContent style={{ padding: '0px'}}> 
    <div className="w-full flex-column max-w-[23rem]">
      {filteredChefCombos.map((combo, index) => (
      <div key={index}  className="mt-15 mb-5 rounded-xl relative p-5" style={{ boxShadow: 'none', border: '0.4px solid grey'}}>
      <div className="rounded-t-xl text-black py-2 px-4 absolute top-0 left-0 right-0 mb-10 flex items-center justify-between" style={{ backgroundColor: '#00BF63', color: 'white' }}>

          <div className={`${league_spartan.className} text-l mt-1`} style={{}}>  {combo.combo_items.comboName}</div>
          <div className={`${league_spartan.className} text-l mt-1`} style={{}}>Total: ${combo.combo_items.comboItems.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)}</div>
          </div>
          <div style={{ marginBottom: '50px'}}></div>
          {combo.combo_items.comboItems.map((item, index2) => (
            <Card key={index2} className="w-full max-w-[48rem] flex-column mb-4" >
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
              <Typography style={{ fontSize: '0.8rem', color: '#00BF63' }} className={league_spartan.className}>
                  ${item.item_price}
              </Typography>
              </CardBody>
          </Card>
          ))}
            <Button
            
              onClick={() => addToCart(combo)}
              className={`${league_spartan.className} flex items-center justify-between`}
              style={{
                color: '#00BF63',
                background: 'white',
                borderRadius: '9999px',
                padding: '10px 12px', 
                fontSize: '13.5px', 
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '50px',
                width: '100%',
              }}
            >
              Add Combo
              <IonIcon icon={arrowForward}/>
            </Button>
            <div className={`${league_spartan.className} rounded-b-xl text-black py-2 px-4 absolute bottom-0 left-0 right-0 mt-20 flex items-center gap-3`} style={{ backgroundColor: '#E3F8EE' }}>
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
        </div>
      ))}
    </div>
    </IonCardContent>  */}



      <h1 className={league_spartan.className} style={{ marginBottom: '0px'}}>Chefs Combo Deals</h1>
      <IonCardContent style={{ display: 'flex', paddingTop: '0px', margin: '0px', overflowX: 'auto', width: '100%', maxWidth: '100vw' }}>
  {combination.map((combo, index) => (
    <IonCard key={index} style={{ borderRadius: '10px', backgroundColor: 'light', minWidth: '300px', flex: '0 0 auto', marginRight: '10px' }}>
      <IonCardContent scroll-y="false">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <IonChip style={{ color: 'black', padding: '0px', margin: '0px', background: 'rgba(0, 0, 0, 0)' }}>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>{combo.combo_items.comboName}</p>
          </IonChip>
          <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>${combo.combo_items.comboItems.reduce((acc, item) => acc + item.item_price, 0).toFixed(2)}</p>
        </div>
        <IonList lines="none">
          {combo.combo_items.comboItems.map((item, itemIndex) => (
            <IonItem key={itemIndex}>
              <img src={item.item_image_url} alt={item.name} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              <IonLabel className={league_spartan.className} style={{ marginLeft: '10px' }}>{item.item_name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <FontAwesomeIcon icon={faQuoteLeft} />
          <p style={{ margin: '0', marginLeft: '5px', marginRight: '5px', fontStyle: 'italic' }}>{combo.combo_items.chefComment}</p>
          <FontAwesomeIcon icon={faQuoteRight} />
          <p style={{ margin: '0', marginLeft: '5px' }}>- Chef {combo.combo_items.comboOwner}</p>
        </div>
        <IonIcon icon={chevronForward} style={{ fontSize: '1.5em', position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }} />
      </IonCardContent>
    </IonCard>
  ))}
</IonCardContent>




    <h1 className={league_spartan.className} style={{ marginBottom: '0px'}}>Full Menu</h1>
    <IonList lines="none">
      <div >
      {menuItems? (
          Object.entries(groupedMenuItems).map(([itemType, items]) => (
          <div key={itemType}>
          <h4 className={league_spartan.className}>{itemType.charAt(0).toUpperCase() + itemType.slice(1)}</h4>
          {items.map((item) => (
          <IonCard key={item} style={{ width: '250px', height: '300px'}}>
          <img alt="Silhouette of mountains" src={item.item_image_url} style={{ height: '150px', width: '250px'}} />
          <IonBadge color="light" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1' , fontSize: '20px'}}>
                {item.item_price}
              </IonBadge>
          <IonCardHeader>
            <IonCardTitle style={{ fontSize: '20px'}}>{item.item_name}</IonCardTitle>
      {/* <IonCardSubtitle>         
        <IonChip style={{ color: 'black', padding: '0px', margin: '0px', background: 'rgba(0, 0, 0, 0)' }}>
        <img src={combo.shopImg} alt="Chip Image" style={{ borderRadius: '50%', marginRight: '5px', width: '20px', height: '20px' }} />
        <p  style={{ fontSize: '0.7rem'}}>{combo.shop}</p>
        </IonChip>
        </IonCardSubtitle> */}
    </IonCardHeader>

    <IonCardContent> {truncateText(item.item_description, 20)}</IonCardContent>
  </IonCard>
    ))}
  </div>
  ))
  ) : (
    <div>Loading...</div>
  )}
  </div>
    </IonList>

    </div>
  )
  
};

export default ComboCard;
