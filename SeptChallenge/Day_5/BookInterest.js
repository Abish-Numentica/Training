/*const students = [
  {
    id: 0,
    name: ‘Arun’,
    books: [‘Wings of Fire’, ‘Chakra’],
  },
  {
    id: 1,
    name: ‘Ashok’,
    books: [‘Chakra’, ‘War and Peace’, ‘The Shining’]
  },
  {
    id: 2,
    name: ‘Balu’,
    books: [‘Wings of Fire’, ‘All about Cricket’],
  },
  {
    id: 3,
    name: ‘Cathi’,
    books: [‘Against the wind’, ‘The Shining’, ‘War and Peace’]
  },
];
Find the common interest in books for the students
Output
Wings of Fire - [‘Arun’, ‘Balu’]
Chakra - [‘Arun’, ‘Ashok’]
War and Peace - [‘Ashok’, ‘Cathi’],
All about Cricket- [‘Balu’],
Against the wind- [‘Cathi’]
The Shining - [‘Cathi’, ‘Ashok’]
Find the user who shares most interest with other users.
For example: Ashok since he shares book interest with Arun, Cathi. And also Arun since he shares interest with Balu and Ashok*/

/* 
Logic: The function takes an array of student objects, each with a name and a list of books.  
It validates the input and builds a map of books to the students who read them.  
Then, for each student, it checks which other students share book interests by comparing book lists.  
It counts and stores how many unique peers each student shares interests with.  
Finally, it identifies the student(s) who share interests with the most others and displays the book-to-student mapping.
*/

function analyzeBookInterests(studentList) {
  // Edge Case 1: Validate input type and structure
  if (!Array.isArray(studentList) || studentList.length === 0) {
    console.error("Error: Input must be a non-empty array of student objects.");
    return;
  }

  // Edge Case 2: Validate each student entry
  for (let i = 0; i < studentList.length; i++) {
    const student = studentList[i];
    if (
      typeof student !== 'object' ||
      typeof student.name !== 'string' ||
      !Array.isArray(student.books)
    ) {
      console.warn(`Skipping malformed student entry at index ${i}:`, student);
      continue;
    }
  }

  // Step 1: Group books to readers 
  const bookToReadersMap = {};
  const bookTitleMap = {}; // Preserve original casing

  for (const student of studentList) {
    const studentName = student.name;

    for (const bookTitle of student.books) {
      if (typeof bookTitle !== 'string') continue;

      const normalizedTitle = bookTitle.toLowerCase();

      if (!bookToReadersMap[normalizedTitle]) {
        bookToReadersMap[normalizedTitle] = [];
        bookTitleMap[normalizedTitle] = bookTitle; // Preserve original casing
      }

      bookToReadersMap[normalizedTitle].push(studentName);
    }
  }

  // Step 2: Display book-to-student mapping
  console.log("Book Interest Mapping:");
  for (const normalizedTitle in bookToReadersMap) {
    const originalTitle = bookTitleMap[normalizedTitle];
    const readers = bookToReadersMap[normalizedTitle];
    console.log(`${originalTitle} - [${readers.join(", ")}]`);
  }

  // Step 3: Build shared student map
const studentToSharedReadersMap = {};

for (const normalizedTitle in bookToReadersMap) {
  const readers = bookToReadersMap[normalizedTitle];

  for (const reader of readers) {
    if (!studentToSharedReadersMap[reader]) {
      studentToSharedReadersMap[reader] = [];
    }

    for (const sharedReader of readers) {
      if (sharedReader !== reader && !studentToSharedReadersMap[reader].includes(sharedReader)) {
        studentToSharedReadersMap[reader].push(sharedReader);
      }
    }
  }
}
  // Step 4: Identify student(s) with most shared interests
  let maxSharedCount = 0;
  const topSharers = [];

  for (const student in studentToPeersMap) {
    const sharedCount = studentToPeersMap[student].size;

    if (sharedCount > maxSharedCount) {
      maxSharedCount = sharedCount;
      topSharers.length = 0;
      topSharers.push(student);
    } else if (sharedCount === maxSharedCount) {
      topSharers.push(student);
    }
  }

  console.log("\nStudents with Most Shared Interests:");
  console.log(`${topSharers.join(", ")} (${maxSharedCount} shared connections)`);
}


const students = [
  { id: 0, name: 'Arun', books: ['Wings of Fire', 'Chakra'] },
  { id: 1, name: 'Ashok', books: ['Chakra', 'War and Peace', 'The Shining'] },
  { id: 2, name: 'Balu', books: ['Wings of Fire', 'All about Cricket'] },
  { id: 3, name: 'Cathi', books: ['Against the wind', 'The Shining', 'War and Peace'] }
];

analyzeBookInterests(students);