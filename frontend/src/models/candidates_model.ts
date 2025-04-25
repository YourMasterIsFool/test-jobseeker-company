export interface CandidateModel {
  id: number;
  email: string;
  phone_number: string;
  full_name: string;
  dob: string; // ISO date string, bisa juga pakai `Date` jika di-convert
  pob: string;
  gender: "M" | "F"; // asumsi hanya dua pilihan
  year_exp: number;
  last_salary: number;
  created_at: string; // ISO date string
  updated_at: string;
}
