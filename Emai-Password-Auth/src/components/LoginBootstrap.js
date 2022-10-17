import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const LoginBootstrap = () => {
    const [success, setSuccess] = useState(false);
    //* for reset password
    const [userEmail, setUserEmail] = useState('');

    //* Log in
    const handleLogIn = (event) => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;  
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            setSuccess(true);
            console.log(user);
        }) 
        .catch(error => {
            console.error(error)
        })
    };

    //* OnBlur
    const handleEmailBlur = (e) => {
        const email = e.target.value;
        setUserEmail(email);
    };

    //* forgot password
    const handleForgetPassword = () => {
        if(!userEmail){
            alert('please enter email first');
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(() => {
            alert('password reset email sent. please check your email')
        })
        .catch(error => {
            console.error(error)
        })
    };
    return (
        <div className='w-50 mx-auto'>
            <h1>please Log in</h1>
            <form onSubmit={handleLogIn}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Email Address</label>
                    <input onBlur={handleEmailBlur} type="email" name="email" className="form-control" id="formGroupExampleInput" placeholder="type your email address" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="formGroupExampleInput2" placeholder="type your password" required/>
                </div>
                <div>
                <Button variant="success" type="submit">Log In</Button>
                </div>
            </form>
            {success && <p className='text-success'>Successfully log in to the account</p>}
            <p>
                <small>New to this site? Visit <Link to="/register">Register</Link></small>
            </p>
            <p>Forget password? <button onClick={handleForgetPassword} type="button" class="btn btn-link">Reset Password</button></p>
        </div>
    );
};

export default LoginBootstrap;