import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useSeller from '../../../hooks/useSeller';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json();
            return data;
        }
    });
    // const sellerUser = users.map(suser => suser = suser)
    // console.log(suser)

    const handleMakeSeller = id => {
        fetch(`http://localhost:5000/users/seller/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Make Seller successful.')
                    refetch();
                }
            })
    }

    const handleLogOut = () => {
        logOut()
            .then()
            .catch();
    }
    // const role2 = 'seller';
    // const makeSeller = () => {

    // }

    const menuItems = <>
        <li className='font-semibold'><Link to='/'>Home</Link></li>
        {
            user?.email ?
                <>
                    <li className='font-semibold'><Link to='/orders'>Orders</Link></li>
                    <li className='font-semibold'>
                        <button onClick={handleLogOut} className='btn-ghost'>Sign Out</button>
                    </li>

                   
                    {/* {
                        users.map((user) => (console.log(user)))
                    } */}
                    {/* <li className='font-semibold'> */}
                    {users.map((user) => <li key={user._id} >
                        {/* <td>{user?.role2 !== 'seller' && <button onClick={() => handleMakeSeller(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td> */}
                        {user?.role2 !== 'seller' &&
                            <button onClick={() => handleMakeSeller(user._id)} className='btn-ghost'>{"Create Seller"}</button>
                        }
                    </li>
                    )
                    }
                    {/* </li> */}

                    {
                        isSeller && <>
                            
                            <li className='font-semibold'><Link to='/dashboard'>Seller Dashboard</Link></li>
                       </>
                    }
                    {
                        isAdmin  &&
                            
                            <li className='font-semibold'><Link to='/dashboard'>Admin Dashboard</Link></li>
                       
                    }
                </>
                :
                <li className='font-semibold'><Link to='/login'>Login</Link></li>
        }

    </>

    return (
        <div className="navbar h-20 mb-12 pt-12 bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-outline btn-warning">Appointment</button>
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Header;