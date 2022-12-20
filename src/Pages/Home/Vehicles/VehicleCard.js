import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
    const { _id, img, price, name,description,email } = vehicle;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-name text-2xl font-semibold">{name}</h2>
                <p className='text-xl font-semibold'>{description}</p>
                <p className='text-xl text-orange-400 font-semibold'>Tk-{price} / Day</p>
                <div className="card-actions justify-end">
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-primary">Checkout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;