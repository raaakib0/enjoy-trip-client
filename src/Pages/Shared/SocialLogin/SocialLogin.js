import React, { useContext } from 'react';
import { setAuthToken } from '../../../api/auth';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext);

    const handleGoogleSIgnIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                setAuthToken(user);
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <p className='text-center mb-2'><small>Social Login</small></p>
            <p className='text-center'>
                <button onClick={handleGoogleSIgnIn} className='btn btn-outline btn-info'><FaGoogle></FaGoogle> Google</button>
            </p>
        </div>
    );
};

export default SocialLogin;