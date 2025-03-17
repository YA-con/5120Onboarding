class HttpClient {
    static async request(url, method = 'GET', body = null, headers = {}) {
        // 默认请求头
        const defaultHeaders = {
          'Content-Type': 'application/json',
        };
    
        const requestHeaders = {
          ...defaultHeaders,
          ...headers,
        };
    
        const options = {
          method,
          headers: requestHeaders,
        };
    
        if (body && (method === 'POST' || method === 'PUT')) {
          options.body = JSON.stringify(body);
        }
    
        try {
          const response = await fetch(`https://five120onboarding-1.onrender.com${ url }`, options);
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Fetch error:', error);
          throw error;
        }
    }

    // get
    static async get(url, headers = {}) {
        return this.request(url, 'GET', null, headers);
    }    
}

export default HttpClient