import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { width: width ?? 0 };
};
