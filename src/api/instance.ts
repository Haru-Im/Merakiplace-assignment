import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
});

export const apiKeyParams = {
  'api-key': process.env.EXPO_PUBLIC_API_KEY,
};
