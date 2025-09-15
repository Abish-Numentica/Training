/*2. Convert string to arithmetic operation
For example accept a string like "10 + 20"
and return output as 30
b. "20 - 10" //Output 10
Only string input is allowed which you have to parse and get a number output
eval is not allowed*/

/* 
Logic: The function takes a string representing a basic arithmetic expression.  
It manually parses the first number, operator, and second number by scanning character-by-character.  
It validates the input and converts the operands to numbers.  
Then it performs the corresponding arithmetic operation without using eval.  
The result is printed as a numeric output.
*/


function evaluateArithmeticExpression(expression) {
  // Edge Case 1 & 2: Type and empty string check
  if (typeof expression !== 'string' || expression.trim() === '') {
    console.error("Error: Invalid input type or empty string");
    return false;
  }

  let leftOperandStr = "", rightOperandStr = "", operatorSymbol = "", parsingOperator = false;

  // Manual parsing by character
  for (let i = 0; i < expression.length; i++) {
    const currentChar = expression[i];

    if (currentChar === " ") {
      if (!parsingOperator && leftOperandStr.length > 0) parsingOperator = true;
      continue;
    }

    if (!parsingOperator) {
      leftOperandStr += currentChar;
    } else if (operatorSymbol === "") {
      operatorSymbol += currentChar;
    } else {
      rightOperandStr += currentChar;
    }
  }

  // Edge Case 3: Missing components
  if (!leftOperandStr || !rightOperandStr || !operatorSymbol) {
    console.error("Error: Invalid format");
    return false;
  }

  const leftOperand = Number(leftOperandStr);
  const rightOperand = Number(rightOperandStr);

  // Edge Case 4: Non-numeric values
  if (isNaN(leftOperand) || isNaN(rightOperand)) {
    console.error("Error: Non-numeric values");
    return false;
  }

  // Arithmetic operations
  let result;
  switch (operatorSymbol) {
    case "+":
      result = leftOperand + rightOperand;
      break;
    case "-":
      result = leftOperand - rightOperand;
      break;
    case "*":
      result = leftOperand * rightOperand;
      break;
    case "/":
      if (rightOperand === 0) {
        console.error("Error: Division by zero");
        return false;
      }
      result = leftOperand / rightOperand;
      break;
    default:
      console.error(`Error: Unsupported operator '${operatorSymbol}'`);
      return false;
  }

  console.log("Result:", result);
}


evaluateArithmeticExpression("10 + 20");   // Result: 30
evaluateArithmeticExpression("20 - 10");   // Result: 10
evaluateArithmeticExpression("5 * 6");     // Result: 30
evaluateArithmeticExpression("100 / 4");   // Result: 25
evaluateArithmeticExpression("100 / 0");   // Error: Division by zero
evaluateArithmeticExpression("abc + 10");  // Error: Operands must be valid numbers
evaluateArithmeticExpression("10 ^ 2");    // Error: Unsupported operator '^'