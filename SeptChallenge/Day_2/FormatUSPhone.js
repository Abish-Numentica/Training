/*formatUSPhone
---------------------
Convert a ten digit number into US phone formatting "(AAA) BBB-CCCC"
For example: 9840164723 to "(984)016-473"
Throw error if it's not a valid phone number*/


/*Logic: The function takes a number or numeric string and formats it into the US phone style "(AAA) BBB-CCCC". 
It first removes any non-digit characters and checks if the cleaned string has exactly 10 digits. 
If valid, it builds the formatted output using manual loops. 
If the input is invalid or not exactly 10 digits, it throws an error.
*/

function formatUSPhone(phoneNumber) {
  console.log("The Input Phone Number is: " + phoneNumber);

  // Edge Case 1: Check if input is a number or numeric string
  if (typeof phoneNumber !== 'number' && typeof phoneNumber !== 'string') {
    console.error("Error: Phone number must be a number or numeric string.");
    return false;
  }

  // Convert to string and remove any non-digit characters
  let cleaned = "";
  let raw = phoneNumber.toString();
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] >= '0' && raw[i] <= '9') {
      cleaned += raw[i];
    }
  }

  // Edge Case 2: Check if cleaned string has exactly 10 digits
  if (cleaned.length !== 10) {
    console.error("Error: Phone number must contain exactly 10 digits.");
    return false;
  }

 
  let formatted = "(";
  for (let i = 0; i < 3; i++) {
    formatted += cleaned[i];
  }
  formatted += ")";

  for (let i = 3; i < 6; i++) {
    formatted += cleaned[i];
  }
  formatted += "-";

  for (let i = 6; i < 10; i++) {
    formatted += cleaned[i];
  }

  console.log("Formatted US Phone Number: " + formatted);
  return true;
}

formatUSPhone(9840164723);        // Output: "(984)016-4723"
formatUSPhone("1234567890");      // Output: "(123)456-7890"
formatUSPhone("123-456-7890");    // Output: "(123)456-7890"
formatUSPhone("abc1234567");      // Error: Not 10 digits
formatUSPhone(123456);            // Error: Not 10 digits
formatUSPhone(true);              // Error: Invalid type