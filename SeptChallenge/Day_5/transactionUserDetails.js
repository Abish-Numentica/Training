/*You’re given an array of transaction objects:

[
  { id: "t1", userId: 101, category: "food",   amount: 120.5,  currency: "INR", ts: "2025-08-01T09:10:00Z" },
  { id: "t2", userId: 101, category: "travel", amount:  80.00, currency: "INR", ts: "2025-08-02T14:33:00Z" },
  { id: "t3", userId: 102, category: "food",   amount:  60.00, currency: "INR", ts: "2025-08-02T07:05:00Z" },
  { id: "t4", userId: 101, category: "food",   amount: -20.00, currency: "INR", ts: "2025-08-03T10:00:00Z" } // refund
]
Return a summary grouped by by (default "userId"), with:
totalAmount (sum of amounts across all categories),
byCategory (object of category → sum),
count (number of transactions),
lastTransactionAt (ISO string of latest ts),
Sorted by totalAmount descending, then by ascending.
Sample output (shortened)

[
  {
    key: 101,
    totalAmount: 180.5,
    byCategory: { food: 100.5, travel: 80 },
    count: 3,
    lastTransactionAt: "2025-08-03T10:00:00.000Z",
    currency: "INR"
  },
  {
    key: 102,
    totalAmount: 60,
    byCategory: { food: 60 },
    count: 1,
    lastTransactionAt: "2025-08-02T07:05:00.000Z",
    currency: "INR"
  }
]*/

/* 
Logic: The function takes an array of transaction objects and summarizes them by userId.  
It validates the input and builds a summary for each user, including total amount, category-wise totals, transaction count, and latest timestamp.  
After processing all transactions, it converts the summary into a list and sorts it by totalAmount descending, then by userId ascending.  
Finally, it prints each user's transaction summary.
*/


const inputFromUser=
[
  { id: "t1", userId: 101, category: "food",   amount: 120.5,  currency: "INR", ts: "2025-08-01T09:10:00Z" },
  { id: "t2", userId: 101, category: "travel", amount:  80.00, currency: "INR", ts: "2025-08-02T14:33:00Z" },
  { id: "t3", userId: 102, category: "food",   amount:  60.00, currency: "INR", ts: "2025-08-02T07:05:00Z" },
  { id: "t4", userId: 101, category: "food",   amount: -20.00, currency: "INR", ts: "2025-08-03T10:00:00Z" } // refund
]

function summarizeTransactions(transactions, groupByKey = "userId") {
  // Edge Case 1: Validate input type and structure
  if (!Array.isArray(transactions) || transactions.length === 0) {
    console.error("Error: Input must be a non-empty array of transaction objects.");
    return [];
  }

  const groupedSummaryMap = {};

  for (let index = 0; index < transactions.length; index++) {
    const transactionRecord = transactions[index];

    // Edge Case 2: Validate transaction structure
    if (
      typeof transactionRecord !== 'object' ||
      typeof transactionRecord[groupByKey] === 'undefined' ||
      typeof transactionRecord.amount !== 'number' ||
      typeof transactionRecord.category !== 'string' ||
      typeof transactionRecord.currency !== 'string' ||
      typeof transactionRecord.ts !== 'string'
    ) {
      console.warn(`Skipping malformed transaction at index ${index}:`, transactionRecord);
      continue;
    }

    const groupingKey = transactionRecord[groupByKey];
    const normalizedCategory = transactionRecord.category.toLowerCase();
    const transactionTimestamp = new Date(transactionRecord.ts).toISOString();

    // Initialize group summary if not present
    if (!groupedSummaryMap[groupingKey]) {
      groupedSummaryMap[groupingKey] = {
        key: groupingKey,
        totalAmount: 0,
        byCategory: {},
        count: 0,
        lastTransactionAt: transactionTimestamp,
        currency: transactionRecord.currency
      };
    }

    const summaryEntry = groupedSummaryMap[groupingKey];
    summaryEntry.totalAmount += transactionRecord.amount;
    summaryEntry.count += 1;

    // Update category-wise totals
    if (!summaryEntry.byCategory[normalizedCategory]) {
      summaryEntry.byCategory[normalizedCategory] = 0;
    }
    summaryEntry.byCategory[normalizedCategory] += transactionRecord.amount;

    // Update latest timestamp
    if (new Date(transactionTimestamp) > new Date(summaryEntry.lastTransactionAt)) {
      summaryEntry.lastTransactionAt = transactionTimestamp;
    }
  }

  // Convert map to array
  const summaryList = Object.values(groupedSummaryMap);

  // Sort by totalAmount descending, then key ascending
  summaryList.sort((firstSummary, secondSummary) => {
    if (secondSummary.totalAmount !== firstSummary.totalAmount) {
      return secondSummary.totalAmount - firstSummary.totalAmount;
    }
    return firstSummary.key - secondSummary.key;
  });

  // Display result
  console.log("Transaction Summary:");
  for (const summaryEntry of summaryList) {
    console.log(summaryEntry);
  }

  return summaryList;
}

summarizeTransactions(inputFromUser);










