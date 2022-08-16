import React,{ useState } from 'react'
import './body.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sliderbar from '../../components/SliderBar/Sliderbar';
import Icongridelement from './Icongridelement.js'
import Navbar from '../../components/Navbar/Navbar.js'
export default function Body() {

         
  return (
            <div className='landing_page'>
              <Navbar/>
            <div className='upper container-fluid'>
              <div className='row'>
              <div className='text_sec col-4 .col-md-2'>
              <h5 className="title card-title">Explore Best class venue of your fit!</h5>
              <p className="text card-text">Discover the list of legally registered venues and book match of your best fit.Our service of making your reach to top class Venue from any remote location safer,easier and faster is for free.Book venue right now.</p>
              <button className='hero_button'>Book Now</button>
              </div>
              <div className='slider_bar col-7 .col-md-4'>
                <Sliderbar/>
              </div>
              </div>
            </div>
            <div className='icon_grid container'>
              <div className="icon_heading">Service for Everyone</div>
            </div>
            <div className="lower container-fluid">
            <div className="make_grid grid">
            {Icongridelement.map((value,index)=>(
              <div className="grid_layer g-col-6 g-col-md-4" key={index}>
              <div class="box_card card" style={{width:'30vw'}}>
                <div className="card_body_head card-body">
                  <div className='gicon'>{value.icon}</div>
                  <div className='card_body_sub'>
                <h5 className="card_head">{value.head}</h5>
                <p>{value.text}</p>
                </div>
                </div>
                </div>
                </div>))}
                </div>
                </div>
              <div className='container'>
                Trust our Service
                </div>  
              </div> 
  )
}
