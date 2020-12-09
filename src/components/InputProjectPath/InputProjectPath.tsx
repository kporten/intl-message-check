import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import path from 'path';
import { useState } from 'react';

import useAccess from '../../hooks/useAccess';

type InputProjectPathProps = {
  step: string;
  submitted?: string;
  onSubmit: React.ComponentProps<typeof TextInput>['onSubmit'];
};

const InputProjectPath: React.FC<InputProjectPathProps> = ({
  step,
  submitted,
  onSubmit,
}) => {
  const [projectPath, setProjectPath] = useState('');
  const hasAccess = useAccess(projectPath, 'DIRECTORY');

  const handleSubmit = (value: string) => {
    if (value && !hasAccess) return;

    onSubmit?.(path.resolve(value || process.cwd()));
  };

  return (
    <Box flexDirection="column" marginTop={1}>
      <Box>
        <Box marginRight={1}>
          <Text color="grey">[{step}]</Text>
        </Box>
        <Text>Please enter the path to your JS/TS project directory:</Text>
      </Box>
      <Box marginTop={1}>
        {submitted ? (
          <Text color="blue">{submitted}</Text>
        ) : (
          <TextInput
            placeholder={process.cwd()}
            value={projectPath}
            onChange={setProjectPath}
            onSubmit={handleSubmit}
          />
        )}
      </Box>
      {!!projectPath && (
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

export default InputProjectPath;
