import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

import { useState } from 'react';

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
            onSubmit={(value) => onSubmit?.(value || process.cwd())}
          />
        )}
      </Box>
    </Box>
  );
};

export default InputProjectPath;
