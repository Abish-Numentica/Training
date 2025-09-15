const people = [
  { id: "p1", name: "Arun",   email: "arun@example.com",   capacityHrsPerDay: 6 },
  { id: "p2", name: "Uma",    email: "uma@",               capacityHrsPerDay: 5 }, // invalid email
  { id: "p3", name: "Aadhir", email: "aadhir@example.com", capacityHrsPerDay: 4 },
  { id: "p4", name: "Aarik",  email: "aarik@example.com",  capacityHrsPerDay: 0 }, // edge: zero capacity
];

const todos = [
  // id, title, estimateHrs, priority, status, due(YYYY-MM-DD), assigneeId?, dependsOn?
  { id: "t1",  title: "Setup repo",            estimateHrs: 2, priority: "high",   status: "done",        due: "2025-09-16", assigneeId: "p1" },
  { id: "t2",  title: "Scaffold UI",           estimateHrs: 5, priority: "high",   status: "in-progress", due: "2025-09-18", assigneeId: "p1", dependsOn: ["t1"] },
  { id: "t3",  title: "Build login",           estimateHrs: 8, priority: "medium", status: "todo",        due: "2025-09-20", assigneeId: "p2" },
  { id: "t4",  title: "Payments integration",  estimateHrs: 13,priority: "high",   status: "todo",        due: "2025-09-19", assigneeId: "p2", dependsOn: ["t3"] },
  { id: "t5",  title: "Notifications",         estimateHrs: 3, priority: "low",    status: "todo",        due: "2025-09-25", assigneeId: null }, // unassigned
  { id: "t6",  title: "Profile screen",        estimateHrs: 5, priority: "medium", status: "in-progress", due: "2025-09-21", assigneeId: "p3" },
  { id: "t7",  title: "Accessibility pass",    estimateHrs: 2, priority: "medium", status: "todo",        due: "2025-09-15", assigneeId: "p3" }, // overdue (today is 2025-09-15 IST)
  { id: "t8",  title: "Error monitoring",      estimateHrs: 4, priority: "low",    status: "todo",        due: "2025-09-23", assigneeId: "p4" }, // zero-capacity assignee
  { id: "t9",  title: "Build login",           estimateHrs: 8, priority: "medium", status: "todo",        due: "2025-09-20", assigneeId: "p2" }, // duplicate title
  { id: "t10", title: "Refactor utils",        estimateHrs: 3, priority: "low",    status: "done",        due: "2025-09-14", assigneeId: "p1" }, // done but due in past
  { id: "t11", title: "Release v1",            estimateHrs: 6, priority: "high",   status: "blocked",     due: "2025-09-22", assigneeId: "p2", dependsOn: ["t4","t6"] },
  { id: "t12", title: "Data migration",        estimateHrs: 7, priority: "high",   status: "todo",        due: "2025-09-28", assigneeId: "p3", dependsOn: ["t4","t99"] }, // missing dep t99
  { id: "t13", title: "Cycle check A",         estimateHrs: 1, priority: "low",    status: "todo",        due: "2025-09-30", assigneeId: "p3", dependsOn: ["t14"] },
  { id: "t14", title: "Cycle check B",         estimateHrs: 1, priority: "low",    status: "todo",        due: "2025-09-30", assigneeId: "p3", dependsOn: ["t13"] },
];

//Find all todos with priority not low and status not done.
function todoPriorityCheck(workloadDetails) {
  const priorityDetails = [];
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    const hasValidPriority = typeof workload.priority === "string";
    const hasValidStatus = typeof workload.status === "string";
    if (!hasValidPriority || !hasValidStatus) {
      console.error(`Skipping task ${workload.id}: invalid priority/status`);
      continue;
    }
    if (workload.priority !== "low" && workload.status !== "done") {
      priorityDetails.push({
        id: workload.id,
        title: workload.title || "(Untitled)",
        assigneeId: workload.assigneeId || "Unassigned"
      });
    }
  }
  console.table(priorityDetails);
  return priorityDetails;
}

//Print each person’s details as Name <email> and mark invalid emails.
function validateEmail(employeeDetails) {
  function isValidEmail(email) {
    if (typeof email !== "string" || email.length < 12) return false;
    const target = "@example.com";
    for (let i = 0; i < target.length; i++) {
      if (email[email.length - target.length + i] !== target[i]) {
        return false;
      }
    }
    return true;
  }
  for (let i = 0; i < employeeDetails.length; i++) {
    const employee = employeeDetails[i];
    const email = employee.email || "";
    const isValid = isValidEmail(email);
    const status = isValid ? "Valid email" : "Invalid email";
    console.log(`${employee.name || "Unnamed"} <${email}> — ${status}`);
  }
return true;
}

//Show total estimated hours of open (not done) tasks grouped by person
function estimatedHoursOfTaskGroupedByPerson(employeeDetails, workloadDetails) {
  const groupByPerson = {};
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    if (workload.status === "done") continue;
    const hrs = typeof workload.estimateHrs === "number" && workload.estimateHrs >= 0 ? workload.estimateHrs : 0;
    const assignee = workload.assigneeId || "Unassigned";
    groupByPerson[assignee] = (groupByPerson[assignee] || 0) + hrs;
  }
  const totalEstimation = [];
  for (let i = 0; i < employeeDetails.length; i++) {
    const employee = employeeDetails[i];
    totalEstimation.push({
      person: employee.name || "Unnamed",
      hrs: groupByPerson[employee.id] || 0
    });
  }

  totalEstimation.push({
    person: "Unassigned",
    hrs: groupByPerson["Unassigned"] || 0
  });

  console.table(totalEstimation);
  return totalEstimation;
}

//List tasks not done and due before today
function overdueTasks(employeeDetails, workloadDetails) {
  const today = new Date("2025-09-15");
  const incompleteTask = [];
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    if (typeof workload.due !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(workload.due)) {
      console.warn(`Skipping task ${workload.id}: invalid due date`);
      continue;
    }
    const dueDate = new Date(workload.due);
    if (isNaN(dueDate.getTime())) {
      console.warn(`Skipping task ${workload.id}: unparsable due date`);
      continue;
    }
    if (workload.status !== "done" && dueDate.getTime() < today.getTime()) {
      const person = employeeDetails.find(employee => employee.id === employee.assigneeId);
      incompleteTask.push({
        id: workload.id,
        title: workload.title || "(Untitled)",
        assigneeName: person?.name || "Unassigned",
        due: workload.due
      });
    }
  }
  console.table(incompleteTask);
  return incompleteTask;
}


//Check if open workload fits into capacity (5-day sprint). 5 day sprint is 40 hours
function checkSprintCapacity(employeeDetails, workloadDetails) {
  const hoursByPerson = {};
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    if (workload.status !== "done" && typeof workload.assigneeId === "string") {
      const hrs = typeof workload.estimateHrs === "number" && workload.estimateHrs >= 0 ? workload.estimateHrs : 0;
      hoursByPerson[workload.assigneeId] = (hoursByPerson[workload.assigneeId] || 0) + hrs;
    }
  }
  for (let i = 0; i < employeeDetails.length; i++) {
    const employee = employeeDetails[i];
    const dailyCap = typeof employee.capacityHrsPerDay === "number" && employee.capacityHrsPerDay >= 0 ? employee.capacityHrsPerDay : 0;
    const sprintCap = dailyCap * 5;
    const worked = hoursByPerson[employee.id] || 0;
    if (dailyCap === 0) {
      console.warn(`${employee.name} → ZERO CAPACITY`);
    } else if (dailyCap <= sprintCap) {
      console.log(`${employee.name} → OK`);
    } else {
      console.log(`${employee.name} → OVER-ALLOCATED by ${worked - sprintCap} hrs`);
    }
  }
}
//Find tasks that depend on a non-existent task which means the taskId in dependsOn is not a valid task.
function findInvalidDependencies(workloadDetails) {
  const validIdMap = {}; 
  const outputData = [];
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i].id;
    if (typeof workload === "string" && workload.trim() !== "") {
      validIdMap[workload] = true; 
    }
  }

  // Second pass: check dependencies
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    const depend = workload.dependsOn;

    if (Array.isArray(depend)) {
      for (let j = 0; j < depend.length; j++) {
        const dependID = depend[j];
        if (typeof dependID !== "string" || !validIdMap[depId]) {
          outputData.push({
            id: workload.id,
            title: workload.title || "(Untitled)",
            dependsOn: depend
          });
          break; // Stop checking further deps for this task
        }
      }
    }
  }

  console.table(outputData);
  return outputData;
}

//Find tasks that share the same title (ignoring case/spaces)
function findInvalidDependencies(workloadDetails) {
  const validIdMap = {}; 
  const result = [];
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i].id;
    if (typeof workload === "string" && workload.trim() !== "") {
      validIdMap[workload] = true;
    }
  }
  for (let i = 0; i < workloadDetails.length; i++) {
    const task = workloadDetails[i];
    const deps = workload.dependsOn;

    if (Array.isArray(deps)) {
      for (let j = 0; j < deps.length; j++) {
        const depId = deps[j];
        if (typeof depId !== "string" || !validIdMap[depId]) {
          result.push({
            id: workload.id,
            title: workload.title || "(Untitled)",
            dependsOn: deps
          });
          break; 
        }
      }
    }
  }

  console.table(result);
  return result;
}

//List tasks that can start now, sorted by priority > due date > estimate.
function prioritizeTask(workloadDetails) {
  const priorityWeight = { high: 3, medium: 2, low: 1 };
  const taskMap = {};
  const completedMap = {};
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    taskMap[workload.id] = workload;
    if (workload.status === "done") {
      completedMap[workload.id] = true;
    }
  }

  const startableTasks = [];

  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    if (workload.assigneeId !== null) continue;

    let canStart = true;
    if (Array.isArray(workload.dependsOn)) {
      for (let j = 0; j < workload.dependsOn.length; j++) {
        const depId = workload.dependsOn[j];
        if (!completedMap[depId]) {
          canStart = false;
          break;
        }
      }
    }

    if (canStart) {
      startableTasks.push(workload);
    }
  }

startableTasks.sort((taskA, taskB) => {
  const priorityA = priorityWeight[taskA.priority] || 0;
  const priorityB = priorityWeight[taskB.priority] || 0;
  if (priorityA !== priorityB) return priorityB - priorityA;

  const dueDateA = new Date(taskA.due).getTime();
  const dueDateB = new Date(taskB.due).getTime();
  if (dueDateA !== dueDateB) return dueDateA - dueDateB;

  const estimateA = typeof taskA.estimateHrs === "number" ? taskA.estimateHrs : Infinity;
  const estimateB = typeof taskB.estimateHrs === "number" ? taskB.estimateHrs : Infinity;
  return estimateA - estimateB;
});

return startableTasks.map(workload => workload.id);
}

//Find tasks that depend on a non-existent task which means the taskId in dependsOn is not a valid task.
function findInvalidDependencies(workloadDetails) {
  const validIdMap = {}; // Replacing Set with object
  const result = [];

  // Collect valid task IDs
  for (let i = 0; i < workloadDetails.length; i++) {
    const id = workloadDetails[i].id;
    if (typeof id === "string" && id.trim() !== "") {
      validIdMap[id] = true;
    }
  }

  // Detect invalid dependencies
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    const deps = workload.dependsOn;

    if (!Array.isArray(deps)) continue;

    for (let j = 0; j < deps.length; j++) {
      const depId = deps[j];
      if (typeof depId !== "string" || !validIdMap[depId]) {
        result.push({
          id: workload.id || "(Missing ID)",
          title: workload.title || "(Untitled)",
          dependsOn: deps
        });
        break;
      }
    }
  }

  console.table(result);
  return result;
}
//Find tasks that share the same title (ignoring case/spaces)
function findDuplicateTitles(workloadDetails) {
  const titleMap = {};

  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    const rawTitle = typeof workload.title === "string" ? workload.title : "";
    const key = rawTitle.toLowerCase().replace(/\s+/g, "");

    if (!titleMap[key]) titleMap[key] = [];
    titleMap[key].push(workload.id);
  }

  const result = {};
  for (let key in titleMap) {
    if (titleMap[key].length > 1) {
      const originalTitle = workloadDetails.find(work => w.id === titleMap[key][0])?.title || "(Untitled)";
      result[originalTitle] = titleMap[key];
    }
  }

  console.log(result);
  return result;
}

//List tasks that can start now, sorted by priority > due date > estimate.
function findDuplicateTitles(workloadDetails) {
  const titleMap = {};

  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    const rawTitle = typeof workload.title === "string" ? workload.title : "";
    const key = rawTitle.toLowerCase().replace(/\s+/g, "");

    if (!titleMap[key]) titleMap[key] = [];
    titleMap[key].push(workload.id);
  }

  const result = {};
  for (let key in titleMap) {
    if (titleMap[key].length > 1) {
      const originalTitle = workloadDetails.find(t => t.id === titleMap[key][0])?.title || "(Untitled)";
      result[originalTitle] = titleMap[key];
    }
  }

  console.log(result);
  return result;
}
function reassignmentTasks(employeeDetails, workloadDetails) {
  const validAssignees = {}; 

  for (let i = 0; i < employeeDetails.length; i++) {
    const employee = employeeDetails[i];
    if (typeof employee.id === "string" && employee.id.trim() !== "") {
      validAssignees[employee.id] = true;
    }
  }

  const tasksToReassign = [];
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    const assigneeId = workload.assigneeId;

    const isDone = workload.status === "done";
    const isValidAssignee = typeof assigneeId === "string" && validAssignees[assigneeId];

    if (!isDone && !isValidAssignee) {
      tasksToReassign.push({
        id: workload.id || "(Missing ID)",
        title: workload.title || "(Untitled)",
        assigneeId: assigneeId || "(Unassigned)"
      });
    }
  }

  console.table(tasksToReassign);
  return true;
}

function toFindDependent(workloadDetails) {
  const dependentDetails = [];
  const taskMap = {};
  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    if (typeof workload.id === "string" && workload.id.trim() !== "") {
      taskMap[workload.id] = workload;
    }
  }

  function hasCycle(startId, currentId, visited) {
    if (visited.includes(currentId)) return false;
    visited.push(currentId);

    const workload = taskMap[currentId];
    if (!workload || !Array.isArray(workload.dependsOn)) return false;

    for (let i = 0; i < workload.dependsOn.length; i++) {
      const depId = workload.dependsOn[i];
      if (depId === startId) return true;
      if (typeof depId !== "string" || !taskMap[depId]) continue;
      if (hasCycle(startId, depId, visited.slice())) return true;
    }

    return false;
  }

  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    if (!Array.isArray(workload.dependsOn)) continue;

    for (let j = 0; j < workload.dependsOn.length; j++) {
      const depId = workload.dependsOn[j];
      if (typeof depId !== "string" || !taskMap[depId]) continue;
      if (hasCycle(workload.id, depId, [])) {
        dependentDetails.push(workload.id);
        break;
      }
    }
  }

  console.table(dependentDetails);
  return true;
}
console.log(todoPriorityCheck(todos))
console.log(validateEmail(people))
console.log(overdueTasks(people,todos))
console.log(estimatedHoursOfTaskGroupedByPerson(people,todos))
console.log(checkSprintCapacity(people,todos))
console.log(findInvalidDependencies(todos))
console.log(findDuplicateTitles(todos))
console.log(prioritizeTask(todos))
console.log(reassignmentTasks(people,todos))
console.log(toFindDependent(todos))
