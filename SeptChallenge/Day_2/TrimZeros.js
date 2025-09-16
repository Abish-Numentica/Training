/*Trim Zeros
--------------
Remove leading/trailing zeros from a numeric string without losing internal zeros; preserve sign and decimal.
trimZeros(input, which='both') -> string
// which: 'leading' | 'trailing' | 'both'*/

/*Logic: The function takes a numeric string and removes leading and/or trailing zeros based on the selected option—leading, trailing, or both. 
It manually parses the string to separate the sign, integer part, and decimal part, then trims zeros without affecting internal digits or structure.
It also validates input format and handles edge cases like multiple decimals or invalid characters.
*/

function trimZeros(numericString, trimMode) {
  console.log("The Input String is:", numericString);
  console.log("The Trim Option Selected is:", trimMode);

  // Edge Case 1: Validate trim mode
  if (trimMode !== 'leading' && trimMode !== 'trailing' && trimMode !== 'both') {
    console.error("Error: Invalid trim option. Use 'leading', 'trailing', or 'both'.");
    return false;
  }

  // Edge Case 2: Validate input type
  if (typeof numericString !== 'string') {
    console.error("Error: Input must be a string.");
    return false;
  }

  // Edge Case 3: Check for empty string
  if (numericString.length === 0) {
    console.error("Error: Input string is empty.");
    return false;
  }

  // Edge Case 4: Validate numeric structure manually
  let hasDecimalPoint = false;
  let hasSignPrefix = false;
  let decimalPosition = -1;

  for (let index = 0; index < numericString.length; index++) {
    const character = numericString[index];

    if (index === 0 && (character === '+' || character === '-')) {
      hasSignPrefix = true;
      continue;
    }

    if (character === '.') {
      if (hasDecimalPoint) {
        console.error("Error: Multiple decimal points.");
        return false;
      }
      hasDecimalPoint = true;
      decimalPosition = index;
      continue;
    }

    if (character < '0' || character > '9') {
      console.error(`Error: Invalid character '${character}' in numeric string.`);
      return false;
    }
  }

  // Extract sign
  let signPrefix = "";
  let scanStart = 0;
  if (hasSignPrefix) {
    signPrefix = numericString[0];
    scanStart = 1;
  }

  // Split manually into integer and decimal parts
  let integerPart = "";
  let decimalPart = "";

  for (let index = scanStart; index < numericString.length; index++) {
    if (index === decimalPosition) continue;

    if (hasDecimalPoint && index > decimalPosition) {
      decimalPart += numericString[index];
    } else {
      integerPart += numericString[index];
    }
  }

  // Trim leading zeros
  if (trimMode === 'leading' || trimMode === 'both') {
    let i = 0;
    while (i < integerPart.length && integerPart[i] === '0') {
      i++;
    }
    integerPart = i === integerPart.length ? "0" : integerPart.slice(i);
  }

  // Trim trailing zeros
  if ((trimMode === 'trailing' || trimMode === 'both') && decimalPart.length > 0) {
    let j = decimalPart.length - 1;
    while (j >= 0 && decimalPart[j] === '0') {
      j--;
    }
    decimalPart = decimalPart.slice(0, j + 1);
  }

  // Reconstruct final string
  let finalOutput = signPrefix + integerPart;
  if (hasDecimalPoint && decimalPart.length > 0) {
    finalOutput += "." + decimalPart;
  }

  console.log("The Final Trimmed String Is:", finalOutput);
  return finalOutput;
}
trimZeros("000123.45000", "both");     // Output: "123.45"
trimZeros("000123.45000", "leading");  // Output: "123.45000"
trimZeros("000123.45000", "trailing"); // Output: "000123.45"
trimZeros("-0000.0000", "both");       // Output: "-0"
trimZeros("+000123", "leading");       // Output: "+123"
trimZeros("123.000", "trailing");      // Output: "123"
trimZeros("0000", "both");             // Output: "0"
trimZeros("0.000", "both");            // Output: "0"
trimZeros("12.34000", "trailing");     // Output: "12.34"
trimZeros("12.34000", "leading");      // Output: "12.34000"
trimZeros("abc", "both");              // Error: Invalid character 'a'
trimZeros("12.3.4", "both");           // Error: Multiple decimal points
trimZeros("", "both");                 // Error: Input string is empty
trimZeros("123", "invalid");           // Error: Invalid trim option