"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { SavedPostDataTableFacetedFilter } from "./saved-post-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={
            ((table.getColumn("user")?.getFilterValue() as string) ||
              (table.getColumn("blog")?.getFilterValue() as string)) ??
            ""
          }
          onChange={(event) =>
            table.getColumn("user")?.setFilterValue(event.target.value) ||
            table.getColumn("blog")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <LikeDataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roleOptions}
          />
        )}
        {table.getColumn("priority") && (
          <LikeDataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={blockOptions}
          />
        )} */}
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
