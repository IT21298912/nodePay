import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Toaster from '../Utils/Toaster'
import OrderYup from '../Validation/OrderYup';
import OrderService from '../Service/OrderService';

export default function Order() {
    const initialValues = {
        firstName: '',
        lastName: '',
        productPrice: '',
        productName: '',
        city: '',
        state: '',
        zip: ''
    };
    const [loading, setLoading] = useState(false);

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: OrderYup.addOrder,
        onSubmit: async (values) => {
            setLoading(true);
            Toaster.loadingToast('Processing Order...');
            try {
                const result = await OrderService.addOrder(values);
                console.log(result)
                if (result.data.code === 200) {
                    // Toaster.justToast('success', 'Order Succesfull', () => {
                    //     Toaster.dismissLoadingToast();
                    // });
                    handlePaymentStart(result.data.data.order, result.data.data.hash)
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                Toaster.dismissLoadingToast();
            }
        }
    });

    const handlePaymentCompleted = (orderId) => {
        alert("Payment completed. OrderID: " + orderId);
        // Note: validate the payment and show success or failure page to the customer
    };

    const handlePaymentDismissed = () => {
        alert("Payment dismissed");
        // Note: Prompt user to pay again or show an error page
    };

    const handlePaymentError = (error) => {
        console.error("Error:" + error);
        // Note: show an error page
    };

    const handlePaymentStart = (payment, hash) => {
        const payDetails = {
            "sandbox": true,
            "return_url": undefined,     // Important
            "cancel_url": undefined,     // Important
            "notify_url": "http://sample.com/notify",
            "merchant_id": "1226493",
            "order_id": payment._id,
            "items": payment.productName,
            "amount": payment.productPrice,
            "currency": "LKR",
            "hash": hash,
            "first_name": payment.firstName,
            "last_name": payment.lastName,
            "email": "samanp@gmail.com",
            "phone": "0771234567",
            "address": "No.1, Galle Road",
            "country": "Sri Lanka",
            "delivery_address": "No. 46, Galle road, Kalutara South",
            "delivery_city": "Kalutara",
            "delivery_country": "Sri Lanka",
            "custom_1": "",
            "custom_2": "",
            "city": payment.city,
        };

        window.payhere.startPayment(payDetails);
    };

    // Set up PayHere event handlers when component mounts
    useEffect(() => {
        window.payhere.onCompleted = handlePaymentCompleted;
        window.payhere.onDismissed = handlePaymentDismissed;
        window.payhere.onError = handlePaymentError;

        return () => {
            // Clean up PayHere event handlers when component unmounts
            window.payhere.onCompleted = null;
            window.payhere.onDismissed = null;
            window.payhere.onError = null;
        };
    }, []);
    return (
        <div className="vh-100 container d-flex justify-content-center align-items-center">
            <div className="offset-md-3"></div>
            <div className="card p-4 shadow-sm">
                <div className="card-header">
                    <h1 className='text-center fw-bolder'>Billing Details</h1>
                </div>
                <div className="card-body">
                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-md-4">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                                id="firstName"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">
                                {errors.firstName}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="lastName" className="form-label">Last name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                                id="lastName"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">
                                {errors.lastName}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="productPrice" className="form-label">Product Price</label>
                            <input
                                type="number"
                                className={`form-control ${errors.productPrice && touched.productPrice ? 'is-invalid' : ''}`}
                                id="productPrice"
                                name="productPrice"
                                value={values.productPrice}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">
                                {errors.productPrice}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="productName" className="form-label">Product Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.productName && touched.productName ? 'is-invalid' : ''}`}
                                id="productName"
                                name="productName"
                                value={values.productName}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">
                                {errors.productName}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                type="text"
                                className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
                                id="city"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">
                                {errors.city}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="state" className="form-label">State</label>
                            <select
                                className={`form-select ${errors.state && touched.state ? 'is-invalid' : ''}`}
                                id="state"
                                name='state'
                                value={values.state}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose...</option>
                                <option value="kurunegala">Kurunegala</option>
                                <option value="colombo">Colombo</option>
                                <option value="kandy">Kandy</option>
                            </select>
                            <div className="invalid-feedback">
                                {errors.state}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="zip" className="form-label">Zip</label>
                            <input
                                type="text"
                                className={`form-control ${errors.zip && touched.zip ? 'is-invalid' : ''}`}
                                id="zip"
                                name="zip"
                                value={values.zip}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">
                                {errors.zip}
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end align-items-center">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={loading}
                            >
                                Pay Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="offset-md-3"></div>
        </div>
    );
}
