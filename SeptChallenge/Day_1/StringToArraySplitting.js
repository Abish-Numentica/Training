/*Split an string into an array
For example
stringSplit(“numenticaui”, 2);
Output [“nu”, “me”, “nt”, “ic”, “au”, “i];*/
/*Logic:The function takes a string and a number as input. It uses a loop to go through each character and groups them into chunks based on the given number. 
When the chunk reaches the specified length or it's the last character, 
it adds the chunk to the output array and resets the temporary string to start the next group */

function stringSplit(inputData, splitNumber) {
  console.log("The Input is "+inputData );
  console.log("The Character to be Splitted is "+splitNumber);
  let uniqueData = [];
  let temp = "";

  // Edge Case 1: inputData is not a string
  if (typeof inputData !== 'string') {
    console.error("Error: Input must be a string.");
    return false;
  }

  // Edge Case 2: n is not a positive integer
  if (typeof splitNumber !== 'number' || !Number.isInteger(splitNumber) || splitNumber <= 0) {
    console.error("Enter a Positive Integer");
    return false;
  }

  // Edge Case 3: Empty string
  if (inputData.length === 0) {
    console.error("Empty string.");
    return false;
  }


  for (let i = 0; i < inputData.length; i++) {
    temp += inputData[i];

  //this if functions has 2 conditions one is length to split the string and other one for the last character to be identified
    if (temp.length === splitNumber || i === inputData.length - 1) {
      uniqueData.push(temp);
      temp = ""; // reset the temp value to add new values so the next set will be loaded
    }
  }
console.log(uniqueData)
  return true;
}

stringSplit("numenticaui", 4);
stringSplit("numenticaui", 3);
stringSplit("numenticaui", 2);
stringSplit("numenticaui", 5);



