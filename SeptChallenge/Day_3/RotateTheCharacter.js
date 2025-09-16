/*Implement a function to rotate the characters in a string by a given number of positions.
If the number is positive, rotate to the right.
If the number is negative, rotate to the left.
For example:
rotate("arun", 2)   // "unar"
rotate("arun", -2)  // "unar" (left rotation)
rotate("hello", 3)  // "llohe"*/

/*Logic: The function rotates characters in a string by a given number of positions. 
Positive values rotate to the right, and negative values rotate to the left.
It first validates the input and normalizes the rotation using modulo.
Then it rebuilds the string by slicing from the calculated rotation point, ensuring correct output regardless of direction.
*/

function rotate(inputString, rotateBy) {
  console.log("The Input String is: " + inputString);
  console.log("The Number of Positions to Rotate is: " + rotateBy);

  // Edge Case 1: Input is not a string
  if (typeof inputString !== 'string') {
    console.error("Error: Input must be a string.");
    return false;
  }

  // Edge Case 2: rotateBy is not an integer
  if (typeof rotateBy !== 'number' || !Number.isInteger(rotateBy)) {
    console.error("Error: Rotation value must be an integer.");
    return false;
  }

  // Edge Case 3: Empty string
  if (inputString.length === 0) {
    console.error("Error: Input string is empty.");
    return false;
  }

  let length = inputString.length;
  let normalizedRotation = rotateBy % length;


  if (normalizedRotation < 0) {
    normalizedRotation = length + normalizedRotation;
  }

  let rotatedString = "";


  for (let i = length - normalizedRotation; i < length; i++) {
    rotatedString += inputString[i];
  }

  for (let i = 0; i < length - normalizedRotation; i++) {
    rotatedString += inputString[i];
  }

  console.log("The Rotated String is: " + rotatedString);
  return true;
}


rotate("arun", 2);     // Output: "unar"
rotate("arun", -2);    // Output: "unar"
rotate("hello", 3);    // Output: "llohe"
rotate("rotate", 0);   // Output: "rotate"
rotate("rotate", 6);   // Output: "rotate"
rotate("rotate", 8);   // Output: "terota"
rotate("", 2);         // Error: Input string is empty
rotate(12345, 2);      // Error: Input must be a string
rotate("hello", 2.5);  // Error: Rotation must be an integer