import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import api from '../../services/api';

const TimelineChart = ({ timeRange }) => {
    const [timelineData, setTimelineData] = useState([]);

    useEffect(() => {
        const fetchTimelineData = async () => {
            try {
                const response = await api.get(`/logs/timeline?range=${timeRange}`);
                setTimelineData(response.data);
            } catch (err) {
                console.error('Failed to fetch timeline data:', err);
            }
        };
        fetchTimelineData();
    }, [timeRange]);

    const chartOptions = {
        chart: {
            type: 'line',
            toolbar: { show: false },
        },
        stroke: { curve: 'smooth', width: 3 },
        xaxis: {
            type: 'datetime',
            categories: timelineData.map(item => item.date),
            labels: {
                style: {
                    colors: '#6B7280', // gray-500
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            title: { text: 'Executions' },
            labels: {
                style: {
                    colors: '#6B7280',
                    fontSize: '12px'
                }
            }
        },
        colors: ['#4CAF50', '#F44336'],
        tooltip: {
            x: { format: 'dd MMM yyyy' }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: '#374151', // gray-700
            }
        }
    };

    const chartSeries = [
        {
            name: 'Success',
            data: timelineData.map(item => item.successCount)
        },
        {
            name: 'Failed',
            data: timelineData.map(item => item.failureCount)
        }
    ];

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Execution Timeline
            </h2>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={350}
            />
        </div>
    );
};

export default TimelineChart;
