"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { UserBlock, UserRole } from "@prisma/client";
import { CheckCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { BlogTableRowActions } from "./user-table-row-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExtendUser } from "@/nextauth";

export const userColumns: ColumnDef<ExtendUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Id" />
    ),
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      const blogId = id.slice(0, 10);
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-[80px] cursor-text">{blogId}</div>
            </TooltipTrigger>
            <TooltipContent>{id}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium cursor-text">
                  {name}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>{name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email: string = row.getValue("email");
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium cursor-text">
                  {email}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>{email}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const user: UserRole = row.getValue("role");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {user === "ADMIN" ? (
              <span className="mr-2 text-[red]">👑 Admin</span>
            ) : (
              <span className="mr-2 text-muted-foreground">👤 User</span>
            )}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isBlocked",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const user: UserBlock = row.getValue("isBlocked");
      return (
        <div className="flex space-x-2">
          {user === "BLOCK" ? (
            <span className="max-w-[500px] truncate font-medium flex items-center">
              <LockClosedIcon className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-600 font-bold">Blocked</span>
            </span>
          ) : (
            <span className="max-w-[500px] truncate font-medium flex items-center">
              <CheckCircledIcon className="h-5 w-5 text-green-600 mr-2" />{" "}
              <span className="text-green-600 font-bold">Active</span>
            </span>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <BlogTableRowActions row={row} />,
  },
];
