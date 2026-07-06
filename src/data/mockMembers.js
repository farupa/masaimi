// Mirrors the shape of the future MongoDB "User" model.
// Fields: name, bankName, profilePicture, lastDepositDate, lastDepositAmount, status

const names = [
  "Rafiqul Islam", "Nasrin Akter", "Shahidul Haque", "Fatema Begum",
  "Abdul Karim", "Salma Khatun", "Kamal Hossain", "Ruma Akter",
  "Delwar Hossain", "Jesmin Sultana", "Mizanur Rahman", "Shirin Aktar",
  "Anwar Hossain", "Taslima Begum", "Rezaul Karim", "Nargis Akter",
  "Habibur Rahman", "Shahana Begum", "Jahangir Alam", "Rokeya Begum",
];

const banks = [
  "Dutch-Bangla Bank", "Islami Bank Bangladesh", "Sonali Bank",
  "BRAC Bank", "City Bank", "Agrani Bank",
];

const statuses = ["approved", "pending", "approved", "approved"];

export const mockMembers = names.map((name, i) => ({
  id: `M-${1041 + i}`,
  name,
  bankName: banks[i % banks.length],
  profilePicture: null, // will hold Cloudinary URL later
  lastDepositDate: `2026-0${(i % 6) + 1}-${10 + (i % 15)}`,
  lastDepositAmount: 3000,
  status: statuses[i % statuses.length],
}));