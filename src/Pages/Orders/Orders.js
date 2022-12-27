import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Payment from '../Payment/Payment';
// import Payment from '../Payment/Payment';
import OrderRow from './OrderRow';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(stripePromise)

const Orders = () => {
    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                setOrders(data);
            })
    }, [user?.email, logOut])


    // orders.map(order => { total = order.price * order.day })
    // if (total != NaN) {


    let total = 0;
    const summary = (price, day) => {

        total += price * day;
        // sum += total;
        // console.log(total, sum)
        return total;
    }
    const sssum = orders.map(order => {
        const ssum = summary(order.price, order.days);
        // sum = sum + total;
        // console.log( ssum)
        return ssum;
    })

    // let sum = summary;
    // }

    const totalOrderValue = sssum[sssum.length - 1];
    console.log(totalOrderValue)

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to cancel this order');
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remaining = orders.filter(odr => odr._id !== id);
                        setOrders(remaining);
                    }
                })
        }
    }

    // const handleStatusUpdate = id => {
    //     fetch(`http://localhost:5000/orders/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'content-type': 'application/json',
    //             authorization: `Bearer ${localStorage.getItem('genius-token')}`
    //         },
    //         body: JSON.stringify({ status: 'Approved' })
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             if (data.modifiedCount > 0) {
    //                 const remaining = orders.filter(odr => odr._id !== id);
    //                 const approving = orders.find(odr => odr._id === id);
    //                 approving.status = 'Approved'

    //                 const newOrders = [approving, ...remaining];
    //                 setOrders(newOrders);
    //             }
    //         })
    // }
    // console.log(user)
    return (
        <div>
            <h2 className="text-5xl">You have {orders.length} Orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Name</th>
                            <th>Price</th>
                            {/* <th>Favorite Color</th> */}
                            <th>Payment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                            // handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>
                            </th>
                            <th></th>
                            <th className='text-xl font-bold' >Total Price Tk = {total}</th>
                            <th></th>
                            <th>
                                {/* <Link
                                    to={`/payment/${user?.email}`}>
                                    <button className="btn btn-primary">Make Payment</button>
                                </Link> */}
                                {/* {
                                    orders.map(order => {
                                        {
                                            order.price && !order.paid &&
                                            <Link
                                                to={`/payment/${user?.email}`}>
                                                <button
                                                    className='btn btn-primary btn-sm'
                                                >Pay</button>
                                            </Link>

                                        }
                                        {
                                            order.price && order.paid && <span className='text-green-500'>Paid</span>
                                        }
                                    })
                                } */}
                            </th>
                        </tr>

                    </tfoot>
                </table>
                {/* <Payment></Payment> */}
            </div>
            <div className='flex justify-center'>
                <div>
                    <h3 className=" text-primary text-3xl">Payment </h3>
                    <p className="text-xl">Please pay <strong>Tk = {total}</strong>  </p>
                    <div className='w-96 my-12 '>

                        {
                            // orders.map(order => <Elements stripe={stripePromise}>
                            //     <Payment
                            //         order={order}
                            //         total={total}
                            //         uEmail={user?.email}

                            //     />
                            // </Elements>)
                            <Elements stripe={stripePromise}>
                                <Payment
                                    total={totalOrderValue}
                                    uEmail={user?.email}
                                />
                            </Elements>
                        }
                        {/* orders.map(order => <OrderRow
                        key={order._id}
                        order={order}
                        handleDelete={handleDelete}
                    // handleStatusUpdate={handleStatusUpdate}
                    ></OrderRow>) */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;