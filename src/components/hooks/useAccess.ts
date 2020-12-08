import fs from 'fs';
import { useEffect, useState } from 'react';

const useAccess = (path: string, expectedType?: 'DIRECTORY' | 'FILE') => {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!path) return;

      try {
        const stat = await fs.promises.stat(path);

        switch (expectedType) {
          case 'DIRECTORY':
            if (stat.isDirectory()) setHasAccess(true);
            break;
          case 'FILE':
            if (stat.isFile()) setHasAccess(true);
            break;
          default:
            setHasAccess(true);
            break;
        }
      } catch {
        setHasAccess(false);
      }
    };

    check();
  }, [expectedType, path]);

  return hasAccess;
};

export default useAccess;
