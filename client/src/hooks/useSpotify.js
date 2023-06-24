import { useState, useEffect } from "react";

export default function useSpotify() {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const data = {
        code: params.get("code"),
        state: params.get("state"),
      };

      if (data.state !== window.sessionStorage.getItem("state")) {
        setError({ error: "state_mismatch" });
      }

      window.history.pushState(null, null, "/");
      const url = import.meta.env.VITE_SPOTIFY_URL_TOKEN;
      const options = {
        method: "POST",
        body: JSON.stringify(data),
      };

      fetch(url, { ...options })
        .then((res) => res.json())
        .then(() => setIsLogin(true))
        .catch((error) => setError(error));
    }
  }, []);

  return { isLogin, error };
}
