
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          itemId: 1, 
          itemName: 'Cheese Pizza Slice', 
          itemDescription: 'https://i.insider.com/5aac20af1225bc35008b47e6?width=1136&format=jpeg', 
          itemImgURL: 'Good pizza!', 
          price: 1.69, 
          totalRatings: 1, 
          avgRating: 4, 
          truckId: 1
        },
        {
          itemId: 2, 
          itemName: 'Pepperoni Pizza Slice', 
          itemDescription: 'https://3.bp.blogspot.com/-8ylceZ1nmKw/UL5WCKy_4FI/AAAAAAAAA8Q/iR6jJs74nIM/s1600/IMG_0151.jpg', 
          itemImgURL: 'Pepperoni, Pepperoni, Pepperoni!', 
          price: 2.69, 
          totalRatings: 2, 
          avgRating: 5, 
          truckId: 1
        },
        {
          itemId: 4, 
          itemName: 'Cheese Burger', 
          itemDescription: 'https://www.foodrepublic.com/wp-content/uploads/2012/03/033_FR11785.jpg', 
          itemImgURL: 'An American classic!', 
          price: 4.69, 
          totalRatings: 3, 
          avgRating: 4, 
          truckId: 2
        },
        {
          itemId: 5, 
          itemName: 'Double Cheese Burger', 
          itemDescription: 'Bouble the burger, double the cheese!', 
          itemImgURL: 'https://images-gmi-pmc.edge-generalmills.com/a5b1baf1-8aec-4add-ae52-f5d6bfb4cc8b.jpg', 
          price: 5.69, 
          totalRatings: 1, 
          avgRating: 5, 
          truckId: 2
        },
        {
          itemId: 6, 
          itemName: 'Bacon on Bacon Burger', 
          itemDescription: 'Our great burger with a shit ton of bacon!', 
          itemImgURL: 'https://simply-delicious-food.com/wp-content/uploads/2015/07/Bacon-and-cheese-burgers-3-480x270.jpg', 
          price: 6.69, 
          totalRatings: 5, 
          avgRating: 5, 
          truckId: 2
        }
      ]);
    });
};
