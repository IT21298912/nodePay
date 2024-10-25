import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        pay_status: {
            type: String,
            default:'pending',
            required: true,
        }
    },
    {
        versionKey: false,
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
