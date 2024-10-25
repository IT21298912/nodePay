import * as yup from 'yup'

class PaymentYup {
    addPayment = yup.object({
        cardnumber: yup.string().required(),
        cvc: yup.string().required(),
        expiry: yup.string().required(),
        amount: yup.string().required(),
        status: yup.string().required(),
        orderId: yup.string().required(),
    });
}


export default PaymentYup = new PaymentYup();