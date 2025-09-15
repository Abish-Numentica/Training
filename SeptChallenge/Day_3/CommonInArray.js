/* Find the common numbers in two arrays
const arr1 = [3, 45, 42, 11, 34];
const arr2 = [35, -7, 87, 11, 1, 45]
findCommon(arr1, arr2)
Output = [11, 45]*/

/*Logic: The function compares two arrays and finds numbers that exist in both. 
It first checks for valid input and ensures all elements are numeric. 
Then, using nested loops, it checks each value from the first array against the second.
If a match is found and hasn't already been added, it's pushed into the result.
This ensures only unique common values are returned.
*/

function findCommonNumbers(firstNumberArray, secondNumberArray) {
  console.log("The First Array is:", firstNumberArray);
  console.log("The Second Array is:", secondNumberArray);

  const sharedValuesList = [];

  // Edge Case 1: Validate both inputs are arrays
  if (!Array.isArray(firstNumberArray) || !Array.isArray(secondNumberArray)) {
    console.error("Error: Both inputs must be arrays.");
    return false;
  }

  // Edge Case 2: Check for empty arrays
  if (firstNumberArray.length === 0 || secondNumberArray.length === 0) {
    console.error("Error: One or both arrays are empty.");
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

  // Compare values manually
  for (let i = 0; i < firstNumberArray.length; i++) {
    const candidateValue = firstNumberArray[i];

    for (let j = 0; j < secondNumberArray.length; j++) {
      if (candidateValue === secondNumberArray[j]) {
        let isAlreadyIncluded = false;

        for (let k = 0; k < sharedValuesList.length; k++) {
          if (sharedValuesList[k] === candidateValue) {
            isAlreadyIncluded = true;
            break;
          }
        }

        if (!isAlreadyIncluded) {
          sharedValuesList.push(candidateValue);
        }
      }
    }
  }

  console.log("The Common Elements in Both Arrays Are:", sharedValuesList);
  return true;
}

findCommon([3, 45, 42, 11, 34], [35, -7, 87, 11, 1, 45]); // Output: [11, 45]
findCommon([1, 2, 3], [4, 5, 6]);                         // Output: []
findCommon([], [1, 2, 3]);                                // Error: One or both arrays are empty
findCommon("notArray", [1, 2]);                           // Error: Both inputs must be arrays
