#!/usr/bin/env node

import childProcess from 'child_process';
import { render } from 'ink';

import App from './components/App/App';

childProcess.exec('clear', () => render(<App />));
