// Mirrors the future MongoDB "Payment"/"Receipt" model.
// In the real backend, this will be fetched via GET /api/payments/me

export const myReceipts = [
  {
    id: "RC-2026-0611",
    month: "June 2026",
    bank: "Dutch-Bangla Bank",
    branch: "Mirpur Branch",
    transactionId: "TXN-928374",
    amount: 3000,
    date: "2026-06-04",
    status: "verified", // verified | pending | rejected
    receiptImage: null,
  },
  {
    id: "RC-2026-0512",
    month: "May 2026",
    bank: "Dutch-Bangla Bank",
    branch: "Mirpur Branch",
    transactionId: "TXN-871122",
    amount: 3000,
    date: "2026-05-06",
    status: "pending",
    receiptImage: null,
  },
  {
    id: "RC-2026-0409",
    month: "April 2026",
    bank: "Dutch-Bangla Bank",
    branch: "Mirpur Branch",
    transactionId: "TXN-763290",
    amount: 3000,
    date: "2026-04-03",
    status: "verified",
    receiptImage: null,
  },
  {
    id: "RC-2026-0311",
    month: "March 2026",
    bank: "Dutch-Bangla Bank",
    branch: "Mirpur Branch",
    transactionId: "TXN-655210",
    amount: 3000,
    date: "2026-03-05",
    status: "rejected",
    receiptImage: null,
  },
];