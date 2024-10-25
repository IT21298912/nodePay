import * as yup from 'yup'

class OrderYup {
    addOrder = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        productPrice: yup.number().required(),
        productName: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
    });
    getOrder = yup.object({
        oid: yup.string().required(),
    })
    updateOrder = yup.object({
        oid: yup.string().required(),
        status: yup.string().required(),
    })
}


export default OrderYup = new OrderYup();