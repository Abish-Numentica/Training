/*Find the characters that are repeating the most simaltaneously
For example:
charRepeating(“traaainngfornewbie”);
Output: a
// since a has more repeating simaltaneously
*/

/*Logic: The initial character is assigned to currentChar, and the count is set to 1, assuming each character appears at least once.
 As the loop iterates through the string, if the next character matches currentChar, the count is incremented. When a different character is encountered, 
 the current character and its count are recorded, and both currentChar and count are reset—currentChar becomes the new character, and count is reinitialized to 1. 
 This process continues until the loop ends, allowing us to track the frequency of each repeating character in sequence.
*/

function charRepeating(inputFromUser) {
  console.log("The Input is:", inputFromUser);

  // Edge Case 1: Input is not a string
  if (typeof inputFromUser !== 'string') {
    console.error("Error: Input must be a string.");
    return false;
  }

  // Edge Case 2: Empty string
  if (inputFromUser.length === 0) {
    console.error("Error: Input must be a non-empty string.");
    return false;
  }

  let maxChar = null;
  let maxCount = 1;
  let currentChar = inputFromUser[0];
  let currentCount = 1;

  for (let i = 1; i < inputFromUser.length; i++) {
    if (inputFromUser[i] === currentChar) {
      currentCount++;
    } else {
      if (currentCount > maxCount) {
        maxCount = currentCount;
        maxChar = currentChar;
      }
      currentChar = inputFromUser[i];
      currentCount = 1;
    }
  }

  // Final check after loop ends
  if (currentCount > maxCount) {
    maxCount = currentCount;
    maxChar = currentChar;
  }

  // If no character repeats consecutively
  if (maxCount === 1) {
    console.error("No character repeats consecutively.");
    return false;
  }

  console.log("Most Consecutive Repeating Character:", maxChar);
  return true;
}


charRepeating("traaainngfornewbie"); 
charRepeating("");
charRepeating(12345); 
charRepeating("abcdef"); 
charRepeating("aabbccddeee");