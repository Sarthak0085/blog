"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Blog, CommentLike, User } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { CommentTableRowActions } from "./comment-table-row-actions";
import { ExtendComment } from "@/utils/types";
import { TbPinnedFilled } from "react-icons/tb";

export const commentColumns: ColumnDef<ExtendComment>[] = [
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
      const commentId = id.slice(0, 10);
      const isPinned = row.original.isPinned;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-[90px] cursor-text justify-end flex items-center space-x-1">
                <span>{isPinned && <TbPinnedFilled size={16} className="-rotate-45 mt-[1px]" />}</span>
                <span>{commentId}</span>
              </div>
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
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => {
      const content: string = row.getValue("content");
      const contentSliced = content?.slice(0, 22);
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex  space-x-2 items-center">
                <span className="max-w-[500px] truncate capitalize font-medium cursor-text">
                  {content?.length > 22
                    ? `${contentSliced}...`
                    : `${contentSliced}`}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>{content}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
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
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Likes" />
    ),
    cell: ({ row }) => {
      const likes: CommentLike[] = row.getValue("likes");
      return (
        <div className="flex space-x-2 items-center">
          {likes?.length ?? 0}
        </div>
      );
    },
  },
  {
    accessorKey: "parentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Reply" />
    ),
    cell: ({ row }) => {
      const parentId: string | null = row.getValue("parentId");
      return (
        <div className="flex space-x-2 items-center">
          {!parentId !== true ? "YES" : "NO"}
        </div>
      );
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <CommentTableRowActions row={row} />
        </div>
      )
    },
  },
];
