import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import VehicleCard from './VehicleCard';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [isAsc, setIsAsc] = useState(true);
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    useEffect(() => {
        // fetch(`http://localhost:5000/vehicles?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
        fetch(`http://localhost:5000/vehicles`)
            .then(res => res.json())
            .then(data => setVehicles(data))
    }, [isAsc, search]);

    // const handleSearch = () => {
    //     setSearch(searchRef.current.value);
    // }

    return (
        <div>
            <div className='text-center mb-4'>
                <p className="text-2xl font-bold text-orange-600">Enjoy Your Trip</p>
                <h2 className="text-5xl font-semibold">Our Vehicles</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <input className='input input-sm' ref={searchRef} type="text" />
                {/* <button onClick={handleSearch}>Search</button> */}
                <button>Search</button>
                <button className='btn btn-ghost' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'desc' : 'asc'}</button>
            </div>
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

// import { data } from 'autoprefixer';
// import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import VehicleCard from './VehicleCard';

// const Vehicles = () => {
//     const [vehicles, setVehicles] = useState([]);

//     useEffect(() => {
//         fetch('vehicles.json')
//             .then(res => res.json())
//             .then(data => setVehicles(data))
//     }, []);

//     return (
//         <div>
//             <div className='text-center mb-4'>
//                 <p className="text-2xl font-bold text-orange-600">Vehicles</p>
//                 <h2 className="text-5xl font-semibold">Our Vehicle Area</h2>
//                 <h2>data: {vehicles.length}</h2>
//                 <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
//             </div>
//             <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
//                 {
//                     vehicles.map(vehicle => <VehicleCard
//                         key={vehicle._id}
//                         vehicle={vehicle}
//                     ></VehicleCard>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default Vehicles;