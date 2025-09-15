/*Write a javascript function to return number of occurance of a particular word in a sentence
For example:
findNumberOfOccurance(“be kind whenever possible. kindness is what matters”, “kind”);
Will return an output of 2 ( 2 occurance of kind in the string )*/

/*Logic: To accurately count occurrences of a word like "kind" in a sentence—including cases where it's a prefix in longer words like "kindness"—
I iterate through the sentence character by character using index-based logic,
comparing substrings of equal length to the target word without relying on array conversion, slice, or substring methods.
By using a manual for loop, I gain precise control over each comparison, allowing me to detect partial matches and handle edge cases with full transparency and reliability.
 */


function findNumberOfOccurance(inputFromUser,findingWord){

console.log("The Given Sentence is  "+ inputFromUser);
console.log("The Word to be find Occurance for is  "+ findingWord);

inputFromUser=inputFromUser.toLowerCase();
findingWord=findingWord.toLowerCase();


  // Edge Case 1: Check if inputs are strings
    if (typeof inputFromUser !== 'string' || typeof findingWord !== 'string') {
        console.error("Both sentence and word must be strings.");
        return false;
    }
    // Edge Case 2: Empty sentence or word
    if (inputFromUser.length === 0 || findingWord.length === 0) {
        console.error("Sentence or word is empty.");
        return false;
    }

let result=[];
for (let i = 0; i <= inputFromUser.length - findingWord.length; i++) {
    if (inputFromUser.slice(i, i + findingWord.length) === findingWord) {
      result.push(inputFromUser.slice(i, i + findingWord.length));
    }
  }
/*let result = [];

for (let i = 0; i <= convertedInput.length - convertedWord.length; i++) {
    let match = true;

    for (let j = 0; j < convertedWord.length; j++) {
        if (convertedInput[i + j] !== convertedWord[j]) {
            match = false;
            break;
        }
    }
    if (match) {
        let matchedWord = "";
        for (let k = 0; k < convertedWord.length; k++) {
            matchedWord += convertedInput[i + k];
        }
        result.push(matchedWord);
    }
}*/
console.log('The Number of Occurance is '+ result.length)
return true;
}

findNumberOfOccurance("be kind whenever possible. kindness is what matters","kind")
