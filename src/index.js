import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { handleAuthCallback, isAuthenticated } from './authCallback';
import { handleSignIn } from './auth';

const initializeApp = async () => {
  // Handle the callback when redirected from Cognito
  await handleAuthCallback();

  // Check if the user is authenticated
  if (!isAuthenticated()) {
    handleSignIn(); // Redirects to the Hosted UI if not logged in
  } else {
    // Render the app if authenticated
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

// Initialize the app
initializeApp();