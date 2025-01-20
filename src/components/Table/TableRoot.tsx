import {ReactNode} from "react";
import {
		ColumnDef,
		getCoreRowModel, OnChangeFn, PaginationState, RowData, Table,
		useReactTable
} from "@tanstack/react-table";
import {TableOptions} from "@tanstack/table-core";
import {TableContext} from "./context/TableContext.tsx";

export const TableRoot = <T extends { [key: string]: unknown }>({
	 data,
		columns,
	 dataSize,
	 tableOptions,
		pagination,
		children,
}: {
		data: Array<T>,
		columns: Array<ColumnDef<T> & {
				accessorKey: string
				header: ReactNode
		}>,
		dataSize: number,
		tableOptions?: TableOptions<T>
		pagination?: {
				pageIndex: number,
				pageSize: number
				onPaginationChange: OnChangeFn<PaginationState>
		}
		children: ReactNode
}) => {

		const {
				onPaginationChange,
			...paginationState
		} = pagination ?? {
				pageIndex: 0,
				pageSize: 25,
				onPaginationChange: () => {}
		}

		const table = useReactTable({
				data,
				columns,
				pageCount: Math.ceil(dataSize / 25),
				getCoreRowModel: getCoreRowModel(),
				debugTable: true,
				// pagination on the server
				manualPagination: true,
				onPaginationChange,
				state: {
						pagination: paginationState,
				},
				...tableOptions,
		})

		return (
					<TableContext.Provider value={{
							table: table as Table<RowData>,
							paginationState
					}}>
							<table>
									{children}
							</table>
					</TableContext.Provider>
		);
};

export default TableRoot;
