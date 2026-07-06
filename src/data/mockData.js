// Placeholder data. Replace with real API calls once the Express/MongoDB
// backend is connected (GET /api/stats, /api/members, /api/dashboard, etc).

export const societyStats = {
  totalMembers: 428,
  totalCollection: 18740500, // BDT
  currentMonthCollection: 612000, // BDT
  yearsCompleted: 9,
};

export const currentUser = {
  name: "Rafiqul Islam",
  profession: "School Teacher",
  nid: "1990-4471-XXXX",
  memberSince: "March 2021",
  avatar: null, // fallback initials used if null
  totalPaid: 84000,
  pendingAmount: 3000,
  currentMonthStatus: "verified", // paid | pending | rejected | verified
};

export const paymentHistory = [
  { month: "Jan", amount: 3000, status: "verified" },
  { month: "Feb", amount: 3000, status: "verified" },
  { month: "Mar", amount: 3000, status: "verified" },
  { month: "Apr", amount: 3000, status: "verified" },
  { month: "May", amount: 3000, status: "pending" },
  { month: "Jun", amount: 3000, status: "verified" },
  { month: "Jul", amount: 0, status: "unpaid" },
];

export const receiptHistory = [
  {
    id: "RC-2026-0611",
    month: "June 2026",
    bank: "Dutch-Bangla Bank",
    amount: 3000,
    date: "2026-06-04",
    status: "verified",
  },
  {
    id: "RC-2026-0512",
    month: "May 2026",
    bank: "Dutch-Bangla Bank",
    amount: 3000,
    date: "2026-05-06",
    status: "pending",
  },
  {
    id: "RC-2026-0409",
    month: "April 2026",
    bank: "Islami Bank Bangladesh",
    amount: 3000,
    date: "2026-04-03",
    status: "verified",
  },
];

export const notifications = [
  {
    id: 1,
    type: "approved",
    text: "Your June 2026 deposit of ৳3,000 was verified.",
    time: "2 days ago",
  },
  {
    id: 2,
    type: "pending",
    text: "Your May 2026 receipt is under manual review.",
    time: "1 week ago",
  },
  {
    id: 3,
    type: "reminder",
    text: "July deposit deadline is in 5 days.",
    time: "Just now",
  },
];

export const members = [
  {
    id: "M-1042",
    name: "Rafiqul Islam",
    profession: "School Teacher",
    joined: "Mar 2021",
    status: "paid",
    totalPaid: 84000,
    lastDeposit: "2026-06-04",
    avatar: null,
  },
  {
    id: "M-1043",
    name: "Nasrin Akter",
    profession: "Small Business Owner",
    joined: "Jan 2020",
    status: "paid",
    totalPaid: 126000,
    lastDeposit: "2026-06-02",
    avatar: null,
  },
  {
    id: "M-1044",
    name: "Shahidul Haque",
    profession: "Farmer",
    joined: "Aug 2022",
    status: "pending",
    totalPaid: 42000,
    lastDeposit: "2026-05-28",
    avatar: null,
  },
  {
    id: "M-1045",
    name: "Fatema Begum",
    profession: "Tailor",
    joined: "Nov 2019",
    status: "unpaid",
    totalPaid: 150000,
    lastDeposit: "2026-04-11",
    avatar: null,
  },
  {
    id: "M-1046",
    name: "Abdul Karim",
    profession: "Rickshaw Owner",
    joined: "Jun 2023",
    status: "paid",
    totalPaid: 21000,
    lastDeposit: "2026-06-05",
    avatar: null,
  },
  {
    id: "M-1047",
    name: "Salma Khatun",
    profession: "Nurse",
    joined: "Feb 2021",
    status: "paid",
    totalPaid: 90000,
    lastDeposit: "2026-06-01",
    avatar: null,
  },
];

export const timelineSteps = [
  { title: "Register as a member", text: "Submit your details and NID for admin verification." },
  { title: "Get approved", text: "The committee reviews and approves your membership." },
  { title: "Deposit monthly", text: "Pay your fixed monthly contribution to the society account." },
  { title: "Upload your receipt", text: "Submit a photo of the bank receipt through your dashboard." },
  { title: "Automatic verification", text: "OCR reads the receipt and checks it against your submission." },
  { title: "Track your savings", text: "Watch your passbook grow, month after month, year after year." },
];

export const testimonials = [
  {
    name: "Nasrin Akter",
    role: "Member since 2020",
    quote: "MASAIMI gave my family a discipline we never had with savings before. Every month, our future gets a little more secure.",
  },
  {
    name: "Abdul Karim",
    role: "Member since 2023",
    quote: "The receipt upload takes two minutes and I always know exactly where my money stands. No confusion, no paperwork lost.",
  },
  {
    name: "Salma Khatun",
    role: "Member since 2021",
    quote: "I have watched this society grow from 60 members to over 400. It is run like a real institution, not an informal group.",
  },
];

export const faqs = [
  { q: "How much is the monthly contribution?", a: "The standard monthly contribution is ৳3,000, fixed at registration and reviewed annually by the committee." },
  { q: "What happens if I miss a month?", a: "You'll receive a reminder before the deadline. Missed months can be settled the following month with committee approval." },
  { q: "How is my receipt verified?", a: "Your uploaded receipt is scanned automatically to confirm the transaction ID, amount, date and bank details match your submission, then a committee member gives final approval." },
  { q: "Can I withdraw my savings early?", a: "Early withdrawal requests are reviewed case-by-case by the committee, in line with the society's charter." },
];

export const galleryImages = [
  { id: 1, caption: "Annual general meeting, 2026" },
  { id: 2, caption: "New member orientation" },
  { id: 3, caption: "Committee planning session" },
  { id: 4, caption: "10th anniversary preparation" },
  { id: 5, caption: "Community savings workshop" },
  { id: 6, caption: "Monthly collection drive" },
];