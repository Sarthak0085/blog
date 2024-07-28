"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ExtendBlog } from "@/utils/types";
import { Category, Comment, Like, User } from "@prisma/client";
import { CheckIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { BlogTableRowActions } from "./blog-table-row-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const blogColumns: ColumnDef<ExtendBlog>[] = [
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
      const id: string = row.getValue("id");
      const blogId = id.slice(0, 10);
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-[80px]">{blogId}</div>
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const title: string = row.getValue("title");
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
            <TooltipContent>{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category: Category = row.getValue("category");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {category?.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const user: User = row.getValue("user");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {user.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "views",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("views")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Likes" />
    ),
    cell: ({ row }) => {
      const likes: Like[] = row.getValue("likes");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {likes?.length}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comments" />
    ),
    cell: ({ row }) => {
      const comments: Comment[] = row.getValue("comments");
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {comments?.length}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      let statusLabel, statusColor, statusIcon;

      if (status === "PUBLISHED") {
        statusLabel = "Published";
        statusColor = "text-green-500";
        statusIcon = <CheckIcon className="mr-2 h-4 w-4" />;
      } else if (status === "DRAFT") {
        statusLabel = "Draft";
        statusColor = "text-yellow-500";
        statusIcon = <QuestionMarkCircledIcon className="mr-2 h-4 w-4" />;
      } else {
        return null;
      }

      return (
        <div className={`flex w-[100px] items-center ${statusColor}`}>
          {statusIcon}
          <span>{statusLabel}</span>
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
