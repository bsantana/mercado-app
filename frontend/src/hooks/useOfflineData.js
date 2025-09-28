import { useEffect, useState } from 'react';

export function useOfflineData(key, fetcher) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem(key);
    if (cached) {
      setData(JSON.parse(cached));
    } else {
      fetcher().then(res => {
        setData(res);
        localStorage.setItem(key, JSON.stringify(res));
      });
    }
  }, [key, fetcher]);

  return data;
}
