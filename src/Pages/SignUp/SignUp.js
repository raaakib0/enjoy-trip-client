import React from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../api/auth';
import toast from 'react-hot-toast';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
// import useToken from '../../hooks/useToken';

const SignUp = () => {
    // const { createUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    // const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    // const sellerRequest = () => {
    //     console.log()
    // }
    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role2 = form.checkbox.checked;
        // console.log(role2);

        createUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user.email);

                navigate(from, { replace: true })
                toast.success('User Created Successfully.')
                // toast.success('Make seller successful.')

                setAuthToken(user);
                // console.log(name);
                const userInfo = {

                    displayName: name
                }
                saveUser(name, email, role2);
                // updateUser(userInfo)
                //     .then(() => {
                //         console.log(name, email);
                //         saveUser(name, email);
                //     })
            })
            // .catch(err => console.error(err));
            .catch(error => {
                // console.log(error)
                setSignUPError(error.message)
            });
    }

    const saveUser = (name, email, role2) => {
        const user = { name, email, role2 };
        // console.log(user);
        fetch('https://enjoy-trip-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // setCreatedUserEmail(email);
            })
    }
    // console.log(signUpError)
    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className="text-5xl text-center font-bold">Sign Up</h1>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Your Name" className="input input-bordered" />
                            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" required />
                            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">Request for Seller</span>
                                <input type="checkbox" name="checkbox" className="checkbox checkbox-info" />
                            </label>
                            
                            {signUpError && <p className='text-red-600'>{signUpError == "Firebase: Error (auth/user-not-found)." ? "User Not Found" : ""}</p>}
                            {signUpError && <p className='text-red-600'>{signUpError == "Firebase: Error (auth/invalid-email)." ? "Invalid Email" : ""}</p>}
                            {signUpError && <p className='text-red-600'>{signUpError == "Firebase: Error (auth/wrong-password)." ? "Wrong Password" : ""}</p>}
                            {signUpError && <p className='text-red-600'>{signUpError == "Firebase: Password should be at least 6 characters (auth/weak-password)." ? "Weak password enter at least 6 characters" : ""}</p>}
                            {signUpError && <p className='text-red-600'>{signUpError == "Firebase: Error (auth/email-already-in-use)." ? "Email already in use" : ""}</p>}
                            {/* {signUpError && <p className='text-red-600'>{signUpError}</p>} */}

                        </div>
                        <div className="form-control mt-6">
                            {/* {signUpError && <p className='text-red-600'>{signUpError}</p>} */}
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className='text-center'>Already have an account? <Link className='text-orange-600 font-bold' to="/login">Login</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;