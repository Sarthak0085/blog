"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ExtendCategory } from "@/utils/types";
import { CheckIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Blog } from "@prisma/client";

export const categoryColumns: ColumnDef<ExtendCategory>[] = [
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
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => {
      return <div className="w-[80px]">{row.getValue("id")}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
    cell: ({ row }) => {
      const title: string = row.getValue("name");
      const newTitle = title.slice(0, 20);
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex space-x-2">
                <span className="max-w-[500px] truncate font-medium hover:underline cursor-pointer">
                  {title.length > 20 ? `${newTitle}...` : newTitle}
                </span>
              </div>
            </TooltipTrigger>
            {title.length > 20 && <TooltipContent>{title}</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "blogs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Blogs per Category" />
    ),
    cell: ({ row }) => {
      const blogs: Blog[] = row.getValue("blogs");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {blogs?.length}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <BlogTableRowActions row={row} />,
  },
];
