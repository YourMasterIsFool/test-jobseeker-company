import { CustomDatatable, useCustomDatatable } from "@/components/commons/CustomDatatable";
import MainContent from "@/components/commons/MainContent";
import { ModalForm, useModalForm } from "@/components/commons/ModalForm";
import { ApplicantModel } from "@/models/applicant_model";
import formatDate from '@/utils/formatDate';
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {  FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { VacancyModel } from "@/models/vacancy_model";
import { CandidateModel } from "@/models/candidates_model";
import { ResponseModelDto } from "@/dto/ResponseModelDto";
import { apiClient } from "@/api/apiClient";
import { ComboBox } from "@/components/commons/ComboBox";
import { StatusApplicantsModel } from "@/models/status_applicants";


const LIST_URL = "/applicants";
const POST_URL = "/applicants";
const DETAIL_URL = "/applicants/:id";
const UPDATE_URL = "/applicants/:id";
const DELETE_URL = "/applicants/:id";

export default function ApplicantPage() {
   const formSchema = z.object({
     vacancy_id: z
       .number({
         message: "Vacancy Id Harus Number",
       })
       .min(1, {
         message: "Vacancy Dibutuhkan",
       }),
     candidate_id: z
       .number({
         message: "Candidate Id Harus Number",
       })
       .min(1, {
         message: "Candidate Dibutuhkan",
       }),
     status_applicant_id: z
       .number({
         message: "status_applicant_id Id Harus Number",
       })
       .optional(),
   });
     const columns: ColumnDef<ApplicantModel>[] = [
       {
         accessorKey: "nomor",
         header: "Nomor",
         cell: ({ row }) => (
           <div className="capitalize">{row.index +1 }</div>
         ),
       },
       {
         accessorKey: "vacancy_name",
         header: "Vacancy Name",
         cell: ({ row }) => (
           <div className="capitalize">{row.original.vacancy.vacancy_name}</div>
         ),
       },
       {
         accessorKey: "vacancy_salary",
         header: "Vacancy Salary",
         cell: ({ row }) => (
           <div className="capitalize">{row.original.vacancy.salary}</div>
         ),
       },

       {
         accessorKey: "candidate_name",
         header: "Candidate Name",
         cell: ({ row }) => (
           <div className="capitalize">{row.original.candidate.full_name}</div>
         ),
       },

       {
         accessorKey: "candidate_email",
         header: "Candidate email",
         cell: ({ row }) => (
           <div className="capitalize">{row.original.candidate.email}</div>
         ),
       },
       {
         accessorKey: "candidate_phone",
         header: "Candidate phone",
         cell: ({ row }) => (
           <div className="capitalize">
             {row.original.candidate.phone_number}
           </div>
         ),
       },

       {
         accessorKey: "apply_date",
         header: "Apply Date",
         cell: ({ row }) => <div className="capitalize">{formatDate(row.original.apply_date)}</div>,
       },
       {
         accessorKey: "status",
         header: "Status",

         cell: ({ row }) => (
           <div className="lowercase">{row.original.status.name}</div>
         ),
       },
      
     ];
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        vacancy_id: 0,
        status_applicant_id: 0,
        candidate_id: 0,
      }
    });

    const [listVacancy, setListVacancy] =  useState<VacancyModel[]> ([]);
    const [listCandidate, setListCandidate] = useState<CandidateModel[]>([]);
    const [listStatusApplicants, setListStatusApplicants] = useState<StatusApplicantsModel[]>([]);

    const {refreshKey, refreshHandler} =  useCustomDatatable();
    const {
        setModalForm, modalForm
    } = useModalForm()

    async function fetchListVacancy() {
        const result: ResponseModelDto<VacancyModel> =  await apiClient('/vacancys', {
            method: "GET",
        }) as ResponseModelDto<VacancyModel>

        setListVacancy(result.data);
    }

     async function fetchListCandidate() {
       const result: ResponseModelDto<CandidateModel> = (await apiClient(
         "/candidates",
         {
           method: "GET",
         }
       )) as ResponseModelDto<CandidateModel>;

       setListCandidate(result.data);
     }

      async function fetchListStatusApplicants() {
        const result: ResponseModelDto<StatusApplicantsModel> = (await apiClient(
          "/status_applicants",
          {
            method: "GET",
          }
        )) as ResponseModelDto<StatusApplicantsModel>;

        setListStatusApplicants(result.data);
      }

    useEffect(() => {
        if(modalForm.open) {
            fetchListVacancy()
            fetchListCandidate()
            fetchListStatusApplicants()
        }
    }, [
        modalForm.open
    ])
    return (
      <MainContent title="Applicant Menu">
        <div>
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="vacancy_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="candidate_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status_applicant_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel />
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form> */}
          <ModalForm<typeof formSchema>
            modalForm={modalForm}
            setModalForm={setModalForm}
            onSuccess={() => {
                refreshHandler()
            }}
            detailResponse={(record) => {
              form.reset(record)
            }}
            url={{
              postUrl: POST_URL,
              detailUrl: DETAIL_URL,
              updateUrl: UPDATE_URL,
            }}
            form={form}
            errorResponse={(value) => {
              console.log(value);
            }}
          >
            <FormField
              control={form.control}
              name="vacancy_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vacancy</FormLabel>
                  <FormControl>
                    <ComboBox
                      value={form.getValues("vacancy_id")?.toString()}
                      onValueChange={(value) => {
                        form.setValue("vacancy_id", parseInt(value));
                      }}
                      datas={listVacancy.map((item) => {
                        return {
                          label: item.vacancy_name,
                          value: item.id.toString(),
                        };
                      })}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="candidate_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidate</FormLabel>
                  <FormControl>
                    <ComboBox
                      value={form.getValues("candidate_id").toString()}
                      onValueChange={(value) => {
                        form.setValue("candidate_id", parseInt(value));
                      }}
                      datas={listCandidate.map((item) => {
                        return {
                          label: item.full_name,
                          value: item.id.toString(),
                        };
                      })}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status_applicant_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Applicant</FormLabel>
                  <FormControl>
                    <ComboBox
                      value={form.getValues("status_applicant_id")?.toString()}
                      onValueChange={(value) => {
                        form.setValue("status_applicant_id", parseInt(value));
                      }}
                      datas={listStatusApplicants.map((item) => {
                        return {
                          label: item.name,
                          value: item.id.toString(),
                        };
                      })}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </ModalForm>
          <CustomDatatable<ApplicantModel>
            refreshKey={refreshKey}
            columns={columns}
            onTambah={() => {
              setModalForm({
                type: "CREATE",
                open: true,
                id: null,
              });
            }}
            url={{
              listUrl: LIST_URL,
              deleteUrl: DELETE_URL,
            }}
            onDetail={(id) => {
              setModalForm({
                type: "UPDATE",
                open: true,
                id: id,
              });
            }}
          />
        </div>
      </MainContent>
    );
}