import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const VehicleDetails = () => {
    const { _id, name, price, email, description, img } = useLoaderData();
// console.log(name)
    // const [vehicles, setVehicles] = useState([]);

    // useEffect(() => {
    //     fetch(`https://enjoy-trip-server-raaakib0.vercel.app/vehicles?_id=${_id}`)
    //         .then(res => res.json())
    //         .then(data => setVehicles(data))
    // },);
    
    return (
        // <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <div className="card card-compact bg-base-100 shadow-xl mb-5">
            <figure><img src={img} alt="Vehicle" /></figure>
            <div className="card-body">
                <h2 className="card-name text-2xl font-semibold">Car name: {name}</h2>
                <p className='text-xl font-semibold'>Seller: {email}</p>
                <p className='text-l '>Description: {description}</p>
                <p className='text-xl text-orange-400 font-semibold'>Price Tk-{price} / Day</p>
                <div className="card-actions justify-end">
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-primary">Place Order</button>
                    </Link>
                </div>
            </div>
        </div>
        // <div className="card lg:card-side bg-base-100 shadow-xl">
        //     <figure><img src="https://placeimg.com/400/400/arch" alt="Album" /></figure>
        //     <div className="card-body">
        //         <h2 className="card-title">New album is released!</h2>
        //         <p>Click the button to listen on Spotiwhy app.</p>
        //         <div className="card-actions justify-end">
        //             <button className="btn btn-primary">Listen</button>
        //         </div>
        //     </div>
        // </div>
    );
};

export default VehicleDetails;