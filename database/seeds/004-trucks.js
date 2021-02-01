
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        {
          truckId: 1, 
          truckName: 'Run Away Oven',
          truckImgURL: 'https://i.pinimg.com/originals/38/11/88/3811880c1029044b16ccc3ca953e3acd.jpg', 
          totalRatings: 1, 
          avgRating: 5, 
          lat: 0, 
          long: 0, 
          departureTime: '', 
          cuisineId: 1, 
          userId: 2
        },
        {
          truckId: 2, 
          truckName: 'Go Burger',
          truckImgURL: 'https://i.pinimg.com/originals/1e/a9/10/1ea910ffa1cb54a00d3aded0b0731489.png', 
          totalRatings: 2, 
          avgRating: 4, 
          lat: 0, 
          long: 0, 
          departureTime: '', 
          cuisineId: 2, 
          userId: 2
        }
      ]);
    });
};
