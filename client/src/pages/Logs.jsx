import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogs } from "../store/slices/logsSlice";
import { DataGrid } from "@mui/x-data-grid";
import LogFilters from "../components/Filters/LogFilters";
import { Box } from "@mui/material";
import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";

const Logs = () => {
    const dispatch = useDispatch();
    const { logs, loading, total } = useSelector((state) => state.logs);

    useEffect(() => {
        dispatch(fetchLogs({ page: 1, limit: 20 }));
    }, [dispatch]);

    const columns = useMemo(() =>
        [
            { field: "interfaceName", headerName: "Interface Name", width: 200 },
            { field: "timestamp", headerName: "Timestamp", width: 200 },
            { field: "status", headerName: "Status", width: 150 },
            { field: "message", headerName: "Message", width: 400 },
        ], []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <Link to="/"><button className="flex items-center bg-gray-500 text-white hover:bg-gray-600 cursor-pointer px-4 py-2 rounded-md mr-4"><ArrowLeft className="mr-2" /> Back</button></Link>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Log Records</h1>
                <LogFilters />
                <div className="bg-white rounded-2xl shadow-md p-4">
                    <Box style={{ height: 600, width: "100%" }}>
                        <DataGrid
                            getRowId={(row) => row._id}
                            rows={logs}
                            columns={columns}
                            loading={loading}
                            pagination
                            paginationMode="server"
                            rowCount={total}
                            rowsPerPageOptions={[25, 50, 100, 200]}
                            disableVirtualization={false}
                            rowHeight={50}
                            className="rounded-lg"
                            pageSizeOptions={[5]}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 20,
                                    },
                                },
                            }}
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default Logs;


