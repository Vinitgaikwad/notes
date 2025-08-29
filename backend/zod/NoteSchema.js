const zod = require('zod');

const Note = zod.string().min(1, "min one").transform((val) => val.trim());

module.exports = { Note }