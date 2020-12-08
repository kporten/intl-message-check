import { Box } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import { useReducer } from 'react';

import InputFilePath from '../InputFilePath/InputFilePath';
import InputMode from '../InputMode/InputMode';
import InputProjectPath from '../InputProjectPath/InputProjectPath';
import MessageCheck from '../MessageCheck/MessageCheck';

import { formReducer } from './utils/formReducer';

const App: React.FC = () => {
  const [form, dispatchForm] = useReducer(formReducer, {
    mode: undefined,
    filePath: undefined,
    projectPath: undefined,
  });

  return (
    <Box flexDirection="column">
      <Gradient name="mind">
        <BigText text="intl-message-check" font="tiny" />
      </Gradient>
      <InputMode
        step="1/3"
        selected={form.mode}
        onSelect={(mode) => dispatchForm({ type: 'mode', payload: mode })}
      />
      {form.mode && (
        <InputProjectPath
          step="2/3"
          submitted={form.projectPath}
          onSubmit={(projectPath) =>
            dispatchForm({ type: 'projectPath', payload: projectPath })
          }
        />
      )}
      {form.mode && form.projectPath && (
        <InputFilePath
          step="3/3"
          projectPath={form.projectPath}
          submitted={form.filePath}
          onSubmit={(filePath) =>
            dispatchForm({ type: 'filePath', payload: filePath })
          }
        />
      )}
      {form.mode && form.filePath && form.projectPath && (
        <MessageCheck
          input={{
            mode: form.mode,
            filePath: form.filePath,
            projectPath: form.projectPath,
          }}
        />
      )}
    </Box>
  );
};

export default App;
