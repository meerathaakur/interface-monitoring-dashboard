import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummary } from '../store/slices/logsSlice';
import SummaryChart from '../components/Charts/SummaryChart';
import StatusPieChart from '../components/Charts/StatusPieChart';
import TimelineChart from '../components/Charts/TimelineChart';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { summary } = useSelector((state) => state.logs);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    dispatch(fetchSummary(timeRange));
  }, [dispatch, timeRange]);

  const successCount = summary.find(item => item._id === 'Success')?.count || 0;
  const failureCount = summary.find(item => item._id === 'Failed')?.count || 0;
  const total = successCount + failureCount;
  const successRate = total > 0 ? Math.round((successCount / total) * 100) : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Interface Health Dashboard
        </h1>
        <div>
          <Link to="/logs"><button className=' bg-gray-500 text-white hover:bg-gray-600 cursor-pointer px-4 py-2 rounded-md mr-4'>Logs Table</button></Link>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">Total Executions</p>
          <h2 className="text-2xl font-semibold text-gray-800">{total}</h2>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">Success Rate</p>
          <h2 className={`text-2xl font-semibold ${successRate > 90 ? 'text-green-600' : 'text-red-600'}`}>
            {successRate}%
          </h2>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">Successful</p>
          <h2 className="text-2xl font-semibold text-green-600">{successCount}</h2>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-sm text-gray-500 mb-1">Failed</p>
          <h2 className="text-2xl font-semibold text-red-600">{failureCount}</h2>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Success vs. Failures</h3>
          <SummaryChart data={summary} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Status Distribution</h3>
          <StatusPieChart data={summary} />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Timeline Trend</h3>
        <TimelineChart timeRange={timeRange} />
      </div>
    </div>
  );
};

export default Dashboard;
