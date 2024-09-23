// src/models/Book.js
const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Book',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    code: { type: 'varchar' },
    title: { type: 'varchar' },
    author: { type: 'varchar' },
    stock: { type: 'int' },
  },
});
