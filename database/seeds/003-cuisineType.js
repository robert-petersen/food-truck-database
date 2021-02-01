
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cuisineTypes').del()
    .then(function () {
      // Inserts seed entries
      return knex('cuisineTypes').insert([
        {
          cuisineId: 1, 
          cuisineType: 'Pizza'
        },
        {
          cuisineId: 2, 
          cuisineType: 'American'
        },
        {
          cuisineId: 3, 
          cuisineType: 'Chinese'
        },
        {
          cuisineId: 4, 
          cuisineType: 'Sandwiches'
        },
        {
          cuisineId: 5, 
          cuisineType: 'Mexican'
        },
        {
          cuisineId: 6, 
          cuisineType: 'Indian'
        },
        {
          cuisineId: 7, 
          cuisineType: 'Italian'
        },
        {
          cuisineId: 8, 
          cuisineType: 'Vegan'
        },
        {
          cuisineId: 9, 
          cuisineType: 'Japanese'
        },
        {
          cuisineId: 10, 
          cuisineType: 'Chicken'
        }
      ]);
    });
};
