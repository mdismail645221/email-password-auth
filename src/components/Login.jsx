import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import app from '../firebase/firebose';


const Login = () => {

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    
    const auth = getAuth(app)

    const loginHandler = (event) => {
        event.preventDefault()
        setSuccess(false)
        const form = event.target;
        const email = (event.target.email.value);
        const password = (event.target.password.value);

        console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setSuccess(true)
                setError('')
                form.reset()
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
        })

    }

    return (
        <div>
            <p className='text-2xl font-bold text-green-500 my-3'>Please Login</p>
            <form onSubmit={loginHandler}>
                <div className='border w-3/5 mx-auto text-left'>
                    <div className='flex justify-between'>
                        <div>
                            <label htmlFor="email" className=''>Email</label><br></br>
                             <input className='my-3 border border-spacing-1 border-red-200' type="email" name='email' placeholder='email' required />
                        </div>
                        <div>
                            <label htmlFor="email" className=''>Password</label><br></br>
                             <input className='my-3 border border-spacing-1 border-red-200' type="password" name='password' placeholder='password' required />
                       </div>
                    </div>
                    <p className='text-red-600'>{ error}</p>
                    {success && <p className='text-green-500 my-3 font-bold text-1xl'>Successfully Login</p> }
                    <button type="submit" className='bg-green-500 px-7 py-1 text-white rounded-lg '>Login</button>
                    <h3>Now, to this website? Please <Link to='/Register' className='text-green-400 hover:underline'>Register</Link>   </h3>
                </div>
            </form>
        </div>
    );
};

export default Login;