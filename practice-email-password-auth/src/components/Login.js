import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

//* log in
const Login = () => {
    const [success, setSuccess] = useState(false);
    //* for reset password
    const [userEmail, setUserEmail] = useState('');
    
    //* log in
    const handleLogin = (e) => {
        e.preventDefault();
        setSuccess(false)
        const form = e.target;
        const name = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, name, password)
        .then(result => {
            const user = result.user;
            setSuccess(true);
            form.reset();
            console.log(user);
        })
        .catch(err => {
            console.error(err);
        })
    };
    //* onBlur
    const handlerBlur = (e) => {
        setUserEmail(e.target.value);
    }
    //* Forget Password
    const handleForgetPassword = () => {
        if(!userEmail){
            alert('insert email first');
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(() => {
            alert('password reset email sent')
        })
        .catch(err => {
            console.error(err);
        })
    }
    return ( 
        <div className='w-50 mx-auto mt-5'>
            <h1>Log In</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handlerBlur} type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                {success && <p className='text-success'>login successfully</p>}
                <Button variant="primary" type="submit">
                    Log in
                </Button>
                <p>
                    <small>New to this site? <Link to='/registration'>Register</Link></small>
                </p>
                <p>Forget password ? <button onClick={handleForgetPassword} type='button' className='btn btn-link'>Reset Password</button></p>
            </Form>
        </div>
    );
};

export default Login;