import { useState, useEffect } from "react";

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(url, { ...options, signal: abortController.signal })
      .then((res) => res.json())
      .then((res) => setResponse(res))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }, [url, options]);
  return { response, loading, error };
};

export default useFetch;
