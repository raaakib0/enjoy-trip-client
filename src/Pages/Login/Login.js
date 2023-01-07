import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import toast from 'react-hot-toast';
import { useState } from 'react';


const Login = () => {
    const [loginError, setLoginError] = useState('');
    const { login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;

                navigate(from, { replace: true });
                const currentUser = {
                    email: user.email
                }
                toast.success('Login successful.')

                console.log(currentUser);

                // get jwt token
                fetch('https://enjoy-trip-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        toast('User Created Successfully.');
                        // alert('User Created Successfully.');
                        localStorage.setItem('genius-token', data.token);
                        navigate(from, { replace: true });
                    });

            })
            // .catch(error => console.log(error)
            // setLoginError(error.message);
            //   );
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
      
    }

return (
    <div className="hero w-full my-20">
        <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
            <div className="text-center lg:text-left">
                <img className='w-3/4' src={img} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                <h1 className="text-5xl text-center font-bold">Login</h1>
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name='email' placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name='password' placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            
                        </label>
                        {loginError && <p className='text-red-600'>{loginError}</p>}

                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Login" />
                        {/* {loginError && <p className='text-red-600'>{loginError}</p>} */}
                    </div>
                </form>
                <p className='text-center'>New to Enjoy Trip <Link className='text-orange-600 font-bold' to="/signup">Sign Up</Link> </p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    </div>
);
};

export default Login;