import axios from "axios";

const hostedUiDomain = process.env.REACT_APP_COGNITO_HOSTED_UI;
const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
const redirectUri = window.location.origin; // Current app URL as callback

/**
 * Handles the authentication callback from Cognito.
 * Exchanges the authorization code for tokens and stores them in localStorage.
 */
export const handleAuthCallback = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    console.error("No authorization code found in the URL.");
    return;
  }

  const tokenUrl = `${hostedUiDomain}/oauth2/token`;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  try {
    const response = await axios.post(tokenUrl, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { id_token, access_token, refresh_token } = response.data;

    // Store tokens in localStorage
    localStorage.setItem("idToken", id_token);
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);

    // Redirect to the app without query parameters
    window.history.replaceState({}, document.title, redirectUri);
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
  }
};

/**
 * Checks if the user is authenticated by verifying the presence of tokens.
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("idToken");
};