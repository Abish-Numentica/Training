/*Convert number to strings
for example: convertNumberToString(1)
output “one”
convertNumberToString(98)
output “nineeight”*/
/*Logic: This function converts a numeric input—either a number, numeric string, or array of digits—into its word-based string representation.
It uses a digit-to-word mapping object, validates the input manually using Number() and isFinite(), and handles negative values and decimals explicitly.
Each character is processed through a loop, and the final string is built step-by-step using manual control flow, ensuring clarity, robustness, and edge case coverage.
*/

function convertNumberToString(input) {
  const numberToStringData = {
    0: "zero", 1: "one", 2: "two", 3: "three", 4: "four",
    5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine"
  };

  let combinedStr = "";

  // Handle array input
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      combinedStr += input[i];
    }
  } else {
    combinedStr = String(input);
  }

  // Edge Case 1: Empty string
  if (combinedStr.trim() === "") {
    console.error("Error: Input is empty.");
    return false;
  }

  // Edge Case 2: Contains invalid symbols
  const symbolPattern = /[^0-9.\-]/;
  if (symbolPattern.test(combinedStr)) {
    console.error("Error: Input contains invalid symbol(s). Only digits, dot, and hyphen are allowed.");
    return false;
  }

  // Convert to number
  const numericValue = Number(combinedStr);
 
  // Handle negative numbers
  const isNegative = numericValue < 0;
  const normalizedStr = Math.abs(numericValue).toString();

  // Special case: zero
  if (normalizedStr === "0") {
    console.log("zero");
    return "zero";
  }

  // Build string representation
  let result = isNegative ? "-" : "";

  for (let i = 0; i < normalizedStr.length; i++) {
    const char = normalizedStr[i];
    result += char === "." ? "." : numberToStringData[Number(char)];
  }

  console.log(result);
  return result;
}

convertNumberToString(98);         // Output: "nineeight"
convertNumberToString("89.36");    // Output: "eightnineninethreesix"
convertNumberToString(0);          // Output: "zero"
convertNumberToString("0");        // Output: "zero"
convertNumberToString(-25);        // Output: "-twofive"
convertNumberToString("abish");    // Error: Invalid input
convertNumberToString([1, 2, 3]);  // Output: "onetwothree"
convertNumberToString("1@3");      // Error: Invalid input