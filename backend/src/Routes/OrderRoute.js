import express from 'express';
import OrderController from '../Controller/OrderController.js';
import BodyValidation from '../MiddleWare/YupSchema/BodyValidation.js'
import OrderYup from '../Utils/Validation/OrderYup.js'; 

const router = express.Router();

// Route to handle adding a new order
router.post('/addOrder',  BodyValidation(OrderYup.addOrder), OrderController.addOrder);

// Route to handle getting an order by ID
router.post('/getOrder',  BodyValidation(OrderYup.getOrder), OrderController.getOrder);

export default router;
