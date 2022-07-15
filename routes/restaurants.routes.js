const express = require('express');

const restaurantRouter = express.Router();

//middleware
const {
  restaurantExist,
} = require('../middlewares/restaurantExist.middleware');
const { reviewExist } = require('../middlewares/reviewExist.middleware');
const {
  protectSession,
  verifyUserRol,
  verifyUserAccount,
  verifySameSession,
} = require('../middlewares/auth.middleware');
const {
  createRestaurantValidators,
} = require('../middlewares/validations.middleware');

//constrollers
const {
  newRestaurant,
  allRestaurant,
  restaurantById,
  updateRestaurant,
  deletRestaurant,
  newReviewRestaurant,
  updateReview,
  deleteReview,
} = require('../controllers/restaurants.controllers');

//end points
//restaurants
restaurantRouter.get('/', allRestaurant);
restaurantRouter.get('/:id', restaurantExist, restaurantById);

//protected End points

restaurantRouter.use(protectSession);

restaurantRouter.post('/', createRestaurantValidators, newRestaurant);

//restaurants reviews
restaurantRouter.post('/reviews/:restaurantId', newReviewRestaurant);
restaurantRouter.patch(
  '/reviews/:id',
  reviewExist,
  verifySameSession,
  updateReview
);
restaurantRouter.delete(
  '/reviews/:id',
  reviewExist,
  verifySameSession,
  deleteReview
);

//Restaurant functions
restaurantRouter
  .use('/:id', restaurantExist)
  .route('/:id')
  .patch(verifyUserRol, updateRestaurant)
  .delete(verifyUserRol, deletRestaurant);

module.exports = { restaurantRouter };
