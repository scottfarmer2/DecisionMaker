
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('voterChoices', function(table) {
      table.integer('poll_id');
      table.foreign('poll_id').references('id').inTable('poll');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('voterChoices', function(table) {
      table.dropColumn('poll_id');
    })
  ])
};
