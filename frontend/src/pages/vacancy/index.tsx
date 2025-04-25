import { CustomDatatable, useCustomDatatable } from "@/components/commons/CustomDatatable";
import MainContent from "@/components/commons/MainContent";
import { ModalForm, useModalForm } from "@/components/commons/ModalForm";
import { ApplicantModel } from "@/models/applicant_model";
import formatDate from '@/utils/formatDate';
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { CandidateModel } from "@/models/candidates_model";
import { VacancyModel } from "@/models/vacancy_model";

import moment from "moment";
import { ComboBox } from "@/components/commons/ComboBox";

const LIST_URL = "/vacancys";
const POST_URL = "/vacancys";
const DETAIL_URL = "/vacancys/:id";
const UPDATE_URL = "/vacancys/:id";
const DELETE_URL = "/vacancys/:id";

export default function CandidatePage() {
   
    const formSchema = z.object({
      vacancy_name: z.string(),
      min_exp: z.number(),
      salary: z.string(),
      description: z.string(),
      flag_status: z.string(),
      publish_date: z.string(),
    });
            const {refreshKey, refreshHandler} =  useCustomDatatable();
    
    const columns: ColumnDef<VacancyModel>[] = [
      {
        accessorKey: "nomor",
        header: "Nomor",
        cell: ({ row }) => <div>{row.index + 1}</div>,
      },
      {
        accessorKey: "vacancy_name",
        header: "Nama Lowongan",
        cell: ({ row }) => (
          <div className="capitalize">{row.original.vacancy_name}</div>
        ),
      },
      {
        accessorKey: "min_exp",
        header: "Pengalaman Min (thn)",
        cell: ({ row }) => <div>{row.original.min_exp}</div>,
      },
      {
        accessorKey: "max_age",
        header: "Usia Maksimal",
        cell: ({ row }) => <div>{row.original.max_age ?? "-"}</div>,
      },
      {
        accessorKey: "salary",
        header: "Gaji",
        cell: ({ row }) => <div>{row.original.salary}</div>,
      },
      {
        accessorKey: "publish_date",
        header: "Tanggal Publish",
        cell: ({ row }) => <div>{row.original.publish_date}</div>,
      },
      {
        accessorKey: "expired_date",
        header: "Tanggal Expired",
        cell: ({ row }) => <div>{row.original.expired_date}</div>,
      },
      {
        accessorKey: "flag_status",
        header: "Status",
        cell: ({ row }) => (
          <div>{row.original.flag_status === 1 ? "Active" : "Inactive"}</div>
        ),
      },
    ];


    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
      
      }
    });


   
    const {
        setModalForm, modalForm
    } = useModalForm()
    return (
      <MainContent title="Vacancy Menu">
        <div>
          <ModalForm<typeof formSchema>
            modalForm={modalForm}
            setModalForm={setModalForm}
            onSuccess={() => {
              refreshHandler();
            }}
            detailResponse={(record) => {
              form.resetField(record);
            }}
            url={{
              postUrl: POST_URL,
              detailUrl: DETAIL_URL,
              updateUrl: UPDATE_URL,
            }}
            form={form}
            errorResponse={(value) => {
               
            }}
          >
            <FormField
              control={form.control}
              name="vacancy_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vacancy Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="min_exp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimal Pengalaman</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={form.getValues("min_exp")}
                      onChange={(event) => {
                        form.setValue("min_exp", parseInt(event.target.value));
                      }}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publish_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Publish</FormLabel>
                  <FormControl>
                    <input
                      onChange={(event) => {
                        form.setValue("publish_date", event.target.value);
                      }}
                      defaultValue={moment(
                        form.getValues("publish_date")
                      ).format("YYYY-MM-DD")}
                      type="date"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="flag_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flag Status</FormLabel>
                  <FormControl>
                    <ComboBox
                      value={form.getValues("flag_status")}
                      onValueChange={(value) => {
                        form.setValue("flag_status", value);
                      }}
                      datas={[
                        {
                          label: "Active",
                          value: "1",
                        },
                        {
                          label: "Inactive",
                          value: "0",
                        },
                      ]}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </ModalForm>
          <CustomDatatable<VacancyModel>
            columns={columns}
            refreshKey={refreshKey}
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