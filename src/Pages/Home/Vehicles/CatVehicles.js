import React from 'react';
import { Link } from 'react-router-dom';
import About from '../About/About';
import Banner from '../Banner/Banner';
import { useLoaderData } from 'react-router-dom';
import VehicleCard from './VehicleCard';
import Categories from '../../Shared/Categories/Categories';

const CatVehicles = () => {
    const vehicles = useLoaderData();
    return (
        <div >
            <Banner></Banner>
            <About></About>
            <div className='text-center mb-0'>
                <p className="text-2xl font-bold text-orange-600">Enjoy Your Trip</p>
                <h2 className="text-5xl font-semibold">Our Vehicles</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <input className='input input-sm'  type="text" />
                {/* <button onClick={handleSearch}>Search</button> */}
                <button>Search</button>
                {/* <button className='btn btn-ghost' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'desc' : 'asc'}</button> */}
            </div>
            <Categories></Categories>
            <h2>Category {vehicles.length}</h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    vehicles.map(vehicle => <VehicleCard
                        key={vehicle._id}
                        vehicle={vehicle}
                    ></VehicleCard>)
                }
            </div>

        </div>
    );
};
export default CatVehicles;