import './App.css'
import Table from "./components/Table/Table.tsx";
import {useEffect, useState} from "react";

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
					<Table
						columns={[
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
						]}
						data={data}
						emptyMessage=''
						pagination={{
								onChange: setPaginationState,
								/**
									* @info the data size should be known beforehand
									* */
								dataSize: 549,
								...paginationState
						}}
					/>
			</>
		)
}

export default TableComponent
