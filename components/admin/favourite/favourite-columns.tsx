"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Blog, Favourite, User } from "@prisma/client";
import { FavouriteTableRowActions } from "./favourite-table-row-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { PinLeftIcon } from "@radix-ui/react-icons";
import { TbPinnedFilled } from "react-icons/tb";

export const favouriteColumns: ColumnDef<Favourite>[] = [
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
      const favouriteId = id.slice(0, 10);
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-[80px] cursor-text">{favouriteId}</div>
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
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const user: User = row.getValue("user");
      return (
        <div className="flex  space-x-2 items-center">
          <Avatar>
            <AvatarImage
              height={20}
              width={20}
              src={user?.image || ""}
              alt="Avatar"
            />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
          <span className="max-w-[500px] truncate capitalize font-medium cursor-text">
            {user?.name}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "blog",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Blog" />
    ),
    cell: ({ row }) => {
      const blog: Blog = row.getValue("blog");
      const blogTitle = blog?.title?.slice(0, 20);
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex space-x-2 items-center">
                <Image
                  src={blog?.imageUrl || ""}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-blue-500"
                  width={20}
                  height={20}
                />
                <span className="max-w-[600px] truncate capitalize font-medium cursor-text">
                  {blog?.title?.length > 20
                    ? `${blogTitle}...`
                    : `${blogTitle}`}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>{blog?.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      return (
        <div className="flex space-x-2 items-center">
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <FavouriteTableRowActions row={row} />,
  },
];
