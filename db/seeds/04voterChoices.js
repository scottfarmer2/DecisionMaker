exports.seed = function(knex, Promise) {
  return knex('poll').del()
    .then(function () {
      return Promise.all([

        knex('voterChoices').insert({voter_id: 1,
                                    choice_id: 1,
                                    preferences: 2
                                  }),
        knex('voterChoices').insert({voter_id: 1,
                                    choice_id: 2,
                                    preferences: 1
                                  })

    ]);
  });
};
