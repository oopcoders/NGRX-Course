//Documentation: https://www.npmjs.com/package/faker
var faker = require("faker");

var database = {
  products: [],
  categories: [],
  carts: [],
  users: [],
};

for (var i = 1; i <= 200; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(100, 999, 2),
    imageUrl: "https://source.unsplash.com/1600x900/?product",
    quantity: faker.random.number(),
  });
}

for (var i = 1; i <= 50; i++) {
  database.categories.push({
    id: i,
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
  });
}

database.carts.push({
  id: 1,
  userid: 2,
  products: [],
});

database.carts.push({
  id: 2,
  userid: 1,
  products: [],
});

database.users.push({
  id: "1",
  username: "admin",
  email: "admin@admin.com",
  isadmin: true,
});

database.users.push({
  id: "2",
  username: "user",
  email: "user@user.com",
  isadmin: false,
});

console.log(JSON.stringify(database));
