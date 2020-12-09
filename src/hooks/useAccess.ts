import fs from 'fs';
import { useEffect, useState } from 'react';

const useAccess = (path: string, expectedType?: 'DIRECTORY' | 'FILE') => {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const stat = await fs.promises.stat(path);

        switch (expectedType) {
          case 'DIRECTORY':
            setHasAccess(stat.isDirectory());
            break;
          case 'FILE':
            setHasAccess(stat.isFile());
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
