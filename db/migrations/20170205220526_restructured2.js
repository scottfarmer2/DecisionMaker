
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('choices', function(table) {
      modify('borda_score').defaultTo(0).notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('choices', function(table) {
      table.dropColumn('borda_score');
    })
  ])
};
