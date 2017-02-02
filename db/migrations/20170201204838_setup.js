
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('poll', function(table) {
      table.increments('id').unsigned().primary();
      table.string('poll_title');
      table.string('poll_description');
      table.string('admin_email');
      table.string('admin_link');
      table.string('voter_link');
    }),
    knex.schema.createTable('choices', function(table) {
      table.increments('choice_id');
      table.string('choice_name');
      table.integer('poll_id');
      table.foreign('poll_id').references('poll.id');
    }),
    knex.schema.createTable('voter', function(table) {
      table.increments('voter_id');
      table.string('voter_email');
      table.integer('poll_id')
      table.foreign('poll_id').references('poll.id');
    }),
    knex.schema.createTable('voterChoices', function(table) {
      table.integer('voter_id');
      table.foreign('voter_id').references('voter.voter_id');
      table.integer('choice_id');
      table.foreign('choice_id').references('choices.choice_id');
      table.integer('preference');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('poll'),
    knex.schema.dropTable('choices'),
    knex.schema.dropTable('voter'),
    knex.schema.dropTable('voterChoices')
    ])
};
