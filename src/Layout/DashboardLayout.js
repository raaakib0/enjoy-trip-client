import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
// import { AuthContext } from '../contexts/AuthProvider';
// import useAdmin from '../hooks/useAdmin';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)

    return (
        <div>
            {/* <Navbar></Navbar> */}
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content bg-base-100">

                        {
                            isAdmin && <>
                                {/* <> */}
                                <li className='font-semibold' ><Link to="/dashboard/allusers">All Users</Link></li>
                                <li className='font-semibold' ><Link to="/dashboard/allvehicles">All Vehicles</Link></li>
                                <li className='font-semibold' ><Link to="/dashboard/allorders">All Order</Link></li>
                                {!isSeller && <>
                                    <li className='font-semibold' ><Link to="/dashboard/addvehicle">Add Vehicle</Link></li>
                                    <li className='font-semibold' ><Link to="/dashboard/managevehicle">Manage Vehicles</Link></li>
                                    <li className='font-semibold' ><Link to="/dashboard">My Orders</Link></li>
                                </>}
                            </>

                        }
                        {isSeller && <>
                            <li className='font-semibold' ><Link to="/dashboard/addvehicle">Add Vehicle</Link></li>
                            <li className='font-semibold' ><Link to="/dashboard/managevehicle">Manage Vehicles</Link></li>
                            <li className='font-semibold' ><Link to="/dashboard">My Orders</Link></li>
                        </>}

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;