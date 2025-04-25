import { apiClient } from "@/api/apiClient";
import { useCustomDatatable } from "@/components/commons/CustomDatatable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form} from "@/components/ui/form";

import { FetchError } from "ofetch";
import React, { ReactNode, useEffect,  } from "react";
import { UseFormReturn } from "react-hook-form";
import {z, ZodType} from 'zod';


export interface IModalFormState {
  type: "DETAIL" | "UPDATE" | "CREATE";
  open: boolean;
  id: null | number;
}   

export function useModalForm() {
    const [modalForm, setModalForm] = React.useState<IModalFormState>({
      type: "DETAIL" as "DETAIL" | "UPDATE" | "CREATE",
      open: false,
      id: null as null | number,
    });
    useEffect(() => {
        console.log(modalForm)
    }, [modalForm])

    return {
        setModalForm, modalForm
    }
}
 export interface IUrl {
    postUrl?:string,
    updateUrl?:string,
    detailUrl?:string
}


export interface IModalForm<T extends z.ZodType<any>>  {
  form: UseFormReturn<z.infer<T>>;
  children: ReactNode;
  url?: IUrl;
  title?: string;
  description?: string;
  
  errorResponse?: (value: Record<string, any>) => void;
  detailResponse?: (value: Record<string, any>) => void;
  onSuccess?: () => void,
  modalForm: IModalFormState;
  setModalForm: React.Dispatch<
    React.SetStateAction<IModalFormState>
  >;
}

export function ModalForm<T extends ZodType<any, any>>(props: IModalForm<T>) {
  const { modalForm, setModalForm } = props;

  const {
    refreshHandler,
  } = useCustomDatatable();
 

  function resetModalForm() {
    setModalForm({
        type: "CREATE",
        id: null,
        open: false
    });
  }
  async function postData(values: z.infer<T>) {

    console.log(values)

    if (modalForm.type == "CREATE" && props.url?.postUrl) {
      try {
        await apiClient(props.url?.postUrl, { method: "POST", body:values });
    refreshHandler();    
    resetModalForm();
        if(props.onSuccess) {
       
            props.onSuccess()
           
        }
      } catch (e) {
        console.log(e);
        if (e instanceof FetchError ) {

          if(props.errorResponse) {
            props.errorResponse(e.response?._data["errors"]);
          }
          
        }
      }
    } else if (modalForm.type == "UPDATE" && props.url?.updateUrl) {
      try {

        const url = props.url?.detailUrl?.replace(
          ":id",
          modalForm.id ? modalForm.id.toString() : null
        );

        await apiClient(url, { method: "PUT", body: values });
         refreshHandler();
         resetModalForm();
        if (props.onSuccess) {
          props.onSuccess();
        }
      } catch (e) {

        if (e instanceof FetchError) {
         if (props.errorResponse) {

            let responseError = e.response?._data['errors'];
           props.errorResponse(responseError);
         }
        }
      }
    }
  }

  async function fetchData() {
    if(modalForm.type ==  'DETAIL' || modalForm.type == 'UPDATE') {
        const url = props.url?.detailUrl?.replace(":id", modalForm.id? modalForm.id.toString() : null)
        const result = await apiClient(url ?? '', {
            method: 'GET',
        })
        if(props.detailResponse) {
            props.detailResponse(result.data);
        }
    }
  }


  function onCloseModalForm() {
      setModalForm((prev) => ({
          type: "CREATE",
          open: false,
          id: null
        }))
  }

  
  useEffect(() => {
    if(modalForm.open) {
        fetchData()
    }
  }, [modalForm.open])

  return (
    <Dialog open={modalForm.open} onOpenChange={() => onCloseModalForm()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <Form {...props.form}>
          <form onSubmit={props.form.handleSubmit(postData)}>
            {props.children}

            <DialogFooter className="flex items-center justify-end space-x-3">
              <Button
                type="button"
                onClick={() => onCloseModalForm()}
                variant={"ghost"}
              >
                Cancel
              </Button>

              <Button type="submit">
                {modalForm.type === "CREATE" ? "Create" : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
