import Order from "../Model/Order.js";
import response from "../Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "../Utils/Constants/ResTypes.js";
import generateHash from "../Utils/Hash/generateHash.js"
class OrderController {
    // Method to add a new order
    addOrder = async (req, res) => {
        try {
            const { firstName, lastName, productPrice, productName, city, state, zip } = req.body;

            // Create a new order object
            const newOrder = new Order({
                firstName,
                lastName,
                productPrice,
                productName,
                city,
                state,
                zip
            });

            // Save the new order to the database
            const savedOrder = await newOrder.save();
            const hash = generateHash(savedOrder._id, productPrice)
            
            if (savedOrder)
                return response(res, 200, {order:savedOrder,hash});
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }

    // Method to get an order by ID
    getOrder = async (req, res) => {
        const { id } = req.body;
        try {
            const order = await Order.findOne({ _id: id });
            if (!order) return response(res, 404, ResTypes.errors.not_found);
            return response(res, 200, { order });
        } catch (error) {
            console.log(error);
            return response(res, 500, error);
        }
    }
}

export default OrderController = new OrderController();
