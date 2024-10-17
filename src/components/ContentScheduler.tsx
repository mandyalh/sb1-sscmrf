import React, { useState } from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yup } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { schedulePost } from '../api/socialMedia';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  platform: Yup.string().required('Platform is required'),
  date: Yup.date().required('Date is required').min(new Date(), 'Date must be in the future'),
  time: Yup.string().required('Time is required'),
  content: Yup.string().required('Content is required').max(280, 'Content must be 280 characters or less'),
});

const ContentScheduler = () => {
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yup(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const scheduledTime = `${data.date}T${data.time}:00Z`;
      const response = await schedulePost(data.platform, {
        title: data.title,
        content: data.content,
      }, scheduledTime);
      setScheduledPosts([...scheduledPosts, response]);
      reset();
    } catch (err) {
      setError('Failed to schedule post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Content Scheduler</h1>
      {error && <ErrorMessage message={error} />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="card-title">Scheduled Posts</h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ul className="space-y-4">
              {scheduledPosts.map((post) => (
                <li key={post.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-600">{post.platform}</p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="text-gray-400 mr-2" size={16} />
                    <span className="text-sm text-gray-600 mr-4">{post.scheduledTime.split('T')[0]}</span>
                    <Clock className="text-gray-400 mr-2" size={16} />
                    <span className="text-sm text-gray-600">{post.scheduledTime.split('T')[1].slice(0, 5)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card">
          <h2 className="card-title">Schedule New Post</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                {...register('title')}
                className="input"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform</label>
              <select
                id="platform"
                {...register('platform')}
                className="input"
              >
                <option value="">Select a platform</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
              {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                {...register('date')}
                className="input"
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                {...register('time')}
                className="input"
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                id="content"
                {...register('content')}
                className="input"
                rows={4}
              ></textarea>
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Plus className="mr-2" size={16} />
                  Schedule Post
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentScheduler;