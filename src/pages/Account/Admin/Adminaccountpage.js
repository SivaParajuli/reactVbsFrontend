import React, { useState,useEffect} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link , useNavigate,useParams} from "react-router-dom";
import { SidebarDataforadmin } from "../Dealer/SidebarData.js";
import "./adminaccountpage.css";
import Logo from '../../../assets/images/navbar_logo_bgr.png'
import Avatar from '@mui/material/Avatar'
import {Reacticonsixteen,Reacticonseventeen} from '../../../assets/icons/Reacticon.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios'
import { type } from "@testing-library/user-event/dist/type/index.js";

export default function Adminaccount() {
  const[noToken,setnoToken] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const {adminemail} = useParams();

  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken])

  const config = {  
    headers:{
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
    }
  }

  useEffect(()=>{
    function getPendingVenue(){
      axios.get('https://venue-booking-system2.herokuapp.com/admin-/registerRequests',config)
      .then(response => {
        console.log(response) 
      })
      .catch(err=> {console.log(err)});
    }
     getPendingVenue();
  },[])

  const logout = (e)=> {
    e.preventDefault();
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/adminlogin');
    window.location.reload();
  }
  return (
    <>{!noToken ? (
      <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebara">
          <Link to="#" className="sidemenua-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sidea-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-ad'>
          <Avatar sx={{ bgcolor: '#ffd43b', color:'#23013f'}}>AD</Avatar>
          <button onClick={logout}>Logout</button>
          </div>
        </div>
        <nav className={sidebar ? "sidea-menu active" : "sidea-menu"}>
          <ul className="sidea-menu-items" onClick={showSidebar}>
            <li className="sidea-toggle">
              <Link to="#" className="sidemenua-bars">
                <AiIcons.AiOutlineClose/>
              </Link>
            </li>
            {SidebarDataforadmin.map((item, index) => {
              return (
                <li key={index} className='sidea-text'>
                  <Link to={`${item.foradmin.path}`+`/${adminemail}`} className='sidebara-pa'>
                    <p>{item.foradmin.icon}{item.foradmin.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>):
        (<div>You are logged out of the page.Please try again after login!</div>)
        }
        {/* <div className='body_content container-fluid'>
        <div class="card col-lg-12">
        <img src="..." class="card-img-top" alt="..."/>
         <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        </div>
        <div className="body_content_sub container-fluid">
        <div class="row">
        <div class="col-sm-8 col-lg-6">
            <div class="card">
             <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
     </div>
        <div class="col-sm-8 col-lg-6">
        <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
        </div>
        </div>
        </div>
        </div>
        </div> */}
    </>
  );
}

export function Venueaccept(){
  const[noToken,setnoToken] = useState(false);
  const [sidebar, setSidebar] = useState(false);    
  const [pendingVenuelist,setpendingVenuelist] = useState([]);
  const {adminemail} = useParams();
  const showSidebar = () => setSidebar(!sidebar); 
  const navigate = useNavigate();
  
  useEffect(() => {
    if(sessionStorage.length != 0){
      setnoToken(false)
    }else {
      setnoToken(true)
    }
  }, [noToken , []])

  const config = {  
    headers:{
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token'))
    }
  }
  
  useEffect(()=>{
    axios.get('https://venue-booking-system2.herokuapp.com/admin-/registerRequests',config)
    .then(response => {
      console.log(response) 
      setpendingVenuelist(response.data.data)
    })
    .catch(err=> {console.log(err)});
  },[])

  async function handleAccept(key){
    try{
      let response = await axios.put(`https://venue-booking-system2.herokuapp.com/admin-/update/${pendingVenuelist[key].id}`,
            {
              "status": 0
            }    
        ,{ 
          headers:{
          Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token')) 
        }
      }
    );
    console.log(response)
    }catch(err){  
      console.log(err)
      }
  }

  async function handleCancel(key){
    try{
      let response = await axios.put(`https://venue-booking-system2.herokuapp.com/admin-/update/${pendingVenuelist[key].id}`,
            {
              "status": 1
            }    
        ,{ 
          headers:{
          Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem('token')) 
        }
      }
    );
    console.log(response)
    }catch(err){  
      console.log(err)
      }
  }


  const logout = (e)=> {
    e.preventDefault();
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    navigate('/adminlogin');
    window.location.reload();
  }

    return(
    <>
    {noToken ? (<div>You are logged out of page.Please login to continue!</div>):
      (
      <>
      <IconContext.Provider value={{ color: "#011627" }}>
        <div className="sidebara">
          <Link to="#" className="sidemenua-bars">
            <FaIcons.FaBars onClick={showSidebar} />
            <div className='sidea-logo'>
              <img src={Logo} alt='logo'/>
          </div>
          </Link>
          <div className='right-group-ad'>
          <Avatar sx={{ bgcolor: '#ffd43b', color:'#23013f'}}>AD</Avatar>
          <button onClick={logout}>Logout</button>
          </div>
        </div>
        <nav className={sidebar ? "sidea-menu active" : "sidea-menu"}>
          <ul className="sidea-menu-items" onClick={showSidebar}>
            <li className="sidea-toggle">
              <Link to="#" className="sidemenud-bars">
                <AiIcons.AiOutlineClose/>
              </Link>
            </li>
            {SidebarDataforadmin.map((item, index) => {
              return (
                <li key={index} className='sidea-text'>
                  <Link to={`${item.foradmin.path}`+`/${adminemail}`} className='sidebara-pa'>
                    <p>{item.foradmin.icon}{item.foradmin.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>
      <div className={sidebar ? 'table_container_accept_push container-fluid' : 'table_container_accept_extend container-fluid'}>
      <p className='table_container_accept_title'>Venue Add Request By Dealer</p>
      <table class="table_container_accept_body table  table-bordered">
      <thead>
      <tr>
    <th>ID</th>
    <th>UserName</th>
    <th>VenueName</th>
    <th>Location</th>
    <th>ContactNumber</th>
    <th><Reacticonsixteen/></th>
    <th><Reacticonseventeen/></th>
      </tr>
      </thead>
      <tbody>
        {pendingVenuelist.map((item,index)=>(
          <tr key={index}>
          <th>{index+1}</th>
          <td>{item.userName}</td>
          <td>{item.venueName}</td>
          <td>{item.address}</td>
          <td>{item.contactNumber}</td>
          <td><button className='button_accept' onClick={()=>handleAccept(index)}>Accept</button></td>
          <td><button className='button_cancel' onClick={()=>handleCancel(index)} >Cancel</button></td>
        </tr>
        ))}
      </tbody>
      </table>
      </div>
      </>)}
      </>
    )
}