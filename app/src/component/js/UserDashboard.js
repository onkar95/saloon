import React, { useEffect, useState } from 'react'
import { Button } from "bootstrap";
import "../css/home.css"
import axios from "axios";
import { Link, Route, Routes } from 'react-router-dom';
import SaloonCard from './SaloonCard';

const UserDashboard = () => {
    const [Data, setData] = useState()
    const [filter, setFilter] = useState("")
    const [FilteredData, setFilteredData] = useState([])

    useEffect(() => {
        // const search = () => {
        //     axios.get(`http://localhost:5000/auth/shopfilter/?shopPincode=${filter}`)
        //         .then(data => {
        //             setData(data.data)
        //             console.log(data.data);
        //         })
        //         .catch(err => console.log(err))
        // }
        // if (filter != "") search()

    }, [filter])

    const loadData = () => {
        const search = () => {
            axios.get(`http://localhost:5000/auth/shopfilter/?shopPincode=${filter}`)
                .then(data => {
                    setData(data.data)
                    console.log(data.data);
                })
                .catch(err => console.log(err))
        }
        if (filter != "") search()

}

    return (
        <>
            <h1>UserDashboard</h1>
            <div>
                <input type="text" value={filter} onChange={a => setFilter(a.target.value)} />
                <button onClick={loadData}>search here</button>
                <div>
                    {
                        Data && Data.map((val, key) => (
                            <div>
                                {/* <Routes>
                                    <Route path={`/saloonCard/:${val._id}`}
                                        element={<SaloonCard val={val} key={key} />}>
                                    </Route>
                                </Routes> */}
                                <Link to={`/saloonCard/${val._id}`}><h1>{val.ShopName}</h1></Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default UserDashboard
