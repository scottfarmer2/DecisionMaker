exports.seed = function(knex, Promise) {
  return knex('poll').del()
    .then(function () {
      return Promise.all([

        knex('choices').insert({choice_name: 'Boustan',
                              choice_id: 1,
                              poll_id: 1

                            }),
        knex('choices').insert({choice_name: 'Yokato',
                              choice_id: 2,
                              poll_id: 1

                            })

    ]);
  });
};
