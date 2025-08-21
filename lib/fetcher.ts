const BASE_URL = '/api/proxy';

export const fetcher = async <T>(url: string, options: RequestInit = {}) => {
  const response = await fetch(BASE_URL + url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    ...options,
  });
  const result = await response.json();
  if (result.code !== "200") {
    throw new Error(result.msg);
  }
  return result.data as T;
};