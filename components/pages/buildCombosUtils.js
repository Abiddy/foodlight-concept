const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const generateCombinations = (combos, budget) => {
    const combinations = [];
    let remainingBudget = budget;

    // Shuffle items within each combo to introduce randomness
    const shuffledCombos = combos.map(combo => ({
        ...combo,
        items: shuffleArray(combo.items)
    }));

    // Sort the shuffled combos by item price
    const sortedCombos = shuffledCombos.map(combo => ({
        ...combo,
        items: combo.items.sort((a, b) => a.item_price - b.item_price)
    }));

    // Helper function to check if an item can be added to the combination
    const canAddItem = (item, combination) => {
        return combination.reduce((totalPrice, currentItem) => totalPrice + currentItem.item_price, 0) + item.item_price <= budget;
    };

    // Helper function to add an item to a combination
    const addItemToCombination = (item, combination) => {
        return [...combination, item];
    };

    // Recursively generate combinations
    const generate = (index, combination) => {
        // Base case: if index exceeds the number of combos or if we have reached 10 combinations
        if (index >= sortedCombos.length || combinations.length >= 10) {
            return;
        }
    
        // Iterate over items in the current combo
        sortedCombos[index].items.forEach(item => {
            // Check if adding the item to the combination exceeds the budget
            if (canAddItem(item, combination)) {
                // Add the item to the combination
                const newCombination = addItemToCombination(item, combination);
                // Check if the new combination contains unique items
                if (!combination.some(c => c.id === item.id) && !combinations.some(c => JSON.stringify(c) === JSON.stringify(newCombination))) {
                    combinations.push(newCombination);
                }
                // Recursively generate combinations with the next combo
                generate(index + 1, newCombination);
            }
        });
    
        // Recursively generate combinations without adding any item from the current combo
        generate(index + 1, combination);
    };
    

    // Start generating combinations
    generate(0, []);

    // Sort combinations in descending order based on total price
    combinations.sort((a, b) => {
        const totalPriceA = a.reduce((acc, item) => acc + item.item_price, 0);
        const totalPriceB = b.reduce((acc, item) => acc + item.item_price, 0);
        return totalPriceB - totalPriceA;
    });

    return combinations;
};



const buildCombos = (orders, menuItems, setMatchingItems, budget, setOrder) => {
    const combos = [];

    if (orders.length === 0) {
        // Define a default order
        const defaultOrder = [
            { "drinks": [] },
            { "maincourse": [] },
            { "dessert": [] },
            { "starter": [] }
        ];
        setOrder(defaultOrder);

        orders = defaultOrder; // Set orders to defaultOrder for further processing
    }

    orders.forEach((order) => {
        const category = Object.keys(order)[0];
        const keywords = order[category];

        const categoryItems = menuItems.filter(item => item.item_category === category);

        const matchingItems = categoryItems.filter(item => {
            const description = item.item_description?.toLowerCase();
            const name = item.item_name.toLowerCase();
            return keywords.some(keyword => (description?.includes(keyword) || false) || (name?.includes(keyword) || false));
        });

        const combo = {
            category,
            items: keywords.length === 0 ? categoryItems : matchingItems
        };

        combos.push(combo);
    });

    const itemCombinations = generateCombinations(combos, budget);
    setMatchingItems(itemCombinations);
    return combos;
};

export default buildCombos;
