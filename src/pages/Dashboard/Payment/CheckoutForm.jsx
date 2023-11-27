import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')

    const navigate = useNavigate()

    const { user } = useAuth()

    const stripe = useStripe();
    const elements = useElements();

    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {

        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    // console.log("checkout stripe", res.data.clientSecret);
                    setClientSecret(res?.data?.clientSecret)
                })
        }

    }, [axiosSecure, totalPrice])


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log("stripe error", error);
            setError(error.message)
        }
        else {
            console.log("stripe payment method", paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "annonymous",
                    email: user?.email || "annonymous",
                }
            }
        })

        if (confirmError) {
            console.log("checkout stripe confirm error", error);
        }
        else {
            console.log("checkout stripe confirm paymentIntent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("transaction Id", paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // now save the payment in database
                const paymentInfo = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), // need convert date utc. use moment js 
                    cartIds: cart.map(item => item._id),
                    menuIds: cart.map(item => item.menuId),
                    status: 'pending',
                }

                const res = await axiosSecure.post('/payments', paymentInfo)
                console.log("payment info save", res.data);

                // update cart count
                refetch()
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Thank you`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/dashboard/paymentHistory')
                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>

            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}

            />

            <button
                type="submit"
                className="btn btn-warning text-white my-4"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>

            {transactionId &&
                <p className="text-green-600">

                    Your Transaction ID: {transactionId}
                </p>
            }

        </form>
    );
};

export default CheckoutForm;