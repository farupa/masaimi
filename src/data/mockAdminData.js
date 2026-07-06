// In the real backend, these come from:
// GET /api/admin/members?status=pending
// GET /api/admin/receipts?status=pending

export const pendingMembers = [
  {
    id: "M-2001",
    name: "Kamrul Hasan",
    phone: "01711223344",
    nid: "1992-8871-XXXX",
    bankName: "Sonali Bank",
    appliedOn: "2026-07-01",
  },
  {
    id: "M-2002",
    name: "Farzana Yasmin",
    phone: "01822334455",
    nid: "1995-4432-XXXX",
    bankName: "BRAC Bank",
    appliedOn: "2026-07-03",
  },
  {
    id: "M-2003",
    name: "Sohel Rana",
    phone: "01933445566",
    nid: "1988-9012-XXXX",
    bankName: "City Bank",
    appliedOn: "2026-07-05",
  },
];

export const pendingReceipts = [
  {
    id: "RC-2026-0701",
    memberName: "Rafiqul Islam",
    bank: "Dutch-Bangla Bank",
    transactionId: "TXN-871122",
    amount: 3000,
    date: "2026-06-04",
    ocrMatch: true, // whether OCR-extracted details matched submitted values
  },
  {
    id: "RC-2026-0702",
    memberName: "Nasrin Akter",
    bank: "Islami Bank Bangladesh",
    transactionId: "TXN-902341",
    amount: 3000,
    date: "2026-06-02",
    ocrMatch: true,
  },
  {
    id: "RC-2026-0703",
    memberName: "Abdul Karim",
    bank: "Sonali Bank",
    transactionId: "TXN-778812",
    amount: 2500,
    date: "2026-06-05",
    ocrMatch: false, // amount mismatch — flagged for manual review
  },
];