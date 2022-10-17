import React from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/firebase.init';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Registration = () => {
    const [errorPassword, setErrorPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const handleRegister = (e) => {
        e.preventDefault();
        setSuccess(false);
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        //* password validation using regular expression
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setErrorPassword('please insert at least 2 uppercase letter');
            return;
        } else if (!/(?=.*[!@#$&*])/.test(password)) {
            setErrorPassword('insert at least 1 special character');
            return;
        } else if (password.length < 6) {
            setErrorPassword('insert at least 6 digit password');
            return;
        } else {
            setErrorPassword('');
        }

        //* create a new user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                setSuccess(true);
                verifyEmail();
                updateUserName(name);
                console.log(user);
            })
            .catch(err => {
                console.error(err);
                setErrorPassword(err.message)
            })
    };

    //* verify the email
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('please check your email to verify')
            })
    };

    //*update the user name
    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
        .then(() => {
            console.log('profile updated')
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h1>Register</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                {success && <p className='text-success'>user created successfully</p>}
                <p className='text-danger'>{errorPassword}</p>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <p>
                    <small>Already have an account? <Link to='/login'>login</Link></small>
                </p>
            </Form>
        </div>
    );
};

export default Registration;