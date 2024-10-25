import express from 'express';
import PaymentController from '../Controller/PaymentController.js';
import PaymentYup from '../Utils/Validation/PaymentYup.js'; 
import BodyValidation from '../MiddleWare/YupSchema/BodyValidation.js'

const router = express.Router();

// Route to handle adding a new payment
router.post('/addPayment',  BodyValidation(PaymentYup.addPayment), PaymentController.addPayment);

export default router;
