import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

const ContentCalendar = () => {
  // Placeholder data for demonstration
  const scheduledPosts = [
    { id: 1, title: 'Instagram Post', date: '2023-04-15', platform: 'Instagram' },
    { id: 2, title: 'TikTok Video', date: '2023-04-16', platform: 'TikTok' },
    { id: 3, title: 'Twitter Thread', date: '2023-04-17', platform: 'Twitter' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Content Calendar</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <CalendarIcon className="text-indigo-600 mr-2" size={24} />
          <h2 className="text-xl font-semibold">Upcoming Posts</h2>
        </div>
        <ul className="space-y-4">
          {scheduledPosts.map((post) => (
            <li key={post.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.platform}</p>
              </div>
              <span className="text-sm text-indigo-600">{post.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentCalendar;