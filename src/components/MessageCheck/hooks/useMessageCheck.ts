import fs from 'fs';
import globby from 'globby';
import path from 'path';
import { useEffect, useState } from 'react';
import readline from 'readline';

import type { FormReducerState } from '../../App/utils/formReducer';

const useMessageCheck = (input: Required<FormReducerState>) => {
  const [errorMessage, setErrorMessage] = useState();
  const [results, setResults] = useState<
    { message: string; link?: string }[]
  >();

  useEffect(() => {
    const search = async () => {
      try {
        const cwd = path.resolve(input.projectPath);
        const intlFile = await import(path.resolve(input.filePath));

        const intlMessages = new Map<
          string,
          { file: string; line: number; isMissing: boolean } | undefined
        >(Object.keys(intlFile.default).map((key) => [key, undefined]));

        const checkFile = (relativeFilePath: string) =>
          new Promise((resolve, reject) => {
            const filePath = path.join(cwd, relativeFilePath);
            const readInterface = readline.createInterface({
              input: fs.createReadStream(filePath).on('error', reject),
            });

            let lineCount = 0;

            readInterface.on('line', (line) => {
              lineCount += 1;

              const id = line.match(/id:.?["'](.*)["']/);
              const message = id?.[1];

              if (message) {
                intlMessages.set(message, {
                  file: filePath,
                  line: lineCount,
                  isMissing: !intlMessages.has(message),
                });
              }
            });

            readInterface.on('close', resolve);
          });

        const projectFilePaths = await globby('**/*.(j|t)s?(x)', {
          gitignore: true,
          cwd,
        });

        await Promise.allSettled(
          projectFilePaths.map((projectFilePath) => checkFile(projectFilePath)),
        );

        const data = [];

        if (input.mode.value === 'MISSING') {
          for (const entry of intlMessages.entries()) {
            if (entry[1]?.isMissing) {
              data.push({
                message: entry[0],
                link: `${entry[1]?.file}:${entry[1]?.line}`,
              });
            }
          }

          setResults(data);
        } else if (input.mode.value === 'UNUSED') {
          for (const entry of intlMessages.entries()) {
            if (!entry[1]) {
              data.push({
                message: entry[0],
              });
            }
          }

          setResults(data);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    search();
  }, [input.mode.value, input.filePath, input.projectPath]);

  return { results, error: errorMessage };
};

export default useMessageCheck;
