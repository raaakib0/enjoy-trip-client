import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const Payment = ({ order, total2, uEmail }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    // console.log(total2,uEmail)
    const stripe = useStripe();
    const elements = useElements();
    // const { vehicleName, price, email, _id } = order;

    // const { user, logOut } = useContext(AuthContext);
    // const [orders, setOrders] = useState([])

    // useEffect(() => {
    //     fetch(`http://localhost:5000/orders?email=${user?.email}`, {
    //         headers: {
    //             authorization: `Bearer ${localStorage.getItem('genius-token')}`
    //         }
    //     })
    //         .then(res => {
    //             if (res.status === 401 || res.status === 403) {
    //                 return logOut();
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             setOrders(data);
    //         })
    // }, [user?.email, logOut])

    const total = 100;
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ total }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [total]);
    // console.log(total)
    // console.log(clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        // amount: total,
                        name: uEmail,
                        email: uEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        console.log(paymentIntent);
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card);
            // store payment info in the database
            const payment = {
                amount: total,
                transactionId: paymentIntent.id,
                email: uEmail,
                // bookingId,
            }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                    }
                })
        }
        setProcessing(false);


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* <form > */}
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
                    className='btn btn-sm mt-4 btn-primary'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default Payment;