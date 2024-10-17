import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, Repeat } from 'lucide-react';
import { fetchSocialMediaData, analyzeContent } from '../api/socialMedia';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ContentAnalysis = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instagramData = await fetchSocialMediaData('instagram');
        const twitterData = await fetchSocialMediaData('twitter');
        const combinedData = [...instagramData, ...twitterData];
        setPosts(combinedData);
      } catch (err) {
        setError('Failed to fetch social media data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };

  const handleGenerateSimilarContent = async () => {
    if (selectedPost) {
      try {
        const analysis = await analyzeContent(selectedPost.content);
        console.log('Content analysis:', analysis);
        // TODO: Use the analysis to generate similar content
        alert('Similar content generated based on analysis');
      } catch (err) {
        setError('Failed to generate similar content');
      }
    }
  };

  const handleRepurposeContent = async () => {
    if (selectedPost) {
      try {
        const analysis = await analyzeContent(selectedPost.content);
        console.log('Content analysis for repurposing:', analysis);
        // TODO: Use the analysis to repurpose content for other platforms
        alert('Content repurposed for other platforms');
      } catch (err) {
        setError('Failed to repurpose content');
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Content Analysis</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Top Performing Posts</h2>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => handlePostSelect(post)}
              >
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.platform}</p>
                </div>
                <span className="text-sm text-indigo-600">Engagement: {post.engagement}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Post Performance</h2>
          {selectedPost ? (
            <>
              <h3 className="font-semibold mb-2">{selectedPost.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{selectedPost.platform}</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[selectedPost]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagement" fill="#8884d8" name="Engagement" />
                  <Bar dataKey="impressions" fill="#82ca9d" name="Impressions" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <button
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                  onClick={handleGenerateSimilarContent}
                >
                  <Zap className="mr-2" size={16} />
                  Generate similar content
                </button>
                <button
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                  onClick={handleRepurposeContent}
                >
                  <Repeat className="mr-2" size={16} />
                  Repurpose for other platforms
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Select a post to view its performance</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentAnalysis;