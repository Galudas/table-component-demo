import {useContext} from "react";
import {TableContext} from "../context/TableContext.tsx";

type TablePaginationProps = {
	pageSizes?: Array<number>
}

const TablePagination = ({
	pageSizes = [10, 20, 30, 40, 50]
}: TablePaginationProps) => {
	const { table } = useContext(TableContext)

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