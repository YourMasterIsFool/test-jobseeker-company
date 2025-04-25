"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiClient } from "@/api/apiClient";
import { DatatableResponseDto } from "@/dto/DatatableResponseDto";



export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};


export interface IUrl {
  
    deleteUrl?: string,
    // detailUrl?:string,
    listUrl?:string,
}
export interface ICustomDatatable<T> {
    url?:IUrl,
    onDetail?:(id:number) => void,
    onTambah?: () => void,
    columns: ColumnDef<T>[],
    refreshKey: number,
 
}

export function useCustomDatatable() {
    const [refreshKey, setRefreshKey] = React.useState<number>(0);

    function refreshHandler() {
        setRefreshKey((state) => state +1);
    }

    console.log('refersh', refreshKey)

    return  {
        refreshHandler,
        refreshKey
    }
}
export function CustomDatatable<T>(props:ICustomDatatable<T>) {
 
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});


  const [deletedId, setDeletedId] =  React.useState<null|number | string>(null);
  const [datas, setDatas] = React.useState<T[]>([]);

   const actionColums =
     props.onDetail || props.url?.deleteUrl
       ? [
           {
             id: "actions",
             header: "Action",
             cell: ({ row }) => {
               return (
                 <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="h-8 w-8 p-0">
                       <span className="sr-only">Open menu</span>
                       <MoreHorizontal />
                     </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent align="end">
                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     {props.onDetail ? (
                       <DropdownMenuItem
                         onClick={() => props.onDetail(row.original.id)}
                       >
                         Detail
                       </DropdownMenuItem>
                     ) : null}
                     {props.url?.deleteUrl ? (
                       <DropdownMenuItem
                         onClick={() => setDeletedId(row.original.id ?? 0)}
                       >
                         Hapus
                       </DropdownMenuItem>
                     ) : null}
                   </DropdownMenuContent>
                 </DropdownMenu>
               );
             },
           },
         ]
       : [];

  const table = useReactTable({
    data:datas,
    columns:[...props.columns, ...actionColums],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });


  const [filter, setFilter] = React.useState({

    search: null as null | string,
    cursor: null as null | string,
    page_length: 10,
  })

  const [cursor, setCursor] = React.useState({
    next_cursor: null as string | null,
    prev_cursor: null as string | null
  })

  async function fetchAllData() {
    try {
        if(props.url && props.url.listUrl) {
            const response = await apiClient(props.url.listUrl, {
                method:"GET",
                params: filter ? filter : undefined
            });
            const result = response as DatatableResponseDto<T>;

            console.log(result);
            setDatas(result.data as T[]);

            setCursor((prev) => ({
                ...prev, 
                next_cursor: result.next_cursor,
                prev_cursor: result.prev_cursor,
            }))
            
            console.log(datas);
        }
    }
    catch(e) {
        console.log(e);
    }
  }

  async function deletedData() {
    try {
        const url = props.url?.deleteUrl?.replace(
          ":id",
          deletedId ? deletedId.toString() : null
        );
        await apiClient(url ??'', {
            method: "DELETE"
        }).then(() => {
            setDeletedId(null)
            fetchAllData();
        });
    }
    catch(e) {
        console.log(e);
    }
  }

  React.useEffect(() => {
    fetchAllData()
  },[props.refreshKey, filter])

  return (
    <div className="w-full">
      <Dialog open={deletedId != null} onOpenChange={() => setDeletedId(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Data</DialogTitle>
            <DialogDescription>
              Apakah anda setuju menghapus data ini ?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              onClick={() => deletedData()}
              variant={"destructive"}
              type="submit"
            >
              Delete Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between items-center py-4">
        <Input
          onChange={(event) => {
            setFilter((prev) => ({
              ...prev,
              search: event.target.value,
            }));
          }}
          className="lg:w-72"
          placeholder="Search"
        />
        <div>
          {props.onTambah ? (
            <Button type="button" onClick={() => props.onTambah()}>
              Tambah
            </Button>
          ) : null}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={props.columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <Select
            value={filter.page_length.toString()}
            onValueChange={(value) =>
              setFilter((prev) => ({
                ...prev,
                page_length: parseInt(value),
              }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Page Show" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Show Data</SelectLabel>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilter((prev) => ({
                ...prev,
                cursor: cursor.prev_cursor,
              }));
            }}
            disabled={cursor.prev_cursor == null}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilter((prev) => ({
                ...prev,
                cursor: cursor.next_cursor,
              }));
            }}
            disabled={cursor.next_cursor == null}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
