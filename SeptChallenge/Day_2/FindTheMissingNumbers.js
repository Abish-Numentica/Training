/*Find the missing number / numbers
----------------------------------------
Example: Given an array of numbers in random order, find the missing numbers
[7, 10, 12, 9] // output [8, 11] since these are the numbers missing in 7, 9, 10, 12
Note: The numbers will be given as input in any order.*/

/*Logic: The function takes an array of numbers and identifies which values are missing between the smallest and largest numbers in the array. 
It first checks for valid input and ensures all elements are integers. 
Then it finds the minimum and maximum values, and loops through that range to check which numbers are not present in the original array.
Those missing numbers are collected and returned.
*/
function findMissingNumbers(sourceArray) {
  console.log("The Input Array is:", sourceArray);

  const missingValuesList = [];

  // Edge Case 1: Validate input type
  if (!Array.isArray(sourceArray)) {
    console.error("Error: Input must be an array.");
    return false;
  }

  // Edge Case 2: Handle empty array
  if (sourceArray.length === 0) {
    console.error("Error: Input array is empty.");
    return false;
  }

  // Edge Case 3: Validate all values are integers
  for (let index = 0; index < sourceArray.length; index++) {
    const currentValue = sourceArray[index];
    if (typeof currentValue !== 'number' || !Number.isInteger(currentValue)) {
      console.error(`Error: Non-integer value at index ${index}: ${currentValue}`);
      return false;
    }
  }

  // Determine min and max values manually
  let minimumValue = sourceArray[0];
  let maximumValue = sourceArray[0];

  for (let index = 1; index < sourceArray.length; index++) {
    const currentValue = sourceArray[index];
    if (currentValue < minimumValue) {
      minimumValue = currentValue;
    }
    if (currentValue > maximumValue) {
      maximumValue = currentValue;
    }
  }

  // Identify missing values between min and max
  for (let candidateValue = minimumValue; candidateValue <= maximumValue; candidateValue++) {
    let isPresent = false;
    for (let index = 0; index < sourceArray.length; index++) {
      if (sourceArray[index] === candidateValue) {
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      missingValuesList.push(candidateValue);
    }
  }

  console.log("The Missing Numbers Between", minimumValue, "and", maximumValue, "Are:", missingValuesList);
  return true;
}

findMissingNumbers([7, 10, 12, 9]);     // Output: [8, 11]
findMissingNumbers([1, 2, 3, 4, 5]);    // Output: []
findMissingNumbers([100, 102, 105]);    // Output: [101, 103, 104]
findMissingNumbers([]);                // Error: Input array is empty
findMissingNumbers("invalid");         // Error: Input must be an array
findMissingNumbers([1, "two", 3]);     // Error: Non-integer value