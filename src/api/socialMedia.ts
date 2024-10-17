import axios from 'axios';

const API_BASE_URL = 'https://api.omnicreator.com'; // Replace with your actual API base URL

export const fetchSocialMediaData = async (platform: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/social-media/${platform}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${platform} data:`, error);
    throw error;
  }
};

export const postContent = async (platform: string, content: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/social-media/${platform}/post`, content);
    return response.data;
  } catch (error) {
    console.error(`Error posting to ${platform}:`, error);
    throw error;
  }
};

export const schedulePost = async (platform: string, content: any, scheduledTime: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/social-media/${platform}/schedule`, {
      content,
      scheduledTime,
    });
    return response.data;
  } catch (error) {
    console.error(`Error scheduling post for ${platform}:`, error);
    throw error;
  }
};

export const analyzeContent = async (content: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/content/analyze`, { content });
    return response.data;
  } catch (error) {
    console.error('Error analyzing content:', error);
    throw error;
  }
};