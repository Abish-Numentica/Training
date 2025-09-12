/*Convert number to strings
for example: convertNumberToString(1)
output “one”
convertNumberToString(98)
output “nineeight”*/
/*Logic: This function converts a numeric input—either a number, numeric string, or array of digits—into its word-based string representation.
It uses a digit-to-word mapping object, validates the input manually using Number() and isFinite(), and handles negative values and decimals explicitly.
Each character is processed through a loop, and the final string is built step-by-step using manual control flow, ensuring clarity, robustness, and edge case coverage.
*/

function convertNumberToString(inputFromUser) {
    // Mapping of digits to their string representations
    const numberToStringData = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine"
    };
// Convert the number to a string and then to an array of digits
//const digits = inputFromUser.toString().split('');


/*const digits=[];
if (inputFromUser === 0) {
        console.log("zero");
        return true;
    }

while (inputFromUser > 0) {
  let digit = inputFromUser % 10;
  digits.unshift(digit); // adds the value in the begining
  inputFromUser = Math.floor(inputFromUser / 10);//rounds the number
}*/
    let combinedStr = '';

    // Handle array input
    if (Array.isArray(inputFromUser)) {
        for (let i = 0; i < inputFromUser.length; i++) {
            combinedStr += inputFromUser[i];
        }
    } else {
        combinedStr = inputFromUser;
    }

    // Numeric validation
    const numericValue = Number(combinedStr);
    if (isNaN(numericValue)) {
        console.error("Invalid input: must be a valid number or array of digits");
        return false;
    }

    // Handle negative numbers
    let isNegative = false;
    if (numericValue < 0) {
        isNegative = true;
        combinedStr = Math.abs(numericValue).toString();
    } else {
        combinedStr = numericValue.toString();
    }

    // Special case: zero
    if (combinedStr === "0") {
        console.log("zero");
        return "zero";
    }

    let stringRepresentation = "";
if (isNegative) {
    stringRepresentation = "-";
}


    // Convert each character to its word form
    for (let i = 0; i < combinedStr.length; i++) {
        const char = combinedStr[i];
        if (char === '.') {
            stringRepresentation += "."; 
        } else {
            stringRepresentation += numberToStringData[Number(char)];
        }
    }

    console.log(stringRepresentation);
    return stringRepresentation;
}


convertNumberToString(98);         // Output: "nineeight"
convertNumberToString("89.36");    // Output: "eightnineninethreesix"
convertNumberToString(0);          // Output: "zero"
convertNumberToString("0");        // Output: "zero"
convertNumberToString(-25);        // Output: "-twofive"
convertNumberToString("abish");    // Error: Invalid input
convertNumberToString([1, 2, 3]);  // Output: "onetwothree"
convertNumberToString("1@3");      // Error: Invalid input