import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import {useState} from 'react'
import React from 'react';
import app from '../firebase/firebose';
import { Link } from 'react-router-dom'




const From = () => {

    const [passError, setPassError] = useState('')
    const [success, setSuccess] = useState(false)
    const auth = getAuth(app)


    const handleRegistation = (event) => {
        event.preventDefault()
        setSuccess(false)
        const form = event.target;
        const email = (event.target.email.value);
        const password = (event.target.password.value);

        // if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
        //     setPassError('Please provider at least two UPPERCASE');
        //     return;
        // }
        
        // if (password.length < 6) {
        //     setPassError('Please six characters added.');
        //     return;
        // }
        // if (!/(?=.*[!@#$&*])/.test(password)) {
        //     setPassError('Please add at least one special character');
        //     return;
        // }




        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setPassError('')
                form.reset()
                verifyEmail()
                setSuccess('Successfully LOGIN')
                // console.log(user);
            })
            .catch((error) => {
                console.error('error', error)
                setPassError(error.message);
        })
    }

    // const emailHandler = (event) => {
    //     event.preventDefault()
    //     const email = (event.target.value);
    //     const password = (event.target.value); 
    //     console.log(email, password)
        
    // }
    

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('check your email vaification code')
            })
            .catch(error => {
            console.error(error)
            console.error(error.message)
        })
    }





    return (
        <div>
            <h1 className='text-left ml-10 text-2xl mb-10 text-green-600 font-bold'>Please Registered</h1>
            <form  onSubmit={handleRegistation}>
                <input  className='border mr-2' name='email' type="email" required placeholder='YOUR EMAIL'/>
                <input  className='border mr-2' name='password' type="password" required placeholder='YOUR Password' />
                <br></br>
                {
                    success && <p className='text-green-600'>{success}</p>
                }
                <p className='text-red-600'>{passError}</p>
                <button  className='my-3 bg-green-600 rounded-lg text-white p-2' type="submit">Registered</button>
            </form>
            <h3>Please Login <Link to='/login' className='text-green-400 hover:underline'>Login</Link>   </h3>
        </div>
    );
};

export default From;