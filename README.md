** FOOD TRUCK API **

## ☝️ **Pitch**

Every true "foodie" worth their salt knows that some of the best food in any city can be found on food trucks - but knowing when and where those trucks will be can be next to impossible, and discovering new ones often relies on word-of-mouth that is long on tales of delicious, but short on actual details. 

FoodTruck TrackR was designed to make finding and eating at a food truck fast, easy and fun. Quickly see all of our Operator partners' nearby food trucks that currently open, view their current real-time GPS location, know the scheduled arrival and departure times, view photos, read customer reviews and much more, all in our easy to use app. Try FoodTruck TrackR today, and enjoy the best food your city has to offer.

## ✅  **MVP / minimum viable product**

**Web**

1. `User` can register / create an account as either a `operator` or `diner` by providing at minimum a unique `username`, a valid `email` and a `password`. 

2. `User` can log in as an `operator` or `diner` using the `username` and `password` provided on sign-up / account creation. 

3. Each `diner` must have the following properties:

- `username`: String
- `password`: String
- `currentLocation`: GPS coordinates or physical address
- `favoriteTrucks`: Array of the `diner`'s favorite trucks
- `currentLocation`: GPS coordinates or physical address
- `favoriteTrucks`: Array of the `diner`s favorite trucks

4. Each `operator` must have the following properties:

- `username`: String
- `password`: String
- `trucksOwned`: Array of `trucks` that the `operator` owns.

5. An authenticated `operator` can create, view, update and delete a `truck` object. A `truck` must have the following properties: 

- `imageOfTruck`: Image or image URL
- `cuisineType`: String
- `customerRatings`: Array of all `customerRating` values
- `customerRatingAvg`: Integer equal to the mean of the values contained in the `truck``s `customerRatings` array.

6. A `truck` will have `menu` comprised of `menuItems`. This object must have the following properties:

- `itemName`: String
- `itemDescription`: String
- `itemPhotos`: Array of images or image URLs
- `itemPrice`: Integer
- `customerRatings`: Array of all `customerRating` values
- `customerRatingAvg`: Integer equal to the mean of the values in `customerRatings` array.

6. A `truck` will have a `currentLocation.` This object must have the following properties:

- `location`: GPS coordinates or physical address of the current location of the `truck`
- `departureTime`: Date and time that the `truck` will depart the `currentLocation`

7. An authenticated `diner` can search for `trucks` by the following criteria: 

- `trucks` near the `diner`'s `currentLocation`. Query should return all `truck`s with a `currentLocation` within the default `radSize`.

**Results must also be filterable by the following properties:**

- `cuisineType` of a `truck`
- `customerRatingAvg` of a `truck`
- `radSize`: Desired radius distance from `user`'s `currentLocation` (should use the default value for `radSize` if not specified by `diner`)

## 🏃‍♀️ **Stretch**

1. Authenticated `operator` can create, update and delete a `promotion` for a `truck` and / or a `menuItem` that will be displayed on their `truck` profile. When the `promotion` is created a push notification with details of the promotion should be sent to any `diner` who has that `truck` in their `favoriteTrucks` list

2. Authenticated `diner` can upload photos of `menuItems` or a `truck` when they are within a given `radSize` from a `truck`