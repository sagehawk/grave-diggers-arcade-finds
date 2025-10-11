
import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_URL = 'https://api.rawg.io/api';

if (!API_KEY) {
  throw new Error('VITE_RAWG_API_KEY is not defined. Please add it to your .env file.');
}

const apiClient = axios.create({
  baseURL: API_URL,
  params: {
    key: API_KEY,
  },
});

export const getGames = async () => {
  try {
    const response = await apiClient.get('/games', { params: { genres: '51', page_size: 100, ordering: '-released' } });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

export const getGenres = async () => {
  try {
    const response = await apiClient.get('/genres');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};

export const getPlatforms = async () => {
  try {
    const response = await apiClient.get('/platforms');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    return [];
  }
};

export const getGamesByTimeframe = async (timeframe: 'today' | 'week' | 'month' | 'allTime') => {
  const now = new Date();
  let dates = '';

  switch (timeframe) {
    case 'today':
      dates = `${now.toISOString().slice(0, 10)},${now.toISOString().slice(0, 10)}`;
      break;
    case 'week':
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dates = `${lastWeek.toISOString().slice(0, 10)},${now.toISOString().slice(0, 10)}`;
      break;
    case 'month':
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      dates = `${lastMonth.toISOString().slice(0, 10)},${now.toISOString().slice(0, 10)}`;
      break;
    case 'allTime':
    default:
      break;
  }

  try {
    const params: any = {
      ordering: '-released',
      page_size: 3,
      genres: '51',
    };

    if (dates) {
      params.dates = dates;
    }

    const response = await apiClient.get('/games', { params });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching games for timeframe ${timeframe}:`, error);
    return [];
  }
};

export const getGameDetails = async (id: string) => {
  try {
    const response = await apiClient.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching game details for id ${id}:`, error);
    return null;
  }
};
