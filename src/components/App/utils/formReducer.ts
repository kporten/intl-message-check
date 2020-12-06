export type FormReducerState = {
  mode?: {
    label: string;
    value: string;
  };
  filePath?: string;
  projectPath?: string;
};

export type FormReducerAction =
  | { type: 'mode'; payload: FormReducerState['mode'] }
  | { type: 'filePath'; payload: FormReducerState['filePath'] }
  | { type: 'projectPath'; payload: FormReducerState['projectPath'] };

export const formReducer = (
  state: FormReducerState,
  action: FormReducerAction,
) => {
  switch (action.type) {
    case 'mode':
      return { ...state, mode: action.payload };
    case 'filePath':
      return { ...state, filePath: action.payload };
    case 'projectPath':
      return { ...state, projectPath: action.payload };
    default:
      throw new Error('unsupported action type');
  }
};
