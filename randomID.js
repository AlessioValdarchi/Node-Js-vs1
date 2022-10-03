
const crypto = require('crypto')
let id = crypto.randomBytes(2).toString('hex')
console.log(id);