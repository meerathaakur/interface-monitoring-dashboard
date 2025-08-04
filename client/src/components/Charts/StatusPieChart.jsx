import React from 'react';
import Chart from 'react-apexcharts';

const StatusPieChart = ({ data }) => {
    const chartOptions = {
        chart: {
            type: 'donut',
            toolbar: { show: false }
        },
        labels: data.map(item => item._id),
        colors: ['#4CAF50', '#F44336', '#FFC107'],
        legend: {
            position: 'bottom',
            labels: {
                colors: '#374151', // Tailwind gray-700
                useSeriesColors: false
            }
        },
        dataLabels: { enabled: false },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '16px',
                            color: '#6B7280' // Tailwind gray-500
                        },
                        value: {
                            show: true,
                            fontSize: '20px',
                            color: '#111827' // Tailwind gray-900
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '14px',
                            color: '#374151',
                            formatter: () =>
                                data.reduce((sum, item) => sum + item.count, 0)
                        }
                    }
                }
            }
        }
    };

    const chartSeries = data.map(item => item.count);

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Status Distribution
            </h2>
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="donut"
                height={300}
            />
        </div>
    );
};

export default StatusPieChart;
