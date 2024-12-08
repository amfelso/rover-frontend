// auth.js
const hostedUiDomain = process.env.REACT_APP_COGNITO_HOSTED_UI;
const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID; // Add this to .env
const redirectUri = window.location.origin; // Current app URL as callback

/**
 * Generates the Cognito sign-in URL.
 * @returns {string} The Hosted UI sign-in URL
 */
export const getSignInUrl = () => {
    return `${hostedUiDomain}/login?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

/**
 * Redirects the user to the Cognito sign-in page.
 */
export const handleSignIn = () => {
  const signInUrl = getSignInUrl();
  window.location.href = signInUrl;
};


/**
 * Logs the user out by clearing local authentication state and redirecting
 * to the Cognito Hosted UI logout page.
 */
export const handleSignOut = () => {
  // Clear local authentication state
  localStorage.removeItem("idToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Redirect to the Cognito Hosted UI logout page
  const logoutUrl = `${hostedUiDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = logoutUrl;
};