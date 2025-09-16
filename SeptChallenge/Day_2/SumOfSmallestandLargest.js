/*Return the sum of smallest and largest number in an array
---------------------------------------------------------
Example: [45, 2, 25, 11, 16]
Here the output will be 2(smallest) + 45 (largest)
Output will be 47*/


/*Logic: The function takes an array of numbers and finds the smallest and largest values. 
It checks for valid input and ensures all elements are numeric. 
Then it loops through the array to identify the minimum and maximum values, adds them together, and returns the sum.
*/

function sumOfMinMax(inputArray) {
  console.log("The Input Array is: " + inputArray);

  // Edge Case 1: Check if input is an array
  if (!Array.isArray(inputArray)) {
    console.error("Error: Input must be an array.");
    return false;
  }

  // Edge Case 2: Check for empty array
  if (inputArray.length === 0) {
    console.error("Error: Input array is empty.");
    return false;
  }

  // Edge Case 3: Check for non-numeric values
  for (let i = 0; i < inputArray.length; i++) {
    if (typeof inputArray[i] !== 'number') {
      console.error("Error: Non-numeric value at index " + i + ": " + inputArray[i]);
      return false;
    }
  }

  
  let smallest = inputArray[0];
  let largest = inputArray[0];

  for (let i = 1; i < inputArray.length; i++) {
    if (inputArray[i] < smallest) {
      smallest = inputArray[i];
    }
    if (inputArray[i] > largest) {
      largest = inputArray[i];
    }
  }

  let sum = smallest + largest;
  console.log("Smallest Number: " + smallest);
  console.log("Largest Number: " + largest);
  console.log("Sum of Smallest and Largest: " + sum);
  return true;
}

sumOfMinMax([45, 2, 25, 11, 16]);       // Output: 2 + 45 = 47
sumOfMinMax([100]);                     // Output: 100 + 100 = 200
sumOfMinMax([-10, -5, -20, -1]);        // Output: -20 + (-1) = -21
sumOfMinMax([0, 0, 0]);                 // Output: 0 + 0 = 0
sumOfMinMax([]);                        // Error: Input array is empty
sumOfMinMax("notArray");               // Error: Input must be an array
sumOfMinMax([1, 2, "three", 4]);        // Error: Non-numeric value at index 2
