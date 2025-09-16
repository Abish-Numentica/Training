/*Return the highest-paid person per department.
const employees = [
  { name: "Raj", dept: "IT", salary: 600 },
  { name: "Arun", dept: "IT", salary: 750 },
  { name: "Deepak", dept: "HR", salary: 500 }
];
highestSalary(employees);
// Output: { IT: {name:"Jane", salary:750}, HR: {name: "Deepak", salary: 500} }*/

/*Logic: The function takes an array of employee objects and finds the highest-paid person in each department.
It validates the input and loops through each employee, updating the result only if the current employee has a higher salary than the one already stored for that department.
This builds an object with the top earner per department.
*/


function highestSalary(inputFromUser) {
  // Edge Case 1: Input is not an array
  if (!Array.isArray(inputFromUser)) {
    console.error("Invalid input: must be an array of employee objects");
    return false;
  }

  // Edge Case 2: Empty array
  if (inputFromUser.length === 0) {
    console.log("Input array is empty");
    return false;
  }


  let outputData = {};

  for (let i = 0; i < inputFromUser.length; i++) {
    let emp = inputFromUser[i];

    // Edge Case 3: Validate employee object structure
    if (
      typeof emp !== "object" ||
      typeof emp.name !== "string" ||
      typeof emp.dept !== "string" ||
      typeof emp.salary !== "number"
    ) {
      console.error("Invalid employee at index", i);
      continue;
    }

    let dept = emp.dept;


    if (
      outputData[dept] === undefined ||
      emp.salary > outputData[dept].salary
    ) {
      outputData[dept] = {
        name: emp.name,
        salary: emp.salary
      };
    }
  }


  console.log("Highest salary per department:", outputData);
  return outputData;
}

const employees = [
  { name: "Raj", dept: "IT", salary: 600 },
  { name: "Arun", dept: "IT", salary: 750 },
  { name: "Deepak", dept: "HR", salary: 500 }
];

highestSalary(employees);
// Output: { IT: { name: "Arun", salary: 750 }, HR: { name: "Deepak", salary: 500 } }