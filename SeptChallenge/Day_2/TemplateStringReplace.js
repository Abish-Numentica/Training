/*Template String Replace
----------------------------
For example:
const string = “Numentica is a company focused on delivering high quality code. It is located in #[location] #[state] #[phone]“;
replaceTemplateString(string, [[“location”, “Chennai”], [“state”, “Tamil Nadu”], [“phone”, “9840164723"]])
Output: Numentica is a company focused on delivering high quality code. It is located in Chennai Tamil Nadu 9840164723*/

/*Logic: The function takes a template string and a list of key-value pairs.
 It scans the string for placeholders in the format #[key], and replaces each with its corresponding value from the list. 
 If a key is not found, the placeholder remains unchanged. 
 The function also includes input validation to ensure the template and replacements are properly structured.
*/
function replacePlaceholdersInTemplate(templateText, replacementPairsList) {
  console.log("The Input Template is:", templateText);
  console.log("The Replacement Pairs Are:", replacementPairsList);

  // Edge Case 1: Validate template input
  if (typeof templateText !== 'string') {
    console.error("Error: Template must be a string.");
    return false;
  }

  // Edge Case 2: Validate replacement list structure
  if (!Array.isArray(replacementPairsList)) {
    console.error("Error: Replacements must be an array.");
    return false;
  }

  // Edge Case 3: Check for empty replacement list
  if (replacementPairsList.length === 0) {
    console.error("Error: No replacements provided.");
    return false;
  }

  // Edge Case 4: Validate each replacement pair
  for (let index = 0; index < replacementPairsList.length; index++) {
    const pair = replacementPairsList[index];
    if (
      !Array.isArray(pair) ||
      pair.length !== 2 ||
      typeof pair[0] !== 'string' ||
      typeof pair[1] !== 'string'
    ) {
      console.error("Error: Invalid replacement pair at index", index, ":", pair);
      return false;
    }
  }

  let finalOutput = "";
  let currentIndex = 0;

  while (currentIndex < templateText.length) {
    if (templateText[currentIndex] === '#' && templateText[currentIndex + 1] === '[') {
      let placeholderKey = "";
      let scanIndex = currentIndex + 2;

      while (scanIndex < templateText.length && templateText[scanIndex] !== ']') {
        placeholderKey += templateText[scanIndex];
        scanIndex++;
      }

      let replacementFound = false;
      let replacementValue = "";

      for (let pairIndex = 0; pairIndex < replacementPairsList.length; pairIndex++) {
        const [key, value] = replacementPairsList[pairIndex];
        if (key === placeholderKey) {
          replacementValue = value;
          replacementFound = true;
          break;
        }
      }

      if (replacementFound) {
        finalOutput += replacementValue;
      } else {
        finalOutput += "#[" + placeholderKey + "]";
      }

      currentIndex = scanIndex + 1;
    } else {
      finalOutput += templateText[currentIndex];
      currentIndex++;
    }
  }

  console.log("The Final Replaced String Is:", finalOutput);
  return finalOutput;
}
const inputString = "Numentica is a company focused on delivering high quality code. It is located in #[location] #[state] #[phone]";
replaceTemplateString(inputString, [["location", "Chennai"], ["state", "Tamil Nadu"], ["phone", "9840164723"]]);

