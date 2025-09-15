/* Check if a number is divisible by all numbers in a given range.
For example:
isDivisibleInRange([1, 5], 60) // true  (60 is divisible by 1,2,3,4,5)
isDivisibleInRange([1, 5], 15) // false (15 is not divisible by 4)
isDivisibleInRange([2, 6], 120) // true  (120 % 2,3,4,5,6 === 0)*/

/*Logic: The function checks whether a given number is divisible by every integer within a specified range. 
It first validates the input types and ensures the range is properly ordered. 
Then, using a loop, it tests divisibility for each number in the range. 
If any number fails the check, it returns false; otherwise, it confirms the number is divisible by all values in the range.
*/

function isDivisibleInRange(divisorRangeArray, candidateNumber) {
  console.log("The Range Provided is:", divisorRangeArray);
  console.log("The Target Number to Check is:", candidateNumber);

  // Edge Case 1: Validate range array structure
  if (!Array.isArray(divisorRangeArray) || divisorRangeArray.length !== 2) {
    console.error("Error: Range must be an array with exactly two numbers.");
    return false;
  }

  const lowerBound = divisorRangeArray[0];
  const upperBound = divisorRangeArray[1];

  // Edge Case 2: Validate both range values are integers
  if (
    typeof lowerBound !== 'number' ||
    typeof upperBound !== 'number' ||
    !Number.isInteger(lowerBound) ||
    !Number.isInteger(upperBound)
  ) {
    console.error("Error: Range values must be integers.");
    return false;
  }

  // Edge Case 3: Validate candidate number
  if (typeof candidateNumber !== 'number' || candidateNumber <= 0) {
    console.error("Error: Target number must be a positive number.");
    return false;
  }

  // Normalize range order
  let startValue = lowerBound;
  let endValue = upperBound;
  if (startValue > endValue) {
    const tempValue = startValue;
    startValue = endValue;
    endValue = tempValue;
  }

  // Manual divisibility check
  for (let divisor = startValue; divisor <= endValue; divisor++) {
    if (candidateNumber % divisor !== 0) {
      console.log("false");
      return false;
    }
  }

  console.log("true");
  return true;
}

isDivisibleInRange([1, 5], 60);   // true
isDivisibleInRange([1, 5], 15);   // false
isDivisibleInRange([2, 6], 120);  // true
isDivisibleInRange([6, 2], 120);  // true (handles reversed range)
isDivisibleInRange([1, 1], 1);    // true
isDivisibleInRange([1, 5], -60);  // false
isDivisibleInRange("invalid", 60); // false