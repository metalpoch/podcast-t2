const SPOTIFY_CLIENT_ID =
  import.meta.env.VITE_SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID;

const SPOTIFY_SCOPE =
  import.meta.env.VITE_SPOTIFY_SCOPE || process.env.SPOTIFY_SCOPE;

const SPOTIFY_REDIRECT =
  import.meta.env.VITE_SPOTIFY_URL_REDIRECT || process.env.SPOTIFY_CLIENT_ID;

export const hexToken = (len) => {
  const randomArray = new Uint8Array(len);
  window.crypto.getRandomValues(randomArray);
  return Array.from(randomArray)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const authURL = (hexToken) => {
  const url = new URL(import.meta.env.VITE_SPOTIFY_AUTH_URL);
  const params = new URLSearchParams();
  params.append("response_type", "code");
  params.append("client_id", SPOTIFY_CLIENT_ID);
  params.append("redirect_uri", SPOTIFY_REDIRECT);
  params.append("scope", SPOTIFY_SCOPE);
  params.append("state", hexToken);
  url.search = params.toString();
  return url.href;
};
