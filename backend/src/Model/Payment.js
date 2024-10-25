import mongoose from "mongoose";
import Order from "./Order.js";

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:Order
        },
        cardnumber: {
            type: String,
            required: true
        },
        cvc: {
            type: String,
            required: true
        },
        expiry: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
