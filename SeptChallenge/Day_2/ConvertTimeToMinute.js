/*toMinutes(timeStr, options = { round: 'down' })
----------------------------------------------------
Convert "HH:MM[:SS][ am/pm]" to minutes. Support 12h/24h (not mixed).
Hours can exceed 24. Seconds rounding: 'down'|'nearest'|'up'. Throw on invalid.
Examples:
"2:30" → 150
"2:30:45" → 151 if round:'nearest', else 150
"12:00 am" → 0
"12:00 pm" → 720
"24:00" → 1440
"14:70" → throw (invalid minutes)*/
/*Logic: The function takes a time string and converts it into total minutes.
 It handles both 12-hour and 24-hour formats, removes spaces, and normalizes AM/PM. The time is split into hours, minutes, and optional seconds.
  Each part is manually parsed and validated. Based on the rounding option (up, down, or nearest), seconds are used to adjust the final minute count. 
  Invalid formats or values throw errors to ensure clean input.
 */


function convertTimeToMinutes(timeString, roundingOptions) {
  console.log("The Input Time String is:", timeString);

  // Edge Case 1: Validate input type
  if (typeof timeString !== 'string') {
    console.error("Error: Input must be a string.");
    return false;
  }

  // Normalize input: remove spaces and convert to lowercase manually
  let normalizedInput = "";
  for (let i = 0; i < timeString.length; i++) {
    const character = timeString[i];
    if (character !== ' ') {
      if (character >= 'A' && character <= 'Z') {
        normalizedInput += String.fromCharCode(character.charCodeAt(0) + 32);
      } else {
        normalizedInput += character;
      }
    }
  }

  // Detect and remove AM/PM suffix
  let isAM = false;
  let isPM = false;
  const inputLength = normalizedInput.length;

  if (inputLength >= 2 && normalizedInput.slice(-2) === 'am') {
    isAM = true;
    normalizedInput = normalizedInput.slice(0, inputLength - 2);
  } else if (inputLength >= 2 && normalizedInput.slice(-2) === 'pm') {
    isPM = true;
    normalizedInput = normalizedInput.slice(0, inputLength - 2);
  }

  // Split into time components
  const timeParts = [];
  let currentSegment = "";
  for (let i = 0; i < normalizedInput.length; i++) {
    if (normalizedInput[i] === ':') {
      timeParts.push(currentSegment);
      currentSegment = "";
    } else {
      currentSegment += normalizedInput[i];
    }
  }
  timeParts.push(currentSegment);

  if (timeParts.length < 2 || timeParts.length > 3) {
    console.error("Error: Invalid time format. Expected 'H:MM[:SS][ am/pm]'.");
    return false;
  }

  // Parse hours, minutes, seconds manually
  let hourValue = 0, minuteValue = 0, secondValue = 0;

  for (let i = 0; i < timeParts[0].length; i++) {
    const digit = timeParts[0][i] - '0';
    if (digit < 0 || digit > 9) {
      console.error("Error: Invalid hour digit '" + timeParts[0][i] + "'.");
      return false;
    }
    hourValue = hourValue * 10 + digit;
  }

  for (let i = 0; i < timeParts[1].length; i++) {
    const digit = timeParts[1][i] - '0';
    if (digit < 0 || digit > 9) {
      console.error("Error: Invalid minute digit '" + timeParts[1][i] + "'.");
      return false;
    }
    minuteValue = minuteValue * 10 + digit;
  }

  if (timeParts.length === 3) {
    for (let i = 0; i < timeParts[2].length; i++) {
      const digit = timeParts[2][i] - '0';
      if (digit < 0 || digit > 9) {
        console.error("Error: Invalid second digit '" + timeParts[2][i] + "'.");
        return false;
      }
      secondValue = secondValue * 10 + digit;
    }
  }

  // Edge Case: Validate time ranges
  if (minuteValue >= 60) {
    console.error("Error: Invalid time. Minutes must be less than 60.");
    return false;
  }

  if (secondValue >= 60) {
    console.error("Error: Invalid time. Seconds must be less than 60.");
    return false;
  }

  if ((isAM || isPM) && hourValue > 12) {
    console.error("Error: Invalid time. Hours must be ≤ 12 when using am/pm.");
    return false;
  }

  // Convert AM/PM to 24-hour format
  if (isAM && hourValue === 12) hourValue = 0;
  if (isPM && hourValue < 12) hourValue += 12;

  // Rounding logic
  let roundingMode = 'down';
  if (typeof roundingOptions === 'object' && typeof roundingOptions.round === 'string') {
    roundingMode = roundingOptions.round;
  }

  let minuteAdjustment = 0;
  if (roundingMode === 'up') {
    minuteAdjustment = secondValue > 0 ? 1 : 0;
  } else if (roundingMode === 'nearest') {
    minuteAdjustment = secondValue >= 30 ? 1 : 0;
  } else if (roundingMode === 'down') {
    minuteAdjustment = 0;
  } else {
    console.error("Error: Invalid rounding option. Use 'up', 'down', or 'nearest'.");
    return false;
  }

  // Final calculation
  const totalMinutes = hourValue * 60 + minuteValue + minuteAdjustment;
  console.log("The Converted Minutes Are:", totalMinutes);
  return totalMinutes;
}
convertTimeToMinutes("2:30");                          // 150
convertTimeToMinutes("2:30:45", { round: 'down' });    // 150
convertTimeToMinutes("2:30:45", { round: 'nearest' }); // 151
convertTimeToMinutes("12:00 am");                      // 0
convertTimeToMinutes("12:00 pm");                      // 720
convertTimeToMinutes("24:00");                         // 1440
convertTimeToMinutes("14:70");                         // Error: Invalid minute value
