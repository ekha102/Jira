import React from 'react'
import { Link, Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <div className="container-fluid">
      <nav className="nav justify-content-center">
        <Link className="nav-link active" to="/">Home</Link> 
        <Link className="nav-link" to="view-alert" >View Alert</Link>
        <Link className="nav-link" to="check-in" >Check-In</Link>
        <Link className="nav-link" to="check-out" >Check-Out</Link>
      </nav>
      <Outlet/>

    </div>
  )
}
