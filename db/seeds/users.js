exports.seed = function(knex, Promise) {
  return knex('poll').del()
    .then(function () {
      return Promise.all([
        knex('poll').insert({poll_title: 'Dinner',
                              poll_description: 'Where are we going to eat',
                              admin_email: 'dirtbag28@gmail.com',
                              admin_link: 'www.results.com',
                              voter_link: 'www.choices.com'}),

      ]);
    });
};
