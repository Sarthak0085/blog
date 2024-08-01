"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "@/components/table/data-table-faced-filter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { UserBlock, UserRole } from "@prisma/client";
import { UserDataTableFacetedFilter } from "./user-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const roleOptions = [
  {
    label: "USER",
    value: UserRole.USER,
  },
  {
    label: "ADMIN",
    value: UserRole.ADMIN,
  },
];

const blockOptions = [
  {
    label: "BLOCKED",
    value: UserBlock.BLOCK,
  },
  {
    label: "UNBLOCKED",
    value: UserBlock?.UNBLOCK,
  },
];

export function UserDataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("role") && (
          <UserDataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roleOptions}
          />
        )}
        {table.getColumn("isBlocked") && (
          <DataTableFacetedFilter
            column={table.getColumn("isBlocked")}
            title="Block Status"
            options={blockOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
