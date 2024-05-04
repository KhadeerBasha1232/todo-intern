// Navbar.js
import * as React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import GoogleTranslate from './GoogleTranslate';



export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('name')
    toast.success("LogOut Success");
    navigate('/login');
  }
  const authToken = localStorage.getItem('authToken');
  return (
    <nav class="navbar navbar-expand-lg"  style={{backgroundColor: "#e3f2fd"}}>
  <div class="container-fluid">
    <Link class="navbar-brand" style={{fontWeight:"bold"}} to={"/"}>KB's TODO</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
      </ul>
      <div className='d-flex'>

      <div style={{marginRight:"50px"}}><GoogleTranslate/></div>
      <div style={{marginRight:"20px"}}>{localStorage.getItem('name')}</div>
      {authToken && authToken.length > 0 ? (
      <button class="btn btn-outline-primary" onClick={handleLogout}>Log out</button>
    ) : (
      <div style={{padding:"5px"}}>
      <NavLink to={"/login"}>
      <button class="btn btn-outline-primary mx-3" >Log In</button>
      </NavLink>
      <NavLink to={"/signup"}>
      <button class="btn btn-outline-primary">Sign Up</button>
      </NavLink>
      </div>
      )}
      </div>
    </div>
  </div>
</nav>
  );
}
