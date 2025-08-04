import React, { useState } from "react";
import { Select, Button, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../../store/slices/logsSlice";

const LogFilters = () => {
    const [filters, setFilters] = useState({
        status: "",
        from: null,
        to: null,
        interfaceName: ""
    });
    const dispatch = useDispatch();
    const {loading}=useSelector((state)=>state.logs);

    const handleApply = () => {
        dispatch(fetchLogs({ filters }));
    };
    if(loading)return <h1>loading...</h1>

    return (
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Filter Logs</h2>
            <div className="flex flex-wrap items-center gap-4">
                <Select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    displayEmpty
                    className="min-w-[160px] bg-white"
                    size="small"
                >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="Success">Success</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                </Select>

                <DatePicker
                    label="From"
                    value={filters.from}
                    onChange={(date) => setFilters({ ...filters, from: date })}
                    slotProps={{ textField: { size: 'small', className: 'bg-white' } }}
                />

                <DatePicker
                    label="To"
                    value={filters.to}
                    onChange={(date) => setFilters({ ...filters, to: date })}
                    slotProps={{ textField: { size: 'small', className: 'bg-white' } }}
                />

                <TextField
                    label="Interface Name"
                    size="small"
                    value={filters.interfaceName}
                    onChange={(e) => setFilters({ ...filters, interfaceName: e.target.value })}
                    className="bg-white"
                />

                <Button variant="contained" color="primary" onClick={handleApply}>
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default LogFilters;
