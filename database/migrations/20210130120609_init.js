exports.up = function(knex) {
  return knex.schema
    .createTable("roles", tbl => {
      tbl.increments("roleId");
      tbl.string("role", 128).notNullable().unique();
    })
    .createTable("users", tbl => {
      tbl.increments("userId");
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();
      tbl.string("email", 128).notNullable().unique();
      tbl
        .integer("roleId")
        .unsigned()
        .references("roles.roleId")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
        .defaultTo(1);
    })
    .createTable("cuisineTypes", tbl => {
      tbl.increments("cuisineId");
      tbl.string("cuisineType").notNullable().unique();
    })
    .createTable("trucks", tbl => {
      tbl.increments("truckId");
      tbl.string("truckName", 128).notNullable();
      tbl.string("truckImgURL", 256).notNullable();
      tbl.integer("totalRatings").notNullable();
      tbl.integer("avgRating").notNullable();
      tbl.integer("lat");
      tbl.integer("long");
      tbl.string("departureTime", 128);
      tbl
        .integer("cuisineId")
        .unsigned()
        .references("cuisineTypes.cuisineId")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl 
        .integer("userId")
        .unsigned()
        .references("users.userId")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("items", tbl => {
      tbl.increments("itemId");
      tbl.string("itemName", 128).notNullable();
      tbl.string("itemDescription", 128).notNullable();
      tbl.string("itemImgURL", 256).notNullable();
      tbl.float("price").notNullable();
      tbl.integer("totalRatings").notNullable();
      tbl.integer("avgRating").notNullable();
      tbl 
      .integer("truckId")
      .unsigned()
      .references("trucks.truckId")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("items")
    .dropTableIfExists("trucks")
    .dropTableIfExists("cuisineTypes")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
