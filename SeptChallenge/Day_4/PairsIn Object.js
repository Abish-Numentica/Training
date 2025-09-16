/* Find number of pairs in an array which has the sum provided as a parameter
For example:
const arr1 = [4, 2, 5, 6, 8, 1];
const sum = 6;
numberOfPairs(arr1, sum);
// Pais that matches are [4, 2] => 6. [5, 1] => 6
So output 2*/

/*Logic: The function takes an array and a target sum, then finds all unique pairs of elements whose sum matches the target. 
It validates the input and uses nested loops to check every possible pair.
When a matching pair is found, it’s counted and stored.
The final count represents the total number of valid pairs
*/

function countMatchingPairsForTargetSum(numberArray, targetSumValue) {
  console.log("Input Array:", numberArray);
  console.log("Target Sum:", targetSumValue);

  // Edge Case 1: Validate array input
  if (!Array.isArray(numberArray)) {
    console.error("Error: Input must be an array.");
    return false;
  }

  // Edge Case 2: Array must have at least two elements
  if (numberArray.length < 2) {
    console.warn("Warning: Array has fewer than 2 elements.");
    return false;
  }

  // Edge Case 3: Validate target sum type
  if (typeof targetSumValue !== "number") {
    console.error("Error: Target sum must be a number.");
    return false;
  }

  let matchingPairCount = 0;
  const matchingPairsList = [];

  for (let firstIndex = 0; firstIndex < numberArray.length; firstIndex++) {
    for (let secondIndex = firstIndex + 1; secondIndex < numberArray.length; secondIndex++) {
      const firstNumber = numberArray[firstIndex];
      const secondNumber = numberArray[secondIndex];

      if (firstNumber + secondNumber === targetSumValue) {
        matchingPairsList.push([firstNumber, secondNumber]);
        matchingPairCount++;
      }
    }
  }

  console.log("Matching Pairs:", matchingPairsList);
  return matchingPairCount;
}


countUniquePairsMatchingSum([4, 2, 5, 6, 8, 1], 6); // Output: 2 → [4,2] and [5,1]