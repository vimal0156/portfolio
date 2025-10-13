const bcrypt = require('bcryptjs');

const password = 'Freerunning123'; // Change this to your desired password
const hash = bcrypt.hashSync(password, 10);

console.log('\n=========================');
console.log('Password:', password);
console.log('Hash:', hash);
console.log('=========================\n');
console.log('Copy this to your .env.local:');
console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
console.log('\n');