const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Member',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    code: { type: 'varchar' },
    name: { type: 'varchar' },
    penaltyEndDate: { type: 'timestamp', nullable: true },
  },
});
