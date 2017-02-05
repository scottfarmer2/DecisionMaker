
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('voterChoices').dropTable('voter').table('choices', function(table) {
      table.integer('borda_score');
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
