import {createContext} from "react";
import {RowData, Table} from "@tanstack/react-table";

type TableContextProps<T extends RowData> = {
		table: Table<T>,
		paginationState: {
				pageIndex: number,
				pageSize: number
		}
}

export const TableContext = createContext<TableContextProps<RowData>>({
		table: {} as Table<RowData>,
		paginationState: {} as {
				pageIndex: number,
				pageSize: number
		}
});