import { fork } from 'child_process';

import type { ChildProcess } from 'child_process';

let server: ChildProcess | null = null;

if (process.env.NODE_ENV === 'production') {
  server = fork('./frontend/dist/index.js', [], {
    env: {
      ...process.env,
      PORT: '40072'
    }
  });
}

export default server;
