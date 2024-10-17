import React, { useState } from 'react';
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const SocialMediaIntegration = () => {
  const [connectedPlatforms, setConnectedPlatforms] = useState([]);

  const platforms = [
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
    { name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
    { name: 'YouTube', icon: Youtube, color: 'bg-red-500' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
  ];

  const handleConnect = (platform) => {
    // TODO: Implement actual OAuth flow for each platform
    console.log(`Connecting to ${platform}`);
    setConnectedPlatforms([...connectedPlatforms, platform]);
  };

  const handleDisconnect = (platform) => {
    console.log(`Disconnecting from ${platform}`);
    setConnectedPlatforms(connectedPlatforms.filter(p => p !== platform));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Social Media Integrations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map((platform) => (
          <div key={platform.name} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <platform.icon className={`${platform.color} text-white p-2 rounded-full mr-3`} size={40} />
              <h2 className="text-xl font-semibold">{platform.name}</h2>
            </div>
            {connectedPlatforms.includes(platform.name) ? (
              <button
                onClick={() => handleDisconnect(platform.name)}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => handleConnect(platform.name)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaIntegration;