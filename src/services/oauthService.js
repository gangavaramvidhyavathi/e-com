// OAuth Service for authentication
// This demonstrates OAuth flow pattern - integrate with actual OAuth provider

const OAUTH_CONFIG = {
  clientId: 'your_client_id',
  redirectUri: 'http://localhost:5173/auth/callback',
  authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth', // Example with Google
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  scope: 'openid profile email'
};

export const initiateOAuthLogin = () => {
  // In a real application, redirect to OAuth provider
  const oauthUrl = `${OAUTH_CONFIG.authEndpoint}?` + 
    `client_id=${OAUTH_CONFIG.clientId}&` +
    `redirect_uri=${encodeURIComponent(OAUTH_CONFIG.redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(OAUTH_CONFIG.scope)}`;
  
  window.location.href = oauthUrl;
};

export const handleOAuthCallback = async (code) => {
  try {
    // In a real app, exchange code for token with your backend
    const response = await fetch('/api/auth/oauth/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('OAuth callback error:', error);
    throw error;
  }
};

export const mockOAuthLogin = (email = 'user@example.com') => {
  // Mock OAuth response for demo purposes
  const mockUser = {
    id: 'oauth_' + Math.random().toString(36).substr(2, 9),
    email,
    name: email.split('@')[0],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
  };

  const mockToken = 'mock_oauth_token_' + Math.random().toString(36).substr(2, 20);
  
  return { user: mockUser, token: mockToken };
};
