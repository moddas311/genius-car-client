import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { BsGithub, } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { GrLinkedinOption } from 'react-icons/gr';
import { FaFacebookF } from 'react-icons/fa';

import { GoogleAuthProvider } from 'firebase/auth';


const Login = () => {

    const { logIn, loginWithGoogle } = useContext(AuthContext);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(err => console.error(err));
    }

    const provider = new GoogleAuthProvider();

    const connectWithGoogle = () => {
        loginWithGoogle(provider)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => console.error(error))
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
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="LOg In" />
                        </div>
                        <div className="form-control mt-6 grid grid-cols-4 pl-6 gap-2">
                            <button onClick={connectWithGoogle} className='btn btn-circle bg-gray-100 border-none'>
                                <FcGoogle />
                            </button>
                            <button className='btn btn-circle bg-gray-200 border-none'>
                                <BsGithub />
                            </button>
                            <button className='btn btn-circle bg-gray-100 border-none'>
                                <GrLinkedinOption className='text-blue-600' />
                            </button>
                            <button className='btn btn-circle bg-gray-100 border-none'>
                                <FaFacebookF className='text-blue-600' />
                            </button>
                        </div>
                    </form>
                    <p className='text-center'>New to Genius Car? <Link className='text-orange-600 font-bold' to="/signup">Sign UP</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;