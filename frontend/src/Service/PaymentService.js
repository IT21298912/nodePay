import axios from "axios";
import BaseService from "../Base/BaseService";

class PaymentService {
    constructor() {
        BaseService.getBaseURL();
        this.GET_PAYMENT = "payment/getPayment";
        this.GET_ALL_PAYMENTS = "payment/getAllPayments";
        this.ADD_PAYMENT = "payment/addPayment";
        this.UPDATE_PAYMENT = "payment/updatePayment";
        this.DELETE_PAYMENT = "payment/deletePayment";
    }

    getAllPayments() {
        return axios.get(this.GET_ALL_PAYMENTS, BaseService.getHeader());
    }

    getPayment(input) {
        let data = {
            id: input
        };
        return axios.post(this.GET_PAYMENT, data, BaseService.getHeader());
    }

    addPayment(input) {
        let data = {
            orderId: input.orderId,
            amount: input.amount,
            currency: input.currency,
            paymentMethod: input.paymentMethod,
            status: input.status,
            timestamp: input.timestamp
        };
        return axios.post(this.ADD_PAYMENT, data, BaseService.getHeader());
    }

    updatePayment(id, input) {
        let data = {
            id: id,
            orderId: input.orderId,
            amount: input.amount,
            currency: input.currency,
            paymentMethod: input.paymentMethod,
            status: input.status,
            timestamp: input.timestamp
        };
        return axios.put(this.UPDATE_PAYMENT, data, BaseService.getHeader());
    }

    deletePayment(input) {
        let data = {
            id: input
        };
        return axios.delete(this.DELETE_PAYMENT, { ...BaseService.getHeader(), data: data });
    }
}

export default PaymentService = new PaymentService();
