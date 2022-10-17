import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.init';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const SignUp = () => {
    //* error message
    const [errMsg, setErrMsg] = useState('');

    //* success message
    const [successMsg, setSuccessMsg] = useState('');

    const handlerSignUp = (e) => {
        e.preventDefault();
        setErrMsg('');
        setSuccessMsg('');
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        //* password validation with regex
        if(password.length < 6){
            setErrMsg('insert at least 6 digit password');
            return;
        }else if(!/(?=.*[A-Z])/.test(password)){
            setErrMsg('insert at least 1 uppercase letter');
            return;
        }else if(!/(?=.*[0-9])/.test(password)){
            setErrMsg('insert at least 1 number');
            return;
        }else{
            setErrMsg('');
        };

        //* create a user account
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                const user = res.user;
                form.reset();
                setSuccessMsg('create an account successfully!');
                emailVerify();
                updateProfileName(name);
                console.log(user);
            })
            .catch(err => {
                setErrMsg(err.message);
                console.error(err);
            })
    };
    //* email verification
    const emailVerify = () => {
        sendEmailVerification(auth.currentUser)
        .then(() => {
            alert('Email verification sent!')
        })
    };
    //* update the profile
    const updateProfileName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
        .then(() => {
            console.log('profile updated')
        })
        .catch(err => {
            console.error(err)
        })
    };

    return (
        <div className='mt-5'>
            <Form className='w-50 mx-auto' onSubmit={handlerSignUp}>
                <h1>Sign Up</h1>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{errMsg}</p>
                <p className='text-success'>{successMsg}</p>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
                <p className='mt-2'>
                    <small>Already have an account? <Link to="/login">Log in</Link></small>
                </p>
            </Form>
        </div>
    );
};

export default SignUp;