import React from "react";
import Chart from "react-apexcharts";

const SummaryChart = ({ data }) => {
    const chartOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false }
        },
        xaxis: {
            categories: data.map(item => item._id),
            title: { text: "Status", style: { fontSize: "14px" } },
            labels: { style: { fontSize: "12px" } }
        },
        yaxis: {
            title: { text: "Count", style: { fontSize: "14px" } }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "40%"
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: "12px"
            }
        },
        colors: ["#3b82f6"],
        title: {
            text: "Log Summary by Status",
            align: "center",
            style: { fontSize: "18px", fontWeight: "bold" }
        }
    };

    const chartSeries = [
        {
            name: "Count",
            data: data.map(item => item.count)
        }
    ];

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl mx-auto">
            <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
            />
        </div>
    );
};

export default SummaryChart;
