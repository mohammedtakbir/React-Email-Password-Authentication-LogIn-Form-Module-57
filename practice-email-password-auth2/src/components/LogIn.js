import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const auth = getAuth(app);

const Login = () => {
    //* error massage
    const [errMsg, setErrMsg] = useState('');

    //* get user email from email input
    const [userEmail, setUserEmail] = useState('');

    //* success massage
    const [successMsg, setSuccessMsg] = useState('');
    const handlerLogin = (e) => {
        e.preventDefault();
        setErrMsg('');
        setSuccessMsg('');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;


        //* Sign in with email and password
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                const user = res.user;
                setSuccessMsg('login successfully')
                console.log(user);
            })
            .catch(err => {
                setErrMsg(err.message)
                console.error(err);
            })
    };
    //* handler onBlur for get the user email
    const handleGetEmail = (e) => {
        setUserEmail(e.target.value);
    };
    //* Forget password
    const handlerForgetPassword = () => {
        if(!userEmail){
            alert('you have to insert your email first');
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(() => {
            alert('password reset email sent!!!')
        })
        .catch(err => {
            console.err(err);
        })
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h1>Log In</h1>
            <Form onSubmit={handlerLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleGetEmail} type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{errMsg.slice(22, -2)}</p>
                <p className='text-success'>{successMsg}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p className='mt-2'>
                    <small>New to visit site? <Link to="/SignUp">Sign Up</Link></small>
                </p>
                <p> <span>Forget password?</span>
                    <button onClick={handlerForgetPassword} type='button' className='btn btn-link'>Reset</button>
                </p>
            </Form>
        </div>
    );
};

export default Login;