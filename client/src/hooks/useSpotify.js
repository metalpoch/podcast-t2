import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_SPOTIFY_URL_TOKEN;

export default function useSpotify() {
  const [data, setData] = useState({});

  useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      window.history.pushState(null, null, "/");
      const code = params.get("code");
      const state = params.get("state");

      if (state !== window.sessionStorage.getItem("state")) {
        setData({ error: "state_mismatch" });
      } else {
        const options = {
          method: "POST",
          body: JSON.stringify({ code }),
        };

        fetch(URL, { ...options })
          .then((res) => res.json())
          .then((res) =>
            setData(typeof res === "string" ? JSON.parse(res) : res),
          )
          .catch((error) => {
            alert(JSON.stringify({ error, msg: error.message }));
            console.error(error);
          });
      }
    }
  }, []);

  return data;
}
