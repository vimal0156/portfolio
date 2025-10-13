const hash = '$2b$10$l9qn.nLeMVMERALesQgjdOPkgRYKoOXSL.shq43Ar99zGLFJN0zP2';
const encoded = Buffer.from(hash).toString('base64');

console.log('Original hash:', hash);
console.log('Base64 encoded:', encoded);
console.log('\nPut this in .env.local:');
console.log(`ADMIN_PASSWORD_HASH=${encoded}`);