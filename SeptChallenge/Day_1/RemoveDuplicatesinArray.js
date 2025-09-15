/*Remove duplicates in an array
For example: [1, “two”, “two”, 3, “two”];
output [1, “two”, 3]*/

/*Logic: When iterating through an array, the indexOf method returns a value greater than or equal to 0 if the element already exists, 
and -1 if it does not. By using a loop, we can check each element—if it's already present in the output array, we skip adding it again.
This ensures that only unique values are included in the final result*/


function removeDuplicatesInArray(inputArray) {
  console.log("The Input Array is:", inputArray);

  // Edge Case 1: Validate input type
  if (!Array.isArray(inputArray)) {
    console.error("Error: Input must be an array.");
    return false;
  }

  // Edge Case 2: Handle empty array
  if (inputArray.length === 0) {
    console.error("Error: Input array is empty.");
    return false;
  }

  const uniqueValuesList = [];

  for (let i = 0; i < inputArray.length; i++) {
    const currentValue = inputArray[i];

    let isDuplicate = false;

    for (let j = 0; j < uniqueValuesList.length; j++) {
      const existingValue = uniqueValuesList[j];

      // Case-insensitive comparison for strings
      if (
        typeof currentValue === 'string' &&
        typeof existingValue === 'string' &&
        currentValue.toLowerCase() === existingValue.toLowerCase()
      ) {
        isDuplicate = true;
        break;
      }

      // Strict equality for non-strings
      if (
        typeof currentValue !== 'string' &&
        currentValue === existingValue
      ) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      uniqueValuesList.push(currentValue);
    }
  }

  console.log("The Unique Values in the Given Array:", uniqueValuesList);
  return true;
}

removeDuplicatesInArray([1, "two", "two", 3, "two"]);
removeDuplicatesInArray([]);
removeDuplicatesInArray("not an array");