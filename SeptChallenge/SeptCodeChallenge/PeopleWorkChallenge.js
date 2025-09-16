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

//1 Find all todos with priority not low and status not done.
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
  return true;
}
//2 Print each person’s details as Name <email> and mark invalid emails.
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

//3 Show total estimated hours of open (not done) tasks grouped by person
function estimatedHoursOfTaskGroupedByPerson(employeeDetails, workloadDetails) {
  const estimatedHoursByAssignee = {};
  for (let i = 0; i < workloadDetails.length; i++) {
    const task = workloadDetails[i];

    if (task.status === "done") continue;

    const estimatedHours = typeof task.estimateHrs === "number" && task.estimateHrs >= 0
      ? task.estimateHrs
      : 0;

    const assigneeId = typeof task.assigneeId === "string" && task.assigneeId.trim() !== ""
      ? task.assigneeId
      : "Unassigned";

    estimatedHoursByAssignee[assigneeId] = (estimatedHoursByAssignee[assigneeId] || 0) + estimatedHours;
  }

  const groupedEstimates = [];
  for (let i = 0; i < employeeDetails.length; i++) {
    const employee = employeeDetails[i];
    const employeeId = employee.id;
    const employeeName = employee.name || "Unnamed";

    if (typeof employeeId === "string" && employeeId.trim() !== "") {
      groupedEstimates.push({
        person: employeeName,
        hrs: estimatedHoursByAssignee[employeeId] || 0
      });
    }
  }
  if (estimatedHoursByAssignee["Unassigned"]) {
    groupedEstimates.push({
      person: "Unassigned",
      hrs: estimatedHoursByAssignee["Unassigned"]
    });
  }


  return groupedEstimates;
}//4 List tasks not done and due before today
function overdueTasks(employeeDetails, workloadDetails) {
  const today = new Date("2025-09-15");
  const overdue = [];

  for (let i = 0; i < workloadDetails.length; i++) {
    const workload = workloadDetails[i];
    if (workload.status === "done") continue;
    const dueDate = new Date(workload.due);
    if (isNaN(dueDate.getTime())) continue;
    if (dueDate.getTime() <= today.getTime()) {
      const assignee = employeeDetails.find(emp => emp.id === workload.assigneeId);
      overdue.push({
        id: workload.id,
        title: workload.title || "(Untitled)",
        assigneeName: assignee?.name || "Unassigned",
        due: workload.due
      });
    }
  }
  console.log(overdue)
  return true;
}
//5.Check if open workload fits into capacity (5-day sprint). 5 day sprint is 40 hours
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
//6.Find tasks that depend on a non-existent task which means the taskId in dependsOn is not a valid task.
function findInvalidDependencies(workloadDetails) {
  const validIdMap = {}; 
  const result = [];
  for (let i = 0; i < workloadDetails.length; i++) {
    const id = workloadDetails[i].id;
    if (typeof id === "string" && id.trim() !== "") {
      validIdMap[id] = true;
    }
  }
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

//7.Find tasks that share the same title (ignoring case/spaces)
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
      const originalTitle = workloadDetails.find(work => work.id === titleMap[key][0])?.title || "(Untitled)";
      result[originalTitle] = titleMap[key];
    }
  }

  console.log(result);
  return result;
}

//8.List tasks that can start now, sorted by priority > due date > estimate.
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
        const dependencyId = workload.dependsOn[j];
        if (!completedMap[dependencyId]) {
          canStart = false;
          break;
        }
      }
    }

    if (canStart) {
      startableTasks.push(workload);
    }
  }
  startableTasks.sort((a, b) => {
    const priorityA = priorityWeight[a.priority] || 0;
    const priorityB = priorityWeight[b.priority] || 0;
    if (priorityA !== priorityB) return priorityB - priorityA;

    const dueA = new Date(a.due).getTime();
    const dueB = new Date(b.due).getTime();
    if (dueA !== dueB) return dueA - dueB;

    const estimateA = typeof a.estimateHrs === "number" ? a.estimateHrs : Infinity;
    const estimateB = typeof b.estimateHrs === "number" ? b.estimateHrs : Infinity;
    return estimateA - estimateB;
  });

  return startableTasks.map(task => task.id);
}
//9.Suggest reassignment for tasks assigned to zero-capacity people. toPersonSuggested can be to multiple person // single person.
function suggestReassignment(employeeDetails, workloadDetails) {
  const sprintDays = 5;
  const hoursByPerson = estimatedHoursOfTaskGroupedByPerson(employeeDetails, workloadDetails);
  const suggestions = [];

  for (let i = 0; i < workloadDetails.length; i++) {
    const task = workloadDetails[i];
    const assigneeId = task.assigneeId;
    if (!assigneeId) continue;

    const assignee = employeeDetails.find(person => person.id === assigneeId);
    const isZeroCapacity = !assignee || assignee.capacityHrsPerDay === 0;

    if (isZeroCapacity) {
      const overloadedPerson = assignee?.name || "Unknown";
      const suitableCandidates = [];

      for (let j = 0; j < employeeDetails.length; j++) {
        const candidate = employeeDetails[j];
        const candidateCapacity = candidate.capacityHrsPerDay * sprintDays;
        const candidateAssigned = hoursByPerson.find(p => p.person === candidate.name)?.hrs || 0;

        const remainingCapacity = candidateCapacity - candidateAssigned;
        if (remainingCapacity >= task.estimateHrs) {
          suitableCandidates.push(candidate.name);
        }
      }

      if (suitableCandidates.length > 0) {
        suggestions.push({
          todoId: task.id,
          fromPerson: overloadedPerson,
          toPersonSuggested: suitableCandidates
        });
      }
    }
  }

  return suggestions;
}
//10. Detect dependency cycles.
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
console.log(suggestReassignment(people,todos))
console.log(toFindDependent(todos))
