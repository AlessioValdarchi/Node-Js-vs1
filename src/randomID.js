const crypto = require("crypto");
let id = crypto.randomBytes(20).toString("hex");
console.log(id);
