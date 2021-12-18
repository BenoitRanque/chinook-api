const controller = require('./controllers');
const router = require('express').Router();
const { validate, getCustomerValidationRules } = require('./validateSanitize.js');

router.get('/customers/:id', getCustomerValidationRules(), validate, controller.get.getOne);
router.get('/customers', controller.get.getInitial);
router.post('/customers', controller.post.addCustomer);
router.put('/customers/:id', controller.put.updateCustomer);
router.delete('/customers/:id', controller.remove.removeCustomer);

module.exports = router;