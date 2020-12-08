import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

import InputModeValue from '../App/utils/inputModeValue';

const modes = [
  {
    label: 'Find missing',
    value: InputModeValue.MISSING,
  },
  {
    label: 'Find unused',
    value: InputModeValue.UNUSED,
  },
];

type InputModeProps = {
  step: string;
  selected?: {
    label: string;
    value: string;
  };
  onSelect: (item: { label: string; value: string }) => void;
};

const InputMode: React.FC<InputModeProps> = ({ step, selected, onSelect }) => (
  <Box flexDirection="column" marginTop={1}>
    <Box>
      <Box marginRight={1}>
        <Text color="grey">[{step}]</Text>
      </Box>
      <Text>What kind of messages do you want to find?</Text>
    </Box>
    <Box marginTop={1}>
      {selected ? (
        <Text color="blue">{selected.label}</Text>
      ) : (
        <SelectInput items={modes} onSelect={onSelect} />
      )}
    </Box>
  </Box>
);

export default InputMode;
