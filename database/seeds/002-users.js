
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          userId: 1, 
          userName: 'bob', 
          password: "1234", 
          email: "bob@bob.com", 
          roleId: 1
        },
        {
          userId: 2, 
          userName: 'rob', 
          password: "1234", 
          email: "rob@rob.com", 
          roleId: 2
        }
      ]);
    });
};
