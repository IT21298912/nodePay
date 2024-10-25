import Order from "../Model/Order.js";
import Payment from "../Model/Payment.js";
import response from "../Utils/ResponseHandler/ResponseHandler.js";
import mongoose from "mongoose";
import ResTypes from "../Utils/Constants/ResTypes.js";

class PaymentController {
    // Method to add a new payment
    addPayment = async (req, res) => {
        let session = null;
        try {
            // Start a MongoDB session
            session = await mongoose.startSession();
            session.startTransaction();

            const { orderId, amount, status, cardnumber, cvc, expiry } = req.body;

            // Create a new payment object
            const newPayment = new Payment({
                orderId,
                amount,
                status,
                expiry,
                cardnumber,
                cvc
            });

            // Save the new payment to the database
            const savedPayment = await newPayment.save();
            const payId = savedPayment._id;

            const oId = await Order.findOne({ _id: orderId }).select('_id');
            const result = await Order.updateOne(
                { _id: oId },
                { $set: { pay_status: status } }
            );

            if (result.modifiedCount === 0) {
                await session.abortTransaction();
                session.endSession();
                return response(res, 403, ResTypes.errors.update_error);
            }

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();
            return response(res, 200, {payment:savedPayment});
        } catch (error) {
            console.log(error);
            if (session) {
                await session.abortTransaction();
                session.endSession();
            }
            return response(res, 500, { message: error.message });
        }
    }
}

export default PaymentController = new PaymentController();
