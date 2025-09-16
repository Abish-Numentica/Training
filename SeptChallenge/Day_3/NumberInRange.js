/*Check if the number is in range
For example:
checkInRange([1, 10], 4) // true since 4 is in between 1
checkInRange([10, 100], 8) // true false 8 is not in between 10 and 100*/

/*Logic: The function checks if a given number falls within a specified numeric range. 
It first validates that the range is an array with exactly two numbers and that the target is also a valid number.
Then it compares the target against the start and end of the range to determine if it lies between them, returning true if it does and false otherwise.
 */


function checkInRange(rangeArray, targetNumber) {
  console.log("The Range Provided is: " + rangeArray);
  console.log("The Target Number to Check is: " + targetNumber);

  // Edge Case 1: Check if rangeArray is a valid array with exactly two elements
  if (!Array.isArray(rangeArray) || rangeArray.length !== 2) {
    console.error("Error: Range must be an array with exactly two numeric values.");
    return false;
  }

  // Edge Case 2: Check if both elements in rangeArray are numbers
  if (
    typeof rangeArray[0] !== 'number' ||
    typeof rangeArray[1] !== 'number'
  ) {
    console.error("Error: Range values must be numbers.");
    return false;
  }

  // Edge Case 3: Check if targetNumber is a number
  if (typeof targetNumber !== 'number') {
    console.error("Error: Target value must be a number.");
    return false;
  }

  // Normalize the range
  for (let i = 0; i < rangeArray.length - 1; i++) {
    const start = rangeArray[i];
    const end = rangeArray[i + 1];
    if (targetNumber >= start && targetNumber <= end) {
     console.log("True");
      return true;
    }
  } console.log("False");
  return false;
}



checkInRange([1, 10], 4);      // true
checkInRange([10, 100], 8);    // false
checkInRange([100, 10], 8);    // false (handles reversed range)
checkInRange([5, 5], 5);       // true (exact match)
checkInRange([0, 0], 1);       // false
checkInRange("invalid", 4);    // false
checkInRange([1, "ten"], 4);   // false
checkInRange([1, 10], "four"); // false
checkInRange([1], 4);        // false   // false (invalid range array)
checkInRange([], 4);           // false (invalid range array)       
checkInRange([1, 10, 20], 4);  // false (invalid range array)
checkInRange([1, 10], null);   // false (invalid target number)
checkInRange([1, 10], undefined); // false (invalid target number)