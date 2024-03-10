const buildCombos = (orders, menuItems, setMatchingItems) => {
    console.log({orders})
    const combos = [];

    orders.forEach((order) => {
        const category = Object.keys(order)[0];
        const keywords = order[category];

       

        // Filter menu items based on category
        const categoryItems = menuItems.filter(item => item.item_category === category);
        console.log({keywords})

        // Filter categoryItems based on keywords
        const matchingItems = categoryItems.filter(item => {
            const description = item.item_description?.toLowerCase();
            const name = item.item_name.toLowerCase();
            return keywords.some(keyword => (description?.includes(keyword) || false) || (name?.includes(keyword) || false));

        });

        // Construct combos
        const combo = {
            category,
            items: matchingItems
        };

        combos.push(combo);
    });


    console.log({combos})
    setMatchingItems(combos);
    return combos;
};


export default buildCombos;
