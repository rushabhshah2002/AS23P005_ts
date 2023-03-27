import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import "./Table.scss";
import { Button } from "@mui/material";
import { ApiHelper } from "../../utils/ApiHelper";
import { tokenContext } from "../../context/tokenContext";
import { userContext } from "../../context/usercontext";
import useGetData from "../../hooks/useGetProfileData";
import { toast } from "react-toastify";
const CertificateTable = React.memo(({ data }: {data : any}) => {
	const [rowSelection, setRowSelection] = React.useState({});
	const { user, setUser } = React.useContext(userContext);
	const { token } = React.useContext(tokenContext);
	useGetData(true, user, setUser, token);
	const columns = useMemo(
		() => [
			{
				id: "VID",
				header: "Certificate ID",
				accessorKey: "VID",
				size: 150,
				Cell: ({ renderedCellValue, row }: any) => (
					<div className="text-[1.25rem] w-full flex items-center justify-center scroll">
						<span className="w-full text-center">{renderedCellValue}</span>
					</div>
				),
			},
			{
				id: "name",
				header: "Name",
				accessorKey: "name",
				size: 150,
				Cell: ({ renderedCellValue, row }: any) => (
					<div className="text-[1.25rem] w-full flex items-center justify-center scroll">
						<span className="w-full text-center">{renderedCellValue}</span>
					</div>
				),
			},
			{
				id: "recemail",
				header: "Receiver Email",
				accessorKey: "email",
				size: 150,
				Cell: ({ renderedCellValue, row }: any) => (
					<div className="text-[1.25rem] flex w-full items-center justify-center scroll overflow-x-scroll">
						<span className="w-full text-center">{renderedCellValue}</span>
					</div>
				),
			},
			{
				id: "recphone",
				header: "Receiver Phone",
				accessorKey: "phoneNo",
				size: 150,
				Cell: ({ renderedCellValue, row }: any) => (
					<div className="text-[1.25rem] w-full flex items-center justify-center scroll">
						<span className="w-full text-center">{renderedCellValue}</span>
					</div>
				),
			},
			{
				id: "repEmail",
				header: "Representative Email",
				accessorKey: "repEmail",
				size: 150,
				Cell: ({ renderedCellValue, row }: any) => (
					<div className="text-[1.25rem] flex items-center w-full justify-center scroll">
						<span className="w-full text-center">{renderedCellValue}</span>
					</div>
				),
			},
			{
				id: "instName",
				header: "Institute Name",
				accessorKey: "instName",
				size: 150,
				Cell: ({ renderedCellValue, row }: any) => (
					<div className="text-[1.25rem] w-full flex items-center justify-center scroll">
						<span className="w-full text-center">{renderedCellValue}</span>
					</div>
				),
			},
			{
				id: "Status",
				header: "Status",
				accessorKey: "isIssued",
				size: 80,
				Cell: ({ renderedCellValue, row }: any) => (
					<div className="text-[1.25rem] w-full flex items-center justify-center scroll">
						<span className="w-full text-center">{renderedCellValue === 1 ? "Issued" : "Pending"}</span>
					</div>
				),
			},

			{
				id: "instEmail",
				header: "Institute Email",
				accessorKey: "instEmail",
				size: 150,
				Cell: ({ renderedCellValue, row }: any) => (
					<div className="text-[1.25rem] w-full flex items-center justify-center scroll">
						<span className="w-full text-center">{renderedCellValue}</span>
					</div>
				),
			},
			{
				id: "certificate",
				header: "View",
				accessorKey: "Link",
				size: 80,
				Cell: ({ renderedCellValue, row }: any) => (
					<div className="text-[1.25rem] w-full flex items-center justify-center scroll">
						<button onClick={() => window.open(`${renderedCellValue}`)}>open</button>
					</div>
				),
			},
		],
		[]
	);

	return (
		<MaterialReactTable
			columns={columns}
			data={data}
			enableColumnFilterModes
			enableColumnOrdering
			enablePinning
			enableRowSelection
			enableRowVirtualization
			onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
			state={{ rowSelection }}
			getRowId={(row: any) => row.CID}
			enableColumnDragging={false}
			positionToolbarAlertBanner="bottom"
			initialState={{ columnVisibility: { recphone: false, repEmail: false, instEmail: false } }}
			muiTableHeadCellFilterTextFieldProps={{
				sx: {
					color: "#fff",
					padding: "0.5rem",
					backgroundColor: "#E0F2FE",
				},
			}}
			muiSelectAllCheckboxProps={{
				sx: {
					color: "#fff",
				},
			}}
			muiTableHeadCellColumnActionsButtonProps={{
				sx: {
					color: "#fff",
				},
			}}
			muiTableHeadCellProps={{
				sx: {
					fontWeight: "bold",
					fontSize: "1.5rem",
					backgroundColor: "#008080",
					color: "#fff",
					padding: "0.5rem",
					border: "1px solid #008080",
				},
			}}
			muiTableBodyProps={{
				sx: {
					//stripe the rows, make odd rows a darker color
					maxHeight: "80vh",
					"& tr:nth-of-type(odd)": {
						backgroundColor: "#FFF",
					},
					"& tr:nth-of-type(even)": {
						backgroundColor: " rgb(226,232,240)",
					},
				},
			}}
			renderTopToolbarCustomActions={({ table }) => {
				const handleContact = async () => {
					/*table.getSelectedRowModel().flatRows.map(async (row) => {
						alert("contact " + row.getValue("name"));					
					});*/
					let {data,error,loaded}=await ApiHelper("create/updatestatus",{CIDS:Object.keys(rowSelection),token:token, email:user.email, instEmail:user.instEmail}, []);
					console.log(data,error,loaded);
					if(error){
						toast.error("Some error occured");
					}
					else{
						toast.success("Cerificate has issued successfully!");
					}
				};

				return (
					<div style={{ display: "flex", gap: "0.5rem" }}>
						<Button color="info" disabled={Object.keys(rowSelection).length == 0} onClick={handleContact} variant="contained">
							Issue
						</Button>
					</div>
				);
			}}
		/>
	);
});
export default CertificateTable;
