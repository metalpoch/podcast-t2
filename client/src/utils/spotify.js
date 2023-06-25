const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

const SPOTIFY_REDIRECT = import.meta.env.VITE_SPOTIFY_URL_REDIRECT;

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
	params.append("scope", "user-read-private user-read-email");
	params.append("state", hexToken);
	url.search = params.toString();
	return url.href;
};
