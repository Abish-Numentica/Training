/*Group multiples from 1 to 10
COutput = [{1: [34, 12, 10, 15, 7, 21, 81]}, { 2: [34, 12, 10]}, {3: [12, 15, 21, 81] }]*/

/*Logic: The function takes an array of numbers and groups them based on their divisibility by numbers from 1 to 10. 
It validates the input and loops through each divisor, collecting numbers that are divisible by it.
Each group is stored as an object and added to the final output array
*/

function groupMultiplesByDivisor(numberArray) {
  // Edge Case 1: Validate input type
  if (!Array.isArray(numberArray)) {
    console.error("Invalid input: Expected an array of numbers.");
    return false;
  }

  // Edge Case 2: Handle empty array
  if (numberArray.length === 0) {
    console.warn("Input array is empty.");
    return false;
  }

  const groupedMultiplesList = [];

  for (let divisor = 1; divisor <= 10; divisor++) {
    const multiplesGroup = [];

    for (let index = 0; index < numberArray.length; index++) {
      const currentNumber  = numberArray[index];

      // Edge Case 3: Skip non-numeric entries
      if (typeof currentNumber  !== "number") {
        console.error(`Invalid element at index ${index}:`, currentNumber , "- Must be a number.");
        continue;
      }

      if (currentNumber  % divisor === 0) {
        multiplesGroup.push(currentNumber );
      }
    }

    if (multiplesGroup.length > 0) {
      const groupObject = {};
      groupObject[`DivisibleBy_${divisor}`] = multiplesGroup;
      groupedMultiplesList.push(groupObject);
    }
  }

  console.log("Grouped Multiples by Divisor:");
  console.log(groupedMultiplesList);
  return groupedMultiplesList;
}

groupMultiplesByDivisor([34, 12, 10, 15, 7, 21, 81]);