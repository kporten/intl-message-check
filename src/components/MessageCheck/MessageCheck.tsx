import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import Table from 'ink-table';

import type { FormReducerState } from '../App/utils/formReducer';

import useMessageCheck from './hooks/useMessageCheck';

type MessageCheckProps = {
  input: Required<FormReducerState>;
};

const MessageCheck: React.FC<MessageCheckProps> = ({ input }) => {
  const { results, error } = useMessageCheck(input);

  return (
    <Box flexDirection="column" marginTop={1} marginBottom={1}>
      {results ? (
        results.length > 0 ? (
          <Table data={results} />
        ) : (
          <Text color="green">Everything is fine!</Text>
        )
      ) : error ? (
        <Text color="red">{error}</Text>
      ) : (
        <Box>
          <Spinner type="earth" />
          <Text>Searching in your project...</Text>
        </Box>
      )}
    </Box>
  );
};

export default MessageCheck;
