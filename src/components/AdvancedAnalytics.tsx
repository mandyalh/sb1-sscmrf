import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdvancedAnalytics = () => {
  // Placeholder data for demonstration
  const engagementData = [
    { date: '2023-04-01', instagram: 1000, twitter: 800, tiktok: 1200 },
    { date: '2023-04-02', instagram: 1100, twitter: 900, tiktok: 1300 },
    { date: '2023-04-03', instagram: 1200, twitter: 950, tiktok: 1400 },
    { date: '2023-04-04', instagram: 1050, twitter: 1000, tiktok: 1350 },
    { date: '2023-04-05', instagram: 1300, twitter: 1100, tiktok: 1500 },
  ];

  const audienceData = [
    { name: '18-24', value: 30 },
    { name: '25-34', value: 40 },
    { name: '35-44', value: 20 },
    { name: '45+', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Advanced Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Engagement Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="instagram" stroke="#8884d8" />
              <Line type="monotone" dataKey="twitter" stroke="#82ca9d" />
              <Line type="monotone" dataKey="tiktok" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Audience Demographics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={audienceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {audienceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;