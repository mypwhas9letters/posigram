import React from 'react'
import instaFam from '../instaFam2.png';
import logo from '../logo.png';
import '../App.css';
import {NavLink} from 'react-router-dom'
import { logoutUser } from '../services/user.js'
import { findUserId } from '../services/user.js'



const Navbar = (props) => {
  if (localStorage.getItem('jwtToken')) {
      return(
    <div className="ui menu inverted purple">
      <div className="ui container">
        <img src={instaFam} className="App-logo" alt="logo" />
          <div className="item">
             <h1>Posigram</h1>
          </div>
        <NavLink className="item right" to="/home" exact activeStyle={{background: 'hotpink'}}>Home</NavLink>
        <NavLink className="item" to={`/users/${localStorage.getItem('user_id')}`} exact activeStyle={{background: 'hotpink'}}>Profile</NavLink>
        <NavLink onClick={props.onClick} className="item" to="/login" exact activeStyle={{background: 'hotpink'}}>Logout</NavLink>
      </div>
    </div>
  )
  } else {
      return(
    <div className="ui menu inverted purple">
      <div className="ui container">
        <img src={instaFam} className="App-logo" alt="logo" />
        <div className="item">
           <h1>Posigram</h1>
        </div>
        <NavLink className="item right" to="/home" exact activeStyle={{background: 'hotpink'}}>Home</NavLink>
        <NavLink className="item" to="/profile" exact activeStyle={{background: 'hotpink'}}>Profile</NavLink>
        <NavLink className="item" to="/login" exact activeStyle={{background: 'hotpink'}}>Login</NavLink>
        <NavLink className="item" to="/signup" exact activeStyle={{background: 'hotpink'}}>Sign up</NavLink>
      </div>
    </div>
  )
  }

}

export default Navbar
