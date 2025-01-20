import './App.css'
import {useEffect, useState} from "react";
import {TableRoot} from "./components/Table/TableRoot.tsx";
import TableHeader from "./components/Table/components/TableHeader.tsx";
import {flexRender} from "@tanstack/react-table";
import TableRow from "./components/Table/components/TableRow.tsx";
import {TableHeaderRow} from "./components/Table/components/TableHeaderRow.tsx";
import {TableDataRow} from "./components/Table/components/TableDataRow.tsx";
import TableData from "./components/Table/components/TableData.tsx";
import TablePagination from "./components/Table/components/TablePagination.tsx";

const TableComponent = () => {
		const [data, setData] = useState([])
		const [paginationState, setPaginationState] = useState({
				pageIndex: 0, //initial page index
				pageSize: 20, //default page size
		});

		useEffect(() => {
				fetch(`https://pokeapi.co/api/v2/evolution-chain?offset=${paginationState.pageSize * paginationState.pageIndex}&limit=${paginationState.pageSize}`)
					.then((r) => r.json())
					.then((results) => {
							setData(results.results.map((r: { url: string }) => ({
									id: r.url.split('evolution-chain/')[1].split('/')[0],
									url: r.url
							})))
					})
		}, [paginationState]);

		return (
			<>
					<TableRoot data={data} columns={[
							{
									accessorKey: 'id',
									header: 'ID',
									size: 60,
							},
							{
									accessorKey: 'url',
									header: 'Url',
									size: 120,
									cell: info => info.getValue(),
							}
					]} dataSize={549} pagination={{
							...paginationState,
							onPaginationChange: setPaginationState
					}}>
							<>
									<thead>
									<TableRow>
											<TableHeaderRow>
													{
															(h) => <TableHeader key={h.id}>
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
													}
											</TableHeaderRow>
									</TableRow>
									</thead>
									<tbody>
											<TableRow>
												<TableDataRow>
														{(r) =>
															<TableRow>
																	{r.getVisibleCells().map((cell, index) =>
																		(
																			<TableData key={`data-${index}`}>
																					{flexRender(cell.column.columnDef.cell, cell.getContext())}
																			</TableData>
																		))}
															</TableRow>}
												</TableDataRow>
											</TableRow>
									</tbody>
									<TablePagination />
							</>
					</TableRoot>
			</>
		)
}

export default TableComponent
