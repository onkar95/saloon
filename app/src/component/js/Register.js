import React, { useState, useContext } from "react";
import { UserContext } from '../../UserContext';
import axios from 'axios'
// import { Link, Navigate } from "react-router-dom";


function Register(props) {
    const { user, setUser } = useContext(UserContext);
    const [Data, setData] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Confirmpassword, setConfirmPassword] = useState('')
    const [City, setCity] = useState('')
    const [phoneNo, setPhoneNo] = useState()
    const [Pincode, setPincode] = useState()
    const [State, setState] = useState()
    const [Role, setRole] = useState()

    const [phoneNoError, setPhoneNoError] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    const handleSubmit = async e => {
        e.preventDefault();
        setEmailError('');
        setNameError('');
        setPasswordError('');
        console.log(name, email, password, Confirmpassword, City, State, phoneNo, Pincode, Role)
        try {
            const dataobj = {
                name, email, password, Confirmpassword, City, State, phoneNo, Pincode, Role
            }
           await axios.post('http://localhost:5000/auth/Register', dataobj)
                .then((data) => {
                    console.log(data);
                    setData(data.data)
                })
                .catch(err => console.log(err));
            // const data = await res.json();
            console.log(Data)
            if (Data.errors) {
                setEmailError(Data.errors.email);
                setNameError(Data.errors.name);
                setPhoneNoError(Data.errors.phoneNo);
                setPasswordError(Data.errors.password);

            }
            if (Data.user) {
                setUser(Data.user)
            }
        } catch (error) {
            console.log(error)
        }


    }
    // if (!user) {
    //     return <Navigate to='/login' />
    // }
    return (
        <>
            {/* <h1>hello</h1> */}
            <div>

                <div className="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-8">
                        <h4 className="text-muted text-center mb-5">Create account as Student</h4>

                        <div className="card p-5 shadow">
                            <div className="form-group mx-2">
                                {/* <button className="text-muted text-center mb-5" onClick={loginHandeler}>Log as {login}</button> */}
                                <input className="form-group mx-2" type="radio" value="user" name="role" checked={Role === "user"} onChange={e => setRole(e.target.value)} />
                                <label >user</label>
                                <input className="form-group mx-2" type="radio" value="shopkeeper" name="role" onChange={e => setRole(e.target.value)} lchecked={Role === "shopkeeper"} />
                                <label >shopkeeper</label>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name" > Enter your name </label>
                                    <input type="name" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} name='name' />
                                </div>
                                <div className="alert-danger">
                                    {nameError}
                                </div>
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
                                <div className="form-group mt-2">
                                    <label htmlFor="username" >City </label>
                                    <input type="Class" className="form-control" id="city" onChange={(e) => setCity(e.target.value)}
                                        value={City} name='city' />
                                </div>
                                <div className="alert-danger">
                                    {/* {ClassError} */}
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="username" >State </label>
                                    <input type="Class" className="form-control" id="state" onChange={(e) => setState(e.target.value)}
                                        value={State} name='city' />
                                </div>
                                <div className="alert-danger">
                                    {/* {ClassError} */}
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="phoneNo" >phoneNo </label>
                                    <input type="phoneNo" className="form-control" id="phoneNo" onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} placeholder="enter your number" name='phoneNo' />
                                </div>
                                <div className="alert-danger">
                                    {/* {phoneNoError} */}
                                </div>



                                <div className="form-group mt-2">
                                    <label > Pincode</label>
                                    <input type="Pincode" id="Pincode" className="form-control" onChange={(e) => setPincode(e.target.value)} value={Pincode} name='Age' />
                                </div>
                                <div className="alert-danger">
                                    {/* {AgeError} */}
                                </div>


                                <button className="btn btn-primary btn-block" >Register</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-2" />
                </div>

            </div>
        </>
    )
}

export default Register


