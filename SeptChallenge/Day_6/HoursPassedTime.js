/*Calculate total hours passed between two time
Accepted input format example "9:00 AM"
Ex: calculateTotalHoursElapsed("9:00 AM", "10:00 AM") //Output 1 Hour
Ex: calculateTotalHoursElapsed("9:00 AM", "3:12 PM") // Output 6 Hour 12 minutes*/

function calculateTotalHoursElapsed(startTimeStr, endTimeStr) {
  // Edge Case 1: Validate input types
  if (typeof startTimeStr !== 'string' || typeof endTimeStr !== 'string') {
    console.error("Error: Both inputs must be strings.");
    return "Invalid input type";
  }

  // Edge Case 2: Check for empty strings
  if (!startTimeStr.trim() || !endTimeStr.trim()) {
    console.error("Error: One or both time strings are empty.");
    return "Empty time input";
  }

  // Edge Case 3: Validate format using regex
  const timeFormatRegex = /^([1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
  if (!timeFormatRegex.test(startTimeStr) || !timeFormatRegex.test(endTimeStr)) {
    console.error("Error: Time format must be 'hh:mm AM/PM'.");
    return "Invalid time format";
  }

  // Convert "hh:mm AM/PM" to total minutes
  function convertToMinutes(timeString) {
    const [timePart, periodPart] = timeString.split(" ");
    let [hourValue, minuteValue] = timePart.split(":").map(Number);
    const isAfternoon = periodPart.toLowerCase() === "pm";

    if (isAfternoon && hourValue !== 12) hourValue += 12;
    if (!isAfternoon && hourValue === 12) hourValue = 0;

    return hourValue * 60 + minuteValue;
  }

  const startTimeInMinutes = convertToMinutes(startTimeStr);
  const endTimeInMinutes = convertToMinutes(endTimeStr);
  const elapsedMinutes = endTimeInMinutes - startTimeInMinutes;

  // Edge Case 4: End time must be after start time
  if (elapsedMinutes < 0) {
    console.error("Error: End time must be after start time.");
    return "Invalid time range";
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const remainingMinutes = elapsedMinutes % 60;

  // Format result string
  const formattedHours = `${elapsedHours} Hour${elapsedHours !== 1 ? "s" : ""}`;
  const formattedMinutes = remainingMinutes > 0
    ? `${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`
    : "";

  return [formattedHours, formattedMinutes].filter(Boolean).join(" ") || "0 Hours";
}


calculateTotalHoursElapsed("9:00 AM", "10:00 AM") //Output 1 Hour
calculateTotalHoursElapsed("9:00 AM", "3:12 PM") // Output 6 Hour 12 minutes*/