/*Find the numbers that are present in one array but not in the other.
For example:
const arr1 = [3, 45, 42, 11, 34];
const arr2 = [35, -7, 87, 11, 1, 45];
findDifference(arr1, arr2)
// Output: [3, 42, 34, 35, -7, 87, 1]*/

/*Logic: The function compares two arrays and identifies numbers that exist in one but not the other.
It first validates the inputs and ensures all elements are numeric.
Then, using nested loops, it checks each value from both arrays and collects those that are not shared. 
This results in a final list of unique values from both sides
*/

function findDifference(firstNumberArray, secondNumberArray) {
  console.log("The First Array is:", firstNumberArray);
  console.log("The Second Array is:", secondNumberArray);

  const uniqueDifferenceList = [];

  // Edge Case 1: Validate both inputs are arrays
  if (!Array.isArray(firstNumberArray) || !Array.isArray(secondNumberArray)) {
    console.error("Error: Both inputs must be arrays.");
    return false;
  }

  // Edge Case 2: Check for both arrays being empty
  if (firstNumberArray.length === 0 && secondNumberArray.length === 0) {
    console.error("Error: Both arrays are empty.");
    return false;
  }

  // Edge Case 3: Validate numeric values in first array
  for (let index = 0; index < firstNumberArray.length; index++) {
    const currentValue = firstNumberArray[index];
    if (typeof currentValue !== 'number') {
      console.error(`Error: Non-numeric value in first array at index ${index}: ${currentValue}`);
      return false;
    }
  }

  // Edge Case 4: Validate numeric values in second array
  for (let index = 0; index < secondNumberArray.length; index++) {
    const currentValue = secondNumberArray[index];
    if (typeof currentValue !== 'number') {
      console.error(`Error: Non-numeric value in second array at index ${index}: ${currentValue}`);
      return false;
    }
  }

  // Compare elements from first array not in second
  for (let i = 0; i < firstNumberArray.length; i++) {
    let isFound = false;
    for (let j = 0; j < secondNumberArray.length; j++) {
      if (firstNumberArray[i] === secondNumberArray[j]) {
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      uniqueDifferenceList.push(firstNumberArray[i]);
    }
  }

  // Compare elements from second array not in first
  for (let i = 0; i < secondNumberArray.length; i++) {
    let isFound = false;
    for (let j = 0; j < firstNumberArray.length; j++) {
      if (secondNumberArray[i] === firstNumberArray[j]) {
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      uniqueDifferenceList.push(secondNumberArray[i]);
    }
  }

  console.log("The Numbers Present in One Array but Not in the Other Are:", uniqueDifferenceList);
  return true;
}
findDifference([3, 45, 42, 11, 34], [35, -7, 87, 11, 1, 45]); // Output: [3, 42, 34, 35, -7, 87, 1]
findDifference([1, 2, 3], [3, 4, 5]);                         // Output: [1, 2, 4, 5]
findDifference([], [1, 2]);                                   // Output: [1, 2]
findDifference([1, 2], []);                                   // Output: [1, 2]
findDifference([], []);                                       // Error: Both arrays are empty
findDifference([1, 'a', 3], [3, 4]);                          // Error: Non-numeric value in arr1 at index 1: a
findDifference([1, 2, 3], [3, null]);                          // Error: Non-numeric value in arr2 at index 1: null
findDifference("invalid", [1, 2]);                             // Error: Both inputs must be arrays
findDifference([1, 2], "invalid");                             // Error: Both inputs must be arrays
findDifference("invalid", "invalid");                         // Error: Both inputs must be arrays  
