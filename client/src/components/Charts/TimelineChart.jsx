import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { fetchTimeline } from '../../store/slices/logsSlice';
import { useDispatch, useSelector } from 'react-redux';

const TimelineChart = ({ timeRange }) => {
    const dispatch = useDispatch();
    const { timeline = [], loading } = useSelector((state) => state.logs);

    useEffect(() => {
        dispatch(fetchTimeline(timeRange));
    }, [dispatch, timeRange]);

    // Filter invalid entries
    const validTimeline = timeline.filter(
        (item) =>
            item &&
            typeof item.date === 'string' &&
            typeof item.successCount === 'number' &&
            typeof item.failureCount === 'number'
    );

    const chartOptions = {
        chart: {
            type: 'line',
            toolbar: { show: false },
        },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: {
            type: 'datetime',
            categories: validTimeline.map((item) => item.date),
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            title: { text: 'Executions' },
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '12px',
                },
            },
        },
        colors: ['#4CAF50', '#F44336'],
        tooltip: {
            x: { format: 'dd MMM yyyy' },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#374151',
            },
        },
    };

    const chartSeries = [
        {
            name: 'Success',
            data: validTimeline.map((item) => item.successCount),
        },
        {
            name: 'Failed',
            data: validTimeline.map((item) => item.failureCount),
        },
    ];

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Execution Timeline
            </h2>
            {loading ? (
                <p className="text-center text-gray-500">Loading chart...</p>
            ) : validTimeline.length > 0 ? (
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="line"
                    height={350}
                />
            ) : (
                <p className="text-center text-gray-500">No timeline data available.</p>
            )}
        </div>
    );
};

export default TimelineChart;
