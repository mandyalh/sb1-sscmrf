import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    username: 'johndoe',
    email: 'johndoe@example.com',
    notifications: true,
    darkMode: false,
    language: 'en',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement settings update logic
    console.log('Updated settings:', settings);
    alert('Settings updated successfully!');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={settings.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={settings.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notifications" className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                checked={settings.notifications}
                onChange={handleInputChange}
              />
              <span className="ml-2 text-sm text-gray-700">Enable notifications</span>
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="darkMode" className="flex items-center">
              <input
                type="checkbox"
                id="darkMode"
                name="darkMode"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                checked={settings.darkMode}
                onChange={handleInputChange}
              />
              <span className="ml-2 text-sm text-gray-700">Dark mode</span>
            </label>
          </div>
          <div className="mb-6">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
            <select
              id="language"
              name="language"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={settings.language}
              onChange={handleInputChange}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            <Save className="mr-2" size={16} />
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;