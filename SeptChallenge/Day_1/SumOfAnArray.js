/*Find the sum of even numbers in an array. find all the even numbers in an array and add them
For example
findEvenSum([38, 3, 2, 8, 31])
output -  48 */
/*Logic: The function takes an array of numbers and checks each element to find even numbers. 
All even numbers are collected into a temporary array, and then a second loop adds them together to get the final sum. 
Edge cases like non-array input, empty arrays, and non-numeric values are handled to ensure valid processing.
 */


function sumOfEvenNumbers(inputNumberArray) {
  console.log("The Input Array is:", inputNumberArray);

  // Edge Case 1: Validate input type
  if (!Array.isArray(inputNumberArray)) {
    console.error("Error: Input must be an array.");
    return false;
  }

  // Edge Case 2: Check for empty array
  if (inputNumberArray.length === 0) {
    console.error("Error: Input array is empty.");
    return false;
  }

  // Edge Case 3: Validate all elements are numeric
  for (let index = 0; index < inputNumberArray.length; index++) {
    const currentValue = inputNumberArray[index];
    if (typeof currentValue !== 'number') {
      console.error(`Error: Non-numeric value at index ${index}: ${currentValue}`);
      return false;
    }
  }

  // Filter even numbers manually
  const evenNumberList = [];
  for (let index = 0; index < inputNumberArray.length; index++) {
    const currentValue = inputNumberArray[index];
    if (currentValue % 2 === 0) {
      evenNumberList.push(currentValue);
    }
  }

  // Sum even numbers manually
  let totalEvenSum = 0;
  for (let index = 0; index < evenNumberList.length; index++) {
    totalEvenSum += evenNumberList[index];
  }

  console.log("The Sum of the Even Numbers in the Given Input:", totalEvenSum);
  return true;
}
sumOfEvenNumbers([38, 3, 2, 8, 31]);
sumOfEvenNumbers([12, 3, 2, 8, 31]);
sumOfEvenNumbers([1, 1, 1, 1, 31]);
sumOfEvenNumbers([0, 0, 2, 3, 31]);
sumOfEvenNumbers([]);