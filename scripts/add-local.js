const fs = require('node:fs');
const text = fs.readFileSync('../build/index.html', 'utf8');
fs.writeFileSync('../build/index.html', text);
