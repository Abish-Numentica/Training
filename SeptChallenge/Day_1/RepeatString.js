/*Repeat string
For example
repeat(“arun”, 3);
output “arunarunarun”;
*/
/*Logic: 2The function takes two inputs—a string and an integer representing the number of times the string should be repeated.
 A new result string is initialized, and a for loop is used to append the original string to it during each iteration.
 This loop runs exactly as many times as specified by the integer input, ensuring the string is repeated the desired number of times.
 Once the loop completes, the final repeated string is returned or printed.
 */
function repeatString(inputFromUser, repeatTimes) {
  console.log("The Input is "+inputFromUser);
  // Edge Case 1: Check if inputFromUser is a string
  if (typeof inputFromUser !== 'string') {
    console.error("Input must be a string.");
    return false;
  }

  // Edge Case 2: Check if repeatTimes is a number
  if (typeof repeatTimes !== 'number') {
    console.error("Number of times to repeat must be a number.");
    return false;
  }

  // Edge Case 3: Check if repeatTimes is a non-negative integer
  if (!Number.isInteger(repeatTimes) || repeatTimes < 0) {
    console.error("Times to repeat must be a non-negative integer.");
    return false;
  }

  // Edge Case 4: repeatTimes is zero,default to 1 repetition
  if (repeatTimes === 0) {
    console.error("Repeat count is zero. Defaulting to one repetition.");
    //I am making to print the output atleast once to give the user an warning of repeat count zero
    return inputFromUser;

   
  }

  let result = "";
  for (let i = 0; i < repeatTimes; i++) {
    result += inputFromUser;
  }
  console.log("The Required Output is "+result)
  return result;
}
repeatString("arun" , 3); 
repeatString("arun", 0); 
repeatString("arun", -1); 

