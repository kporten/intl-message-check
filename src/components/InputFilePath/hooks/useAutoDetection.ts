import globby from 'globby';
import osLocale from 'os-locale';
import { useEffect, useState } from 'react';

type UseAutoDetectionProps = {
  projectPath: string;
};

const useAutoDetection = ({ projectPath }: UseAutoDetectionProps) => {
  const [autoDetected, setAutoDetected] = useState('');

  useEffect(() => {
    const autoDetect = async () => {
      // * Get system locale
      const locale = await osLocale();
      if (!locale) return;

      // * Lookup for existing intl message files with system locale name
      const possibleIntlFilePaths = await globby(
        `**/(${locale}|${locale.split('-')[0]}).json`,
        {
          gitignore: true,
          cwd: projectPath,
        },
      );

      if (possibleIntlFilePaths[0]) {
        setAutoDetected(possibleIntlFilePaths[0]);
      }
    };

    autoDetect();
  });

  return autoDetected;
};

export default useAutoDetection;
