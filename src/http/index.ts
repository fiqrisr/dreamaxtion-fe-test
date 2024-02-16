import axios from 'axios';

import { TMDB_ACCESS_TOKEN, TMDB_BASE_API_URL } from '@/configs';

export const httpClient = axios.create({
  baseURL: TMDB_BASE_API_URL,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
  }
});
