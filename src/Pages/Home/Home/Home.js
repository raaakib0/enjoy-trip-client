import React from 'react';
import About from '../About/About';
import Banner from '../Banner/Banner';
import CatVehicles from '../Vehicles/CatVehicles';
import Vehicles from '../Vehicles/Vehicles';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Vehicles></Vehicles>
        </div>
    );
};

export default Home;