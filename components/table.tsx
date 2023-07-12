import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnResizeMode,
} from "@tanstack/react-table";
/*
https://tanstack.com/table/v8/docs/api/core/table
*/

import { useReducer, useState } from "react";

function Table<TData extends unknown>({
  dataSource,
  columns,
}: {
  dataSource?: TData[];
  columns: any[];
}) {
  const [data, setData] = useState(() => (dataSource ? [...dataSource] : []));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const isDisplayColumn = (value: string) => "checkbox" === value;
const Checkbox = () => (
  <div
    style={{
      textAlign: "center",
      width: 40,
    }}>
    <input type="checkbox"></input>
  </div>
);

function ResizeTable<TData extends unknown>({
  dataSource,
  columns,
}: {
  dataSource?: TData[];
  columns: any[];
}) {
  const [data, setData] = useState(() => (dataSource ? [...dataSource] : []));

  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugColumns: true,
  });

  console.log(table, data);
  return (
    <div>
      <table
        style={{
          width: table.getCenterTotalSize(),
        }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  <div
                    style={{
                      width: isDisplayColumn(header.id)
                        ? undefined
                        : header.getSize(),
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {isDisplayColumn(header.id) || (
                      <div
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                        }}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  <div
                    style={{
                      width: cell.id.includes("checkbox")
                        ? undefined
                        : cell.column.getSize(),
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => rerender()}>Rerender</button>
      <pre>
        {JSON.stringify(
          {
            columnSizing: table.getState().columnSizing,
            columnSizingInfo: table.getState().columnSizingInfo,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}

Table.Resize = ResizeTable;

export default Table;
