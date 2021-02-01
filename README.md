** FOOD TRUCK API **

Welcome to the FoodTruck API

------------------------------------------------------------------------------------
CRUD____| Route_____________________________| Description___________________________
------------------------------------------------------------------------------------
Register and Login endpoints________________________________________________________
------------------------------------------------------------------------------------
POST____| "api/auth/register-user"__________| Registers a user (as a customer)
________|___________________________________| Requires username, email, and password
________|___________________________________| {
________|___________________________________|   username: "",
________|___________________________________|   password: "",
________|___________________________________|   email: "",
________|___________________________________| }
________|___________________________________| Returns a user object
------------------------------------------------------------------------------------
POST    | "api/auth/register-operator"      | Registers a user (as a operator)
________|___________________________________| Requires username, email, and password
________|___________________________________| {
________|___________________________________|   username: "",
________|___________________________________|   password: "",
________|___________________________________|   email: "",
________|___________________________________| }
________|___________________________________| Returns a user object
------------------------------------------------------------------------------------
POST    | "api/auth/register-admin"         | Registers a admin (not required)
________|___________________________________| Requires username, email, password
________|___________________________________| and admin code (check for in slack)
________|___________________________________| {
________|___________________________________|   username: "",
________|___________________________________|   password: "",
________|___________________________________|   email: "",
________|___________________________________|   adminCode: "",
________|___________________________________| }
________|___________________________________| Returns a user object
------------------------------------------------------------------------------------
POST    | "api/auth/login"                  | Logs a user in (works for all roles)
________|___________________________________| Requires username and password
________|___________________________________| {
________|___________________________________|   username: "",
________|___________________________________|   password: "",
________|___________________________________| }
________|___________________________________| Returns a token (expires in 1 day)
------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
Trucks data endpoints for operator (user must have operator role)
------------------------------------------------------------------------------------
GET     | "api/trucks/user:userId"          | Gets all trucks belonging to a user
________|  ex/          ^  ^                | Requires token in Authorization header
________|  "api/trucks/user2"               | Returns array of truck objects
------------------------------------------------------------------------------------
GET     | "api/trucks/:truckId"             | Gets the truck with the matching id
________|___________________________________| Requires token in Authorization header
________|___________________________________| Returns a truck object
------------------------------------------------------------------------------------
POST    | "api/trucks/user:userId/"         | Creates a new truck owned by that user
________|___________________________________| Required fields:
________|___________________________________|   {
________|___________________________________|     truckName: "",
________|___________________________________|     truckImgURL: "",
________|___________________________________|     cuisineId: number,
________|___________________________________|   }
________|___________________________________|   - totalRatings & avgRating are 
________|___________________________________|   automatically set at 0 by server
________|___________________________________|   - userId is set by server
________|___________________________________| Requires token in Authorization header
________|___________________________________| Returns the newly created truck object
------------------------------------------------------------------------------------
PUT     | "api/trucks/user:userId/:truckId" | Gets the truck with the matching id
________|___________________________________| Required fields:
________|___________________________________|   {
________|___________________________________|     truckName: "",
________|___________________________________|     truckImgURL: "",
________|___________________________________|     cuisineId: number,
________|___________________________________|     lat: number or null,
________|___________________________________|     long: number or null,
________|___________________________________|     departureTime: "xx/xx/xxxx xx:xx",
________|___________________________________|   }
________|___________________________________|   - rating fields cannot be updated
________|___________________________________|   - Id's cannot be updated
________|___________________________________| Requires token in Authorization header
________|___________________________________| Only owner can update
________|___________________________________| Returns the updated truck object
------------------------------------------------------------------------------------
DELETE  | "api/trucks/user:userId/:truckId" | Deletes the truck with matching id
________|___________________________________| Requires token in Authorization header
________|___________________________________| Only owner can delete
________|___________________________________| Returns a success message
------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
Menu data endpoints for operator (user must have operator role)
------------------------------------------------------------------------------------
GET     | "api/menus/truck:truckId"         | Gets all menu items belonging to a truck
________|  ex/          ^  ^                | Requires token in Authorization header
________|  "api/menus/truck2"               | Returns array of item objects
------------------------------------------------------------------------------------
GET     | "api/menus/:itemId"               | Gets the menu item with the matching id
________|___________________________________| Requires token in Authorization header
________|___________________________________| Returns a item object
------------------------------------------------------------------------------------
POST    | "api/menus/truck:truckId/"        | Creates a new item owned by that truck
________|___________________________________| Required fields:
________|___________________________________|   {
________|___________________________________|     itemName: "",
________|___________________________________|     itemDescription: "",
________|___________________________________|     itemImgURL: "",
________|___________________________________|     price: "",
________|___________________________________|   }
________|___________________________________|   - totalRatings & avgRating are
________|___________________________________|   automatically set at 0 by server
________|___________________________________|   - itemId is set by server
________|___________________________________| Requires token in Authorization header
________|___________________________________| Returns the newly created menu item object
------------------------------------------------------------------------------------
PUT_____| "api/menus/truck:truckId/:itemId" | Gets the item with the matching id____
________|___________________________________| Required fields:______________________
________|___________________________________|___{__________________________________
________|___________________________________|_____itemName: "",_____________________
________|___________________________________|_____itemDescription: "",______________
________|___________________________________|_____itemImgURL: "",___________________
________|___________________________________|_____price: "",________________________
________|___________________________________|___}___________________________________
________|___________________________________| --- rating fields cannot be updated___
________|___________________________________| --- Id's cannot be updated____________
________|___________________________________| Requires token in Authorization header
________|___________________________________| Only owner can update_________________
________|___________________________________| Returns the updated item object_______
------------------------------------------------------------------------------------
DELETE__| "api/menus/truck:truckId/:itemId" | Deletes the item with matching id_____
________|___________________________________| Requires token in Authorization header
________|___________________________________| Only owner can delete_________________
________|___________________________________| Returns a success message____________
------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
Search endpoints (no user role restrictions)________________________________________
------------------------------------------------------------------------------------
GET_____| "api/search/all"__________________| Gets all trucks ______________________
________|___________________________________| Requires token in Authorization header
________|___________________________________| Returns array of truck objects________
________|___________________________________| Ordered by when they were registered
------------------------------------------------------------------------------------
GET_____| "api/search/by-cuisine"___________| Gets all trucks of a cuisine type______
________|___________________________________| Requires token in Authorization header
________|___________________________________| Returns array of truck objects_________
________|___________________________________| Ordered by when they were registered
------------------------------------------------------------------------------------
GET     | "api/search/by-ratings"___________| Gets all trucks by ratings descending
________|___________________________________| Requires token in Authorization header
________|___________________________________| Returns array of truck objects________
________|___________________________________| Ordered by ratings descending_________
------------------------------------------------------------------------------------
GET_____| "api/search/by-distance"__________| Gets all trucks by distance from customer
________|___________________________________| Requires location object______________
________|___________________________________| Requires token in Authorization header
________|____**not made its so hard**_______| Returns array of truck objects________
________|___________________________________| Ordered by distance descending_________
------------------------------------------------------------------------------------
------------------------------------------------------------------------------------
Admin endpoints (admin stuff for fun)
------------------------------------------------------------------------------------
GET_____| "api/admin/users"_________________| Gets all users (only admins allowed)
________|___________________________________| Requires token in Authorization header
________|___________________________________| Returns array of all user objects
________|___________________________________| Made this for fun
------------------------------------------------------------------------------------


Project Details:

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