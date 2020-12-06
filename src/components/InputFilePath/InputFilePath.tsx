import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

import { useState } from 'react';

type InputFilePathProps = {
  step: string;
  submitted?: string;
  onSubmit: React.ComponentProps<typeof TextInput>['onSubmit'];
};

const InputFilePath: React.FC<InputFilePathProps> = ({
  step,
  submitted,
  onSubmit,
}) => {
  const [filePath, setFilePath] = useState('');

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
            placeholder={process.cwd()}
            value={filePath}
            onChange={setFilePath}
            onSubmit={(value) => onSubmit?.(value || process.cwd())}
          />
        )}
      </Box>
    </Box>
  );
};

export default InputFilePath;
