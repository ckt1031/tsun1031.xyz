import fs from 'node:fs';

import { headers } from '../src/custom-http-headers.mjs';

let headersContent = '/*\n';

for (const [header, value] of Object.entries(headers)) {
  headersContent += `  ${header}: ${value}\n`;
}

// Generate _headers
fs.writeFileSync('_headers', headersContent);
