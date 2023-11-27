import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_KEY);

const Payment = () => {
    return (
        <div>
            <SectionTitle heading="payment" subHeading="Pay First" />

            <div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>

            </div>

        </div>
    );
};

export default Payment;