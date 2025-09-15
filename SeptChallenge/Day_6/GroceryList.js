/*
The data is the available inventory in the store. In the store you have various products with their price and available quantity.
Based on this data, write a function to generate the total bill of a grocery list given by an user
getTotalAmount([
    { item: 'Jam - Apricot', quantity: 2 },
    { item: 'Creamers - 10%', quantity:1 },
  ]); // The result would be (94.11 * 2) + (1 * 49.54)
Please note if the user wants an quantity above what the store has. You should account for the quantity the store has. For example if the user wants 4 quantity but the store has only 2, then your calculation should only account for 2
*/


function calculateTotalBill(groceryList) {
  // Store inventory data
  const inventory = [
    { item: 'Jam - Apricot', price: 94.11, quantity: 2 },
    { item: 'Creamers - 10%', price: 49.54, quantity: 1 },
    { item: 'Bread - Whole Wheat', price: 35.00, quantity: 5 },
    { item: 'Milk - 2%', price: 22.75, quantity: 10 }
  ];

  // Edge Case 1: Grocery list must be a non-empty array
  if (!Array.isArray(groceryList) || groceryList.length === 0) {
    console.error("Error: Grocery list is empty or invalid.");
    return 0;
  }

  // Edge Case 2: Inventory must be a non-empty array
  if (!Array.isArray(inventory) || inventory.length === 0) {
    console.error("Error: Inventory data is missing or invalid.");
    return 0;
  }

  // Group inventory by lowercase item name
  const inventoryMap = {};
  for (let i = 0; i < inventory.length; i++) {
    const product = inventory[i];

    // Edge Case 3: Not a proper inventory entry
    if (
      typeof product.item !== 'string' ||
      typeof product.price !== 'number' ||
      typeof product.quantity !== 'number'
    ) {
      console.warn(`Skipping invalid inventory entry at index ${i}:`, product);
      continue;
    }

    const key = product.item.toLowerCase();
    inventoryMap[key] = {
      originalName: product.item,
      price: product.price,
      quantity: product.quantity
    };
  }

  let total = 0;
  const processedItems = {};

  for (let i = 0; i < groceryList.length; i++) {
    const userItem = groceryList[i];

    // Edge Case 4: Missing fields
    if (
      typeof userItem.item !== 'string' ||
      userItem.quantity === undefined
    ) {
      console.warn(`Skipping malformed grocery entry at index ${i}:`, userItem);
      continue;
    }

    const normalizedName = userItem.item.toLowerCase();

    // Edge Case 5: Duplicate item
    if (processedItems[normalizedName]) {
      console.warn(`Duplicate item '${userItem.item}' detected. Skipping.`);
      continue;
    }
    processedItems[normalizedName] = true;

    // Edge Case 6: Invalid quantity
    if (
      typeof userItem.quantity !== 'number' ||
      userItem.quantity <= 0
    ) {
      console.warn(`Invalid quantity for '${userItem.item}':`, userItem.quantity);
      continue;
    }

    const storeItem = inventoryMap[normalizedName];

    // Edge Case 7: Item not found in inventory
    if (!storeItem) {
      console.warn(`Item '${userItem.item}' not found in inventory.`);
      continue;
    }

    // Edge Case 8: Requested quantity exceeds stock
    const purchasableQty = Math.min(userItem.quantity, storeItem.quantity);
    const itemTotal = purchasableQty * storeItem.price;
    total += itemTotal;

    console.log(`Added '${storeItem.originalName}': ${purchasableQty} × ${storeItem.price} = ${itemTotal.toFixed(2)}`);
  }

  console.log("Total Bill:", total.toFixed(2));
  return total;
}

calculateTotalBill([
  { item: 'Jam - Apricot', quantity: 2 },
  { item: 'Creamers - 10%', quantity: 1 },
  { item: 'Milk - 2%', quantity: 12 }, // Only 10 available
  { item: 'Bread - Whole Wheat', quantity: 3 },
  { item: 'Creamers - 10%', quantity: 1 } // Duplicate
]);

