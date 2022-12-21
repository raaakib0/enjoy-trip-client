import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useState } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/categories2')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, [])
    // console.log(categories);

    const menuItems = <>
        <li className='font-semibold'><Link to='/'>All Vehicles</Link></li>

        {
            
            <li className='font-semibold'>
                {
                    categories.map(categorie => <Link
                        key={categorie._id}
                        // value={categorie.name}
                        to={`/categorie/${categorie.name}`}>{categorie.name}</Link>)
                    // categories.map(categorie => <p key={categorie.id}>
                    //     <Link to={`/categorie/${categorie.name}`} >{categorie.name}</Link>
                    // </p>)
                }
            </li>
        }

    </>

    return (
        <div>
           
               

                {/* ///////////categorie///////////////////////// */}
                {/* <div className="navbar h-20 mb-12 pt-12 bg-base-100"> */}
                <div className="navbar h-5 mb-2  bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {menuItems}
                            </ul>
                        </div >

                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            {menuItems}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                </div>
   
        </div>
    );
};

export default Categories;