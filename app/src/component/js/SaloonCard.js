import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import src from "../../images/img.jpg"
const SaloonCard = () => {
    // console.log(val);
    const { id } = useParams();
    console.log(id);
    const [data, setData] = useState()
    useEffect(() => {
        const search = () => {
            axios.get(`http://localhost:5000/auth/${id}`)
                .then(data => {
                    console.log(data.data);
                    setData(data.data)
                })
                .catch(err => console.log(err))
        }
        search()
    }, [])
    console.log(data);
    return (
        <div>
            <div className='bimg'>

            <img style={{height:"300px",width:"100%",objectFit:"cover"}} src={src} alt="" />
            </div>
            <h1>{data?.ShopName}</h1>
            <h1>{data?.openTiming}</h1>
            <h1>{data?.closeTiming}</h1>
            <h1>{data?.shopAddress}</h1>
            <h1>{data?.shopPincode}</h1>
            <div>
                {data?.hairstyle.map((val, key) => (
                    <div className="container">
                        <div  >

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col"><h4>Sr.no</h4></th>
                                        <th scope="col"><h4>Hair Style </h4></th>
                                        <th scope="col"><h4>Time </h4></th>
                                        <th scope="col"><h4>original Price </h4></th>
                                        <th scope="col"><h4>Discount</h4></th>
                                        <th scope="col"><h4>final ammount</h4></th>
                                    </tr>
                                </thead>
                                {/* {data1.map((val, key) => ( */}
                                    <>
                                        <tbody id={val._id}>
                                            <tr>
                                                <th scope="row">{key+1}</th>
                                                <th scope="row">{val.styleName}</th>
                                                <th scope="row">30min</th>
                                                <td>{val.price}</td>
                                                <td> 5%</td>
                                                <td> {val.price - (5 * val.price) / 100}</td>
                                                <td>  <button>book</button></td>
                                            </tr>

                                        </tbody>
                                    </>
                                {/* ))} */}
                            </table>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )

}

export default SaloonCard
