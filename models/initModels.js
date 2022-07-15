const initModels = () => {
  const { Meals } = require('./meals.model');
  const { Orders } = require('./orders.model');
  const { Restaurants } = require('./restaurants.model');
  const { Reviews } = require('./reviews.model');
  const { Users } = require('./users.model');

  //1Res---M Reviews
  Restaurants.hasMany(Reviews, { foreignKey: 'restaurantId' });
  Reviews.belongsTo(Restaurants);

  //1Res--M Meals
  Restaurants.hasMany(Meals, { foreignKey: 'restaurantId' });
  Meals.belongsTo(Restaurants);

  //1 User --M Reviews
  Users.hasMany(Reviews, { foreignKey: 'userId' });
  Reviews.belongsTo(Users);

  //1 user -- M orders
  Users.hasMany(Orders, { foreignKey: 'userId' });
  Orders.belongsTo(Users);

  //1 meal -- 1 orders
  Meals.hasOne(Orders, { foreignKey: 'mealId' });
  Orders.belongsTo(Meals);
};

module.exports = { initModels };
