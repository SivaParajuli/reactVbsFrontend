import React,{useState,useEffect} from 'react'
import './customerregistrationpage.css'
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
import {Reacticonfour} from '../../../assets/icons/Reacticon.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../../../components/Navbar/Navbar.js'

export default function Customerregistrationpage() {
  const errorMsg = [{id:'1',forName: "*Please include at least ten letter with no special characters in your Venue Name"},
  {id:'5',forUserName: "*Please include at least six letter with no special characters in your Name"},
  {id:'2',forImage:"*Image should be in proper format"},
  {id:'3',forLocation:"*Please include at least five letter with no special character in your Venue Location"},
  {id:'4',forComment:"*Please include description more than 50 letters with no special characters"},
  {id:'6',forConNum:"*Should be ten digit long"},
  {id:'7',forPassword:"*At least seven char long and Please include three letter one number one specialcharacter"}]
    
    const navigate = useNavigate();
    const[focused,setFocused] = useState(false);
    const[customerDetail,setCustomerDetail] = useState({email:"",name:"",city_name:"",mobile_no:"",password:""});


      async function register(){
        let response = await axios.post('https://venue-booking-system2.herokuapp.com/register/client',JSON.stringify(customerDetail),
        {headers:{'Content-Type':'application/json'
        }});

        console.log(response);
        setCustomerDetail(()=>({...customerDetail,email:" ",name:" ",city_name:" ",mobile_no:" ",password:" "}));
        navigate('/customerlogin');
      }

       function submitHandler(e){
      e.preventDefault();
        register();
      }
      

  //   const submitHandler = async(e) => {            
  //   e.preventDefault();
  //   console.log(dealerDetail);
  //   console.log(fileUpload);
  // }
  function handleFocus(e){
    setFocused(true);
 }
 
  return (
    <div> 
      <Navbar/>
    <div className='customer_reg_page container-fluid'>
      
      <form class="creg_form row g-3" onSubmit={submitHandler}>
        <h1 className='heading_creg'><Reacticonfour className='reg_icon'/>Customer Registration</h1>
      
    <div class="creg_field col-md-6">
    <label for="email" class="form-label">Email</label>
    <input autoComplete="off" type="text" name='email' pattern='^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$' id='email' required={true} onBlur={(e)=> setFocused(true)} focused={focused.toString()} onChange={e=>setCustomerDetail({...customerDetail,email:e.target.value})} value={customerDetail.email}/>
    <span>*Please write valid email</span>
  </div>
  <div class="creg_field col-md-6">
  <label for="username" class="form-label">User Name</label>
  <input autoComplete="off" type="text" name='name' id='username' required={true} pattern='^[a-zA-Z ]{3,16}$'  onBlur={handleFocus} focused={focused.toString()} onChange={e=>setCustomerDetail({...customerDetail,name:e.target.value})} value={customerDetail.name}/>
    <span>{errorMsg.map((item)=>(item.forUserName))}</span>
    </div>

   
  <div class="creg_field col-md-6">
    <label for="password" class="form-label">Password</label>
    <input type="password" name='password' id='password' onBlur={handleFocus} focused={focused.toString()} pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$' required={true} onChange={e=>setCustomerDetail({...customerDetail,password:e.target.value})} value={customerDetail.password}/>
    <span>{errorMsg.map((item)=>(item.forPassword))}</span>
  </div>
   
  <div class="creg_field col-md-6">
    <label for="address" class="form-label">Address</label>
    <input autoComplete="off" type="text" name='city_name'  required={true} id='address' pattern='^[a-zA-Z ]{5,200}$'  onBlur={handleFocus} focused={focused.toString()} onChange={e=>setCustomerDetail({...customerDetail,city_name:e.target.value})} value={customerDetail.city_name}/>
    <span>{errorMsg.map((item)=>(item.forLocation))}</span>
    </div>
    <div class="creg_field col-md-6">
    <label for="contactnumber" class="form-label">Contact Number</label>
    <input type="text" name='mobile_number' id='number' required={true} onBlur={handleFocus} focused={focused.toString()} pattern='^[9][6-8]{1}[0-9]{8}$' onChange={e=>setCustomerDetail({...customerDetail,mobile_no:e.target.value})} value={customerDetail.mobile_no}/>
    <span>{errorMsg.map((item)=>(item.forConNum))}</span>
  </div>

  <div class="creg_field col-12">
    <button type="submit" >Register</button>
  </div>
    </form>
    </div>
    </div>
  )
}





