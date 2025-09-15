/*Merge objects with array values
merge(
  { fruits: ["apple"], veggies: ["carrot"] },
  { fruits: ["banana"], drinks: ["water"] }
);
// Output: { fruits: ["apple", "banana"], veggies: ["carrot"], drinks: ["water"] }
*/

/*Logic: The function takes two objects with array values and merges them into a single object. 
It checks for valid input and loops through each key in both objects. If a key exists in both, their arrays are combined; 
if a key is unique to one object, its array is added directly. This ensures all array values are grouped correctly under their respective keys.
*/

function mergeGroupedArraysByKey(primarySourceObject, secondarySourceObject) {
  console.log("Primary Source Object:", primarySourceObject);
  console.log("Secondary Source Object:", secondarySourceObject);

  // Edge Case 1: Validate both inputs are non-null plain objects
  const isValidObject = inputObject =>
    typeof inputObject === 'object' && inputObject !== null && !Array.isArray(inputObject);

  if (!isValidObject(primarySourceObject) || !isValidObject(secondarySourceObject)) {
    console.error("Error: Both inputs must be non-null plain objects.");
    return false;
  }

  const mergedGroupMap = {};

  // Helper function to process each source object
  function processSourceObject(sourceObject) {
    for (const categoryKey in sourceObject) {
      const valueArray = sourceObject[categoryKey];

      // Edge Case 2: Skip non-array values
      if (!Array.isArray(valueArray)) {
        console.error(`Skipping non-array value for key '${categoryKey}':`, valueArray);
        continue;
      }

      // Edge Case 3: Skip empty arrays
      if (valueArray.length === 0) {
        console.warn(`Skipping empty array for key '${categoryKey}'`);
        continue;
      }

      // Manual merge logic
      if (mergedGroupMap[categoryKey]) {
        for (let i = 0; i < valueArray.length; i++) {
          mergedGroupMap[categoryKey].push(valueArray[i]);
        }
      } else {
        mergedGroupMap[categoryKey] = [];
        for (let i = 0; i < valueArray.length; i++) {
          mergedGroupMap[categoryKey].push(valueArray[i]);
        }
      }
    }
  }

  // Process both source objects
  processSourceObject(primarySourceObject);
  processSourceObject(secondarySourceObject);

  console.log("Final Merged Output:", mergedGroupMap);
  return mergedGroupMap;
}


mergeGroupedArraysByKey(
  { fruits: ["apple"], veggies: ["carrot"], snacks: [] },
  { fruits: ["banana"], drinks: ["water"], veggies: "not-an-array" }
);