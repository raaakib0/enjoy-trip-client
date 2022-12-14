import React from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import VehicleCard from './VehicleCard';

import { useForm } from 'react-hook-form';
import Categories from '../../Shared/Categories/Categories';



const Vehicles = () => {
    // const { register, handleSubmit, formState: { errors } } = useForm();

    const { user } = useContext(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [search, setSearch] = useState('');
    const searchRef = useRef();

    useEffect(() => {
        // fetch(`https://enjoy-trip-server.vercel.app/vehicles?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
        fetch(`https://enjoy-trip-server.vercel.app/vehicles2?search=${search}`)
            .then(res => res.json())
            .then(data => setVehicles(data))
    }, [search]);

    // const categories = 
    //      async () => {
    //         const res = await fetch('https://enjoy-trip-server.vercel.app/categories');
    //         const data = await res.json();
    //         return data;
    //      }
// console.log(search)
    const handleSearch = () => {
        setSearch(searchRef.current.value);
    }
  

    return (
        <div>
            <div className='text-center mb-0'>
                <p className="text-2xl font-bold text-orange-600">Enjoy Your Trip</p>
                <h2 className="text-5xl font-semibold">Our Vehicles</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <input className='input input-sm input-bordered input-info mr-3 mt-5' ref={searchRef} type="text" />
                <button className='font-bold ' onClick={handleSearch}>Search</button>
                {/* <button>Search</button> */}
                {/* <button className='btn btn-ghost' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'desc' : 'asc'}</button> */}
            </div>
            <Categories></Categories>
            {/* //////////all vehicle */}
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

export default Vehicles;
