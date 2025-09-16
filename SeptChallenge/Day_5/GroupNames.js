/*Group names according to the initial character
Input: ["arun", "balu", "cathy", "krish", "aadhir", "aariketh", "kamal"]
Output
["arun", "aadhir", "aariketh"]
["balu"]
["cathy"]
["krish", "kamal"]*/

/* 
Logic: The function takes an array of names and groups them based on their initial character.  
It validates the input and skips any non-string or empty entries.  
Each name is added to a group corresponding to its first letter.  
Finally, it prints each group of names that share the same initial.
*/

function groupNamesByInitial(nameList) {
  // Edge Case 1: Validate input type and structure
  if (!Array.isArray(nameList) || nameList.length === 0) {
    console.error("Error: Input must be a non-empty array of names.");
    return false;
  }

  // Step 1: Group names by initial character
  const initialGroups = {};

  for (let i = 0; i < nameList.length; i++) {
    const name = nameList[i];

    // Edge Case 2: Skip non-string or empty entries
    if (typeof name !== 'string' || name.trim() === '') {
      console.warn(`Skipping invalid name at index ${i}:`, name);
      continue;
    }

    const normalizedName = name.trim();
    const initialChar = normalizedName[0].toLowerCase();

    if (!initialGroups[initialChar]) {
      initialGroups[initialChar] = [];
    }

    initialGroups[initialChar].push(normalizedName);
  }

  // Step 2: Display grouped names
  console.log("Grouped Names by Initial Character:");
  for (const initial in initialGroups) {
    console.log(`[${initial.toUpperCase()}] → [${initialGroups[initial].join(", ")}]`);
  }
}
groupByInitial(["arun","balu","cathy","krish","aadhir","aariketh","kamal"]);