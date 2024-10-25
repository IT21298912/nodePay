import axios from "axios";
import BaseService from "./BaseService";

class OrderService {
    constructor() {
        BaseService.getBaseURL();
        this.GET_ORDER = "order/getOrder";
        this.GET_ALL_ORDERS = "order/getAllOrders";
        this.ADD_ORDER = "order/addOrder";
    }
    getOrder(input) {
        let data = {
            id: input
        };
        return axios.post(this.GET_ORDER, data);
    }

    addOrder(input) {
        let data = {
            firstName: input.firstName,
            lastName: input.lastName,
            productPrice: input.productPrice,
            productName: input.productName,
            city: input.city,
            state: input.state,
            zip: input.zip
        };
        return axios.post(this.ADD_ORDER, data);
    }
}

export default OrderService = new OrderService();
