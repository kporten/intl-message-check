import fs from 'fs';
import globby from 'globby';
import path from 'path';
import { useEffect, useState } from 'react';
import readline from 'readline';

import type { FormReducerState } from '../../App/utils/formReducer';

import InputModeValue from '../../App/utils/inputModeValue';

const useMessageCheck = (input: Required<FormReducerState>) => {
  const [errorMessage, setErrorMessage] = useState();
  const [results, setResults] = useState<
    { message: string; link?: string }[]
  >();

  useEffect(() => {
    const search = async () => {
      try {
        // * Resolve paths
        const cwd = path.resolve(input.projectPath);
        const intlFile = await import(path.resolve(input.filePath));

        // * Source intl messages
        const intlMessages = new Map<
          string,
          { file: string; line: number; isMissing: boolean } | undefined
        >(Object.keys(intlFile.default).map((key) => [key, undefined]));

        // * Get all JS/TS files of the project
        const projectFilePaths = await globby('**/*.(j|t)s?(x)', {
          gitignore: true,
          cwd,
        });

        // * Function to check the file content for intl ids
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

              // * Check if intl message id is not falsy and save the result of the check for this message id
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

        // * Process each file
        await Promise.allSettled(
          projectFilePaths.map((projectFilePath) => checkFile(projectFilePath)),
        );

        // * Prepare results for output
        const data = [];

        for (const [message, result] of intlMessages.entries()) {
          switch (input.mode.value) {
            case InputModeValue.MISSING:
              if (result && result.isMissing) {
                data.push({
                  message,
                  link: `${result.file}:${result.line}`,
                });
              }
              break;
            case InputModeValue.UNUSED:
              if (!result) {
                data.push({
                  message,
                });
              }
              break;
            default:
              throw new Error('input mode value not supported');
          }
        }

        setResults(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    search();
  }, [input.mode.value, input.filePath, input.projectPath]);

  return { results, error: errorMessage };
};

export default useMessageCheck;
