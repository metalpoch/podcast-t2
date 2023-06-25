import { useState, useEffect } from "react";

const SPOTIFY_URL_TOKEN =
  import.meta.env.VITE_SPOTIFY_URL_TOKEN || process.env.SPOTIFY_URL_TOKEN;

export default function useSpotify() {
  const [data, setData] = useState({});

  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      window.history.pushState(null, null, "/");

      const data = {
        code: params.get("code"),
        state: params.get("state"),
      };

      if (data.state !== window.sessionStorage.getItem("state")) {
        setData({ error: "state_mismatch" });
      } else {
        const url = SPOTIFY_URL_TOKEN;
        const options = {
          method: "POST",
          body: JSON.stringify(data),
        };

        fetch(url, { ...options })
          .then((res) => res.json())
          .then((res) =>
            setData(typeof res === "string" ? JSON.parse(res) : res)
          )
          .catch((error) => {
            alert(JSON.stringify(error));
            console.error(error);
          });
      }
    }
  }, []);

  return data;
}
