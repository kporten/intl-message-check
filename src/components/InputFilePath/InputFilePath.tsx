import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import path from 'path';
import { useState } from 'react';

import useAccess from '../../hooks/useAccess';
import useAutoDetection from './hooks/useAutoDetection';

type InputFilePathProps = {
  step: string;
  projectPath: string;
  submitted?: string;
  onSubmit: React.ComponentProps<typeof TextInput>['onSubmit'];
};

const InputFilePath: React.FC<InputFilePathProps> = ({
  step,
  projectPath,
  submitted,
  onSubmit,
}) => {
  const { autoDetected } = useAutoDetection(projectPath);
  const [filePath, setFilePath] = useState('');
  const hasAccess = useAccess(path.resolve(projectPath, filePath), 'FILE');

  const handleSubmit = (value: string) => {
    if (value && !hasAccess) return;

    onSubmit?.(path.resolve(projectPath, value || autoDetected));
  };

  return (
    <Box flexDirection="column" marginTop={1}>
      <Box>
        <Box marginRight={1}>
          <Text color="grey">[{step}]</Text>
        </Box>
        <Text>
          Please enter the path to your JSON file with message definitions:
        </Text>
      </Box>
      <Box marginTop={1}>
        {submitted ? (
          <Text color="blue">{submitted}</Text>
        ) : (
          <TextInput
            placeholder={autoDetected || '?'}
            value={filePath}
            onChange={setFilePath}
            onSubmit={handleSubmit}
          />
        )}
      </Box>
      {!!filePath && (
        <Box>
          {hasAccess ? (
            <Text color="green">✓ Path is valid</Text>
          ) : (
            <Text color="red">⨉ Path is not valid</Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default InputFilePath;
