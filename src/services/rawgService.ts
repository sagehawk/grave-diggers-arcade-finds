
import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const API_URL = 'https://api.rawg.io/api';

if (!API_KEY || API_KEY === 'placeholder') {
  console.warn('VITE_RAWG_API_KEY is not defined or is a placeholder. RAWG features will not work. Add it to your .env.local file or Amplify environment variables.');
}

const apiClient = axios.create({
  baseURL: API_URL,
  params: {
    key: API_KEY,
  },
});

// ESRB rating IDs to EXCLUDE (mature/adult only content):
// 4 = Mature (17+), 5 = Adults Only (18+)
// We INCLUDE: 1 = Everyone, 2 = Everyone 10+, 3 = Teen
const SAFE_ESRB_RATINGS = '1,2,3'; // Everyone, Everyone 10+, Teen

export const getGames = async () => {
  try {
    const response = await apiClient.get('/games', {
      params: {
        genres: '51', // Indie
        page_size: 40,
        ordering: '-metacritic', // Best rated first
        metacritic: '70,100', // Only games rated 70+ on Metacritic
        esrb_rating: SAFE_ESRB_RATINGS,
      }
    });
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
      ordering: '-rating', // Best user-rated first
      page_size: 3,
      genres: '51', // Indie
      esrb_rating: SAFE_ESRB_RATINGS,
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
