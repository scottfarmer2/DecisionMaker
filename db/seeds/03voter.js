exports.seed = function(knex, Promise) {
  return knex('poll').del()
    .then(function () {
      return Promise.all([


        knex('voter').insert({voter_email: 'voter@gmail.com',
                            voter_id: 1,
                            poll_id: 1
                          })

    ]);
  });
};
