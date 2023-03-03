import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Routes, Route, Link, Navigate,useNavigate } from "react-router-dom";
import { Home } from "./Home";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
    
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobiles" element={
        <ProtectedRouter>
          <Phonelist />
        </ProtectedRouter>
          } />
      </Routes>
    </div>
  );
}
function checkauth(res){
  if(res.statusCode === 401){
    throw error("unathorized")
  }
   else{
    return res.json()
   }
}
function Logout(){
  localStorage.clear()
  //localStorage.removeItem("token")
  window.location.href ="/"
}
//renderprops
function ProtectedRouter({children}){

  const token =localStorage.getItem("token")
  return token ?(<section>{children}</section>):(<Navigate replace to="/"/>)
}
function Phonelist(){
  const [Mobiledata,setMobiledata] = useState([])
  const Navigate = useNavigate();
  useEffect(()=>{
    fetch("https://database-bflr.onrender.com/mobiles",{
      headers: { "x-auth-token" :localStorage.getItem("token") },
    })
    .then(res => checkauth(res) )
    .then(data =>setMobiledata(data))
    .catch(err => Logout())
  },[])
  
  return(
    <div className="phone_list_container">
      <div className="logout"><Button onClick={()=>{
        localStorage.clear()
        Navigate("/")
      }} variant="outlined">logout</Button></div>
      {Mobiledata.map((nm,key)=> <Phone key={key}  mobile={nm}/>)}
    </div>
  )
}
function Phone({mobile}) {


  return (
    <div className="phone_container">
      <img
        className="phone_picture"
        src={mobile.img}
      />
      <h3 className="phone_name">{mobile.model}</h3>
      <h5 className="phone_company">{mobile.company}</h5>
    </div>
  );
}

export default App;
