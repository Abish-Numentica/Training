/*Find sum of multiples
For example
findSum(5, 5) should return 5+10+15+20+25=75
findSum(8, 3) should return 8+16+24=48
*/
/*Logic: 2 Inputs one is Multiplier and Multiply. So through loop iteration use the formula n+n*i=>n(1+i).
Use Number function to convert string represented number as considered as an Integer and get output */


function sumOfMultiplies(inputMultiplier,inputMultiples){
     // Edge Case 1: Empty array
     if (arguments.length < 2) {
        console.error("Missing parameters: both multiplier and multiples array are required");
        return false;
    }

    // Edge Case 2: Array with non-numeric values
    if (inputMultiplier < 0 || inputMultiples < 0) {
        console.error("Values should be a positive integer.");
        return false;
    }
     // Edge Case 3: Entered Value has Zero
    if (inputMultiplier === 0 || inputMultiples===0) {
        console.error("Entered Value Has Zero");
        return false;;
    }
     // Edge Case 4: Non Numerical Values
    if(isNaN(inputMultiplier) || isNaN(inputMultiples)){
        console.error("Non Numerical Values are Present");
        return false;;
    }
let temporryVariable=0;
for(let i=0;i<inputMultiples;i++)
{
 {
    temporryVariable+=Number(inputMultiplier)+(Number(inputMultiplier)*i);   
 }
}
console.log(`The sum of Multiplies of Given Input(${inputMultiplier},${inputMultiples}) : ${temporryVariable}`);
 return true;
}

sumOfMultiplies(5,5);
sumOfMultiplies();
sumOfMultiplies(5);
sumOfMultiplies(8,3);
sumOfMultiplies(5,0);
sumOfMultiplies(0,5);
sumOfMultiplies(5,-3);
sumOfMultiplies("5",3);
sumOfMultiplies("@",3);


