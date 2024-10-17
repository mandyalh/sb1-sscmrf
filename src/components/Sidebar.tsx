import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, BarChart2, Settings, Zap, Share2, Clock, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-white w-64 h-full shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-indigo-600">OmniCreator</h1>
      </div>
      <nav className="mt-8">
        <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100">
          <Home className="mr-3" size={20} />
          Dashboard
        </Link>
        <Link to="/content-analysis" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100">
          <Zap className="mr-3" size={20} />
          Content Analysis
        </Link>
        <Link to="/scheduler" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100">
          <Clock className="mr-3" size={20} />
          Content Scheduler
        </Link>
        <Link to="/calendar" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100">
          <Calendar className="mr-3" size={20} />
          Content Calendar
        </Link>
        <Link to="/analytics" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100">
          <BarChart2 className="mr-3" size={20} />
          Analytics
        </Link>
        <Link to="/advanced-analytics" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100">
          <BarChart2 className="mr-3" size={20} />
          Advanced Analytics
        </Link>
        <Link to="/integrations" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100">
          <Share2 className="mr-3" size={20} />
          Integrations
        </Link>
        <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100">
          <Settings className="mr-3" size={20} />
          Settings
        </Link>
        <Link to="/login" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 mt-auto">
          <LogOut className="mr-3" size={20} />
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;