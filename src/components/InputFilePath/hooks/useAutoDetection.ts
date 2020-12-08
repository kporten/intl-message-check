import globby from 'globby';
import osLocale from 'os-locale';
import { useEffect, useState } from 'react';

const useAutoDetection = (cwd: string) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [autoDetected, setAutoDetected] = useState('');

  useEffect(() => {
    const autoDetect = async () => {
      try {
        // * Get system locale
        const locale = await osLocale();
        if (!locale) return;

        // * Lookup for existing intl message files with system locale name
        const possibleIntlFilePaths = await globby(
          `**/(${locale}|${locale.split('-')[0]}).json`,
          {
            gitignore: true,
            cwd,
          },
        );

        if (possibleIntlFilePaths[0]) {
          setAutoDetected(possibleIntlFilePaths[0]);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    autoDetect();
  });

  return { autoDetected, error: errorMessage };
};

export default useAutoDetection;
