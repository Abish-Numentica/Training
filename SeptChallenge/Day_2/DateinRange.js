/*Check if the number / date is in range
----------------------------------
For example: checkInRange([1, 10], 4) // true since 4 is in between 1 and 10
checkInRange([10, 100], 8) // true false 8 is not in between 10 and 100
inRange([new Date('2025-01-01'), new Date('2025-02-01')], new Date('2025-02-01'); // false*/

/*Logic: The function checks if a given number or date falls within a specified range. 
It first validates that the range is an array with two values of the same type, and that the target value matches that type. 
Then it compares the target against the minimum and maximum of the range to determine if it's within bounds.
*/

function checkInRange(rangeArray, targetValue) {
  console.log("The Range Provided is: " + rangeArray);
  console.log("The Target Value to Check is: " + targetValue);

  // Edge Case 1: Check if rangeArray is a valid array with exactly two elements
  if (!Array.isArray(rangeArray)) {
    console.error("Error: Range must be an array.");
    return false;
  }

  if (rangeArray.length !== 2) {
    console.error("Error: Range must contain exactly two values.");
    return false;
  }

  // Edge Case 2: Check if both elements in rangeArray are of the same type
  if (typeof rangeArray[0] !== typeof rangeArray[1]) {
    console.error("Error: Range boundaries must be of the same type.");
    return false;
  }

  // Edge Case 3: Check if targetValue matches the type of range boundaries
  if (typeof targetValue !== typeof rangeArray[0]) {
    console.error("Error: Target value must match the type of range boundaries.");
    return false;
  }

const [start, end] = rangeArray  
return targetValue >= Math.min(start, end) && targetValue <= Math.max(start, end);


}



console.log(checkInRange([1, 10], 4)); // true
console.log(checkInRange([10, 100], 8)); // false
console.log(checkInRange([100, 10], 50)); // true
console.log(checkInRange([new Date('2025-01-01'), new Date('2025-02-01')], new Date('2025-01-15'))); // true
console.log(checkInRange([new Date('2025-01-01'), new Date('2025-02-01')], new Date('2025-02-01'))); // false
console.log(checkInRange([new Date('2025-02-01'), new Date('2025-01-01')], new Date('2025-01-15'))); // true

