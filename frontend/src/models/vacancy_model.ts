export interface VacancyModel {
  id: number;
  vacancy_name: string;
  min_exp: number;
  max_age: number | null;
  flag_status: number; 
  salary: string;
  description: string;
  publish_date: string; 
  expired_date: string; 
  created_at: string;   
  updated_at: string;
}