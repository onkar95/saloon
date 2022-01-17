import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
// import Navbar1 from './Navbar';
// import axios from 'axios';
// import StudentDashboard from './StudentDashboard';
// import TutorDashboard from './TutorDashboard';

const Login = () => {
    const { user, setUser } = useContext(UserContext);

    const [anyUser, setAnyUser] = useState();
    const [login, setLogin] = useState('Student')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Confirmpassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    
    const submitHandler = async e => {

        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        try {
            const res = await fetch(`http://localhost:5000/auth/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({  email, password, Confirmpassword}),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            let token1 = data.access;
            localStorage.setItem("SavedToken", 'Bearer ' + token1);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token1;
            console.log("hello user",token1);
    
            if (data.errors) {
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);

            }
            if (data.user) {
                setUser(data.user)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const demoUser = () => {
        setPassword('123123')
        setEmail('User123@gmail.com')
    }

    if (user?.Role === "user") {
        return <Navigate to='/Userashboard' />
    } else if (user?.Role === "shopkeeper") {

        return <Navigate to='/SaloonDashboard' />
    }

    return (
        <React.Fragment>

            <div className="row">
                <div className="col-sm-2" />
                <div className="col-sm-8">
                    <div className="card p-5 shadow">

                        <form onSubmit={submitHandler}>

                            <h3>Log in</h3>
                            <div className="form-group mt-2">
                                <label htmlFor="email" >Email address</label>
                                <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="alert-danger">
                                {emailError}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password" >Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                            </div>
                            <div className="alert-danger">
                                {passwordError}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password" >Confirm Password</label>
                                <input type="password" className="form-control" value={Confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} id="Confirmpassword" />
                            </div>
                            <div className="alert-danger">
                                {password != Confirmpassword ? "password not matched" : ""}
                            </div>
                            

                            <button disabled={!email} className="btn btn-primary btn-block">Login</button>
                            <button onClick={demoUser} disabled={!email} className="btn btn-primary btn-block">Demo login</button>
                        </form>
                    </div>
                </div>
                <div className="col-sm-2" />
            </div>

        </React.Fragment>

    )
}

export default Login

