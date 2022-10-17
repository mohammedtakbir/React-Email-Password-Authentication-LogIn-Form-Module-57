import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const RegisterReactBootstrap = () => {

    const [errorPassword, setErrorPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = (e) => {
        setSuccess(false);
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        //* Validate password with regex(regular expression)
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setErrorPassword('Please provide at least two uppercase.');
            return;
        } else if (password.length < 6) {
            setErrorPassword('Password should be at least 6 characters');
            return;
        } else if (!/(?=.*[!@#$&*])/.test(password)) {
            setErrorPassword('Please add at least 1 special character');
            return;
        } else {
            setErrorPassword('');
        }
        console.log(email, password);

        //* create a user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setSuccess(true);
                form.reset();
                verifyEmail();
                updateUserName(name);
                console.log(user);
            })
            .catch(error => {
                setErrorPassword(error.message)
                console.error(error);
            })

    };

    //* verify the email
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('please check your email and verify')
            })
    };

    //* update the user name
    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
            .then(() => {
                console.log('display name updated')
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h2 >Please Register</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Name" required />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="email" required />
                    <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{errorPassword}</p>
                {success && <p className='text-success'>User created successfully</p>}
                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p>
                <small>Already have an account? <Link to="/login">Log in</Link></small>
            </p>
        </div>
    );
};

export default RegisterReactBootstrap;