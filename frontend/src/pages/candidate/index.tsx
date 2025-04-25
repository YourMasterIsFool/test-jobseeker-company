import { CustomDatatable, useCustomDatatable } from "@/components/commons/CustomDatatable";
import MainContent from "@/components/commons/MainContent";
import { ModalForm, useModalForm } from "@/components/commons/ModalForm";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { z } from "zod";
import moment from "moment";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CandidateModel } from "@/models/candidates_model";
import { ComboBox } from "@/components/commons/ComboBox";

const LIST_URL = "/candidates";
const POST_URL = "/candidates";
const DETAIL_URL = "/candidates/:id";
const UPDATE_URL = "/candidates/:id";
const DELETE_URL = "/candidates/:id";

export default function CandidatePage() {

        const {refreshKey, refreshHandler} =  useCustomDatatable();
    
   
    const formSchema = z.object({
        email: z.string().email(),
        phone_number: z.string().min(10, "Nomor telepon minimal 10 digit"),
        full_name: z.string().min(1, "Nama lengkap dibutuhkan"),
        dob: z
            .string(),
        pob: z.string().min(1, "Tempat lahir dibutuhkan"),
        gender: z.enum(["M", "F"]),
        year_exp: z.number().min(1, "Pengalaman Kerja minimal 1 tahun"),
        last_salary: z.number().min(0, "Gaji terakhir tidak boleh negatif").optional(),
        });
    const columns: ColumnDef<CandidateModel>[] = [
      {
        accessorKey: "nomor",
        header: "Nomor",
        cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
      },
      {
        accessorKey: "candidate_name",
        header: "Candidate Name",
        cell: ({ row }) => (
          <div className="capitalize">{row.original.full_name}</div>
        ),
      },
      {
        accessorKey: "candidate_email",
        header: "Candidate Email",
        cell: ({ row }) => (
          <div className="lowercase">{row.original.email}</div>
        ),
      },
      {
        accessorKey: "candidate_phone",
        header: "Candidate Phone",
        cell: ({ row }) => (
          <div className="capitalize">
            {row.original.phone_number}
          </div>
        ),
      },
      {
        accessorKey: "candidate_dob",
        header: "Tanggal Lahir",
        cell: ({ row }) => (
          <div className="capitalize">{row.original.dob}</div>
        ),
      },
      {
        accessorKey: "candidate_pob",
        header: "Tempat Lahir",
        cell: ({ row }) => (
          <div className="capitalize">{row.original.pob}</div>
        ),
      },
      {
        accessorKey: "candidate_gender",
        header: "Gender",
        cell: ({ row }) => (
          <div className="capitalize">
            {row.original.gender === "M" ? "Male" : "Female"}
          </div>
        ),
      },
      {
        accessorKey: "candidate_year_exp",
        header: "Pengalaman (tahun)",
        cell: ({ row }) => (
          <div className="capitalize">{row.original.year_exp}</div>
        ),
      },
      {
        accessorKey: "candidate_last_salary",
        header: "Gaji Terakhir",
        cell: ({ row }) => {
          
          return <div className="capitalize">{row.original.last_salary}</div>;
        },
      },
    
    ];

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
      
      }
    });


    function handleSubmit(values: any) {
        console.log(values);
    }

    const {
        setModalForm, modalForm
    } = useModalForm()
    return (
      <MainContent title="Candidate Menu">
        <div>
          <ModalForm<typeof formSchema>
            modalForm={modalForm}
            setModalForm={setModalForm}
            onSuccess={() => {
              refreshHandler();
            }}
            detailResponse={(record) => {
              form.reset(record);
            }}
            url={{
              postUrl: POST_URL,
              detailUrl: DETAIL_URL,
              updateUrl: UPDATE_URL,
            }}
            form={form}
            errorResponse={(value) => {
                 if("email" in value) {
                    form.setError('email',  {
                        message: value['email']
                    })

                    return;
                }
                if("phone_number" in value) {
                     form.setError("email", {
                       message: value["email"],
                     }); 
                     return; 
                }
            }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
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
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
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
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <input
                      onChange={(event) => {
                        form.setValue("dob", event.target.value);
                      }}
                      defaultValue={moment(form.getValues("dob")).format(
                        "YYYY-MM-DD"
                      )}
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
              name="pob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempat Lahir</FormLabel>
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <ComboBox
                      value={form.getValues("gender")}
                      onValueChange={(value) => {
                        form.setValue("gender", value);
                      }}
                      datas={[
                        {
                          label: "Laki Laki",
                          value: "M",
                        },
                        {
                          label: "Perempuan",
                          value: "F",
                        },
                      ]}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year_exp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pengalaman Kerja (Years)</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={form.getValues("year_exp")}
                      onChange={(event) => {
                        form.setValue("year_exp", parseInt(event.target.value));
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
              name="last_salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gaji Terakhir (Angka)</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={form.getValues("last_salary")}
                      onChange={(event) => {
                        form.setValue(
                          "last_salary",
                          parseInt(event.target.value)
                        );
                      }}
                      type="number"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </ModalForm>
          <CustomDatatable<CandidateModel>
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