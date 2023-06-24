import { useState, useEffect } from "react";

export default function useFetch({ url, options }) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  if (url === undefined && options == undefined) ({ response, loading, error });

  useEffect(() => {
    const abortController = new AbortController();
    fetch(url, { ...options, signal: abortController.signal })
      .then((res) => res.json())
      .then((res) => setResponse(res))
      .catch((error) => {
        if (error.name !== "AbortError") setError(error);
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [url, options]);
  return { response, loading, error };
}
