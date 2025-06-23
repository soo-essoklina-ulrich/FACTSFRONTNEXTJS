import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Header,
  Row,
  SortingState,
  Updater,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, Table } from 'lucide-react';
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
import { useMemo, useState } from 'react';
import { closestCenter, DndContext, UniqueIdentifier } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import ErrorView from '../ErrorView';
import LoadingWithoutModal from '../LoadingWithoutModal';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { cn } from '@/lib/utils';

type TableGenericType<T> = {
  data: T[] | undefined;
  columns: ColumnDef<T, any>[];
  count?: number;
  page?: number;
  SetPage?: React.Dispatch<React.SetStateAction<number>>;
  pageSize?: number;
  SetPageSize?: React.Dispatch<React.SetStateAction<number>>;
  globalFilter?: string;
  SetGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  pagination?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  renderHeaderCell?: (header: Header<T, unknown>) => React.ReactNode;
  getRowId?: (row: T, index: number) => string;
};

function DraggableRow<T>({
  row,
  getRowId,
}: {
  row: Row<T>;
  getRowId?: (row: T, index: number) => string;
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: getRowId
      ? getRowId(row.original, row.index)
      : ((row.original as { id?: string | number })?.id ?? row.id),
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map(cell => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

const TableGeneric = <T,>({
  data,
  columns,
  count,
  page,
  pageSize,
  globalFilter,
  SetPage,
  SetPageSize,
  SetGlobalFilter,
  isError,
  isLoading,
  renderHeaderCell,
  getRowId,
}: TableGenericType<T>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: page ?? 1,
        pageSize: pageSize ?? 10,
      },
    },
    getRowId: getRowId ? getRowId : (_row: T, index: number) => index.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className={'flex flex-col gap-1 '}>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : renderHeaderCell ? (
                        renderHeaderCell(header)
                      ) : (
                        <div
                          className={cn({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort(),
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <ChevronUp />,
                            desc: <ChevronDown />,
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {!isLoading ? (
              !isError ? (
                table.getRowModel().rows?.length ? (
                  table
                    .getRowModel()
                    .rows.slice(0, table.getState().pagination.pageSize)
                    .map(row => (
                      <TableRow
                        data-state={row.getIsSelected() && 'selected'}
                        className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                        style={{
                          transform: CSS.Transform.toString(null),
                          transition: '1',
                        }}
                      >
                        {row.getVisibleCells().map(cell => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <ErrorView />
              )
            ) : (
              <LoadingWithoutModal />
            )}
            {}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
