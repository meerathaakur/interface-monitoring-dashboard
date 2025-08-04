import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchLogs = createAsyncThunk(
    "logs/fetchLogs",
    async ({ page = 1, limit = 50, filters = {} }) => {
        const response = await api.get("/logs", {
            params: { page, limit, ...filters }
        })
        return response.data;
    }
)

export const fetchSummary = createAsyncThunk(
    "logs/fetchSummary",
    async (range = "24h") => {
        const response = await api.get("/logs/summary", { params: { range } })
        return response.data
    }
)

export const fetchTimeline = createAsyncThunk(
    "logs/fetchTimeline",
    async (timeRange) => {
        const response = await api.get(`/logs/timeline?range=${timeRange}`);
        return response.data;
    }
)

const logsSlice = createSlice({
    name: "logs",
    initialState: {
        logs: [],
        total: 0,
        summary: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Fetch Logs
            .addCase(fetchLogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.logs = action.payload.logs;
                state.total = action.payload.totalLogs;
                state.loading = false;
            })
            .addCase(fetchLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch Summary
            .addCase(fetchSummary.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSummary.fulfilled, (state, action) => {
                state.summary = action.payload;
                state.loading = false;
            })
            .addCase(fetchSummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch Timeline
            .addCase(fetchTimeline.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTimeline.fulfilled, (state, action) => {
                state.timeline = action.payload;
                state.loading = false;
            })
            .addCase(fetchTimeline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
})

export default logsSlice.reducer;