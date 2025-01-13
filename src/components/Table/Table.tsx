import TableData from './components/TableData';
import {ReactNode, useMemo} from "react";
import TableRow from "./components/TableRow.tsx";
import TableHeader from "./components/TableHeader.tsx";
import {
		ColumnDef,
		flexRender,
		getCoreRowModel,
		useReactTable
} from "@tanstack/react-table";
import TablePagination from "./components/TablePagination.tsx";
import {TableOptions} from "@tanstack/table-core";

type Table<TData> = {
		columns: Array<ColumnDef<TData> & {
				accessorKey: string
				header: ReactNode
		}>;
		data: Array<TData>;
		emptyMessage: string;
		isLoading?: boolean;
		pagination?: {
				pageSize: number,
				// @Todo: Fix type
				onChange: any,
				pageIndex: number,
				dataSize: number
				tableOptions?: TableOptions<TData>
		},
}

const Table = <T extends { [key: string]: unknown }>({
 data,
 emptyMessage,
 columns,
 isLoading,
	pagination
}: Table<T>) => {
		const {
				onChange,
				dataSize,
			 tableOptions,
				...pageState
		} = pagination || {
				onChange: () => {},
				dataSize: 0,
				pageIndex: 0,
				pageSize: 25,
				tableOptions: {}
		}

		const table = useReactTable({
				data,
				columns,
				pageCount: Math.ceil(dataSize / pageState.pageSize),
				getCoreRowModel: getCoreRowModel(),
				debugTable: true,
				// pagination on the server
				manualPagination: true,
				onPaginationChange: onChange,
				state: {
						pagination: pageState,
				},
				...tableOptions,
		})

		const { rows } = table.getRowModel()

		/**
			* No multiple headers
			* */
		const headers = table.getHeaderGroups()[0].headers

		const renderedHeaders = useMemo(
			() => (
				<TableRow>
						{headers.map((h => {
							return(
								<TableHeader key={h.id}>
												<div
													{...{
															className: h.column.getCanSort()
																? 'cursor-pointer select-none'
																: '',
															onClick: h.column.getToggleSortingHandler(),
													}}
												>
														{flexRender(
															h.column.columnDef.header,
															h.getContext()
														)}
												</div>
								</TableHeader>
							)
						}))}
				</TableRow>
			),
			[headers]
		);

		const renderedData = useMemo(
			() =>
				rows.map((row, index) => (
					<TableRow key={`table_row_${index}`}>
							{row.getVisibleCells().map((cell) =>
								(
									<TableData key={`data-${index}`}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableData>
								))}
					</TableRow>
				)),
			[rows]
		);

		const isNoElements = rows?.length === 0;

		return (
			<>
					<table>
							<thead>{renderedHeaders}</thead>
							{isLoading ? (
								<tbody></tbody>
							) : (
								<tbody>{renderedData}</tbody>
							)}
					</table>
					{isNoElements && !isLoading && (
						<span>
        {emptyMessage}
      </span>
					)}
					{pagination !== undefined ? <TablePagination table={table} /> : undefined}
			</>
		);
};

export default Table;
