import React, { useEffect, useState } from 'react';
import { Zap, Repeat, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchSocialMediaData } from '../api/socialMedia';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const instagramData = await fetchSocialMediaData('instagram');
        const twitterData = await fetchSocialMediaData('twitter');
        // Process and combine data for dashboard
        setDashboardData({
          totalPosts: instagramData.length + twitterData.length,
          totalEngagement: instagramData.reduce((sum, post) => sum + post.engagement, 0) +
                           twitterData.reduce((sum, post) => sum + post.engagement, 0),
          // Add more processed data as needed
        });
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <h1 className="text-3xl font-bold mb-8">Welcome to OmniCreator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          icon={<Zap className="text-yellow-500" size={24} />}
          title="AI-Powered Analysis"
          description="Analyze your top-performing posts across platforms"
          value={dashboardData.totalPosts}
          unit="posts"
        />
        <DashboardCard
          icon={<Repeat className="text-green-500" size={24} />}
          title="Content Repurposing"
          description="Automatically adapt content for different social media platforms"
          value={dashboardData.totalEngagement}
          unit="engagements"
        />
        <DashboardCard
          icon={<TrendingUp className="text-blue-500" size={24} />}
          title="Performance Tracking"
          description="Monitor your content's performance across all channels"
          value={dashboardData.totalEngagement / dashboardData.totalPosts}
          unit="avg. engagement"
        />
      </div>
    </motion.div>
  );
};

const DashboardCard = ({ icon, title, description, value, unit }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-2xl font-bold text-indigo-600">
        {value} <span className="text-sm text-gray-500">{unit}</span>
      </div>
    </motion.div>
  );
};

export default Dashboard;