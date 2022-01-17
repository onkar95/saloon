import React from 'react'
import "../css/home.css"
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
             <div className="main">
                <div className='container-lg'>
                    <div >
                        <div className="intro-text">
                            <div>
                                <h1 className="title">Welcome to my Dashboard</h1>
                                <p className="subtitle">One Safe place for all your notes.</p>
                            </div>
                            <div className="buttonContainer">

                                <Link to="/login">
                                    <button className="btn btn-primary" size="lg" >
                                        Login
                                    </button>
                                </Link>
                                <Link to="/Register">
                                    <button
                                        variant="outline-primary"
                                        className="btn btn-primary" size="lg"
                                    >
                                        Signup
                                    </button>

                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
