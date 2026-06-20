import { API_BASE_URL } from './config.js';

const apiClient = {
  async request(endpoint, method = 'GET', body = null, token = null) {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();
    let data = null;

    if (text) {
      if (contentType.includes('application/json')) {
        try {
          data = JSON.parse(text);
        } catch (error) {
          throw new Error('Invalid JSON response from API');
        }
      } else {
        data = text;
      }
    }

    if (!response.ok) {
      const errorMessage = data && typeof data === 'object'
        ? data.error || data.message
        : text || response.statusText;
      throw new Error(errorMessage || 'API request failed');
    }

    return data;
  },

  post(endpoint, body, token = null) {
    return this.request(endpoint, 'POST', body, token);
  },

  get(endpoint, token = null) {
    return this.request(endpoint, 'GET', null, token);
  },

  delete(endpoint, token = null) {
    return this.request(endpoint, 'DELETE', null, token);
  },
};

export default apiClient;