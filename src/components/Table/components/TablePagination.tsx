import {Table} from "@tanstack/react-table";

type TablePaginationProps<TData> = {
	table: Table<TData>
	pageSizes?: Array<number>
}

const TablePagination = <T extends { [key: string]: unknown }>({
	table,
	pageSizes = [10, 20, 30, 40, 50]
}: TablePaginationProps<T>) => {

	return(
		<>
				<button
					onClick={() => table.firstPage()}
					disabled={!table.getCanPreviousPage()}
				>
						{'<<'}
				</button>
				<button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
						{'<'}
				</button>
				<button
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
						{'>'}
				</button>
				<button
					onClick={() => table.lastPage()}
					disabled={!table.getCanNextPage()}
				>
						{'>>'}
				</button>
				<select
					value={table.getState().pagination.pageSize}
					onChange={e => {
							table.setPageSize(Number(e.target.value))
					}}
				>
						{pageSizes.map(pageSize => (
							<option key={pageSize} value={pageSize}>
									{pageSize}
							</option>
						))}
				</select>
		</>
	)
}

export default TablePagination