import {ReactNode, useContext, useMemo} from "react";
import {Header} from "@tanstack/react-table";
import {TableContext} from "../context/TableContext.tsx";

export const TableHeaderRow = ({ children }: { children: (h: Header<unknown, unknown>) => ReactNode }) => {
		const tableContext = useContext(TableContext)

		const {
				table
		} = tableContext

		return useMemo(
			() => (
					table.getHeaderGroups()[0].headers.map(((h) => {
								return children(h)
						}))
			),
			[children, table]
		);

}