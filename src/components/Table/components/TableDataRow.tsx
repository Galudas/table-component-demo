import {ReactNode, useContext, useMemo} from "react";
import {Row} from "@tanstack/react-table";
import {TableContext} from "../context/TableContext.tsx";

export const TableDataRow = ({ children }: { children: (h: Row<unknown>) => ReactNode }) => {
		const tableContext = useContext(TableContext)

		const {
				table
		} = tableContext

		const { rows } = table.getRowModel()

		return useMemo(
			() => (
				rows.map(((r) => {
						return children(r)
				}))
			),
			[children, rows]
		);

}