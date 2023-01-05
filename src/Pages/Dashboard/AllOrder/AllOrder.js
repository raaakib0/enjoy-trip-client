import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AllOrder = () => {
    const { user } = useContext(AuthContext);
    const [sorders, setsOrders] = useState([])

    const url = `https://enjoy-trip-server.vercel.app/orders3`;

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const handleStatusUpdate = id => {
        fetch(`https://enjoy-trip-server.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id);
                    const approving = orders.find(odr => odr._id === id);
                    approving.status = 'Approved'

                    const newsOrders = [approving, ...remaining];
                    setsOrders(newsOrders);
                }
            })
    }

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to Delete this order');
        if (proceed) {
            fetch(`https://enjoy-trip-server.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('deleted successfully');
                        const remaining = orders.filter(odr => odr._id !== id);
                        setsOrders(remaining);
                    }
                })
        }
    }

    return (
        <div>
            <h3 className="text-3xl mb-5">All Orders</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>price</th>
                            <th>Date</th>
                            <th>User Email</th>
                            <th>Seller Email</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders &&
                            orders?.map((order, i) => <tr key={orders._id}>
                                <th>{i + 1}</th>
                                <td>{order.vehicleName}</td>
                                <td> {order.price} X {order.days} = {order.price * order.days}</td>
                                <td>{order.appointmentDate}</td>
                                <td>{order.email}</td>
                                <td>{order.sellerEmail}</td>
                                {/* <td>{order.slot}</td> */}
                                <td>

                                    {
                                        !order.paid ?
                                            <span className='text-primary text-l'>NOT PAID</span>
                                            :
                                            order.paid &&
                                            <span className='text-green-500 text-l'>PAID</span>
                                    }
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleStatusUpdate(order._id)}
                                        className="btn btn-ghost btn-xs">{order.status ? order.status : 'pending'}</button>
                                </td>
                                <td>
                                    <label onClick={() => handleDelete(order._id)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrder;