/*Find the sum of even numbers in an array. find all the even numbers in an array and add them
For example
findEvenSum([38, 3, 2, 8, 31])
output -  48 */
/*Logic: The function takes an array of numbers and checks each element to find even numbers. 
All even numbers are collected into a temporary array, and then a second loop adds them together to get the final sum. 
Edge cases like non-array input, empty arrays, and non-numeric values are handled to ensure valid processing.
 */


function sumOfEvenNumbers(numbers)
{
    // Edge Case 1: Input is not an array
    if (!Array.isArray(numbers)) {
        console.error("Input must be an array");
        return false;
    }
    // Edge Case 2: Empty array
    if (numbers.length === 0) {
        console.error("Empty array");
        return false;
    }
    // Edge Case 3: Array with non-numeric values
    for (let i = 0; i < numbers.length; i++) {
        if (typeof numbers[i] !== 'number') {
            console.error(`Skipping non-numeric value at index ${i}: ${numbers[i]}`);
            return false;
        }
    }
   let temporaryArray=[];
   for(i=0;i<numbers.length;i++)
    {
    if(numbers[i]%2==0)
    {
        temporaryArray.push(numbers[i]);
      
    }
}
let sumOfEvenVarables = 0;
for (let i = 0; i < temporaryArray.length; i++) {
    sumOfEvenVarables += temporaryArray[i];
}
console.log("The Sum of the Even Numbers in the Given Input :"+sumOfEvenVarables);
return true;
}

sumOfEvenNumbers([38, 3, 2, 8, 31]);
sumOfEvenNumbers([12, 3, 2, 8, 31]);
sumOfEvenNumbers([1, 1, 1, 1, 31]);
sumOfEvenNumbers([0, 0, 2, 3, 31]);
sumOfEvenNumbers([]);