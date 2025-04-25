import { CandidateModel } from "@/models/candidates_model";
import { StatusApplicantsModel } from "@/models/status_applicants";
import { VacancyModel } from "@/models/vacancy_model";

export interface ApplicantModel {
  id: number;
  candidate_id: number;
  vacancy_id: number;
  status_applicant_id: number;
  created_at: string;
  updated_at: string;
  apply_date: string;
  candidate: CandidateModel;
  vacancy: VacancyModel;
  status: StatusApplicantsModel
}
