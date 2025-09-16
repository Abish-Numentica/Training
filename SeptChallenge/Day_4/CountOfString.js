/*From an array of strings, return an object with the count of each string.
count(["a", "b", "a", "c", "b", "a"]);
// Output: { a: 3, b: 2, c: 1 }*/

/*Logic: The function takes an array of strings and counts how many times each string appears.
It first validates the input and skips any non-string values. 
Then, using a loop, it builds an object where each key is a string from the array and its value is the count of occurrences.
*/

function countStrings(inputArray) {
  console.log("The Given Array is:", inputArray);

  // Edge Case 1: Input is not an array
  if (!Array.isArray(inputArray)) {
    console.error("Error: Input must be an array.");
    return false;
  }

  // Edge Case 2: Empty array
  if (inputArray.length === 0) {
    console.warn("Warning: Empty array provided.");
    return {};
  }

  // Edge Case 3: Non-string elements
  let frequencyMap  = {};
  for (let index  = 0; index  < inputArray.length; index ++) {
    const rawValue  = inputArray[i];

    if (typeof rawValue  !== 'string') {
      console.error(`Skipping non-string value at index ${index }:`, rawValue );
      continue;
    }

    if (frequencyMap [rawValue ]) {
      frequencyMap [rawValue ] += 1;
    } else {
      frequencyMap [rawValue ] = 1;
    }
  }

  console.log("Final Count Output:", frequencyMap );
  return frequencyMap ;
}
countStrings(["a", "b", "A", "c", "B", "a", "C", " ", 42, null]);