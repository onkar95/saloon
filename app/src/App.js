import UserDashboard from './component/js/UserDashboard';
import Login from './component/js/Login';
import Register from './component/js/Register';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { UserContext } from './UserContext';
import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import LandingPage from './component/js/LandingPage';
import SaloonDashboard from './component/js/SaloonDashboard';
import SaloonCard from './component/js/SaloonCard';
function App() {
  const [user, setUser] = useState(null)
  const [data, setData] = useState([])
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       await axios.get('http://localhost:5000/auth/verifyuser')
  //         .then((res) => {
  //           setData(res.data)
  //           setUser(res.data);
  //         })
  //         .catch((err) => console.log(err))
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   verifyUser()
  // }, [])
  let {id} = useParams();
  useEffect(() => {
      const search = () => {
          axios.get(`http://localhost:5000/auth/:id}`)
              .then(data => {
                  // setData(data.data)
                  console.log(data.data);
              })
              .catch(err => console.log(err))
      }
       search()
  }, [])
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>

        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Userashboard" element={<UserDashboard />} />
            <Route path="/SaloonDashboard" element={<SaloonDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={'/saloonCard/:id'}
              element={<SaloonCard />}>
            </Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
