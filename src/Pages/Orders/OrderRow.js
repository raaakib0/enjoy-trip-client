import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, vehicleName, phone, customer, price, vehicle, img, days, paid, status } = order;
    const [orderVehicle, setOrderVehicle] = useState({})
    // console.log(img)
    // console.log(orderVehicle)
    // useEffect(() => {
    //     fetch(`https://enjoy-trip-server-raaakib0.vercel.app/vehicles2/${vehicle}`)
    //         .then(res => res.json())
    //         .then(data => setOrderVehicle(data));
    // }, [vehicle])

    // console.log(price*2)

    return (
        <>
            <tr>
                <th>
                    <label>
                        <button onClick={() => handleDelete(_id)} className='btn btn-error'>X</button>
                    </label>
                </th>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="rounded w-24 h-24">
                                {
                                    img &&
                                    <img src={img} alt="Avatar Tailwind CSS Component" />}
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{customer}</div>
                            <div className="text-sm opacity-50">{phone}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {vehicleName}
                    <br />
                    <h2 className="badge badge-ghost font-bold">{price} X {days} = {price * days}</h2>
                </td>
                {/* <td>Purple</td> */}
                <td>
                    {
                        !paid ?
                            <span className='text-primary text-l'>NOT PAID</span>
                            :
                            paid &&
                            <span className='text-green-500 text-l'>PAID</span>
                    }
                </td>
                <th>
                    <h2
                        // onClick={() => handleStatusUpdate(_id)}
                        className="">{status ? status : 'Pending'}</h2>

                </th>
            </tr>
            {/* <tr>total price</tr>
            <th>total rate</th>
            <td>total amount</td> */}
        </>
    );
};

export default OrderRow;