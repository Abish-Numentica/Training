/*Convert an array of key-value pairs into an object.
toObject([["name", "Arun"], ["age", 39]]);
// Output: { name: "Arun", age: 39 } */

/*Logic: The function takes an array of key-value pairs and converts it into an object.
It first checks for valid input and skips any invalid pairs.
Then, using a loop, it assigns each key-value pair to the output object, building a clean structure from the array.
*/

function convertKeyValuePairsToObject(pairArray) {
  console.log("Input Pair Array:", pairArray);

  // Edge Case 1: Validate input type
  if (!Array.isArray(pairArray)) {
    console.error("Error: Input must be an array of key-value pairs.");
    return false;
  }

  // Edge Case 2: Handle empty array
  if (pairArray.length === 0) {
    console.warn("Warning: Empty input array.");
    return {};
  }

  const resultObject = {};

  for (let index = 0; index < pairArray.length; index++) {
    const currentPair = pairArray[index];

    // Edge Case 3: Validate pair structure
    if (
      !Array.isArray(currentPair) ||
      currentPair.length !== 2 ||
      typeof currentPair[0] !== 'string'
    ) {
      console.error(`Skipping invalid pair at index ${index}:`, currentPair);
      continue;
    }

    const keyName = currentPair[0].trim();
    const valueData = currentPair[1];

    // Edge Case 4: Skip empty keys
    if (keyName === '') {
      console.warn(`Skipping empty key at index ${index}`);
      continue;
    }

    resultObject[keyName] = valueData;
  }

  console.log("Final Converted Object:", resultObject);
  return resultObject;
}

convertKeyValuePairsToObject([["name", "Arun"], ["age", 39]]);