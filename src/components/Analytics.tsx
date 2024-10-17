import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Placeholder data for demonstration
  const data = [
    { name: 'Instagram', posts: 20, engagement: 1500 },
    { name: 'TikTok', posts: 15, engagement: 2500 },
    { name: 'Twitter', posts: 30, engagement: 1000 },
    { name: 'YouTube', posts: 5, engagement: 3000 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Content Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="posts" fill="#8884d8" name="Posts" />
            <Bar yAxisId="right" dataKey="engagement" fill="#82ca9d" name="Engagement" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;