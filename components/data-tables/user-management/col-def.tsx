"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-tables/column-headers";

import type { ProfileData } from "@/types/database";

export const columns: ColumnDef<ProfileData>[] = [
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="ps-2"
        column={column}
        title="First Name"
      />
    ),
    cell: ({ row }) => <div className="ps-2">{row.getValue("first_name")}</div>,
  },
  {
    accessorKey: "middle_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Middle Name" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("middle_name")) {
        return <p className="text-gray-400 italic">Undefined</p>;
      }
      return row.getValue("middle_name");
    },
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("department")) {
        return <p className="text-gray-400 italic">Undefined</p>;
      }
      return row.getValue("department");
    },
  },
  {
    accessorKey: "lgu",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LGU" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const profile = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="text-xs opacity-50">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(profile.email)}
            >
              Copy profile email
            </DropdownMenuItem>
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Edit profile</DropdownMenuItem>
            <DropdownMenuItem>Delete profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
